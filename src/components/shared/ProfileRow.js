import { View, Text, Pressable } from "react-native";
import { theme } from "../../styles";

export const ProfileRow = ({ label, value, action, actionColor }) => {
  return (
    <View style={{ gap: 6, marginBottom: 16 }}>
      <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 12 }}>
        {label}
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ flex: 1, color: theme.colors.onSurface, fontSize: 16 }}>
          {value || "-"}
        </Text>

        {action && (
          <Pressable
            onPress={action}
            style={{
              backgroundColor: actionColor,
              paddingHorizontal: 14,
              paddingVertical: 6,
              borderRadius: theme.radius.full,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>Call</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};
