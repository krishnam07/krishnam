import { Text, TextInput, View } from "react-native";
import { styles } from "../../styles";

export const Input = ({ label, value, onChange, secure, keyboardType }) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        secureTextEntry={secure}
        keyboardType={keyboardType}
        placeholderTextColor="#999"
      />
    </View>
  );
};
