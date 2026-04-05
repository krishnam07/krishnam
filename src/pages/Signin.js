import React, { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles, theme } from "../styles";

import { api, setSession } from "../services";
import { GradientButton } from "../components";

export const Signin = ({ navigation }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (!identifier || !password) {
      Alert.alert("Missing fields", "Please enter identifier and password");
      return;
    }

    try {
      const { data } = await api.post("/auth/login", { identifier, password });
      await setSession(data.token, data.user);
      Alert.alert("Success", "Logged in successfully");
      navigation.navigate("Profile");
    } catch (err) {
      Alert.alert(
        "Login failed",
        err?.response?.data?.error || "Unable to login",
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Use name, contact number, or email</Text>

        <TextInput
          style={[styles.input, { marginTop: 12 }]}
          placeholder="Name / Contact / Email"
          placeholderTextColor="#8ea9c7"
          value={identifier}
          onChangeText={setIdentifier}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#8ea9c7"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <GradientButton title={"Login"} onPress={handleLogin} />
      </View>
    </View>
  );
};
