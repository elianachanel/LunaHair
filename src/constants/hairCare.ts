import type { HairCareActionId } from "@/types/hairLog";
import type { Ionicons } from "@expo/vector-icons";

type IconName = keyof typeof Ionicons.glyphMap;

export const HAIR_CARE_ACTIONS: {
  id: HairCareActionId;
  label: string;
  icon: IconName;
}[] = [
  { id: "lavado", label: "Lavado", icon: "water-outline" },
  { id: "mascarilla_nutricion", label: "Mascarilla nutrición", icon: "leaf-outline" },
  { id: "mascarilla_hidratacion", label: "Mascarilla hidratación", icon: "water-outline" },
  { id: "acondicionador", label: "Acondicionador", icon: "flask-outline" },
  { id: "secado_aire", label: "Secado al aire", icon: "leaf-outline" },
  { id: "secado_toalla", label: "Secado con toalla", icon: "shirt-outline" },
  { id: "peinado_calor", label: "Peinado con calor", icon: "flame-outline" },
  { id: "plancha_rizador", label: "Plancha / rizador", icon: "flash-outline" },
  { id: "corte_puntas", label: "Corte de puntas", icon: "cut-outline" },
  { id: "aceite_puntas", label: "Aceite en puntas", icon: "color-fill-outline" },
  { id: "recogido_protector", label: "Recogido protector", icon: "ribbon-outline" },
  { id: "masaje_cuero", label: "Masaje cuero cabelludo", icon: "hand-left-outline" },
];
