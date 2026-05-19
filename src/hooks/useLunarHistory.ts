import { useMemo } from "react";
import { buildLunarHistory } from "@/services/lunar/buildLunarHistory";
import { useHairLogStore } from "@/store/hairLogStore";
import { useRoutineStore } from "@/store/routineStore";

export function useLunarHistory(limit?: number) {
  const logsByDate = useHairLogStore((s) => s.logsByDate);
  const routines = useRoutineStore((s) => s.routines);

  return useMemo(() => {
    const logs = Object.values(logsByDate);
    const all = buildLunarHistory(logs, routines);
    return limit ? all.slice(0, limit) : all;
  }, [logsByDate, routines, limit]);
}
