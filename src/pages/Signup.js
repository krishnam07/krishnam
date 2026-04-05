import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
  Switch,
} from "react-native";

import { styles, theme } from "../styles";
import { GradientButton, Input } from "../components";

export const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [allowEmergency, setAllowEmergency] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.signupContent}>
        {/* Header */}
        <View style={styles.signupHeader}>
          <Text style={styles.signupTitle}>Create Account</Text>
          <Text style={styles.signupSubtitle}>
            Start securing your belongings today
          </Text>
        </View>

        {/* FORM GROUP (Layered) */}
        <View style={styles.formWrapper}>
          <View style={styles.formCard}>
            <Input label="Full Name *" value={name} onChange={setName} />
            <Input
              label="Contact Number *"
              value={contactNumber}
              onChange={setContactNumber}
              keyboardType="number-pad"
            />
            <Input
              label="Emergency Contact"
              value={emergencyContact}
              onChange={setEmergencyContact}
              keyboardType="number-pad"
            />

            {/* Switch Row */}
            <View style={styles.switchRow}>
              <Text style={styles.label}>Allow emergency contact call</Text>
              <Switch
                value={allowEmergency}
                onValueChange={setAllowEmergency}
              />
            </View>

            <Input label="Email (optional)" value={email} onChange={setEmail} />

            <Input
              label="Password *"
              value={password}
              onChange={setPassword}
              secure
            />

            <Input
              label="Confirm Password *"
              value={confirmPassword}
              onChange={setConfirmPassword}
              secure
            />
          </View>
        </View>

        {/* CTA */}
        <GradientButton title="Create Account" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
