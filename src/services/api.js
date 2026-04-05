import axios from "axios";
import { Platform } from "react-native";

const fallbackBaseUrl = Platform.select({
  // Android emulator maps host machine localhost to 10.0.2.2.
  android: "http://172.20.10.2:5000/api",
  default: "http://172.20.10.2:5000/api",
});

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || fallbackBaseUrl;

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// MOCK MODE FLAG
const USE_MOCK = true;

// Mock user data
const MOCK_USER = {
  id: "user_001",
  name: "Rahul Sharma",
  contactNumber: "9876543210",
  emergencyContact: "9123456789",
  email: "rahul@example.com",
};

// ================= GET USER =================
export async function getUser() {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_USER), 300); // simulate API delay
    });
  }

  // REAL IMPLEMENTATION (keep your existing logic here)
  try {
    const stored = await AsyncStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}
