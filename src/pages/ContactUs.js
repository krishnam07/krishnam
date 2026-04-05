import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
  TextInput,
  Alert,
} from "react-native";

import { styles, theme } from "../styles";
import { GradientButton, Input } from "../components";

export const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit() {
    if (!name || !email || !message) {
      Alert.alert("Missing fields", "Please fill all fields");
      return;
    }

    Alert.alert("Submitted", "We’ll get back to you shortly");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.signupContent}>
        {/* Header */}
        <View style={styles.signupHeader}>
          <Text style={styles.signupTitle}>Contact Us</Text>
          <Text style={styles.signupSubtitle}>
            We’re here to help. Reach out anytime.
          </Text>
        </View>

        {/* FORM */}
        <View style={styles.formWrapper}>
          <View style={styles.formCard}>
            <Input label="Full Name" value={name} onChange={setName} />

            <Input
              label="Email"
              value={email}
              onChange={setEmail}
              keyboardType="email-address"
            />

            {/* Message (Custom textarea style) */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Message</Text>

              <TextInput
                style={styles.textArea}
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
                placeholder="Write your message..."
                placeholderTextColor="#999"
              />
            </View>
          </View>
        </View>

        {/* CTA */}
        <GradientButton title="Send Message" onPress={handleSubmit} />

        {/* Extra Info */}
        <View style={styles.contactInfo}>
          <Text style={styles.contactText}>Or email us at</Text>
          <Text style={styles.contactLink}>support@findmythings.com</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
