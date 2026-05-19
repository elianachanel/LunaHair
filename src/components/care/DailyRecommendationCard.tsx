import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientButton } from "@/components/ui/GradientButton";
import type { DailyRecommendation } from "@/services/lunar/dailyRecommendations";

type Props = {
  recommendation: DailyRecommendation;
  onSchedule: () => void;
};

const KIND_ICONS: Record<
  DailyRecommendation["kind"],
  keyof typeof Ionicons.glyphMap
> = {
  lavado_nutricion: "leaf-outline",
  lavado_hidratacion: "water-outline",
  corte_puntas: "cut-outline",
  masaje_capilar: "hand-left-outline",
  descanso_capilar: "moon-outline",
};

export function DailyRecommendationCard({ recommendation, onSchedule }: Props) {
  const { title, description, isOptimalDay, lunarNote } = recommendation;
  const icon = KIND_ICONS[recommendation.kind];

  return (
    <GlassCard delay={0} className="mt-2">
      <View className="mb-2 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Ionicons name="sparkles" size={16} color="#C4B5FD" />
          <Text className="text-[10px] font-bold tracking-widest text-luna-purple">
            RECOMENDACIÓN DEL DÍA
          </Text>
        </View>
        <View
          className={`rounded-full px-2 py-0.5 ${
            isOptimalDay ? "bg-emerald-500/20" : "bg-amber-500/15"
          }`}
        >
          <Text
            className={`text-[9px] font-bold ${
              isOptimalDay ? "text-emerald-300" : "text-amber-300"
            }`}
          >
            {isOptimalDay ? "LUNA FAVORABLE" : "DÍA DE DESCANSO"}
          </Text>
        </View>
      </View>

      <View className="mb-2 flex-row items-center gap-3">
        <View className="h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/20">
          <Ionicons name={icon} size={22} color="#C4B5FD" />
        </View>
        <View className="flex-1">
          <Text className="text-xl font-bold text-luna-text">{title}</Text>
          <Text className="mt-0.5 text-xs text-luna-purple">{lunarNote}</Text>
        </View>
      </View>

      <Text className="text-sm leading-relaxed text-luna-muted">{description}</Text>

      {isOptimalDay ? (
        <View className="mt-5">
          <GradientButton label="Agendar ritual" onPress={onSchedule} />
        </View>
      ) : (
        <Text className="mt-4 text-xs italic text-luna-muted">
          Registra abajo lo que hiciste; evita tratamientos intensos hoy.
        </Text>
      )}
    </GlassCard>
  );
}
