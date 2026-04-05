import { Pressable, Text } from "react-native";
import { theme } from "../../styles";

export const FooterLink = ({ label }) => {
  return (
    <Pressable>
      {({ pressed }) => (
        <Text
          style={{
            color: pressed
              ? theme.colors.primary
              : theme.colors.onSurfaceVariant,
            fontWeight: "600",
          }}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
};
