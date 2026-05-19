import { useEffect } from "react";
import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ScreenBackground } from "@/components/layout/ScreenBackground";
import { GlassCard } from "@/components/ui/GlassCard";
import { useLunarHistory } from "@/hooks/useLunarHistory";
import { useHairLogStore } from "@/store/hairLogStore";
import { useRoutineStore } from "@/store/routineStore";

const styles = StyleSheet.create({
  back: { padding: 8, marginBottom: 8 },
});

export default function LunarHistoryScreen() {
  const history = useLunarHistory();
  const fetchAllLogs = useHairLogStore((s) => s.fetchAllLogs);
  const fetchRoutines = useRoutineStore((s) => s.fetchRoutines);

  useEffect(() => {
    fetchAllLogs();
    fetchRoutines();
  }, [fetchAllLogs, fetchRoutines]);

  return (
    <ScreenBackground>
      <ScrollView
        className="flex-1 px-5"
        contentContainerClassName="pb-12 pt-12"
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.back}>
          <Ionicons name="chevron-back" size={28} color="#C4B5FD" />
        </TouchableOpacity>

        <Text className="mb-2 text-2xl font-bold text-luna-text">Historial lunar</Text>
        <Text className="mb-6 text-sm text-luna-muted">
          Registros reales de tu cuidado capilar y rituales completados, con la fase
          lunar de cada día.
        </Text>

        {history.length === 0 ? (
          <GlassCard>
            <Text className="text-center text-sm text-luna-muted">
              Aún no hay registros. Marca acciones en «Mi registro capilar» en Inicio o
              Calendario.
            </Text>
          </GlassCard>
        ) : (
          history.map((item) => (
            <GlassCard key={item.id} className="mb-3">
              <View className="flex-row items-start justify-between gap-3">
                <View className="flex-1">
                  <Text className="text-base font-semibold text-luna-text">
                    {item.title}
                  </Text>
                  <Text className="mt-1 text-xs text-luna-muted">{item.subtitle}</Text>
                  <Text className="mt-2 text-[10px] uppercase tracking-wider text-luna-purple">
                    {item.source === "hair_log" ? "Registro capilar" : "Ritual"}
                  </Text>
                </View>
                <Ionicons name="checkmark-circle" size={24} color="#A78BFA" />
              </View>
            </GlassCard>
          ))
        )}
      </ScrollView>
    </ScreenBackground>
  );
}
