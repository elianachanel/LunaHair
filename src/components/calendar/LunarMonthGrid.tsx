import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { format } from "date-fns";
import type { LunarDayInfo } from "@/types/lunar";
import { MOON_PHASE_EMOJI } from "@/constants/lunar";

type Props = {
  days: LunarDayInfo[];
  selected: string;
  onSelect: (day: LunarDayInfo) => void;
};

const WEEKDAYS = ["L", "M", "X", "J", "V", "S", "D"];

const styles = StyleSheet.create({
  cell: {
    marginBottom: 8,
    width: "14.28%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "transparent",
  },
  cellOptimal: {
    borderColor: "rgba(167,139,250,0.3)",
    backgroundColor: "rgba(139,92,246,0.1)",
  },
  cellSelected: {
    borderColor: "#A78BFA",
    backgroundColor: "rgba(139,92,246,0.25)",
  },
});

export function LunarMonthGrid({ days, selected, onSelect }: Props) {
  const firstDow = new Date(`${days[0]?.date}T12:00:00`).getDay();
  const offset = firstDow === 0 ? 6 : firstDow - 1;
  const blanks = Array.from({ length: offset });

  return (
    <View>
      <View className="mb-2 flex-row justify-between px-1">
        {WEEKDAYS.map((d) => (
          <Text key={d} className="w-[14.28%] text-center text-xs text-luna-muted">
            {d}
          </Text>
        ))}
      </View>
      <View className="flex-row flex-wrap">
        {blanks.map((_, i) => (
          <View key={`b-${i}`} className="mb-2 w-[14.28%] aspect-square" />
        ))}
        {days.map((day) => {
          const num = format(new Date(`${day.date}T12:00:00`), "d");
          const isSelected = day.date === selected;
          const hasOptimal = day.activities.length > 0;
          return (
            <TouchableOpacity
              key={day.date}
              activeOpacity={0.75}
              onPress={() => onSelect(day)}
              style={[
                styles.cell,
                isSelected
                  ? styles.cellSelected
                  : hasOptimal
                    ? styles.cellOptimal
                    : undefined,
              ]}
            >
              <Text
                className={`text-sm font-medium ${isSelected ? "text-luna-text" : "text-luna-muted"}`}
              >
                {num}
              </Text>
              <Text className="mt-0.5 text-[11px] leading-none">
                {MOON_PHASE_EMOJI[day.phase]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
