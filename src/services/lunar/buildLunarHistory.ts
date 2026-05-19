import { format } from "date-fns";
import { es } from "date-fns/locale";
import { HAIR_CARE_ACTIONS } from "@/constants/hairCare";
import { getLunarDataForDate } from "@/services/lunar/lunarCalendar";
import type { HairCareLog } from "@/types/hairLog";
import type { Routine } from "@/types/user";
import { ACTIVITY_LABELS } from "@/constants/lunar";

export type LunarHistoryItem = {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  phaseLabel: string;
  source: "hair_log" | "routine";
};

const ACTION_LABEL_MAP = Object.fromEntries(
  HAIR_CARE_ACTIONS.map((a) => [a.id, a.label]),
) as Record<string, string>;

function formatHistoryDate(dateStr: string): string {
  const d = new Date(`${dateStr}T12:00:00`);
  return format(d, "d MMM", { locale: es });
}

function titlesFromActions(actions: HairCareLog["actions"]): string {
  const labels = Object.entries(actions)
    .filter(([, v]) => v)
    .map(([id]) => ACTION_LABEL_MAP[id] ?? id);
  if (labels.length === 0) return "";
  if (labels.length <= 2) return labels.join(" · ");
  return `${labels.slice(0, 2).join(" · ")} +${labels.length - 2}`;
}

export function buildLunarHistory(
  hairLogs: HairCareLog[],
  routines: Routine[],
): LunarHistoryItem[] {
  const items: LunarHistoryItem[] = [];

  for (const log of hairLogs) {
    const title = titlesFromActions(log.actions);
    if (!title) continue;
    const lunar = getLunarDataForDate(new Date(`${log.date}T12:00:00`));
    items.push({
      id: `log-${log.date}`,
      date: log.date,
      title,
      phaseLabel: lunar.phaseLabel,
      subtitle: `${formatHistoryDate(log.date)} · ${lunar.phaseLabel}`,
      source: "hair_log",
    });
  }

  for (const routine of routines) {
    if (!routine.completed) continue;
    const dateStr = routine.scheduledAt.slice(0, 10);
    const lunar = getLunarDataForDate(new Date(`${dateStr}T12:00:00`));
    const activityLabel = ACTIVITY_LABELS[routine.activity];
    items.push({
      id: `routine-${routine.id}`,
      date: dateStr,
      title: routine.title || `Ritual de ${activityLabel.toLowerCase()}`,
      phaseLabel: lunar.phaseLabel,
      subtitle: `${formatHistoryDate(dateStr)} · ${lunar.phaseLabel}`,
      source: "routine",
    });
  }

  return items.sort((a, b) => b.date.localeCompare(a.date));
}
