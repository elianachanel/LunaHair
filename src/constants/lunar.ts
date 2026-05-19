import type { HairActivity, LunarPhaseId } from "@/types/lunar";

export const MOON_PHASE_EMOJI: Record<LunarPhaseId, string> = {
  new_moon: "🌑",
  waxing_crescent: "🌒",
  first_quarter: "🌓",
  waxing_gibbous: "🌔",
  full_moon: "🌕",
  waning_gibbous: "🌖",
  last_quarter: "🌗",
  waning_crescent: "🌘",
};

export const LUNAR_PHASE_LABELS: Record<LunarPhaseId, string> = {
  new_moon: "Luna Nueva",
  waxing_crescent: "Luna Creciente",
  first_quarter: "Cuarto Creciente",
  waxing_gibbous: "Gibosa Creciente",
  full_moon: "Luna Llena",
  waning_gibbous: "Gibosa Menguante",
  last_quarter: "Cuarto Menguante",
  waning_crescent: "Luna Menguante",
};

export const LUNAR_PHASE_MESSAGES: Record<LunarPhaseId, string> = {
  new_moon:
    "Renovación profunda. Ideal para descansar el cabello y planificar tu próximo ritual.",
  waxing_crescent:
    "La energía lunar está en ascenso. Momento óptimo para renovar la fuerza de tu cabello.",
  first_quarter:
    "Fuerza activa en el cuero cabelludo. Excelente para cortes que buscan volumen.",
  waxing_gibbous:
    "Nutrición en aumento. Refuerza con mascarillas y aceites nutritivos.",
  full_moon:
    "Máxima hidratación y brillo. Tratamientos intensivos tienen mayor absorción.",
  waning_gibbous:
    "Sella la hidratación. Enfócate en mantener y proteger el cabello.",
  last_quarter:
    "Liberación y limpieza. Buen momento para detox capilar suave.",
  waning_crescent:
    "Cierre del ciclo. Reparación ligera y preparación para la luna nueva.",
};

export const ACTIVITY_LABELS: Record<HairActivity, string> = {
  corte: "Corte",
  hidratacion: "Hidratación",
  nutricion: "Nutrición",
  crecimiento: "Crecimiento",
};

/** Optimal activities per lunar phase (astronomy-informed hair care folklore + growth logic) */
export const PHASE_OPTIMAL_ACTIVITIES: Record<
  LunarPhaseId,
  Partial<Record<HairActivity, boolean>>
> = {
  new_moon: { nutricion: true },
  waxing_crescent: { crecimiento: true, nutricion: true },
  first_quarter: { corte: true, crecimiento: true },
  waxing_gibbous: { nutricion: true, crecimiento: true },
  full_moon: { hidratacion: true, nutricion: true },
  waning_gibbous: { hidratacion: true },
  last_quarter: { hidratacion: true },
  waning_crescent: { nutricion: true },
};

export const ACTIVITY_RECOMMENDATIONS: Record<
  HairActivity,
  Record<LunarPhaseId, string>
> = {
  corte: {
    new_moon: "Evita corte hoy; prioriza descanso capilar.",
    waxing_crescent: "Corte ligero de puntas si es necesario.",
    first_quarter: "Ideal para corte y fortalecimiento.",
    waxing_gibbous: "Mantén forma; evita cortes drásticos.",
    full_moon: "No recomendado; prioriza hidratación.",
    waning_gibbous: "Solo retoques mínimos.",
    last_quarter: "Buen día para limpiar puntas.",
    waning_crescent: "Posterga corte hasta luna creciente.",
  },
  hidratacion: {
    new_moon: "Hidratación suave con agua de rosas.",
    waxing_crescent: "Mascarilla ligera de aloe.",
    first_quarter: "Hidratación media; sella con aceite.",
    waxing_gibbous: "Tratamiento nutritivo-hidratante.",
    full_moon: "Hidratación intensa — máximo brillo.",
    waning_gibbous: "Sella humedad con leave-in.",
    last_quarter: "Mascarilla detox hidratante.",
    waning_crescent: "Spray hidratante sin enjuague.",
  },
  nutricion: {
    new_moon: "Aceite de argán en medios y puntas.",
    waxing_crescent: "Mascarilla de aguacate.",
    first_quarter: "Proteínas suaves si hay porosidad alta.",
    waxing_gibbous: "Mascarilla nutritiva profunda.",
    full_moon: "Tratamiento completo con aceites.",
    waning_gibbous: "Nutrición ligera.",
    last_quarter: "Enjuague nutritivo diluido.",
    waning_crescent: "Serum reparador nocturno.",
  },
  crecimiento: {
    new_moon: "Masaje capilar suave 3 min.",
    waxing_crescent: "Estimula cuero cabelludo con masaje.",
    first_quarter: "Masaje + vitamina E en raíces.",
    waxing_gibbous: "Continúa rutina de crecimiento.",
    full_moon: "Enfoque en brillo más que longitud.",
    waning_gibbous: "Masaje relajante.",
    last_quarter: "Evita estimulación fuerte.",
    waning_crescent: "Descansa el cuero cabelludo.",
  },
};
