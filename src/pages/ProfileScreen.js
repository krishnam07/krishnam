import React, { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";

import { styles, theme, typography } from "../styles";
import {
  buildUserQrPayload,
  maskNumber,
  api,
  clearSession,
  getToken,
  getUser,
} from "../services";
import { ProfileRow } from "../components";

const brandLogo = require("../assets/kd.png");

// 👇 toggle this when backend ready
const USE_MOCK = true;

export const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const localUser = await getUser();

        // ✅ Always allow mock user
        if (localUser) {
          setUser(localUser);
        }

        if (USE_MOCK) return; // 🔥 stop here in mock mode

        const token = await getToken();

        // only redirect in real mode
        if (!token) {
          navigation.replace("Login");
          return;
        }

        // fetch from backend
        const { data } = await api.get("/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser((prev) => ({ ...prev, ...data }));
      } catch (err) {
        console.log("Profile load error:", err);
      }
    }

    loadProfile();
  }, []);

  async function handleLogout() {
    await clearSession();
    setUser(null);

    Alert.alert("Logged out", "Session cleared");

    // ✅ don't break flow in mock
    if (!USE_MOCK) {
      navigation.replace("Login");
    }
  }

  function handleInAppCall(type, number) {
    if (!number) {
      Alert.alert("Unavailable", `${type} number not available`);
      return;
    }

    Alert.alert("Calling", `${type}: ${maskNumber(number)}`);
  }

  const qrPayload = buildUserQrPayload(user);
  const hasValidQr = Boolean(qrPayload);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.surface }}
      contentContainerStyle={{
        padding: theme.spacing.lg,
        gap: theme.spacing.xl,
      }}
    >
      {/* HEADER */}
      <View style={{ gap: theme.spacing.xs }}>
        <Text
          style={[
            typography.displayLg,
            { fontSize: 34, color: theme.colors.onSurface },
          ]}
        >
          Profile
        </Text>
        <Text style={{ color: theme.colors.onSurfaceVariant }}>
          Your personal details & recovery identity
        </Text>
      </View>

      {/* USER INFO */}
      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          <ProfileRow label="Full Name" value={user?.name || "-"} />

          <ProfileRow
            label="Contact"
            value={maskNumber(user?.contactNumber || "")}
            action={() => handleInAppCall("Contact", user?.contactNumber)}
            actionColor={theme.colors.tertiary}
          />

          <ProfileRow
            label="Emergency"
            value={maskNumber(user?.emergencyContact || "")}
            action={() => handleInAppCall("Emergency", user?.emergencyContact)}
            actionColor={theme.colors.primary}
          />

          <ProfileRow label="Email" value={user?.email || "-"} />
        </View>
      </View>

      {/* QR SECTION */}
      <View style={styles.cardWrapper}>
        <View
          style={[styles.card, { alignItems: "center", gap: theme.spacing.md }]}
        >
          <Text style={{ color: theme.colors.onSurfaceVariant }}>
            Your Recovery QR
          </Text>

          {hasValidQr ? (
            <View
              style={{
                backgroundColor: theme.colors.surfaceLowest,
                padding: theme.spacing.md,
                borderRadius: theme.radius.lg,
              }}
            >
              <QRCode
                value={qrPayload}
                size={180}
                logo={brandLogo}
                logoSize={30}
                logoBackgroundColor="transparent"
              />
            </View>
          ) : (
            <Text style={{ color: theme.colors.onSurfaceVariant }}>
              QR unavailable. Add name & contact.
            </Text>
          )}

          <Pressable
            style={[
              styles.primaryBtn,
              { width: "100%", opacity: hasValidQr ? 1 : 0.5 },
            ]}
            disabled={!hasValidQr}
            onPress={() => navigation.navigate("CustomizeQR", { user })}
          >
            <Text style={styles.primaryText}>Download QR</Text>
          </Pressable>
        </View>
      </View>

      {/* LOGOUT */}
      <Pressable
        style={[
          styles.secondaryBtn,
          { backgroundColor: theme.colors.errorContainer },
        ]}
        onPress={handleLogout}
      >
        <Text style={{ color: theme.colors.onErrorContainer }}>Logout</Text>
      </Pressable>

      {/* FOOTER */}
      <View style={{ alignItems: "center", marginTop: theme.spacing.lg }}>
        <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>
          Scanner Book
        </Text>
        <Text style={{ color: theme.colors.onSurfaceVariant }}>
          Scan. Connect. Help.
        </Text>
      </View>
    </ScrollView>
  );
};
