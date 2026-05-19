import { doc, getDoc, setDoc } from "firebase/firestore";
import { requireFirestore } from "./helpers";
import type { HairProfile, UserProfile } from "@/types/user";

const COLLECTION = "users";

const defaultHair: HairProfile = {
  pattern: "ondulado_2b",
  color: "castano",
  porosity: "media",
  thickness: "medio",
  condition: "saludable",
};

/** Firestore no acepta campos con valor `undefined`. */
function toFirestoreUser(data: UserProfile): Record<string, unknown> {
  const out: Record<string, unknown> = {
    uid: data.uid,
    email: data.email,
    displayName: data.displayName,
    hair: data.hair,
    hydrationLevel: data.hydrationLevel,
    onboardingCompleted: data.onboardingCompleted ?? false,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
  if (data.photoURL != null && data.photoURL !== "") {
    out.photoURL = data.photoURL;
  }
  return out;
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const db = requireFirestore();
  const snap = await getDoc(doc(db, COLLECTION, uid));
  if (!snap.exists()) return null;
  return snap.data() as UserProfile;
}

export async function upsertUserProfile(
  uid: string,
  data: Partial<UserProfile> & { email: string },
): Promise<UserProfile> {
  const db = requireFirestore();
  const ref = doc(db, COLLECTION, uid);
  const existing = await getDoc(ref);
  const now = new Date().toISOString();
  const existingData = existing.exists()
    ? (existing.data() as UserProfile)
    : null;
  const payload: UserProfile = {
    uid,
    email: data.email,
    displayName: data.displayName ?? "Luna User",
    hair: data.hair ?? defaultHair,
    hydrationLevel: data.hydrationLevel ?? 84,
    onboardingCompleted:
      data.onboardingCompleted ?? existingData?.onboardingCompleted ?? false,
    createdAt: existingData?.createdAt ?? now,
    updatedAt: now,
  };
  if (data.photoURL != null && data.photoURL !== "") {
    payload.photoURL = data.photoURL;
  }
  await setDoc(ref, toFirestoreUser(payload), { merge: true });
  return payload;
}

export async function updateUserHairProfile(
  uid: string,
  hair: HairProfile,
): Promise<UserProfile> {
  const existing = await getUserProfile(uid);
  if (!existing) {
    throw new Error("Perfil no encontrado");
  }
  return upsertUserProfile(uid, {
    email: existing.email,
    displayName: existing.displayName,
    hair,
    hydrationLevel: existing.hydrationLevel,
    photoURL: existing.photoURL,
    onboardingCompleted: true,
  });
}

export async function completeOnboarding(
  uid: string,
  hair: HairProfile,
): Promise<UserProfile> {
  const existing = await getUserProfile(uid);
  if (!existing) {
    throw new Error("Perfil no encontrado");
  }
  return upsertUserProfile(uid, {
    email: existing.email,
    displayName: existing.displayName,
    hair,
    hydrationLevel: existing.hydrationLevel,
    photoURL: existing.photoURL,
    onboardingCompleted: true,
  });
}
