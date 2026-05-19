import { Text, View } from "react-native";
import Animated, { FadeIn, FadeOut, ZoomIn } from "react-native-reanimated";
import { GlassCard } from "./GlassCard";
import type { LunarPhaseId } from "@/types/lunar";
import { LUNAR_PHASE_LABELS, MOON_PHASE_EMOJI } from "@/constants/lunar";

type Props = {
  phase: LunarPhaseId;
  message: string;
  illumination: number;
  dateLabel?: string;
  delay?: number;
};

export function MoonCard({
  phase,
  message,
  illumination,
  dateLabel,
  delay = 0,
}: Props) {
  return (
    <GlassCard delay={delay} className="items-center">
      <View className="mb-4 h-28 w-28 items-center justify-center rounded-full bg-violet-500/20 shadow-glow">
        <Animated.View
          key={phase}
          entering={ZoomIn.duration(380).springify()}
          exiting={FadeOut.duration(180)}
          className="items-center justify-center"
        >
          <Text className="text-6xl">{MOON_PHASE_EMOJI[phase]}</Text>
        </Animated.View>
      </View>

      {dateLabel ? (
        <Animated.Text
          key={`date-${dateLabel}`}
          entering={FadeIn.duration(250)}
          exiting={FadeOut.duration(150)}
          className="mb-1 text-xs uppercase tracking-widest text-luna-muted"
        >
          {dateLabel}
        </Animated.Text>
      ) : null}

      <Animated.Text
        key={`label-${phase}`}
        entering={FadeIn.duration(280).delay(40)}
        exiting={FadeOut.duration(150)}
        className="text-center text-2xl font-bold text-luna-text"
      >
        {LUNAR_PHASE_LABELS[phase]}
      </Animated.Text>

      <Animated.Text
        key={`illum-${phase}-${illumination}`}
        entering={FadeIn.duration(280).delay(60)}
        exiting={FadeOut.duration(150)}
        className="mt-1 text-sm text-luna-purple"
      >
        {Math.round(illumination * 100)}% iluminación
      </Animated.Text>

      <Animated.Text
        key={`msg-${phase}`}
        entering={FadeIn.duration(320).delay(80)}
        exiting={FadeOut.duration(150)}
        className="mt-4 text-center text-sm leading-relaxed text-luna-muted"
      >
        {message}
      </Animated.Text>
    </GlassCard>
  );
}
