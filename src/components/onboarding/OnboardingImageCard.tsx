import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type ImageSourcePropType,
} from "react-native";

type Props = {
  label: string;
  description: string;
  image?: ImageSourcePropType;
  selected: boolean;
  onPress: () => void;
  compact?: boolean;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 2,
    overflow: "hidden",
    marginBottom: 14,
  },
  cardOff: {
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  cardOn: {
    borderColor: "#A78BFA",
    backgroundColor: "rgba(139,92,246,0.18)",
  },
  image: {
    width: "100%",
    height: 140,
    backgroundColor: "#120A1E",
  },
  imageCompact: { height: 110 },
  body: { padding: 14 },
  label: { fontSize: 17, fontWeight: "700", color: "#F5F3FF", marginBottom: 6 },
  description: { fontSize: 13, lineHeight: 19, color: "#9CA3AF" },
  check: {
    position: "absolute",
    top: 10,
    right: 10,
    height: 26,
    width: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8B5CF6",
  },
});

export function OnboardingImageCard({
  label,
  description,
  image,
  selected,
  onPress,
  compact,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.card, selected ? styles.cardOn : styles.cardOff]}
    >
      {image ? (
        <Image
          source={image}
          style={[styles.image, compact && styles.imageCompact]}
          resizeMode="cover"
        />
      ) : null}
      {selected ? (
        <View style={styles.check}>
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14 }}>✓</Text>
        </View>
      ) : null}
      <View style={styles.body}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}
