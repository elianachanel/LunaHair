export type LunarPhaseId =
  | "new_moon"
  | "waxing_crescent"
  | "first_quarter"
  | "waxing_gibbous"
  | "full_moon"
  | "waning_gibbous"
  | "last_quarter"
  | "waning_crescent";

export type HairActivity = "corte" | "hidratacion" | "nutricion" | "crecimiento";

export type LunarDayInfo = {
  date: string;
  phase: LunarPhaseId;
  phaseLabel: string;
  illumination: number;
  age: number;
  activities: HairActivity[];
  isOptimal: Partial<Record<HairActivity, boolean>>;
  recommendation: string;
};

export type LunarMonthCalendar = {
  year: number;
  month: number;
  days: LunarDayInfo[];
  phaseTransitions: { date: string; phase: LunarPhaseId }[];
};
