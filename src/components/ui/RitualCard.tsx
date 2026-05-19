import { Text, View, Pressable } from "react-native";
import { GlassCard } from "./GlassCard";
import { Ionicons } from "@expo/vector-icons";
import type { Routine } from "@/types/user";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type Props = {
  routine: Routine;
  onToggle?: () => void;
  delay?: number;
};

export function RitualCard({ routine, onToggle, delay = 0 }: Props) {
  const when = format(new Date(routine.scheduledAt), "EEEE, hh:mm a", {
    locale: es,
  });

  return (
    <GlassCard delay={delay} className="flex-row items-center gap-4">
      <View className="h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/20">
        <Ionicons name="leaf-outline" size={22} color="#C4B5FD" />
      </View>
      <View className="flex-1">
        <Text
          className={`text-base font-semibold ${routine.completed ? "text-luna-muted line-through" : "text-luna-text"}`}
        >
          {routine.title}
        </Text>
        <Text className="mt-0.5 text-xs capitalize text-luna-muted">{when}</Text>
      </View>
      <Pressable
        onPress={onToggle}
        className={`h-8 w-8 items-center justify-center rounded-full border ${
          routine.completed
            ? "border-violet-400 bg-violet-500/30"
            : "border-white/20"
        }`}
      >
        {routine.completed ? (
          <Ionicons name="checkmark" size={16} color="#C4B5FD" />
        ) : null}
      </Pressable>
    </GlassCard>
  );
}
