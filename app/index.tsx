import { Redirect } from "expo-router";
import { useAuthStore } from "@/store/authStore";

export default function Index() {
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const demoMode = useAuthStore((s) => s.demoMode);
  const initialized = useAuthStore((s) => s.initialized);

  if (!initialized) return null;

  if (user && !user.emailVerified && !demoMode) {
    return <Redirect href="/(auth)/verify-email" />;
  }

  if (user && user.emailVerified && !demoMode && profile && !profile.onboardingCompleted) {
    return <Redirect href="/(auth)/hair-onboarding" />;
  }

  if (user || demoMode) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)/login" />;
}
