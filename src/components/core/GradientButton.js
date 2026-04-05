import React from "react";
import { Pressable, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { styles, theme } from "../../styles";

export const GradientButton = ({ title }) => {
  return (
    <Pressable>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryContainer]}
        style={styles.primaryBtn}
      >
        <Text style={styles.primaryText}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
};
