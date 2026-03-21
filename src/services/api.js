import axios from 'axios';
import { Platform } from 'react-native';

const fallbackBaseUrl = Platform.select({
  // Android emulator maps host machine localhost to 10.0.2.2.
  android: 'http://172.20.10.2:5000/api',
  default: 'http://172.20.10.2:5000/api',
});

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || fallbackBaseUrl;

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});
