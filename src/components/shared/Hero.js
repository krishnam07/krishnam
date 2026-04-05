import { Image, Text, View } from "react-native";

import { styles, theme } from "../../styles";
import { GradientButton, SecondaryButton } from "../core";

export const Hero = () => {
  return (
    <View style={styles.hero}>
      <Text style={styles.heading}>
        Never Lose What{"\n"}
        <Text style={{ color: theme.colors.primary }}>Matters Most</Text>
      </Text>

      <Text style={styles.subText}>
        The modern concierge for your personal belongings.
      </Text>

      <View style={styles.buttonRow}>
        <GradientButton title="Get Started" />
        <SecondaryButton title="How it Works" />
      </View>

      <Image
        source={{
          uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAQi0cCp3lwVXudbJpGJ_T5L33qzM03wxMm6SS6agsp2gucs1ICAJR7WKrLW-HnR13EhKRwpQs2sWQygYMRZTbTx8ajJn37brKY8C8S-IecBHd1tsNcEA4anKFqRpvIR7AuretUBDewBEjd-7BVTinR9O_HnMQN99dHjbbnuLY0W7b0ezsudlNSpq_oVQC7jST1kcJNVLlmlgpd4qdpqL7xip7NR8f7c7a7IqjwrL5A1EaGT0HnLiopr13MxJeYWjM7vUB0rf6Yv0",
        }}
        style={styles.heroImage}
      />
    </View>
  );
};
