import { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { router } from "expo-router";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { ScreenBackground } from "@/components/layout/ScreenBackground";
import { AppHeader } from "@/components/layout/AppHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { MoonCard } from "@/components/ui/MoonCard";
import { LunarMonthGrid } from "@/components/calendar/LunarMonthGrid";
import { DailyRecommendationCard } from "@/components/care/DailyRecommendationCard";
import { HairCareLogPanel } from "@/components/care/HairCareLogPanel";
import { useLunarMonth, useLunarToday } from "@/hooks/useLunar";
import { ACTIVITY_LABELS } from "@/constants/lunar";
import type { LunarDayInfo } from "@/types/lunar";
import { enrichLunarDay } from "@/services/lunar/lunarCalendar";
import { useHairLogStore } from "@/store/hairLogStore";

const monthNavStyles = StyleSheet.create({
  btn: { paddingHorizontal: 8, paddingVertical: 4 },
});

export default function CalendarScreen() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const calendar = useLunarMonth(year, month);
  const today = useLunarToday();
  const [selectedDay, setSelectedDay] = useState<LunarDayInfo | null>(null);
  const fetchMonth = useHairLogStore((s) => s.fetchMonth);

  const activeDay = useMemo(() => {
    if (selectedDay) return enrichLunarDay(selectedDay);
    return today;
  }, [selectedDay, today]);

  useEffect(() => {
    fetchMonth(year, month);
  }, [year, month, fetchMonth]);

  const dateLabel = useMemo(() => {
    const d = new Date(`${activeDay.date}T12:00:00`);
    return format(d, "EEEE d MMMM yyyy", { locale: es });
  }, [activeDay.date]);

  const monthLabel = format(new Date(year, month - 1, 1), "MMMM yyyy", {
    locale: es,
  });

  const shiftMonth = (delta: number) => {
    let m = month + delta;
    let y = year;
    if (m < 1) {
      m = 12;
      y -= 1;
    }
    if (m > 12) {
      m = 1;
      y += 1;
    }
    setMonth(m);
    setYear(y);
    setSelectedDay(null);
  };

  const scheduleRitual = () => {
    const { dailyRecommendation } = activeDay;
    router.push({
      pathname: "/(tabs)/rituals",
      params: {
        activity: dailyRecommendation.activity,
        suggestTitle: dailyRecommendation.title,
      },
    });
  };

  return (
    <ScreenBackground>
      <ScrollView
        className="flex-1 px-5"
        contentContainerClassName="pb-32 pt-2"
        showsVerticalScrollIndicator={false}
      >
        <AppHeader />
        <Text className="mb-2 text-2xl font-bold text-luna-text">
          Calendario lunar
        </Text>
        <Text className="mb-4 text-sm text-luna-muted">
          Fases astronómicas exactas · recomendaciones capilares
        </Text>

        <MoonCard
          phase={activeDay.phase}
          message={activeDay.message}
          illumination={activeDay.illumination}
          dateLabel={dateLabel}
        />

        <GlassCard className="mt-6">
          <View className="mb-4 flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => shiftMonth(-1)}
              style={monthNavStyles.btn}
              activeOpacity={0.7}
            >
              <Text className="text-xl text-luna-purple">‹</Text>
            </TouchableOpacity>
            <Text className="text-lg font-semibold capitalize text-luna-text">
              {monthLabel}
            </Text>
            <TouchableOpacity
              onPress={() => shiftMonth(1)}
              style={monthNavStyles.btn}
              activeOpacity={0.7}
            >
              <Text className="text-xl text-luna-purple">›</Text>
            </TouchableOpacity>
          </View>
          <LunarMonthGrid
            days={calendar.days}
            selected={activeDay.date}
            onSelect={(day) => setSelectedDay(day)}
          />
        </GlassCard>

        <Animated.View
          key={activeDay.date}
          entering={FadeIn.duration(280)}
          exiting={FadeOut.duration(160)}
        >
          <View className="mt-4 flex-row flex-wrap gap-2">
            {activeDay.activities.map((a) => (
              <View
                key={a}
                className="rounded-full border border-violet-400/40 bg-violet-500/15 px-3 py-1.5"
              >
                <Text className="text-xs font-medium text-luna-purple">
                  {ACTIVITY_LABELS[a]} óptimo
                </Text>
              </View>
            ))}
          </View>

          <DailyRecommendationCard
            recommendation={activeDay.dailyRecommendation}
            onSchedule={scheduleRitual}
          />
          <HairCareLogPanel date={activeDay.date} />
        </Animated.View>
      </ScrollView>
    </ScreenBackground>
  );
}
