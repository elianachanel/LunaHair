export type HairPattern = "liso" | "ondulado_2b" | "rizado" | "afro";
export type HairColor =
  | "negro"
  | "castano_oscuro"
  | "castano"
  | "rubio"
  | "pelirrojo"
  | "canoso"
  | "con_canas";
export type HairPorosity = "baja" | "media" | "alta";
export type HairThickness = "fino" | "medio" | "grueso";
export type HairCondition = "saludable" | "seco" | "danado" | "procesado";

export type HairProfile = {
  pattern: HairPattern;
  color: HairColor;
  porosity: HairPorosity;
  thickness: HairThickness;
  condition: HairCondition;
};

export type UserProfile = {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  hair: HairProfile;
  hydrationLevel: number;
  onboardingCompleted?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type LunarHistoryEntry = {
  id: string;
  title: string;
  phaseLabel: string;
  date: string;
  completed: boolean;
};

export type Routine = {
  id: string;
  userId: string;
  title: string;
  description?: string;
  scheduledAt: string;
  activity: import("./lunar").HairActivity;
  completed: boolean;
  reminderEnabled: boolean;
  createdAt: string;
};
