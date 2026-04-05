import React from "react";
import { Pressable, Text, View } from "react-native";
import { Search } from "lucide-react-native";

export const BrandHeader = ({ navigation }) => {
  return (
    <Pressable
      onPress={() => navigation.navigate("Home")}
      style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
      hitSlop={8}
    >
      <View
        style={{
          backgroundColor: "rgba(255,255,255,0.15)",
          padding: 6,
          borderRadius: 8,
        }}
      >
        <Search size={16} color="#e6eef8" />
      </View>
      <View>
        <Text style={{ color: "#e6eef8", fontSize: 15, fontWeight: "700" }}>
          Find My Things
        </Text>
        <Text style={{ color: "#cfe6ff", fontSize: 10 }}>
          Tag. Scan. Recover.
        </Text>
      </View>
    </Pressable>
  );
};
