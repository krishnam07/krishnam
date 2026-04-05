import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
  Pressable,
} from "react-native";

import { styles, theme } from "../styles";
import { api, setSession } from "../services";
import { GradientButton, Input } from "../components";

export const Signin = ({ navigation }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (!identifier || !password) {
      Alert.alert("Missing fields", "Please enter identifier and password");
      return;
    }

    try {
      const { data } = await api.post("/auth/login", {
        identifier,
        password,
      });

      await setSession(data.token, data.user);

      Alert.alert("Success", "Logged in successfully");
      navigation.replace("Profile");
    } catch (err) {
      Alert.alert(
        "Login failed",
        err?.response?.data?.error || "Unable to login",
      );
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.signupContent}>
        {/* Header */}
        <View style={styles.signupHeader}>
          <Text style={styles.signupTitle}>Welcome Back</Text>
          <Text style={styles.signupSubtitle}>
            Login to access your belongings securely
          </Text>
        </View>

        {/* FORM */}
        <View style={styles.formWrapper}>
          <View style={styles.formCard}>
            <Input
              label="Name / Contact / Email"
              value={identifier}
              onChange={setIdentifier}
            />

            <Input
              label="Password"
              value={password}
              onChange={setPassword}
              secure
            />

            {/* Forgot Password */}
            <Pressable
              onPress={() => console.log("Forgot Password")}
              style={styles.forgotWrapper}
            >
              <Text style={styles.forgotText}>Forgot password?</Text>
            </Pressable>
          </View>
        </View>

        {/* CTA */}
        <GradientButton title="Login" onPress={handleLogin} />

        {/* Signup Link */}
        <View style={styles.signupLinkWrapper}>
          <Text style={styles.signupText}>Don’t have an account?</Text>

          <Pressable onPress={() => navigation.navigate("Register")}>
            {({ pressed }) => (
              <Text style={[styles.signupLink, pressed && { opacity: 0.6 }]}>
                Create one
              </Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
