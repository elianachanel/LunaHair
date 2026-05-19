import { LinearGradient } from "expo-linear-gradient";
import { View, type ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = ViewProps & {
  children: React.ReactNode;
  edges?: ("top" | "bottom" | "left" | "right")[];
};

export function ScreenBackground({
  children,
  className = "",
  edges = ["top"],
  ...props
}: Props) {
  return (
    <View className="flex-1 bg-luna-bg" {...props}>
      <LinearGradient
        colors={["#1A0B2E", "#07050D", "#050308"]}
        locations={[0, 0.45, 1]}
        className="absolute inset-0"
      />
      <View className="absolute -top-20 right-0 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl" />
      <View className="absolute bottom-40 -left-10 h-48 w-48 rounded-full bg-indigo-500/15 blur-3xl" />
      <SafeAreaView edges={edges} className={`flex-1 ${className}`}>
        {children}
      </SafeAreaView>
    </View>
  );
}
