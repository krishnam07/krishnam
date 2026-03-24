import { Pressable } from "react-native";
import { Image, Text, View } from "react-native-web";

const brandLogo = require("../assets/kd.png");

export const BrandHeader = ({ navigation }) => {
  return (
    <Pressable
      onPress={() => navigation.navigate("Home")}
      style={{ flexDirection: "row", alignItems: "center" }}
      hitSlop={8}
    >
      <Image
        source={brandLogo}
        style={{ width: 30, height: 30, borderRadius: 8, marginRight: 8 }}
        resizeMode="contain"
      />
      <View>
        <Text style={{ color: "#e6eef8", fontSize: 15, fontWeight: "700" }}>
          Scanner Book
        </Text>
        <Text style={{ color: "#cfe6ff", fontSize: 10 }}>
          Scan. Connect. Help.
        </Text>
      </View>
    </Pressable>
  );
};
