import React, { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { appStyles, colors } from '../styles/theme';

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  function handleBarCodeScanned({ data }) {
    if (scanned) return;
    setScanned(true);
    Alert.alert('Scan result', data || 'No data found', [
      { text: 'Scan Again', onPress: () => setScanned(false) },
      { text: 'OK' },
    ]);
  }

  if (!permission) {
    return (
      <View style={appStyles.container}>
        <View style={[appStyles.card, { alignItems: 'center' }]}> 
          <Text style={appStyles.title}>Scanner</Text>
          <Text style={[appStyles.subtitle, { textAlign: 'center', marginTop: 8 }]}>Checking camera permission...</Text>
        </View>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={appStyles.container}>
        <View style={[appStyles.card, { alignItems: 'center' }]}> 
          <MaterialCommunityIcons name="camera-lock-outline" size={72} color="#e6eef8" />
          <Text style={[appStyles.title, { marginTop: 8 }]}>Camera Permission Needed</Text>
          <Text style={[appStyles.subtitle, { textAlign: 'center', marginTop: 8 }]}>Allow camera access to scan QR codes.</Text>
          <Pressable
            style={[appStyles.button, { marginTop: 14, backgroundColor: colors.primary }]}
            onPress={requestPermission}
          >
            <MaterialCommunityIcons name="camera" size={16} color="#fff" />
            <Text style={appStyles.buttonText}>Allow Camera</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <CameraView
        style={{ flex: 1 }}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ['qr', 'code128', 'code39', 'ean13', 'ean8', 'upc_e'],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />

      <View style={{ position: 'absolute', left: 16, right: 16, top: 56 }}>
        <View style={{ backgroundColor: 'rgba(0,0,0,0.45)', borderRadius: 12, padding: 12 }}>
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>Scan QR Code</Text>
          <Text style={{ color: '#dbeafe', marginTop: 4, fontSize: 12 }}>
            Point camera at a QR code or barcode.
          </Text>
        </View>
      </View>

      {scanned ? (
        <View style={{ position: 'absolute', left: 16, right: 16, bottom: 24 }}>
          <Pressable
            style={[appStyles.button, { backgroundColor: colors.success, paddingVertical: 12, borderRadius: 999 }]}
            onPress={() => setScanned(false)}
          >
            <MaterialCommunityIcons name="qrcode-scan" size={16} color="#fff" />
            <Text style={appStyles.buttonText}>Tap to Scan Again</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}
