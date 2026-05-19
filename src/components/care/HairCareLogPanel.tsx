import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { GlassCard } from "@/components/ui/GlassCard";
import { HAIR_CARE_ACTIONS } from "@/constants/hairCare";
import { useHairLogStore } from "@/store/hairLogStore";
import type { HairCareActionId } from "@/types/hairLog";

type Props = {
  date: string;
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 9999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  chipOff: {
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  chipOn: {
    borderColor: "rgba(167,139,250,0.6)",
    backgroundColor: "rgba(139,92,246,0.25)",
  },
  chipLabel: { fontSize: 12, fontWeight: "600" },
  chipLabelOff: { color: "#9CA3AF" },
  chipLabelOn: { color: "#F5F3FF" },
});

export function HairCareLogPanel({ date }: Props) {
  const fetchLog = useHairLogStore((s) => s.fetchLog);
  const toggleAction = useHairLogStore((s) => s.toggleAction);
  const log = useHairLogStore((s) => s.logsByDate[date]);
  const saving = useHairLogStore((s) => s.saving);
  const saveError = useHairLogStore((s) => s.saveError);
  const lastSavedAt = useHairLogStore((s) => s.lastSavedAt);

  useEffect(() => {
    fetchLog(date);
  }, [date, fetchLog]);

  const dateLabel = format(new Date(`${date}T12:00:00`), "EEEE d MMMM", {
    locale: es,
  });

  const doneCount = log
    ? HAIR_CARE_ACTIONS.filter((a) => log.actions[a.id]).length
    : 0;

  const statusText = saving
    ? "Guardando…"
    : saveError
      ? saveError
      : lastSavedAt
        ? "Guardado en tu cuenta"
        : null;

  return (
    <GlassCard className="mt-6">
      <View className="mb-1 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Ionicons name="checkbox-outline" size={18} color="#C4B5FD" />
          <Text className="font-semibold text-luna-text">Mi registro capilar</Text>
        </View>
        <View className="flex-row items-center gap-2">
          {saving ? <ActivityIndicator size="small" color="#C4B5FD" /> : null}
          {doneCount > 0 ? (
            <Text className="text-xs text-luna-purple">{doneCount} hecho(s)</Text>
          ) : null}
        </View>
      </View>
      <Text className="mb-2 text-xs capitalize text-luna-muted">{dateLabel}</Text>
      {statusText ? (
        <Text
          className={`mb-3 text-xs ${saveError ? "text-red-400" : "text-emerald-300/90"}`}
        >
          {statusText}
        </Text>
      ) : (
        <Text className="mb-3 text-xs text-luna-muted">
          Marca lo que hiciste; se guarda automáticamente.
        </Text>
      )}
      <View className="flex-row flex-wrap">
        {HAIR_CARE_ACTIONS.map((action) => {
          const active = Boolean(log?.actions[action.id]);
          return (
            <TouchableOpacity
              key={action.id}
              activeOpacity={0.75}
              onPress={() => toggleAction(date, action.id)}
              disabled={saving}
              style={[styles.chip, active ? styles.chipOn : styles.chipOff]}
            >
              <Ionicons
                name={action.icon}
                size={14}
                color={active ? "#C4B5FD" : "#6B7280"}
              />
              <Text
                style={[
                  styles.chipLabel,
                  active ? styles.chipLabelOn : styles.chipLabelOff,
                ]}
              >
                {action.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </GlassCard>
  );
}
