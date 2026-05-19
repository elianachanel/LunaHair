import { BlurView } from "expo-blur";
import { View, type ViewProps } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

type Props = ViewProps & {
  delay?: number;
  intensity?: number;
};

export function GlassCard({
  children,
  className = "",
  delay = 0,
  intensity = 28,
  ...props
}: Props) {
  return (
    <Animated.View
      entering={FadeInDown.delay(delay).duration(500).springify()}
      className={`overflow-hidden rounded-3xl border border-luna-border ${className}`}
      {...props}
    >
      <BlurView intensity={intensity} tint="dark" className="bg-luna-card/80 p-5">
        {children}
      </BlurView>
    </Animated.View>
  );
}
