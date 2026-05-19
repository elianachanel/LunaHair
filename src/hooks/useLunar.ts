import { useMemo } from "react";
import {
  getTodayLunar,
  getMonthCalendar,
  enrichLunarDay,
} from "@/services/lunar/lunarCalendar";

export function useLunarToday() {
  return useMemo(() => enrichLunarDay(getTodayLunar()), []);
}

export function useLunarMonth(year?: number, month?: number) {
  return useMemo(() => {
    const now = new Date();
    const y = year ?? now.getFullYear();
    const m = month ?? now.getMonth() + 1;
    return getMonthCalendar(y, m);
  }, [year, month]);
}
