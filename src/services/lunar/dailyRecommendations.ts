import type { HairActivity, LunarDayInfo, LunarPhaseId } from "@/types/lunar";

export type DailyRecommendationKind =
  | "lavado_nutricion"
  | "lavado_hidratacion"
  | "corte_puntas"
  | "masaje_capilar"
  | "descanso_capilar";

export type DailyRecommendation = {
  kind: DailyRecommendationKind;
  title: string;
  description: string;
  activity: HairActivity;
  isOptimalDay: boolean;
  lunarNote: string;
};

const META: Record<
  DailyRecommendationKind,
  { title: string; activity: HairActivity }
> = {
  lavado_nutricion: { title: "Lavado de nutrición", activity: "nutricion" },
  lavado_hidratacion: { title: "Lavado de hidratación", activity: "hidratacion" },
  corte_puntas: { title: "Corte de puntas", activity: "corte" },
  masaje_capilar: { title: "Masaje capilar estimulante", activity: "crecimiento" },
  descanso_capilar: { title: "Día de descanso capilar", activity: "nutricion" },
};

const OPTIMAL_DESCRIPTIONS: Record<
  DailyRecommendationKind,
  Partial<Record<LunarPhaseId, string>>
> = {
  lavado_nutricion: {
    new_moon:
      "Luna nueva favorece nutrir sin agresión. Usa shampoo suave y mascarilla de nutrición; evita calor.",
    waxing_crescent:
      "Luna creciente + nutrición: lavado con mascarilla de aguacate o proteínas suaves.",
    waxing_gibbous:
      "Gibosa creciente: lavado nutritivo profundo y sellado en puntas con aceite.",
    full_moon:
      "Acompaña la luna llena con nutrición si tu foco hoy es reparar, no solo hidratar.",
    waning_crescent:
      "Luna menguante: lavado nutritivo ligero y serum reparador en puntas.",
  },
  lavado_hidratacion: {
    full_moon:
      "Luna llena: día ideal para lavado de hidratación intensa y máximo brillo.",
    waning_gibbous:
      "Gibosa menguante: lavado hidratante y sella con leave-in sin enjuague.",
    last_quarter:
      "Cuarto menguante: lavado detox hidratante para liberar residuos con suavidad.",
  },
  corte_puntas: {
    first_quarter:
      "Cuarto creciente: momento óptimo para corte de puntas y dar forma con volumen.",
    last_quarter:
      "Cuarto menguante: buen día para limpiar puntas dañadas sin perder longitud.",
  },
  masaje_capilar: {
    waxing_crescent:
      "Estimula el cuero cabelludo con masaje de 5 min; ideal en luna creciente.",
    first_quarter:
      "Refuerza raíces con masaje y vitamina E; complementa el corte si lo haces.",
    waxing_gibbous: "Mantén rutina de crecimiento con masaje antes del lavado.",
  },
  descanso_capilar: {
    new_moon: "Prioriza descanso: peinado suave, sin lavado fuerte ni calor.",
    waning_crescent: "Cierra el ciclo lunar con mínima manipulación del cabello.",
  },
};

const REST_DESCRIPTION =
  "Hoy no es el día lunar ideal para este ritual. Descansa el cabello, evita calor y registra lo que sí hiciste abajo.";

/** Prioridad cuando hay varias actividades óptimas en la fase */
const KIND_BY_ACTIVITY: Record<
  HairActivity,
  DailyRecommendationKind
> = {
  corte: "corte_puntas",
  hidratacion: "lavado_hidratacion",
  nutricion: "lavado_nutricion",
  crecimiento: "masaje_capilar",
};

const ACTIVITY_PRIORITY: HairActivity[] = [
  "corte",
  "hidratacion",
  "nutricion",
  "crecimiento",
];

function pickOptimalKind(day: LunarDayInfo): DailyRecommendationKind | null {
  for (const activity of ACTIVITY_PRIORITY) {
    if (day.isOptimal[activity]) {
      return KIND_BY_ACTIVITY[activity];
    }
  }
  return null;
}

export function getDailyRecommendation(day: LunarDayInfo): DailyRecommendation {
  const optimalKind = pickOptimalKind(day);

  if (optimalKind) {
    const { title, activity } = META[optimalKind];
    const phaseText =
      OPTIMAL_DESCRIPTIONS[optimalKind][day.phase] ??
      `La ${day.phaseLabel} favorece este cuidado. Aprovecha el día lunar.`;
    return {
      kind: optimalKind,
      title,
      description: phaseText,
      activity,
      isOptimalDay: true,
      lunarNote: `Día favorable · ${day.phaseLabel}`,
    };
  }

  const { title, activity } = META.descanso_capilar;
  return {
    kind: "descanso_capilar",
    title,
    description: REST_DESCRIPTION,
    activity,
    isOptimalDay: false,
    lunarNote: `No es día óptimo · ${day.phaseLabel}`,
  };
}

export function getRecommendationTitle(kind: DailyRecommendationKind): string {
  return META[kind].title;
}
