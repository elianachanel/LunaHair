import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { format, addDays, startOfWeek } from "date-fns";
import { es } from "date-fns/locale";
import { MOON_PHASE_EMOJI } from "@/constants/lunar";
import { getLunarDataForDate } from "@/services/lunar/lunarCalendar";
import type { LunarDayInfo } from "@/types/lunar";

type Props = {
  selected: string;
  onSelect: (day: LunarDayInfo) => void;
  onViewMonth?: () => void;
};

const styles = StyleSheet.create({
  dayCell: {
    minWidth: 52,
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  dayCellDefault: {
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  dayCellSelected: {
    borderColor: "rgba(167,139,250,0.6)",
    backgroundColor: "rgba(139,92,246,0.2)",
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 4,
  },
});

export function LunarWeekStrip({ selected, onSelect, onViewMonth }: Props) {
  const start = startOfWeek(new Date(), { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(start, i);
    return getLunarDataForDate(date);
  });

  return (
    <View className="mb-6">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-luna-text">
          Calendario semanal
        </Text>
        {onViewMonth ? (
          <TouchableOpacity onPress={onViewMonth} activeOpacity={0.7}>
            <Text className="text-sm text-luna-purple">Ver mes ›</Text>
          </TouchableOpacity>
        ) : (
          <Text className="text-sm text-luna-purple">Ver mes ›</Text>
        )}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-2">
          {days.map((day) => {
            const d = new Date(`${day.date}T12:00:00`);
            const isSelected = day.date === selected;
            const label = format(d, "EEE", { locale: es }).toUpperCase();
            const num = format(d, "d");
            return (
              <TouchableOpacity
                key={day.date}
                activeOpacity={0.75}
                onPress={() => onSelect(day)}
                style={[
                  styles.dayCell,
                  isSelected ? styles.dayCellSelected : styles.dayCellDefault,
                ]}
              >
                <Text className="text-[10px] text-luna-muted">{label}</Text>
                <Text className="mt-1 text-lg font-bold text-luna-text">{num}</Text>
                <Text className="mt-1 text-base">
                  {MOON_PHASE_EMOJI[day.phase]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
