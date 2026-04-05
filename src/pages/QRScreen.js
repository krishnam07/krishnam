import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";

import { styles, theme } from "../styles";
import { getUser, buildUserQrPayload } from "../services";

const brandLogo = require("../assets/kd.png");

export const QRScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const u = await getUser();
      setUser(u);
      setLoading(false);
    }
    loadUser();
  }, []);

  const qrPayload = buildUserQrPayload(user);

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={[styles.card, styles.center]}>
          <View style={styles.qrIconWrap}>
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={36}
              color={theme.colors.primary}
            />
          </View>

          <Text style={[styles.subtitle, styles.mt12]}>
            Preparing your QR code...
          </Text>
        </View>
      </View>
    );
  }

  /* ---------------- EMPTY STATE ---------------- */
  if (!qrPayload) {
    return (
      <View style={styles.container}>
        <View style={[styles.card, styles.center]}>
          <View style={styles.qrIconWrap}>
            <MaterialCommunityIcons
              name="qrcode-remove"
              size={36}
              color={theme.colors.error}
            />
          </View>

          <Text style={[styles.title, styles.mt12]}>QR Not Available</Text>

          <Text style={[styles.subtitle, styles.centerText, styles.mt8]}>
            Please complete registration or login to generate your QR code.
          </Text>

          <View style={[styles.row, styles.mt16]}>
            <Pressable
              style={[styles.secondaryBtn, styles.flex1]}
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={styles.secondaryText}>Register</Text>
            </Pressable>

            <Pressable
              style={[styles.primaryBtn, styles.flex1]}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.primaryText}>Login</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  /* ---------------- MAIN UI ---------------- */
  return (
    <View style={styles.container}>
      <View style={[styles.card, styles.center]}>
        {/* ICON */}
        <View style={styles.qrIconWrap}>
          <MaterialCommunityIcons
            name="qrcode"
            size={34}
            color={theme.colors.primary}
          />
        </View>

        {/* TITLE */}
        <Text style={[styles.title, styles.mt12]}>Your QR Code</Text>

        <Text style={[styles.subtitle, styles.centerText, styles.mt8]}>
          Share this QR to let people contact you safely.
        </Text>

        {/* QR BLOCK */}
        <View style={styles.qrWrapper}>
          <View style={styles.qrInner}>
            <QRCode
              value={qrPayload}
              size={240}
              ecl="H"
              quietZone={10}
              color={theme.colors.onSurface}
              backgroundColor="#ffffff"
              logo={brandLogo}
              logoSize={42}
              logoBackgroundColor="transparent"
            />
          </View>
        </View>

        {/* FOOTER */}
        <Text style={[styles.subtitle, styles.mt12]}>Digital Contact</Text>
      </View>
    </View>
  );
};
