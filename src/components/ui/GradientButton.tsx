import { LinearGradient } from "expo-linear-gradient";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  ActivityIndicator,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = PressableProps & {
  label: string;
  loading?: boolean;
  variant?: "primary" | "ghost";
};

const styles = StyleSheet.create({
  pressable: {
    width: "100%",
    borderRadius: 9999,
    overflow: "hidden",
  },
  gradient: {
    width: "100%",
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  labelWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A0B2E",
    textAlign: "center",
  },
  ghost: {
    width: "100%",
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: "rgba(196,181,253,0.18)",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  ghostLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F5F3FF",
    textAlign: "center",
  },
});

export function GradientButton({
  label,
  loading,
  variant = "primary",
  style,
  ...props
}: Props) {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const pressHandlers = {
    onPressIn: () => {
      scale.value = withSpring(0.97);
    },
    onPressOut: () => {
      scale.value = withSpring(1);
    },
  };

  if (variant === "ghost") {
    return (
      <AnimatedPressable
        style={[styles.pressable, styles.ghost, animStyle, style]}
        {...pressHandlers}
        {...props}
      >
        <Text style={styles.ghostLabel}>{label}</Text>
      </AnimatedPressable>
    );
  }

  return (
    <AnimatedPressable
      style={[styles.pressable, animStyle, style]}
      disabled={loading || props.disabled}
      {...pressHandlers}
      {...props}
    >
      <LinearGradient
        pointerEvents="none"
        colors={["#DDD6FE", "#C4B5FD", "#A78BFA"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {loading ? (
          <ActivityIndicator color="#1E1033" />
        ) : (
          <View style={styles.labelWrap}>
            <Text style={styles.label}>{label}</Text>
          </View>
        )}
      </LinearGradient>
    </AnimatedPressable>
  );
}
