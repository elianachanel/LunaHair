import { ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ScreenBackground } from "@/components/layout/ScreenBackground";
import { AppHeader } from "@/components/layout/AppHeader";
import { MoonCard } from "@/components/ui/MoonCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { HairHealthIndicator } from "@/components/ui/HairHealthIndicator";
import { LunarWeekStrip } from "@/components/calendar/LunarWeekStrip";
import { DailyRecommendationCard } from "@/components/care/DailyRecommendationCard";
import { HairCareLogPanel } from "@/components/care/HairCareLogPanel";
import { useLunarToday } from "@/hooks/useLunar";
import { useAuthStore } from "@/store/authStore";
import { useRoutineStore } from "@/store/routineStore";
import { useHairLogStore } from "@/store/hairLogStore";
import { useEffect, useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import type { LunarDayInfo } from "@/types/lunar";
import { enrichLunarDay, getLunarDataForDate } from "@/services/lunar/lunarCalendar";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function HomeScreen() {
  const todayLunar = useLunarToday();
  const profile = useAuthStore((s) => s.profile);
  const routines = useRoutineStore((s) => s.routines);
  const fetchRoutines = useRoutineStore((s) => s.fetchRoutines);
  const fetchAllLogs = useHairLogStore((s) => s.fetchAllLogs);
  const [selectedDay, setSelectedDay] = useState<LunarDayInfo | null>(null);

  const activeDay = useMemo(() => {
    if (selectedDay) return enrichLunarDay(selectedDay);
    return todayLunar;
  }, [selectedDay, todayLunar]);

  const dateLabel = useMemo(() => {
    const d = new Date(`${activeDay.date}T12:00:00`);
    const isToday = activeDay.date === getLunarDataForDate(new Date()).date;
    const formatted = format(d, "EEEE d MMMM", { locale: es });
    return isToday ? `Hoy · ${formatted}` : formatted;
  }, [activeDay.date]);

  useEffect(() => {
    fetchRoutines();
    fetchAllLogs();
  }, [fetchRoutines, fetchAllLogs]);

  const nextRoutine = routines.find((r) => !r.completed);

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

        <MoonCard
          phase={activeDay.phase}
          message={activeDay.message}
          illumination={activeDay.illumination}
          dateLabel={dateLabel}
        />

        <View className="mt-6">
          <LunarWeekStrip
            selected={activeDay.date}
            onSelect={(day) => setSelectedDay(day)}
            onViewMonth={() => router.push("/(tabs)/calendar")}
          />
        </View>

        <Animated.View
          key={activeDay.date}
          entering={FadeIn.duration(320)}
          exiting={FadeOut.duration(180)}
        >
          <DailyRecommendationCard
            recommendation={activeDay.dailyRecommendation}
            onSchedule={scheduleRitual}
          />
          <HairCareLogPanel date={activeDay.date} />
        </Animated.View>

        <View className="mt-6">
          <HairHealthIndicator
            delay={180}
            hydration={profile?.hydrationLevel ?? 84}
            growthEstimate="+1.2cm este mes"
            nextRitual={nextRoutine?.title ?? "Masaje de aceites"}
          />
        </View>

        {nextRoutine ? (
          <GlassCard delay={220} className="mt-6 flex-row items-center gap-4">
            <View className="h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/20">
              <Ionicons name="leaf" size={24} color="#C4B5FD" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-luna-text">
                {nextRoutine.title}
              </Text>
              <Text className="text-xs text-luna-muted">Próximo ritual</Text>
            </View>
          </GlassCard>
        ) : null}
      </ScrollView>
    </ScreenBackground>
  );
}
