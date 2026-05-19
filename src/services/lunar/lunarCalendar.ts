import SunCalc from "suncalc";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { es } from "date-fns/locale";
import {
  ACTIVITY_RECOMMENDATIONS,
  LUNAR_PHASE_LABELS,
  LUNAR_PHASE_MESSAGES,
  PHASE_OPTIMAL_ACTIVITIES,
} from "@/constants/lunar";
import type {
  HairActivity,
  LunarDayInfo,
  LunarMonthCalendar,
  LunarPhaseId,
} from "@/types/lunar";
import {
  getDailyRecommendation,
  type DailyRecommendation,
} from "./dailyRecommendations";

const ACTIVITIES: HairActivity[] = [
  "corte",
  "hidratacion",
  "nutricion",
  "crecimiento",
];

/**
 * Maps SunCalc illumination phase (0=new → 0.5=full → 1=new) to 8 lunar phases.
 * Uses standard elongation-based boundaries aligned with astronomical almanacs.
 */
export function phaseFromIllumination(phase: number): LunarPhaseId {
  const p = ((phase % 1) + 1) % 1;
  if (p < 0.03 || p > 0.97) return "new_moon";
  if (p < 0.22) return "waxing_crescent";
  if (p < 0.28) return "first_quarter";
  if (p < 0.47) return "waxing_gibbous";
  if (p < 0.53) return "full_moon";
  if (p < 0.72) return "waning_gibbous";
  if (p < 0.78) return "last_quarter";
  return "waning_crescent";
}

export function getLunarDataForDate(
  date: Date,
  latitude = 18.4861,
  longitude = -69.9312,
): LunarDayInfo {
  const illum = SunCalc.getMoonIllumination(date);
  const phase = phaseFromIllumination(illum.phase);
  const isOptimal = PHASE_OPTIMAL_ACTIVITIES[phase];
  const activities = ACTIVITIES.filter((a) => isOptimal[a]);
  const primary = activities[0] ?? "nutricion";

  return {
    date: format(date, "yyyy-MM-dd"),
    phase,
    phaseLabel: LUNAR_PHASE_LABELS[phase],
    illumination: Math.round(illum.fraction * 100) / 100,
    age: Math.round(illum.age * 10) / 10,
    activities,
    isOptimal,
    recommendation: ACTIVITY_RECOMMENDATIONS[primary][phase],
  };
}

export function getTodayLunar(latitude?: number, longitude?: number) {
  return getLunarDataForDate(new Date(), latitude, longitude);
}

export function getMotivationalMessage(phase: LunarPhaseId): string {
  return LUNAR_PHASE_MESSAGES[phase];
}

export function getMonthCalendar(
  year: number,
  month: number,
  latitude?: number,
  longitude?: number,
): LunarMonthCalendar {
  const start = startOfMonth(new Date(year, month - 1, 1));
  const end = endOfMonth(start);
  const days = eachDayOfInterval({ start, end }).map((d) =>
    getLunarDataForDate(d, latitude, longitude),
  );

  const phaseTransitions: LunarMonthCalendar["phaseTransitions"] = [];
  for (let i = 1; i < days.length; i++) {
    if (days[i].phase !== days[i - 1].phase) {
      phaseTransitions.push({ date: days[i].date, phase: days[i].phase });
    }
  }

  return { year, month, days, phaseTransitions };
}

export function formatDayLabel(dateStr: string): string {
  const d = new Date(`${dateStr}T12:00:00`);
  return format(d, "EEE d", { locale: es }).toUpperCase();
}

export function getPrimaryRecommendation(day: LunarDayInfo): string {
  const primary = day.activities[0] ?? "nutricion";
  return ACTIVITY_RECOMMENDATIONS[primary][day.phase];
}

export type EnrichedLunarDay = LunarDayInfo & {
  message: string;
  dailyTip: string;
  dailyRecommendation: DailyRecommendation;
};

export function enrichLunarDay(day: LunarDayInfo): EnrichedLunarDay {
  const dailyRecommendation = getDailyRecommendation(day);
  return {
    ...day,
    message: getMotivationalMessage(day.phase),
    dailyTip: dailyRecommendation.description,
    dailyRecommendation,
  };
}

export { getDailyRecommendation };
export type { DailyRecommendation };
