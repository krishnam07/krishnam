import { View, TextInput } from "react-native";
import { theme } from "../../styles";

export const InputField = () => {
  return (
    <View
      style={{
        backgroundColor: theme.colors.surfaceHighest,
        borderRadius: theme.radius.lg,
        paddingHorizontal: 16,
      }}
    >
      <TextInput placeholder="Enter details..." />
    </View>
  );
};
