import React, { useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";

import { theme, styles } from "./../styles";
import {
  FeatureCard,
  GradientButton,
  HowItWorks,
  SecondaryButton,
  CTASection,
  FeaturesSection,
  Footer,
  Hero,
} from "../components";

export const HomeScreen = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Hero />
        <FeaturesSection />
        <HowItWorks />
        <CTASection />
        <Footer />
      </ScrollView>
    </View>
  );
};
