import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { ScreenBackground } from "@/components/layout/ScreenBackground";
import { GradientButton } from "@/components/ui/GradientButton";
import { useAuthStore } from "@/store/authStore";
import { mapFirebaseError } from "@/services/firebase/errors";

export default function VerifyEmailScreen() {
  const user = useAuthStore((s) => s.user);
  const { checkEmailVerified, resendVerification, signOut, loading } =
    useAuthStore();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  const email = user?.email ?? "";

  const handleResend = async () => {
    setError("");
    setMessage("");
    try {
      await resendVerification();
      setMessage("Te enviamos otro correo de verificación.");
    } catch (e) {
      setError(mapFirebaseError(e));
    }
  };

  const handleCheck = async () => {
    setError("");
    setMessage("");
    setChecking(true);
    try {
      const verified = await checkEmailVerified();
      if (verified) {
        const profile = useAuthStore.getState().profile;
        if (profile && !profile.onboardingCompleted) {
          router.replace("/(auth)/hair-onboarding");
        } else {
          router.replace("/(tabs)");
        }
      } else {
        setMessage(
          "Aún no está verificado. Abre el enlace del correo y vuelve a pulsar aquí.",
        );
      }
    } catch (e) {
      setError(mapFirebaseError(e));
    } finally {
      setChecking(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.replace("/(auth)/login");
  };

  return (
    <ScreenBackground edges={["top", "bottom"]}>
      <View className="flex-1 justify-center px-6">
        <View className="overflow-hidden rounded-3xl border border-luna-border">
          <BlurView intensity={32} tint="dark" className="bg-luna-card/90 p-6">
            <View className="mb-4 items-center">
              <View className="mb-3 h-16 w-16 items-center justify-center rounded-full bg-violet-500/20">
                <Ionicons name="mail-outline" size={32} color="#C4B5FD" />
              </View>
              <Text className="text-center text-xl font-bold text-luna-text">
                Verifica tu correo
              </Text>
            </View>

            <Text className="mb-4 text-center text-sm leading-relaxed text-luna-muted">
              Enviamos un enlace de verificación a{" "}
              <Text className="font-semibold text-luna-purple">{email}</Text>.
              Ábrelo en tu correo y luego pulsa «Ya verifiqué».
            </Text>

            <Text className="mb-6 text-center text-xs text-luna-muted">
              Revisa también spam o promociones. Firebase envía un enlace, no un
              código numérico.
            </Text>

            {error ? (
              <Text className="mb-3 text-center text-sm text-red-400">{error}</Text>
            ) : null}
            {message ? (
              <Text className="mb-3 text-center text-sm text-emerald-300">
                {message}
              </Text>
            ) : null}

            <GradientButton
              label="Ya verifiqué mi correo"
              loading={checking || loading}
              onPress={handleCheck}
            />

            <Pressable onPress={handleResend} className="mt-4 py-2">
              <Text className="text-center text-sm text-luna-purple">
                Reenviar correo de verificación
              </Text>
            </Pressable>

            <Pressable onPress={handleSignOut} className="mt-2 py-2">
              <Text className="text-center text-sm text-luna-muted">
                Cerrar sesión
              </Text>
            </Pressable>
          </BlurView>
        </View>
      </View>
    </ScreenBackground>
  );
}
