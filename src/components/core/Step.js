import { View, Text } from "react-native";
import { styles } from "../../styles";

export const Step = ({ number, title, description }) => {
  return (
    <View style={styles.step}>
      {/* Number Badge */}
      <View style={styles.stepIconWrapper}>
        <View style={styles.stepIcon}>
          <Text style={styles.stepNumber}>{number}</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.stepContent}>
        <Text style={styles.stepTitle}>{title}</Text>
        <Text style={styles.stepDescription}>{description}</Text>
      </View>
    </View>
  );
};
