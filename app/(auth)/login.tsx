import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Link, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { GradientButton } from "@/components/ui/GradientButton";
import { ScreenBackground } from "@/components/layout/ScreenBackground";
import { useAuthStore } from "@/store/authStore";
import { useRoutineStore } from "@/store/routineStore";
import { isFirebaseConfigured } from "@/services/firebase/config";
import { mapFirebaseError } from "@/services/firebase/errors";

export default function LoginScreen() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { signIn, register, loading, enterDemoMode } = useAuthStore();
  const loadDemoRoutines = useRoutineStore((s) => s.loadDemoRoutines);

  const submit = async () => {
    setError("");
    try {
      if (tab === "login") {
        await signIn(email, password);
        router.replace("/(tabs)");
      } else {
        await register(email, password, name || "Luna User");
        router.replace("/(auth)/verify-email");
      }
    } catch (e) {
      setError(mapFirebaseError(e));
    }
  };

  return (
    <ScreenBackground edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow justify-center px-6 py-10"
          keyboardShouldPersistTaps="handled"
        >
          <View className="overflow-hidden rounded-3xl border border-luna-border">
            <BlurView intensity={32} tint="dark" className="bg-luna-card/90 p-6">
              <View className="mb-6 flex-row rounded-2xl bg-black/30 p-1">
                {(["login", "register"] as const).map((t) => (
                  <Pressable
                    key={t}
                    onPress={() => setTab(t)}
                    className={`flex-1 rounded-xl py-2.5 ${tab === t ? "bg-violet-500/30" : ""}`}
                  >
                    <Text
                      className={`text-center text-xs font-bold tracking-wider ${
                        tab === t ? "text-luna-text" : "text-luna-muted"
                      }`}
                    >
                      {t === "login" ? "INICIAR SESIÓN" : "REGISTRARSE"}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <Pressable className="mb-5 flex-row items-center justify-center gap-2 rounded-2xl border border-white/10 py-3.5">
                <Ionicons name="logo-google" size={18} color="#E9D5FF" />
                <Text className="text-sm text-luna-text">Continuar con Google</Text>
              </Pressable>

              <Text className="mb-4 text-center text-[10px] tracking-widest text-luna-muted">
                O ENTRAR CON EMAIL
              </Text>

              {tab === "register" ? (
                <View className="mb-4 border-b border-white/10 pb-2">
                  <Text className="mb-1 text-[10px] tracking-widest text-luna-muted">
                    NOMBRE
                  </Text>
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Tu nombre"
                    placeholderTextColor="#6B7280"
                    className="text-base text-luna-text"
                  />
                </View>
              ) : null}

              <View className="mb-4 border-b border-white/10 pb-2">
                <Text className="mb-1 text-[10px] tracking-widest text-luna-muted">
                  TU CORREO ELECTRÓNICO
                </Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholder="nombre@ejemplo.com"
                  placeholderTextColor="#6B7280"
                  className="text-base text-luna-text"
                />
              </View>

              <View className="mb-6 border-b border-white/10 pb-2">
                <View className="mb-1 flex-row justify-between">
                  <Text className="text-[10px] tracking-widest text-luna-muted">
                    CONTRASEÑA
                  </Text>
                  {tab === "login" ? (
                    <Text className="text-[10px] text-luna-purple">¿La olvidaste?</Text>
                  ) : null}
                </View>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  placeholder="••••••••"
                  placeholderTextColor="#6B7280"
                  className="text-base text-luna-text"
                />
              </View>

              {error ? (
                <Text className="mb-3 text-center text-sm text-red-400">{error}</Text>
              ) : null}

              <GradientButton
                label="Entrar al Ritual"
                loading={loading}
                onPress={submit}
              />

              {!isFirebaseConfigured ? (
                <Pressable
                  onPress={() => {
                    enterDemoMode();
                    loadDemoRoutines();
                    router.replace("/(tabs)");
                  }}
                  className="mt-4"
                >
                  <Text className="text-center text-sm text-luna-purple">
                    Explorar en modo demo (sin Firebase)
                  </Text>
                </Pressable>
              ) : null}
            </BlurView>
          </View>

          <View className="mt-10 items-center">
            <Text className="text-2xl font-bold tracking-[0.35em] text-luna-purple">
              LUNAHAIR
            </Text>
            <Text className="mt-2 text-sm text-luna-muted">
              Donde el cosmos cuida de ti
            </Text>
          </View>

          <Link href="/(auth)/register" asChild>
            <Pressable className="mt-6">
              <Text className="text-center text-xs text-luna-muted">
                {tab === "login" ? "¿No tienes cuenta? Regístrate" : ""}
              </Text>
            </Pressable>
          </Link>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenBackground>
  );
}
