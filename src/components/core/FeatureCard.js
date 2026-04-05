import { View, Text } from "react-native";
import { styles } from "../../styles/theme";

export const FeatureCard = ({ title, description }) => {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDesc}>{description}</Text>
      </View>
    </View>
  );
};
