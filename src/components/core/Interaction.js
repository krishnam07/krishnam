import { Pressable } from "react-native";

export const Interaction = () => {
  return (
    <Pressable
      style={({ pressed }) => ({
        transform: [{ scale: pressed ? 0.98 : 1 }],
      })}
    >
      {/* Card */}
    </Pressable>
  );
};
