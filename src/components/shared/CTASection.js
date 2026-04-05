import React from "react";
import { View, Text, Pressable } from "react-native";
import { ArrowRight } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

import { styles, theme } from "../../styles";

export const CTASection = () => {
  return (
    <View style={styles.ctaWrapper}>
      <Pressable
        style={({ pressed }) => ({
          transform: [{ scale: pressed ? 0.98 : 1 }],
        })}
      >
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.primaryContainer]}
          style={styles.ctaContainer}
        >
          {/* Glow effects (soft, not harsh) */}
          <View style={styles.ctaGlowTop} />
          <View style={styles.ctaGlowBottom} />

          {/* Content */}
          <Text style={styles.ctaTitle}>
            Ready to secure{"\n"}your belongings?
          </Text>

          <Text style={styles.ctaSubtitle}>
            Join thousands who trust us with their everyday essentials.
          </Text>

          <Pressable style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Create Free Account</Text>
            <ArrowRight size={20} color={theme.colors.primary} />
          </Pressable>
        </LinearGradient>
      </Pressable>
    </View>
  );
};
