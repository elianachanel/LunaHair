import { create } from "zustand";
import type { User } from "firebase/auth";
import type { UserProfile } from "@/types/user";
import {
  registerEmail,
  signInEmail,
  signOutUser,
  subscribeAuth,
  isFirebaseConfigured,
  syncUserData,
  getUserProfile,
  upsertUserProfile,
  mapFirebaseError,
  reloadAuthUser,
  resendVerificationEmail,
  getFirebaseAuth,
} from "@/services/firebase";
type AuthState = {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  initialized: boolean;
  demoMode: boolean;
  syncError: string | null;
  init: () => () => void;
  signIn: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    displayName: string,
  ) => Promise<void>;
  signOut: () => Promise<void>;
  enterDemoMode: () => void;
  refreshProfile: () => Promise<void>;
  syncAllUserData: (userId: string) => Promise<void>;
  resendVerification: () => Promise<void>;
  checkEmailVerified: () => Promise<boolean>;
};

const demoProfile: UserProfile = {
  uid: "demo",
  email: "demo@lunahair.app",
  displayName: "Selene Waters",
  hydrationLevel: 84,
  hair: {
    pattern: "ondulado_2b",
    color: "castano",
    porosity: "media",
    thickness: "medio",
    condition: "saludable",
  },
  onboardingCompleted: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

async function hydrateStoresFromFirebase(userId: string) {
  const { routines, hairLogs } = await syncUserData(userId);
  const { useRoutineStore } = await import("./routineStore");
  const { useHairLogStore } = await import("./hairLogStore");

  useRoutineStore.setState({ routines });

  const logsByDate = Object.fromEntries(hairLogs.map((l) => [l.date, l]));
  useHairLogStore.setState((state) => ({
    logsByDate: { ...state.logsByDate, ...logsByDate },
  }));
}

async function clearUserStores() {
  const { useRoutineStore } = await import("./routineStore");
  const { useHairLogStore } = await import("./hairLogStore");
  useRoutineStore.setState({ routines: [] });
  useHairLogStore.setState({ logsByDate: {} });
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  loading: false,
  initialized: false,
  demoMode: false,
  syncError: null,

  syncAllUserData: async (userId) => {
    try {
      set({ syncError: null });
      await hydrateStoresFromFirebase(userId);
    } catch (e) {
      set({ syncError: mapFirebaseError(e) });
    }
  },

  init: () => {
    if (!isFirebaseConfigured) {
      set({ initialized: true, demoMode: false });
      return () => {};
    }
    const unsub = subscribeAuth(async (user) => {
      if (user) {
        let profile = await getUserProfile(user.uid);
        if (!profile) {
          profile = await upsertUserProfile(user.uid, {
            email: user.email ?? "",
            displayName: user.displayName ?? "Luna User",
            ...(user.photoURL ? { photoURL: user.photoURL } : {}),
          });
        }
        set({ user, profile, initialized: true, demoMode: false });
        if (user.emailVerified) {
          await get().syncAllUserData(user.uid);
        }
      } else {
        set({
          user: null,
          profile: null,
          initialized: true,
          demoMode: false,
        });
        await clearUserStores();
      }
    });
    return unsub;
  },

  signIn: async (email, password) => {
    set({ loading: true });
    try {
      const user = await signInEmail(email, password);
      if (!user.emailVerified) {
        const err = new Error("Email not verified") as Error & { code?: string };
        err.code = "auth/email-not-verified";
        throw err;
      }
    } finally {
      set({ loading: false });
    }
  },

  register: async (email, password, displayName) => {
    set({ loading: true });
    try {
      const user = await registerEmail(email, password, displayName);
      await upsertUserProfile(user.uid, {
        email,
        displayName,
        onboardingCompleted: false,
      });
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    if (get().demoMode) {
      set({ demoMode: false, profile: null, user: null });
      await clearUserStores();
      return;
    }
    await signOutUser();
    await clearUserStores();
  },

  enterDemoMode: () => {
    set({
      demoMode: true,
      user: null,
      profile: demoProfile,
      initialized: true,
      syncError: null,
    });
  },

  refreshProfile: async () => {
    const { user, demoMode } = get();
    if (demoMode || !user) return;
    const profile = await getUserProfile(user.uid);
    set({ profile });
  },

  resendVerification: async () => {
    const { user } = get();
    if (!user) return;
    await resendVerificationEmail(user);
  },

  checkEmailVerified: async () => {
    const { user } = get();
    if (!user) return false;
    await reloadAuthUser(user);
    const current = getFirebaseAuth().currentUser;
    if (!current) return false;
    set({ user: current });
    if (current.emailVerified) {
      let profile = await getUserProfile(current.uid);
      if (!profile) {
        profile = await upsertUserProfile(current.uid, {
          email: current.email ?? "",
          displayName: current.displayName ?? "Luna User",
          ...(current.photoURL ? { photoURL: current.photoURL } : {}),
        });
      }
      set({ profile });
      await get().syncAllUserData(current.uid);
      return true;
    }
    return false;
  },
}));
