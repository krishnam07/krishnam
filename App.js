import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import QRScreen from './src/screens/QRScreen';
import ScannerScreen from './src/screens/ScannerScreen';
import CustomizeQrScreen from './src/screens/CustomizeQrScreen';

const Stack = createNativeStackNavigator();
const brandLogo = require('./src/assets/kd.png');

function BrandHeader({ navigation }) {
  return (
    <Pressable
      onPress={() => navigation.navigate('Home')}
      style={{ flexDirection: 'row', alignItems: 'center' }}
      hitSlop={8}
    >
      <Image
        source={brandLogo}
        style={{ width: 30, height: 30, borderRadius: 8, marginRight: 8 }}
        resizeMode="contain"
      />
      <View>
        <Text style={{ color: '#e6eef8', fontSize: 15, fontWeight: '700' }}>Scanner Book</Text>
        <Text style={{ color: '#cfe6ff', fontSize: 10 }}>Scan. Connect. Help.</Text>
      </View>
    </Pressable>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: '#0f1724' },
          headerTintColor: '#e6eef8',
          headerTitleAlign: 'left',
          headerTitle: () => <BrandHeader navigation={navigation} />,
          contentStyle: { backgroundColor: '#0f1724' }
        })}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
        <Stack.Screen name="QR" component={QRScreen} options={{ title: 'Your QR' }} />
        <Stack.Screen name="CustomizeQR" component={CustomizeQrScreen} options={{ title: 'Customize your QR' }} />
        <Stack.Screen name="Scanner" component={ScannerScreen} options={{ title: 'Scanner' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}