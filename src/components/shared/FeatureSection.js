import React from "react";
import { View, Text } from "react-native";
import { QrCode, Bell, ShieldCheck } from "lucide-react-native";

import { styles, theme } from "../../styles";
import { FeatureCard } from "../core";

export const FeaturesSection = () => {
  return (
    <View style={styles.section}>
      {/* Header */}
      <View style={styles.featuresHeader}>
        <Text style={styles.sectionTitle}>App Features</Text>

        {/* Accent bar (allowed, not a divider) */}
        <View style={styles.accentBar} />
      </View>

      {/* Cards */}
      <View style={styles.featuresGrid}>
        <FeatureCard
          icon={<QrCode size={22} color={theme.colors.primary} />}
          title="Tag & Protect"
          description="Easily add your valuables to your digital vault and generate unique QR codes."
        />

        <FeatureCard
          icon={<Bell size={22} color={theme.colors.tertiary} />}
          title="Find & Notify"
          description="Get notified instantly when your item is found with location details."
          variant="success"
        />

        <FeatureCard
          icon={<ShieldCheck size={22} color="#4f46e5" />}
          title="Secure Chat"
          description="Connect securely with finders using privacy-first messaging."
          variant="info"
        />
      </View>
    </View>
  );
};
