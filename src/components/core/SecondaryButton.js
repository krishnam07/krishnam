import { Pressable, Text } from "react-native";
import { styles, theme } from "../../styles/theme";

export const SecondaryButton = ({ title }) => {
  return (
    <Pressable style={styles.secondaryBtn}>
      <Text style={{ color: theme.colors.primary }}>{title}</Text>
    </Pressable>
  );
};
