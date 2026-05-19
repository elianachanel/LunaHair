import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ScreenBackground } from "@/components/layout/ScreenBackground";
import { GradientButton } from "@/components/ui/GradientButton";
import { OnboardingImageCard } from "@/components/onboarding/OnboardingImageCard";
import { OnboardingColorCard } from "@/components/onboarding/OnboardingColorCard";
import { useAuthStore } from "@/store/authStore";
import { completeOnboarding } from "@/services/firebase/firestore/users";
import { mapFirebaseError } from "@/services/firebase/errors";
import {
  COLOR_OPTIONS,
  CONDITION_OPTIONS,
  ONBOARDING_STEPS,
  PATTERN_OPTIONS,
  POROSITY_OPTIONS,
  THICKNESS_OPTIONS,
} from "@/constants/hairOnboarding";
import type { HairProfile } from "@/types/user";

const styles = StyleSheet.create({
  dot: { height: 6, borderRadius: 3, flex: 1, marginHorizontal: 3 },
  miniOption: {
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  miniOff: {
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  miniOn: {
    borderColor: "rgba(167,139,250,0.6)",
    backgroundColor: "rgba(139,92,246,0.25)",
  },
  miniLabel: { fontSize: 14, fontWeight: "600", color: "#F5F3FF" },
  miniDesc: { fontSize: 11, color: "#9CA3AF", marginTop: 2 },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
    backgroundColor: "rgba(7,5,13,0.95)",
  },
});

function MiniOption({
  label,
  description,
  active,
  onPress,
}: {
  label: string;
  description: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={[styles.miniOption, active ? styles.miniOn : styles.miniOff]}
    >
      <Text style={styles.miniLabel}>{label}</Text>
      <Text style={styles.miniDesc}>{description}</Text>
    </TouchableOpacity>
  );
}

export default function HairOnboardingScreen() {
  const user = useAuthStore((s) => s.user);
  const refreshProfile = useAuthStore((s) => s.refreshProfile);
  const syncAllUserData = useAuthStore((s) => s.syncAllUserData);
  const scrollRef = useRef<ScrollView>(null);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hair, setHair] = useState<HairProfile>({
    pattern: "ondulado_2b",
    color: "castano",
    porosity: "media",
    thickness: "medio",
    condition: "saludable",
  });

  const totalSteps = ONBOARDING_STEPS.length;
  const current = ONBOARDING_STEPS[step];

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [step]);

  const finish = async () => {
    if (!user) return;
    setLoading(true);
    setError("");
    try {
      await completeOnboarding(user.uid, hair);
      await refreshProfile();
      await syncAllUserData(user.uid);
      router.replace("/(tabs)");
    } catch (e) {
      setError(mapFirebaseError(e));
    } finally {
      setLoading(false);
    }
  };

  const goToStep = (next: number) => {
    setStep(next);
  };

  const next = () => {
    if (step < totalSteps - 1) goToStep(step + 1);
    else finish();
  };

  const back = () => {
    if (step > 0) goToStep(step - 1);
  };

  return (
    <ScreenBackground edges={["top", "bottom"]}>
      <View className="flex-1">
        {/* Cabecera fija */}
        <View className="px-5 pt-6">
          <View className="mb-2 items-center">
            <Text className="text-2xl font-bold tracking-[0.2em] text-luna-purple">
              LUNAHAIR
            </Text>
            <Text className="mt-1 text-center text-sm text-luna-muted">
              Conoce tu cabello para rituales lunares a tu medida
            </Text>
          </View>

          <View className="mb-4 mt-4 flex-row items-center gap-2">
            {ONBOARDING_STEPS.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      i <= step ? "#A78BFA" : "rgba(255,255,255,0.15)",
                  },
                ]}
              />
            ))}
          </View>

          <View className="mb-2 flex-row items-center gap-2">
            <Ionicons name="sparkles" size={18} color="#C4B5FD" />
            <Text className="text-xs font-bold tracking-widest text-luna-purple">
              PASO {step + 1} DE {totalSteps}
            </Text>
          </View>
          <Text className="mb-1 text-2xl font-bold text-luna-text">
            {current.title}
          </Text>
          <Text className="mb-3 text-sm leading-relaxed text-luna-muted">
            {current.subtitle}
          </Text>
        </View>

        {/* Contenido del paso — scroll independiente, reinicia arriba */}
        <ScrollView
          key={step}
          ref={scrollRef}
          className="flex-1 px-5"
          contentContainerStyle={{ paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {step === 0 &&
            PATTERN_OPTIONS.map((opt) => (
              <OnboardingImageCard
                key={opt.value}
                label={opt.label}
                description={opt.description}
                image={opt.image}
                selected={hair.pattern === opt.value}
                onPress={() => setHair((h) => ({ ...h, pattern: opt.value }))}
              />
            ))}

          {step === 1 &&
            COLOR_OPTIONS.map((opt) => (
              <OnboardingColorCard
                key={opt.value}
                label={opt.label}
                description={opt.description}
                swatch={opt.swatch}
                selected={hair.color === opt.value}
                onPress={() => setHair((h) => ({ ...h, color: opt.value }))}
              />
            ))}

          {step === 2 &&
            THICKNESS_OPTIONS.map((opt) => (
              <OnboardingImageCard
                key={opt.value}
                label={opt.label}
                description={opt.description}
                image={opt.image}
                selected={hair.thickness === opt.value}
                onPress={() => setHair((h) => ({ ...h, thickness: opt.value }))}
                compact
              />
            ))}

          {step === 3 && (
            <View>
              <Text className="mb-3 text-sm font-semibold text-luna-text">
                Porosidad
              </Text>
              {POROSITY_OPTIONS.map((opt) => (
                <MiniOption
                  key={opt.value}
                  label={opt.label}
                  description={opt.description}
                  active={hair.porosity === opt.value}
                  onPress={() => setHair((h) => ({ ...h, porosity: opt.value }))}
                />
              ))}
              <Text className="mb-3 mt-4 text-sm font-semibold text-luna-text">
                Estado actual
              </Text>
              {CONDITION_OPTIONS.map((opt) => (
                <MiniOption
                  key={opt.value}
                  label={opt.label}
                  description={opt.description}
                  active={hair.condition === opt.value}
                  onPress={() => setHair((h) => ({ ...h, condition: opt.value }))}
                />
              ))}
            </View>
          )}
        </ScrollView>

        {/* Pie fijo — siempre visible */}
        <View style={styles.footer}>
          {error ? (
            <Text className="mb-3 text-center text-sm text-red-400">{error}</Text>
          ) : null}
          <View className="flex-row gap-3">
            {step > 0 ? (
              <TouchableOpacity
                onPress={back}
                style={[styles.miniOption, styles.miniOff, { flex: 1, marginBottom: 0 }]}
              >
                <Text style={[styles.miniLabel, { textAlign: "center" }]}>Atrás</Text>
              </TouchableOpacity>
            ) : (
              <View style={{ flex: 1 }} />
            )}
            <View style={{ flex: 2 }}>
              <GradientButton
                label={step === totalSteps - 1 ? "Comenzar ritual lunar" : "Siguiente"}
                loading={loading}
                onPress={next}
              />
            </View>
          </View>
        </View>
      </View>
    </ScreenBackground>
  );
}
