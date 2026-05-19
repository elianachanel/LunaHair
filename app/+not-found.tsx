import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "No encontrado" }} />
      <View className="flex-1 items-center justify-center bg-luna-bg px-6">
        <Text className="text-xl font-bold text-luna-text">
          Esta pantalla no existe.
        </Text>
        <Link href="/" className="mt-4">
          <Text className="text-luna-purple">Volver al inicio</Text>
        </Link>
      </View>
    </>
  );
}
