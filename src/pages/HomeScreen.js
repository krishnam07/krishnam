import React, { useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";

import { theme, styles } from "./../styles";
import {
  FeatureCard,
  GradientButton,
  HowItWorks,
  SecondaryButton,
} from "../components";

export const HomeScreen = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Hero */}
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

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Features</Text>

          <FeatureCard
            title="Tag & Protect"
            description="Add valuables & generate QR codes."
          />
          <FeatureCard
            title="Find & Notify"
            description="Get notified when item is found."
          />
          <FeatureCard
            title="Secure Chat"
            description="Connect safely with finder."
          />
        </View>

        <HowItWorks />
      </ScrollView>
    </View>
  );
};
