import { Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  onMenuPress?: () => void;
};

export function AppHeader({ onMenuPress }: Props) {
  return (
    <View className="mb-6 flex-row items-center justify-between px-1">
      <Pressable
        onPress={onMenuPress}
        className="h-10 w-10 items-center justify-center rounded-xl border border-white/10"
      >
        <Ionicons name="menu" size={20} color="#E9D5FF" />
      </Pressable>
      <Text className="font-bold tracking-wide text-luna-purple text-lg">
        LunaHair
      </Text>
      <View className="h-10 w-10 items-center justify-center rounded-full border border-violet-400/40 bg-violet-500/20">
        <Ionicons name="person" size={18} color="#C4B5FD" />
      </View>
    </View>
  );
}
