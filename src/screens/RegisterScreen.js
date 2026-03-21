import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { appStyles, colors } from '../styles/theme';
import { api, API_BASE_URL } from '../services/api';
import { setSession } from '../services/authStorage';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [allowEmergency, setAllowEmergency] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const passwordLengthOk = password.length >= 6;
  const hasLetter = /[A-Za-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const strengthScore = [passwordLengthOk, hasLetter, hasDigit, hasSpecial].filter(Boolean).length;

  function getStrengthLabel() {
    if (!password) return 'Strength: -';
    if (strengthScore <= 1) return 'Strength: Weak';
    if (strengthScore <= 3) return 'Strength: Medium';
    return 'Strength: Strong';
  }

  async function handleRegister() {
    const normalizedName = name.trim();
    const normalizedContact = contactNumber.trim();
    const normalizedEmergency = emergencyContact.trim();
    const normalizedEmail = email.trim();

    if (!normalizedName || !normalizedContact || !password) {
      Alert.alert('Missing fields', 'Name, contact number and password are required');
      return;
    }

    if (!/^\d{10}$/.test(normalizedContact)) {
      Alert.alert('Invalid contact', 'Contact number must be exactly 10 digits');
      return;
    }

    if (normalizedEmergency && !/^\d{10}$/.test(normalizedEmergency)) {
      Alert.alert('Invalid emergency contact', 'Emergency contact number must be exactly 10 digits');
      return;
    }

    if (normalizedEmail && !normalizedEmail.includes('@')) {
      Alert.alert('Invalid email', 'Please enter a valid email');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Weak password', 'Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password mismatch', 'Confirm password does not match');
      return;
    }

    try {
      const { data } = await api.post('/auth/register', {
        name: normalizedName,
        contactNumber: normalizedContact,
        email: normalizedEmail,
        password,
      });

      await setSession(data.token, {
        ...data.user,
        emergencyContact: normalizedEmergency,
        allowEmergency,
      });
      Alert.alert('Registered', 'Account created successfully');
      navigation.replace('Profile');
    } catch (err) {
      const apiError = err?.response?.data?.error;
      if (apiError) {
        Alert.alert('Register failed', apiError);
        return;
      }

      Alert.alert(
        'Register failed',
        `Unable to reach backend at ${API_BASE_URL}. Start backend and use your LAN IP in EXPO_PUBLIC_API_URL for real devices.`
      );
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={18}
    >
      <ScrollView
        style={appStyles.container}
        contentContainerStyle={{ paddingBottom: 20 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={appStyles.card}>
          <Text style={appStyles.title}>Register</Text>
          <Text style={appStyles.subtitle}>Compact mobile signup</Text>

          <Text style={[appStyles.subtitle, { marginTop: 12 }]}>Full Name *</Text>
          <TextInput
            style={[appStyles.input, { marginTop: 6 }]}
            placeholder="Full Name"
            placeholderTextColor="#8ea9c7"
            value={name}
            onChangeText={setName}
            returnKeyType="next"
          />

          <Text style={appStyles.subtitle}>Contact Number *</Text>
          <TextInput
            style={[appStyles.input, { marginTop: 6 }]}
            placeholder="Contact Number (10 digit)"
            placeholderTextColor="#8ea9c7"
            value={contactNumber}
            onChangeText={setContactNumber}
            keyboardType="number-pad"
            maxLength={10}
            returnKeyType="next"
          />

          <Text style={appStyles.subtitle}>Emergency Contact</Text>
          <TextInput
            style={[appStyles.input, { marginTop: 6 }]}
            placeholder="Emergency Contact (optional)"
            placeholderTextColor="#8ea9c7"
            value={emergencyContact}
            onChangeText={setEmergencyContact}
            keyboardType="number-pad"
            maxLength={10}
            returnKeyType="next"
          />

          <View style={[appStyles.row, { alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }]}> 
            <Text style={[appStyles.subtitle, { flex: 1 }]}>Allow emergency contact call</Text>
            <Switch
              value={allowEmergency}
              onValueChange={setAllowEmergency}
              thumbColor={allowEmergency ? colors.success : '#9ca3af'}
              trackColor={{ false: '#334155', true: '#065f46' }}
            />
          </View>

          <Text style={appStyles.subtitle}>Email (optional)</Text>
          <TextInput
            style={[appStyles.input, { marginTop: 6 }]}
            placeholder="Email"
            placeholderTextColor="#8ea9c7"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
          />

          <Text style={appStyles.subtitle}>Password *</Text>
          <TextInput
            style={[appStyles.input, { marginTop: 6 }]}
            placeholder="Password"
            placeholderTextColor="#8ea9c7"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            returnKeyType="next"
          />
          <Text
            style={[
              appStyles.subtitle,
              {
                marginTop: -4,
                marginBottom: 8,
                color: password ? (passwordLengthOk ? '#86efac' : '#fca5a5') : colors.subtext,
              },
            ]}
          >
            Min 6 chars | {getStrengthLabel()}
          </Text>

          <Text style={appStyles.subtitle}>Confirm Password *</Text>
          <TextInput
            style={[appStyles.input, { marginTop: 6 }]}
            placeholder="Confirm Password"
            placeholderTextColor="#8ea9c7"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            returnKeyType="done"
            onSubmitEditing={handleRegister}
          />

          <Text style={[appStyles.subtitle, { marginBottom: 12 }]}>We store your number securely. OTP verification will be used for mobile verification.</Text>

          <Pressable style={[appStyles.button, { backgroundColor: colors.warning }]} onPress={handleRegister}>
            <Ionicons name="person-add" size={14} color="#fff" />
            <Text style={appStyles.buttonText}>Create Account</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
