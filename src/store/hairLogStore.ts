import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import type { HairCareActionId, HairCareLog } from "@/types/hairLog";
import {
  getAllHairCareLogs,
  getHairCareLog,
  upsertHairCareLog,
} from "@/services/firebase/firestore";
import { isFirebaseConfigured } from "@/services/firebase/config";
import { mapFirebaseError } from "@/services/firebase/errors";
import { useAuthStore } from "./authStore";

const STORAGE_KEY = "lunahair_hair_logs";

type HairLogState = {
  logsByDate: Record<string, HairCareLog>;
  loading: boolean;
  saving: boolean;
  saveError: string | null;
  lastSavedAt: string | null;
  fetchLog: (date: string) => Promise<void>;
  fetchAllLogs: () => Promise<void>;
  fetchMonth: (year: number, month: number) => Promise<void>;
  toggleAction: (date: string, action: HairCareActionId) => Promise<void>;
  getLogForDate: (date: string) => HairCareLog | null;
};

function emptyLog(userId: string, date: string): HairCareLog {
  return {
    id: `${userId}_${date}`,
    userId,
    date,
    actions: {},
    updatedAt: new Date().toISOString(),
  };
}

async function loadFromStorage(userId: string): Promise<Record<string, HairCareLog>> {
  const raw = await AsyncStorage.getItem(`${STORAGE_KEY}_${userId}`);
  if (!raw) return {};
  return JSON.parse(raw) as Record<string, HairCareLog>;
}

async function saveToStorage(userId: string, logs: Record<string, HairCareLog>) {
  await AsyncStorage.setItem(`${STORAGE_KEY}_${userId}`, JSON.stringify(logs));
}

function resolveUserId(): string | null {
  const { user, demoMode } = useAuthStore.getState();
  if (demoMode) return "demo";
  return user?.uid ?? null;
}

export const useHairLogStore = create<HairLogState>((set, get) => ({
  logsByDate: {},
  loading: false,
  saving: false,
  saveError: null,
  lastSavedAt: null,

  getLogForDate: (date) => get().logsByDate[date] ?? null,

  fetchLog: async (date) => {
    const userId = resolveUserId();
    if (!userId) return;

    const cached = get().logsByDate[date];
    if (cached) return;

    if (useAuthStore.getState().demoMode) {
      const all = await loadFromStorage(userId);
      if (all[date]) {
        set({ logsByDate: { ...get().logsByDate, [date]: all[date] } });
      }
      return;
    }

    if (!isFirebaseConfigured) return;

    try {
      const log = await getHairCareLog(userId, date);
      if (log) {
        set({ logsByDate: { ...get().logsByDate, [date]: log } });
      }
    } catch {
      // documento inexistente o permisos
    }
  },

  fetchAllLogs: async () => {
    const userId = resolveUserId();
    if (!userId) return;

    set({ loading: true, saveError: null });
    try {
      if (useAuthStore.getState().demoMode) {
        const all = await loadFromStorage(userId);
        set({ logsByDate: all });
        return;
      }

      if (!isFirebaseConfigured) return;

      const logs = await getAllHairCareLogs(userId);
      const map = Object.fromEntries(logs.map((l) => [l.date, l]));
      set({ logsByDate: map });
    } catch (e) {
      set({ saveError: mapFirebaseError(e) });
    } finally {
      set({ loading: false });
    }
  },

  fetchMonth: async (year, month) => {
    await get().fetchAllLogs();
    const prefix = `${year}-${String(month).padStart(2, "0")}`;
    const monthLogs = Object.fromEntries(
      Object.entries(get().logsByDate).filter(([d]) => d.startsWith(prefix)),
    );
    set({ logsByDate: { ...get().logsByDate, ...monthLogs } });
  },

  toggleAction: async (date, action) => {
    const userId = resolveUserId();
    if (!userId) {
      set({ saveError: "Inicia sesión para guardar tu registro capilar." });
      return;
    }

    const previous = get().logsByDate;
    const current = previous[date] ?? emptyLog(userId, date);
    const nextValue = !current.actions[action];
    const merged = { ...current.actions, [action]: nextValue };
    const cleanedActions = Object.fromEntries(
      Object.entries(merged).filter(([, v]) => v === true),
    ) as HairCareLog["actions"];
    const updated: HairCareLog = {
      ...current,
      actions: cleanedActions,
      updatedAt: new Date().toISOString(),
    };

    set({
      logsByDate: { ...previous, [date]: updated },
      saving: true,
      saveError: null,
    });

    try {
      if (useAuthStore.getState().demoMode) {
        const all = await loadFromStorage(userId);
        all[date] = updated;
        await saveToStorage(userId, all);
      } else {
        if (!isFirebaseConfigured) {
          throw new Error("Firebase no configurado");
        }
        await upsertHairCareLog(updated);
      }
      set({
        saving: false,
        lastSavedAt: new Date().toISOString(),
        saveError: null,
      });
    } catch (e) {
      set({
        logsByDate: previous,
        saving: false,
        saveError: mapFirebaseError(e),
      });
    }
  },
}));
