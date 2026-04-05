import { View } from "react-native";
import { theme } from "../../styles";

export const ScreenContainer = ({ children }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.lg,
      }}
    >
      {children}
    </View>
  );
};
