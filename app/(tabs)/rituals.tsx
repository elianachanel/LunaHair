import { useEffect, useState } from "react";
import { ScrollView, Text, View, TextInput, Pressable, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ScreenBackground } from "@/components/layout/ScreenBackground";
import { AppHeader } from "@/components/layout/AppHeader";
import { RitualCard } from "@/components/ui/RitualCard";
import { GradientButton } from "@/components/ui/GradientButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { useRoutineStore } from "@/store/routineStore";
import { useLunarToday } from "@/hooks/useLunar";
import type { HairActivity } from "@/types/lunar";
import { ACTIVITY_LABELS } from "@/constants/lunar";

const HAIR_ACTIVITIES: HairActivity[] = [
  "corte",
  "hidratacion",
  "nutricion",
  "crecimiento",
];

function parseActivity(value: string | string[] | undefined): HairActivity | null {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return null;
  return HAIR_ACTIVITIES.includes(raw as HairActivity)
    ? (raw as HairActivity)
    : null;
}

export default function RitualsScreen() {
  const lunar = useLunarToday();
  const params = useLocalSearchParams<{
    activity?: string;
    suggestTitle?: string;
  }>();
  const { routines, fetchRoutines, addRoutine, toggleComplete, removeRoutine } =
    useRoutineStore();
  const [title, setTitle] = useState("");
  const [activity, setActivity] = useState<HairActivity>(
    lunar.activities[0] ?? "nutricion",
  );

  useEffect(() => {
    fetchRoutines();
  }, [fetchRoutines]);

  useEffect(() => {
    const fromParams = parseActivity(params.activity);
    if (fromParams) setActivity(fromParams);
    if (params.suggestTitle?.trim()) {
      setTitle(params.suggestTitle.trim());
    }
  }, [params.activity, params.suggestTitle]);

  const create = async () => {
    if (!title.trim()) {
      Alert.alert("Título requerido", "Escribe un nombre para tu ritual.");
      return;
    }
    await addRoutine({
      title: title.trim(),
      scheduledAt: new Date(Date.now() + 86400000).toISOString(),
      activity,
    });
    setTitle("");
  };

  return (
    <ScreenBackground>
      <ScrollView
        className="flex-1 px-5"
        contentContainerClassName="pb-32 pt-2"
        showsVerticalScrollIndicator={false}
      >
        <AppHeader />
        <Text className="mb-2 text-2xl font-bold text-luna-text">Mis rituales</Text>
        <Text className="mb-6 text-sm text-luna-muted">
          Crea, completa y programa tu cuidado capilar
        </Text>

        <GlassCard className="mb-6">
          <Text className="mb-3 text-sm font-semibold text-luna-text">
            Nuevo ritual
          </Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Ej. Mascarilla nutritiva"
            placeholderTextColor="#6B7280"
            className="mb-4 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-luna-text"
          />
          <View className="mb-4 flex-row flex-wrap gap-2">
            {(["corte", "hidratacion", "nutricion", "crecimiento"] as const).map(
              (a) => (
                <Pressable
                  key={a}
                  onPress={() => setActivity(a)}
                  className={`rounded-full px-3 py-1.5 ${
                    activity === a
                      ? "bg-violet-500/30 border border-violet-400/50"
                      : "bg-white/5 border border-white/10"
                  }`}
                >
                  <Text className="text-xs text-luna-purple">
                    {ACTIVITY_LABELS[a]}
                  </Text>
                </Pressable>
              ),
            )}
          </View>
          <GradientButton label="Crear ritual" onPress={create} />
        </GlassCard>

        {routines.length === 0 ? (
          <Text className="text-center text-sm text-luna-muted">
            No hay rituales aún. Crea uno arriba.
          </Text>
        ) : (
          routines.map((r, i) => (
            <View key={r.id} className="mb-3">
              <RitualCard
                routine={r}
                delay={i * 60}
                onToggle={() => toggleComplete(r.id, !r.completed)}
              />
              <Pressable onPress={() => removeRoutine(r.id)} className="mt-1 self-end">
                <Text className="text-xs text-red-400/80">Eliminar</Text>
              </Pressable>
            </View>
          ))
        )}
      </ScrollView>
    </ScreenBackground>
  );
}
