import React from "react";
import { Pressable, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { styles, theme } from "../../styles";

export const GradientButton = ({ title }) => {
  return (
    <Pressable>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryContainer]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }} // 🔥 135deg feel
        style={styles.primaryBtn}
      >
        <Text style={styles.primaryText}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
};
