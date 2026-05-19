/** Acciones que el usuario puede registrar por día */
export type HairCareActionId =
  | "lavado"
  | "mascarilla_nutricion"
  | "mascarilla_hidratacion"
  | "acondicionador"
  | "secado_aire"
  | "secado_toalla"
  | "peinado_calor"
  | "plancha_rizador"
  | "corte_puntas"
  | "aceite_puntas"
  | "recogido_protector"
  | "masaje_cuero";

export type HairCareLog = {
  id: string;
  userId: string;
  date: string;
  actions: Partial<Record<HairCareActionId, boolean>>;
  updatedAt: string;
};
