import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  label: string;
  description: string;
  swatch: string;
  selected: boolean;
  onPress: () => void;
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderRadius: 18,
    borderWidth: 2,
    padding: 12,
    marginBottom: 10,
  },
  cardOff: {
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  cardOn: {
    borderColor: "#A78BFA",
    backgroundColor: "rgba(139,92,246,0.18)",
  },
  swatch: {
    height: 52,
    width: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.25)",
  },
  label: { fontSize: 16, fontWeight: "700", color: "#F5F3FF" },
  description: { fontSize: 12, color: "#9CA3AF", marginTop: 2 },
});

export function OnboardingColorCard({
  label,
  description,
  swatch,
  selected,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.card, selected ? styles.cardOn : styles.cardOff]}
    >
      <View style={[styles.swatch, { backgroundColor: swatch }]} />
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      {selected ? (
        <Text style={{ color: "#C4B5FD", fontSize: 18, fontWeight: "700" }}>✓</Text>
      ) : null}
    </TouchableOpacity>
  );
}
