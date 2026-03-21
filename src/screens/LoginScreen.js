import React, { useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { appStyles, colors } from '../styles/theme';
import { api } from '../services/api';
import { setSession } from '../services/authStorage';

export default function LoginScreen({ navigation }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    if (!identifier || !password) {
      Alert.alert('Missing fields', 'Please enter identifier and password');
      return;
    }

    try {
      const { data } = await api.post('/auth/login', { identifier, password });
      await setSession(data.token, data.user);
      Alert.alert('Success', 'Logged in successfully');
      navigation.navigate('Profile');
    } catch (err) {
      Alert.alert('Login failed', err?.response?.data?.error || 'Unable to login');
    }
  }

  return (
    <View style={appStyles.container}>
      <View style={appStyles.card}>
        <Text style={appStyles.title}>Login</Text>
        <Text style={appStyles.subtitle}>Use name, contact number, or email</Text>

        <TextInput
          style={[appStyles.input, { marginTop: 12 }]}
          placeholder="Name / Contact / Email"
          placeholderTextColor="#8ea9c7"
          value={identifier}
          onChangeText={setIdentifier}
        />
        <TextInput
          style={appStyles.input}
          placeholder="Password"
          placeholderTextColor="#8ea9c7"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable style={[appStyles.button, { backgroundColor: colors.primary }]} onPress={handleLogin}>
          <Ionicons name="log-in" size={14} color="#fff" />
          <Text style={appStyles.buttonText}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
}
