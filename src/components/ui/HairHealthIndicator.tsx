import { useEffect } from "react";
import { Text, View } from "react-native";
import { GlassCard } from "./GlassCard";
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from "react-native-reanimated";

type Props = {
  hydration: number;
  growthEstimate: string;
  nextRitual: string;
  delay?: number;
};

export function HairHealthIndicator({
  hydration,
  growthEstimate,
  nextRitual,
  delay = 0,
}: Props) {
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(hydration, { duration: 900 });
  }, [hydration, width]);

  const barStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));

  return (
    <GlassCard delay={delay}>
      <Text className="text-xs uppercase tracking-widest text-luna-muted">
        Salud capilar
      </Text>
      <Text className="mt-2 text-4xl font-bold text-luna-text">{hydration}%</Text>
      <Text className="text-sm text-luna-muted">Nivel de hidratación</Text>
      <View className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
        <Animated.View
          style={barStyle}
          className="h-full rounded-full bg-violet-400"
        />
      </View>
      <View className="mt-5 flex-row justify-between gap-4">
        <View className="flex-1">
          <Text className="text-xs text-luna-muted">Crecimiento estimado</Text>
          <Text className="mt-1 text-sm font-semibold text-luna-text">
            {growthEstimate}
          </Text>
        </View>
        <View className="flex-1">
          <Text className="text-xs text-luna-muted">Próximo ritual</Text>
          <Text className="mt-1 text-sm font-semibold text-luna-purple">
            {nextRitual}
          </Text>
        </View>
      </View>
    </GlassCard>
  );
}
