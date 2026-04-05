import React, { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";

import { styles, theme } from "../styles";
import {
  buildUserQrPayload,
  maskNumber,
  api,
  clearSession,
  getToken,
  getUser,
} from "../services";

const brandLogo = require("../assets/kd.png");

export const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      const localUser = await getUser();
      const token = await getToken();

      if (!token) {
        navigation.navigate("Login");
        return;
      }

      if (localUser) {
        setUser(localUser);
      }

      try {
        const { data } = await api.get("/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser({ ...localUser, ...data });
      } catch (err) {
        setUser(localUser);
      }
    }

    loadProfile();
  }, [navigation]);

  async function handleLogout() {
    await clearSession();
    Alert.alert("Logged out", "Session cleared");
    navigation.replace("Login");
  }

  function handleInAppCall(type, number) {
    if (!number) {
      Alert.alert("Call unavailable", `${type} number is not available.`);
      return;
    }

    Alert.alert(
      "In-App Call",
      `${type} call request sent in Scanner Book.\nNumber: ${maskNumber(number)}`,
    );
  }

  function handleDownloadQr() {
    navigation.navigate("CustomizeQR", { user });
  }

  const fullName = user?.name || "-";
  const contactNumber = user?.contactNumber || user?.phone || "";
  const emergencyNumber = user?.emergencyContact || user?.emergency || "";
  const maskedContactNumber = contactNumber ? maskNumber(contactNumber) : "-";
  const maskedEmergencyNumber = emergencyNumber
    ? maskNumber(emergencyNumber)
    : "-";
  const email = user?.email || "-";
  const qrPayload = buildUserQrPayload(user);
  const hasValidQr = Boolean(qrPayload);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Profile</Text>

        <View style={{ marginTop: 12 }}>
          <Text
            style={[
              styles.subtitle,
              { fontSize: 13, fontWeight: "700", color: theme.colors.text },
            ]}
          >
            Full Name
          </Text>
          <Text
            style={[
              styles.subtitle,
              { fontSize: 14, marginTop: 6, color: theme.colors.text },
            ]}
          >
            {fullName}
          </Text>
        </View>

        <View style={{ marginTop: 14 }}>
          <Text
            style={[
              styles.subtitle,
              { fontSize: 13, fontWeight: "700", color: theme.colors.text },
            ]}
          >
            Contact Number
          </Text>
          <View style={[styles.row, { marginTop: 6, alignItems: "center" }]}>
            <Text
              style={[
                styles.subtitle,
                { flex: 1, fontSize: 14, color: theme.colors.text },
              ]}
            >
              {maskedContactNumber}
            </Text>
            <Pressable
              style={[
                styles.button,
                {
                  backgroundColor: theme.colors.success,
                  paddingVertical: 8,
                  minWidth: 74,
                },
              ]}
              onPress={() => handleInAppCall("Contact", contactNumber)}
            >
              <Ionicons name="call" size={14} color={theme.colors.onSuccess} />
              <Text style={styles.buttonText}>Call</Text>
            </Pressable>
          </View>
        </View>

        <View style={{ marginTop: 14 }}>
          <Text
            style={[
              styles.subtitle,
              { fontSize: 13, fontWeight: "700", color: theme.colors.text },
            ]}
          >
            Emergency Contact Number
          </Text>
          <View style={[styles.row, { marginTop: 6, alignItems: "center" }]}>
            <Text
              style={[
                styles.subtitle,
                { flex: 1, fontSize: 14, color: theme.colors.text },
              ]}
            >
              {maskedEmergencyNumber}
            </Text>
            <Pressable
              style={[
                styles.button,
                {
                  backgroundColor: theme.colors.primary,
                  paddingVertical: 8,
                  minWidth: 74,
                },
              ]}
              onPress={() => handleInAppCall("Emergency", emergencyNumber)}
            >
              <Ionicons name="call" size={14} color={theme.colors.onPrimary} />
              <Text style={styles.buttonText}>Call</Text>
            </Pressable>
          </View>
        </View>

        <View style={{ marginTop: 14 }}>
          <Text
            style={[
              styles.subtitle,
              {
                fontSize: 13,
                fontWeight: "700",
                color: theme.colors.onSurface,
              },
            ]}
          >
            Email ID
          </Text>
          <Text
            style={[
              styles.subtitle,
              { fontSize: 14, marginTop: 6, color: theme.colors.onSurface },
            ]}
          >
            {email}
          </Text>
        </View>
      </View>

      <View style={[styles.card, { alignItems: "center" }]}>
        <Text style={[styles.subtitle, { marginBottom: 10, fontSize: 13 }]}>
          Generated QR Code
        </Text>
        {hasValidQr ? (
          <View
            style={{ backgroundColor: "#fff", padding: 12, borderRadius: 12 }}
          >
            <QRCode
              value={qrPayload}
              size={190}
              logo={brandLogo}
              logoSize={34}
              logoBackgroundColor="transparent"
            />
          </View>
        ) : (
          <View
            style={{
              width: "100%",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#2b4c73",
              padding: 12,
            }}
          >
            <Text
              style={[
                styles.subtitle,
                { marginTop: 0, color: theme.colors.onSurface },
              ]}
            >
              QR unavailable: full name and contact number are required.
            </Text>
          </View>
        )}
        <Pressable
          style={[
            styles.button,
            {
              marginTop: 14,
              backgroundColor: hasValidQr ? theme.colors.primary : "#334155",
              width: "100%",
            },
          ]}
          onPress={handleDownloadQr}
          disabled={!hasValidQr}
        >
          <Ionicons name="download" size={16} color={theme.colors.onPrimary} />
          <Text style={styles.buttonText}>Download QR</Text>
        </Pressable>
      </View>

      <Pressable
        style={[
          styles.button,
          { marginTop: 10, backgroundColor: theme.colors.errorContainer },
        ]}
        onPress={handleLogout}
      >
        <Ionicons name="log-out" size={14} color={theme.colors.onError} />
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>

      <View style={{ alignItems: "center", marginTop: 14 }}>
        <Text
          style={{ color: theme.colors.text, fontSize: 14, fontWeight: "700" }}
        >
          Scanner Book
        </Text>
        <Text
          style={{ color: theme.colors.subtext, fontSize: 12, marginTop: 3 }}
        >
          Scan. Connect. Help.
        </Text>
      </View>
    </ScrollView>
  );
};
