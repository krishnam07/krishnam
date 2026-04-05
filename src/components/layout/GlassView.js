import { BlurView } from "expo-blur";

export const GlassView = ({ children }) => {
  return (
    <BlurView
      intensity={20}
      tint="light"
      style={{
        borderRadius: 24,
        overflow: "hidden",
        padding: 16,
      }}
    >
      {children}
    </BlurView>
  );
};
