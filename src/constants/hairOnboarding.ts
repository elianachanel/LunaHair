import type {
  HairColor,
  HairCondition,
  HairPattern,
  HairPorosity,
  HairThickness,
} from "@/types/user";
import type { ImageSourcePropType } from "react-native";

export type OnboardingPatternOption = {
  value: HairPattern;
  label: string;
  description: string;
  image: ImageSourcePropType;
};

export type OnboardingColorOption = {
  value: HairColor;
  label: string;
  description: string;
  swatch: string;
};

export type OnboardingThicknessOption = {
  value: HairThickness;
  label: string;
  description: string;
  image: ImageSourcePropType;
};

export const PATTERN_OPTIONS: OnboardingPatternOption[] = [
  {
    value: "liso",
    label: "Liso",
    description: "Hebras rectas, sin ondas ni rizos. Brillo uniforme y suele engrasarse antes en raíz.",
    image: require("../../assets/onboarding/hair-liso.png"),
  },
  {
    value: "ondulado_2b",
    label: "Ondulado 2B",
    description: "Ondas suaves en forma de S. Equilibrio entre volumen y definición.",
    image: require("../../assets/onboarding/hair-ondulado.png"),
  },
  {
    value: "rizado",
    label: "Rizado",
    description: "Rizos definidos o espirales. Suele necesitar más hidratación y poco frizz.",
    image: require("../../assets/onboarding/hair-rizado.png"),
  },
  {
    value: "afro",
    label: "Afro",
    description: "Rizos apretados o afrotexturado. Máxima retención y cuidado nutritivo constante.",
    image: require("../../assets/onboarding/hair-afro.png"),
  },
];

export const COLOR_OPTIONS: OnboardingColorOption[] = [
  {
    value: "negro",
    label: "Negro",
    description: "Pigmento profundo, brillo intenso con luz.",
    swatch: "#1a1028",
  },
  {
    value: "castano_oscuro",
    label: "Castaño oscuro",
    description: "Marrón profundo con reflejos cálidos.",
    swatch: "#3d2817",
  },
  {
    value: "castano",
    label: "Castaño",
    description: "Marrón medio, tono natural versátil.",
    swatch: "#5c3d2e",
  },
  {
    value: "rubio",
    label: "Rubio",
    description: "Rubio claro a dorado. Suele requerir más hidratación.",
    swatch: "#c4a574",
  },
  {
    value: "pelirrojo",
    label: "Pelirrojo",
    description: "Rojo, cobrizo o caoba con subtonos cálidos.",
    swatch: "#8b3a2a",
  },
  {
    value: "canoso",
    label: "Canoso",
    description: "Gris plateado o blanco en la mayoría de la melena.",
    swatch: "#9ca3af",
  },
  {
    value: "con_canas",
    label: "Con canas",
    description: "Mezcla de color natural y hebras plateadas.",
    swatch: "#6b7280",
  },
];

export const THICKNESS_OPTIONS: OnboardingThicknessOption[] = [
  {
    value: "fino",
    label: "Fino",
    description: "Hebras delgadas, ligero al tacto. Se humedece rápido y puede apelmazarse con producto.",
    image: require("../../assets/onboarding/hair-fino.png"),
  },
  {
    value: "medio",
    label: "Medio",
    description: "Grosor intermedio, el más común. Buen equilibrio entre cuerpo y manejabilidad.",
    image: require("../../assets/onboarding/hair-medio.png"),
  },
  {
    value: "grueso",
    label: "Grueso",
    description: "Hebras gruesas y resistentes. Tarda más en secar y aguanta mejor el calor.",
    image: require("../../assets/onboarding/hair-grueso.png"),
  },
];

export const POROSITY_OPTIONS: {
  value: HairPorosity;
  label: string;
  description: string;
}[] = [
  {
    value: "baja",
    label: "Baja",
    description: "Repela agua; productos quedan en la superficie.",
  },
  {
    value: "media",
    label: "Media",
    description: "Absorbe bien sin saturarse.",
  },
  {
    value: "alta",
    label: "Alta",
    description: "Absorbe rápido y pierde humedad con facilidad.",
  },
];

export const CONDITION_OPTIONS: {
  value: HairCondition;
  label: string;
  description: string;
}[] = [
  {
    value: "saludable",
    label: "Saludable",
    description: "Brillo, elasticidad y poco daño visible.",
  },
  {
    value: "seco",
    label: "Seco",
    description: "Opaco, áspero o con puntas quebradizas.",
  },
  {
    value: "danado",
    label: "Dañado",
    description: "Por calor, químicos o desgaste.",
  },
  {
    value: "procesado",
    label: "Procesado",
    description: "Teñido, decolorado o alisado recientemente.",
  },
];

export const ONBOARDING_STEPS = [
  {
    key: "pattern",
    title: "¿Cuál es tu tipo de cabello?",
    subtitle: "Elige la forma natural de tu melena. Así personalizamos tus rituales lunares.",
  },
  {
    key: "color",
    title: "¿Cuál es tu color?",
    subtitle: "Selecciona el tono que más se parece al tuyo hoy.",
  },
  {
    key: "thickness",
    title: "¿Qué grosor tiene?",
    subtitle: "El grosor de cada hebra influye en productos y secado.",
  },
  {
    key: "care",
    title: "Último paso",
    subtitle: "Porosidad y estado actual para recomendaciones precisas.",
  },
] as const;
