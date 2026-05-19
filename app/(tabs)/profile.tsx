import { useEffect } from "react";
import { ScrollView, Text, View, Pressable, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ScreenBackground } from "@/components/layout/ScreenBackground";
import { AppHeader } from "@/components/layout/AppHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { useAuthStore } from "@/store/authStore";
import { useHairLogStore } from "@/store/hairLogStore";
import { useRoutineStore } from "@/store/routineStore";
import { useLunarHistory } from "@/hooks/useLunarHistory";

const HAIR_LABELS = {
  pattern: { ondulado_2b: "Ondulado 2B", liso: "Liso", rizado: "Rizado", afro: "Afro" },
  color: {
    negro: "Negro",
    castano_oscuro: "Castaño oscuro",
    castano: "Castaño",
    rubio: "Rubio",
    pelirrojo: "Pelirrojo",
    canoso: "Canoso",
    con_canas: "Con canas",
  },
  porosity: { baja: "Baja", media: "Media", alta: "Alta" },
  thickness: { fino: "Fino", medio: "Medio", grueso: "Grueso" },
  condition: {
    saludable: "Saludable",
    seco: "Seco",
    danado: "Dañado",
    procesado: "Procesado",
  },
};

export default function ProfileScreen() {
  const { profile, signOut, demoMode } = useAuthStore();
  const hair = profile?.hair;
  const history = useLunarHistory(5);
  const fetchAllLogs = useHairLogStore((s) => s.fetchAllLogs);
  const fetchRoutines = useRoutineStore((s) => s.fetchRoutines);

  useEffect(() => {
    fetchAllLogs();
    fetchRoutines();
  }, [fetchAllLogs, fetchRoutines]);

  const handleSignOut = async () => {
    await signOut();
    router.replace("/(auth)/login");
  };

  return (
    <ScreenBackground>
      <ScrollView
        className="flex-1 px-5"
        contentContainerClassName="pb-32 pt-2"
        showsVerticalScrollIndicator={false}
      >
        <AppHeader />

        <View className="mb-8 items-center">
          <View className="h-28 w-28 items-center justify-center rounded-full border-2 border-violet-400/50 bg-violet-500/20 shadow-glow">
            <Ionicons name="person" size={48} color="#C4B5FD" />
            <View className="absolute -bottom-1 -right-1 rounded-full bg-luna-bg p-1">
              <Text className="text-lg">🌙</Text>
            </View>
          </View>
          <Text className="mt-4 text-2xl font-bold text-luna-text">
            {profile?.displayName ?? "Luna User"}
          </Text>
          {demoMode ? (
            <Text className="mt-2 text-xs text-amber-400/90">Modo demo · datos locales</Text>
          ) : null}
        </View>

        <GlassCard className="mb-5">
          <View className="mb-4 flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Ionicons name="cut-outline" size={18} color="#C4B5FD" />
              <Text className="font-semibold text-luna-text">Mi tipo de cabello</Text>
            </View>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {hair
              ? [
                  ["PATRÓN", HAIR_LABELS.pattern[hair.pattern]],
                  [
                    "COLOR",
                    hair.color ? HAIR_LABELS.color[hair.color] : "—",
                  ],
                  ["POROSIDAD", HAIR_LABELS.porosity[hair.porosity]],
                  ["GROSOR", HAIR_LABELS.thickness[hair.thickness]],
                  ["ESTADO", HAIR_LABELS.condition[hair.condition]],
                ].map(([label, value]) => (
                  <View
                    key={label}
                    className="min-w-[46%] flex-1 rounded-2xl border border-white/10 bg-black/20 p-3"
                  >
                    <Text className="text-[10px] text-luna-muted">{label}</Text>
                    <Text className="mt-1 text-sm font-semibold text-luna-text">
                      {value}
                    </Text>
                  </View>
                ))
              : null}
          </View>
        </GlassCard>

        <GlassCard className="mb-5">
          <View className="mb-3 flex-row items-center gap-2">
            <Ionicons name="calendar-outline" size={18} color="#C4B5FD" />
            <Text className="font-semibold text-luna-text">Historial lunar</Text>
          </View>
          {history.length === 0 ? (
            <Text className="mb-3 text-sm text-luna-muted">
              Sin registros aún. Marca tu cuidado capilar en Inicio o Calendario.
            </Text>
          ) : (
            history.map((item) => (
              <View
                key={item.id}
                className="mb-3 flex-row items-center justify-between border-b border-white/5 pb-3"
              >
                <View className="flex-1 pr-2">
                  <Text className="text-sm font-medium text-luna-text">{item.title}</Text>
                  <Text className="text-xs text-luna-muted">{item.subtitle}</Text>
                </View>
                <Ionicons name="checkmark-circle" size={22} color="#A78BFA" />
              </View>
            ))
          )}
          <TouchableOpacity onPress={() => router.push("/lunar-history")}>
            <Text className="text-center text-sm text-luna-purple">
              Ver historial completo
            </Text>
          </TouchableOpacity>
        </GlassCard>

        <GlassCard className="mb-6">
          <View className="mb-3 flex-row items-center gap-2">
            <Ionicons name="settings-outline" size={18} color="#C4B5FD" />
            <Text className="font-semibold text-luna-text">Ajustes de cuenta</Text>
          </View>
          {["Información personal", "Notificaciones de fases", "Privacidad y seguridad"].map(
            (item) => (
              <Pressable
                key={item}
                className="flex-row items-center justify-between py-3"
              >
                <Text className="text-sm text-luna-muted">{item}</Text>
                <Ionicons name="chevron-forward" size={16} color="#6B7280" />
              </Pressable>
            ),
          )}
        </GlassCard>

        <Pressable
          onPress={handleSignOut}
          className="mb-4 items-center rounded-2xl border border-red-400/30 bg-red-500/10 py-4"
        >
          <Text className="font-semibold text-red-300">Cerrar sesión</Text>
        </Pressable>
      </ScrollView>
    </ScreenBackground>
  );
}
