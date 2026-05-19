import { Tabs } from "expo-router";
import { View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

function LunaTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
    index: "moon",
    calendar: "calendar-outline",
    rituals: "sparkles-outline",
    profile: "person-outline",
  };
  const labels: Record<string, string> = {
    index: "Inicio",
    calendar: "Calendario",
    rituals: "Rutina",
    profile: "Perfil",
  };

  return (
    <BlurView
      intensity={40}
      tint="dark"
      className="absolute bottom-0 left-0 right-0 border-t border-white/10"
    >
      <View className="flex-row items-center justify-around px-2 pb-8 pt-3">
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              className={`items-center rounded-2xl px-4 py-2 ${
                focused ? "bg-violet-500/25" : ""
              }`}
            >
              <Ionicons
                name={icons[route.name] ?? "ellipse"}
                size={22}
                color={focused ? "#C4B5FD" : "#6B7280"}
              />
              <View>
                {/* label via accessibility */}
              </View>
              {focused ? (
                <View className="mt-1 h-0.5 w-4 rounded-full bg-violet-400" />
              ) : (
                <View className="mt-1 h-0.5 w-4" />
              )}
            </Pressable>
          );
        })}
      </View>
    </BlurView>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <LunaTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: "Inicio" }} />
      <Tabs.Screen name="calendar" options={{ title: "Calendario" }} />
      <Tabs.Screen name="rituals" options={{ title: "Rutina" }} />
      <Tabs.Screen name="profile" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
