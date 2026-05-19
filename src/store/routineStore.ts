import { create } from "zustand";
import type { Routine } from "@/types/user";
import type { HairActivity } from "@/types/lunar";
import {
  createRoutine,
  deleteRoutine,
  getUserRoutines,
  toggleRoutineComplete,
} from "@/services/firebase/firestore";
import { isFirebaseConfigured } from "@/services/firebase/config";
import { useAuthStore } from "./authStore";

type RoutineState = {
  routines: Routine[];
  loading: boolean;
  error: string | null;
  fetchRoutines: () => Promise<void>;
  addRoutine: (data: {
    title: string;
    scheduledAt: string;
    activity: HairActivity;
    description?: string;
  }) => Promise<void>;
  toggleComplete: (id: string, completed: boolean) => Promise<void>;
  removeRoutine: (id: string) => Promise<void>;
  loadDemoRoutines: () => void;
};

const demoRoutines: Routine[] = [
  {
    id: "1",
    userId: "demo",
    title: "Mascarilla Nutritiva",
    scheduledAt: new Date(Date.now() + 86400000).toISOString(),
    activity: "nutricion",
    completed: false,
    reminderEnabled: true,
    createdAt: new Date().toISOString(),
  },
];

export const useRoutineStore = create<RoutineState>((set, get) => ({
  routines: [],
  loading: false,
  error: null,

  fetchRoutines: async () => {
    const { user, demoMode } = useAuthStore.getState();
    if (demoMode) {
      set({ routines: demoRoutines, error: null });
      return;
    }
    if (!user) {
      set({ routines: [], error: null });
      return;
    }
    if (!isFirebaseConfigured) {
      set({ error: "Firebase no configurado", routines: [] });
      return;
    }
    set({ loading: true, error: null });
    try {
      const routines = await getUserRoutines(user.uid);
      set({ routines });
    } catch {
      set({ routines: [], error: "No se pudieron cargar los rituales" });
    } finally {
      set({ loading: false });
    }
  },

  addRoutine: async (data) => {
    const { user, demoMode } = useAuthStore.getState();
    if (demoMode) {
      const r: Routine = {
        id: String(Date.now()),
        userId: "demo",
        title: data.title,
        scheduledAt: data.scheduledAt,
        activity: data.activity,
        description: data.description,
        completed: false,
        reminderEnabled: true,
        createdAt: new Date().toISOString(),
      };
      set({ routines: [...get().routines, r], error: null });
      return;
    }
    if (!user) {
      set({ error: "Inicia sesión para guardar rituales en la nube" });
      return;
    }
    set({ error: null });
    const created = await createRoutine(user.uid, {
      ...data,
      completed: false,
      reminderEnabled: true,
    });
    set({ routines: [...get().routines, created] });
  },

  toggleComplete: async (id, completed) => {
    const { demoMode } = useAuthStore.getState();
    if (!demoMode) await toggleRoutineComplete(id, completed);
    set({
      routines: get().routines.map((r) =>
        r.id === id ? { ...r, completed } : r,
      ),
    });
  },

  removeRoutine: async (id) => {
    const { demoMode } = useAuthStore.getState();
    if (!demoMode) await deleteRoutine(id);
    set({ routines: get().routines.filter((r) => r.id !== id) });
  },

  loadDemoRoutines: () => set({ routines: demoRoutines, error: null }),
}));
