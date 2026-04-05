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

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={[styles.card, { alignItems: "center" }]}>
          <MaterialCommunityIcons
            name="qrcode-scan"
            size={40}
            color="#e6eef8"
          />
          <Text style={[styles.subtitle, { marginTop: 10 }]}>
            Preparing your QR code...
          </Text>
        </View>
      </View>
    );
  }

  if (!qrPayload) {
    return (
      <View style={styles.container}>
        <View style={[styles.card, { alignItems: "center" }]}>
          <MaterialCommunityIcons
            name="qrcode-remove"
            size={44}
            color="#e6eef8"
          />
          <Text style={[styles.title, { marginTop: 8 }]}>QR Not Available</Text>
          <Text
            style={[styles.subtitle, { textAlign: "center", marginTop: 8 }]}
          >
            Please complete registration or login first. QR code is generated
            after account setup.
          </Text>

          <View style={[styles.row, { marginTop: 14 }]}>
            <Pressable
              style={[
                styles.button,
                { flex: 1, backgroundColor: theme.colors.warning },
              ]}
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={styles.buttonText}>Register</Text>
            </Pressable>
            <Pressable
              style={[
                styles.button,
                { flex: 1, backgroundColor: theme.colors.primary },
              ]}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.card, { alignItems: "center" }]}>
        <MaterialCommunityIcons name="qrcode" size={40} color="#e6eef8" />
        <Text style={[styles.title, { marginTop: 8 }]}>Your QR Code</Text>
        <Text style={[styles.subtitle, { textAlign: "center", marginTop: 8 }]}>
          Share this QR to let people contact you safely.
        </Text>

        <View
          style={{
            marginTop: 14,
            backgroundColor: "#fff",
            padding: 14,
            borderRadius: 12,
          }}
        >
          <QRCode
            value={qrPayload}
            size={260}
            ecl="H"
            quietZone={12}
            color="#111827"
            backgroundColor="#ffffff"
            logo={brandLogo}
            logoSize={46}
            logoBackgroundColor="transparent"
          />
        </View>

        <Text style={[styles.subtitle, { textAlign: "center", marginTop: 10 }]}>
          Digital Contact
        </Text>
      </View>
    </View>
  );
};
