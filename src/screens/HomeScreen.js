import React from 'react';
import { Alert, ScrollView, View, Text, Pressable } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { appStyles, colors } from '../styles/theme';
import { getToken, getUser } from '../services/authStorage';

const featureItems = [
  {
    title: 'Wrong parking',
    description: 'Notify the owner quickly and politely',
    icon: 'car-outline',
    iconLib: 'ionicons',
  },
  {
    title: 'Lost items',
    description: 'Scan and help get items returned',
    icon: 'qrcode-scan',
    iconLib: 'material',
  },
  {
    title: 'Emergency',
    description: 'Instantly alert emergency contacts',
    icon: 'alert-circle-outline',
    iconLib: 'ionicons',
  },
  {
    title: 'Safe and private',
    description: 'Masks numbers and only allows contact through the app',
    icon: 'shield-checkmark-outline',
    iconLib: 'ionicons',
  },
];

export default function HomeScreen({ navigation }) {
  async function handleOpenProfile() {
    const [token, user] = await Promise.all([getToken(), getUser()]);

    if (token && user) {
      navigation.navigate('Profile');
      return;
    }

    navigation.navigate('Login');
  }

  async function handleOpenQr() {
    const [token, user] = await Promise.all([getToken(), getUser()]);

    if (token && user) {
      navigation.navigate('QR');
      return;
    }

    Alert.alert(
      'Registration Required',
      'Please register or login first. Your QR code will be generated after account setup.',
      [
        { text: 'Register', onPress: () => navigation.navigate('Register') },
        { text: 'Login', onPress: () => navigation.navigate('Login') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView style={appStyles.container} contentContainerStyle={{ paddingBottom: 94 }}>
        <View style={appStyles.card}>
          <Text style={appStyles.title}>One scan. One notification. One chance to help.</Text>
          <Text style={[appStyles.subtitle, { marginTop: 8, lineHeight: 18 }]}>With just one scan let people connect with you in real-life moments: wrong parking alerts, lost items, or emergency situations. Stay responsible. Keep humanity alive.</Text>

          <View style={[appStyles.row, { marginTop: 14 }]}> 
            <Pressable style={[appStyles.button, { flex: 1, backgroundColor: colors.warning }]} onPress={() => navigation.navigate('Register')}>
              <Ionicons name="person-add" size={14} color="#fff" />
              <Text style={appStyles.buttonText}>Get Started</Text>
            </Pressable>
            <Pressable style={[appStyles.button, { flex: 1, backgroundColor: colors.primary }]} onPress={() => navigation.navigate('Login')}>
              <Ionicons name="log-in" size={14} color="#fff" />
              <Text style={appStyles.buttonText}>Sign In</Text>
            </Pressable>
          </View>
        </View>

        

        <View style={[appStyles.card, { paddingVertical: 10 }]}> 
          {featureItems.map((item) => (
            <View key={item.title} style={{ flexDirection: 'row', gap: 10, marginVertical: 7, alignItems: 'flex-start' }}>
              <View style={{ width: 28, alignItems: 'center', marginTop: 1 }}>
                {item.iconLib === 'material' ? (
                  <MaterialCommunityIcons name={item.icon} size={18} color={colors.success} />
                ) : (
                  <Ionicons name={item.icon} size={18} color={colors.success} />
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: colors.text, fontSize: 14, fontWeight: '700' }}>{item.title}</Text>
                <Text style={{ color: colors.subtext, fontSize: 12, marginTop: 2, lineHeight: 17 }}>{item.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={appStyles.row}>
          <Pressable style={appStyles.iconTile} onPress={handleOpenProfile}>
            <Ionicons name="person-circle" size={26} color="#e6eef8" />
            <Text style={appStyles.iconLabel}>Profile</Text>
          </Pressable>
          <Pressable style={appStyles.iconTile} onPress={handleOpenQr}>
            <MaterialCommunityIcons name="qrcode" size={24} color="#e6eef8" />
            <Text style={appStyles.iconLabel}>Your QR Code</Text>
          </Pressable>
        </View>


        <View style={appStyles.card}>
          <Text style={[appStyles.title, { fontSize: 17 }]}>Technology should solve real problems.</Text>
          <Text style={[appStyles.subtitle, { marginTop: 10, fontSize: 13, color: colors.text }]}>Because sometimes...</Text>
          <Text style={[appStyles.title, { marginTop: 4, fontSize: 18 }]}>One scan is all it takes to help someone.</Text>
        </View>
      </ScrollView>

      <View style={{ position: 'absolute', left: 14, right: 14, bottom: 14 }}>
        <Pressable
          style={[appStyles.button, { backgroundColor: colors.success, paddingVertical: 12, borderRadius: 999 }]}
          onPress={() => navigation.navigate('Scanner')}
        >
          <MaterialCommunityIcons name="qrcode-scan" size={16} color="#fff" />
          <Text style={appStyles.buttonText}>Scan Now</Text>
        </Pressable>
      </View>
    </View>
  );
}
