import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Modal,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";

import { styles, theme } from "../styles";
import { getUser, buildUserQrPayload } from "../services";
import { VEHICLE_OPTIONS, SIZE_OPTIONS, TAG_OPTIONS } from "../constants";
import { GradientButton } from "../components";

const brandLogo = require("../assets/kd.png");

export const CustomizeQrScreen = () => {
  const [user, setUser] = useState(null);

  const [vehicle, setVehicle] = useState("");
  const [size, setSize] = useState("");
  const [tag, setTag] = useState("");
  const [customTag, setCustomTag] = useState("");

  const [activeSelect, setActiveSelect] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  // ================= LOAD USER =================
  useEffect(() => {
    getUser().then(setUser);
  }, []);

  // ================= RESET CONFIRM =================
  useEffect(() => {
    setConfirmed(false);
  }, [vehicle, size, tag, customTag]);

  // ================= QR BUILD =================
  const basePayload = buildUserQrPayload(user);

  const finalTagline = tag === "Custom" ? customTag.trim() : tag;

  const qrPayload = useMemo(() => {
    if (!basePayload) return null;

    try {
      const parsed = JSON.parse(basePayload);

      return JSON.stringify({
        ...parsed,
        customization: {
          vehicle,
          size,
          tagline: finalTagline,
        },
      });
    } catch {
      return null;
    }
  }, [vehicle, size, finalTagline, basePayload]);

  // ================= ANIMATION =================
  useEffect(() => {
    if (confirmed) {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.9);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [confirmed]);

  // ================= VALIDATION =================
  const isValid =
    vehicle && size && tag && (tag !== "Custom" || customTag.trim());

  function confirm() {
    if (!basePayload) {
      Alert.alert("Error", "Please complete profile first");
      return;
    }

    if (!isValid) {
      Alert.alert("Incomplete", "Please fill all fields");
      return;
    }

    setConfirmed(true);
  }

  // ================= COMPONENTS =================

  const FormField = ({ label, children }) => (
    <View style={{ marginBottom: 16 }}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );

  const Select = ({ value, placeholder, options, onChange }) => (
    <Pressable
      style={styles.select}
      onPress={() => setActiveSelect({ options, onChange })}
    >
      <Text style={{ color: value ? "#fff" : "#888" }}>
        {value || placeholder}
      </Text>
      <Ionicons name="chevron-down" size={18} color="#aaa" />
    </Pressable>
  );

  const QRCard = () => {
    if (!confirmed) {
      return (
        <View style={styles.emptyBox}>
          <Text style={styles.subtitle}>
            Complete form & tap confirm to preview QR
          </Text>
        </View>
      );
    }

    if (!qrPayload) {
      return (
        <View style={styles.emptyBox}>
          <Text style={styles.subtitle}>
            QR not available. Complete profile first.
          </Text>
        </View>
      );
    }

    return (
      <Animated.View
        style={[
          styles.qrCard,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <QRCode value={qrPayload} size={220} logo={brandLogo} logoSize={40} />

        <Text style={styles.qrTitle}>{finalTagline || "Scan to connect"}</Text>
        <Text style={styles.qrSub}>Scanner Book</Text>
      </Animated.View>
    );
  };

  // ================= UI =================

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Customize QR</Text>

        <FormField label="QR Type">
          <Select
            value={vehicle}
            placeholder="Select type"
            options={VEHICLE_OPTIONS}
            onChange={setVehicle}
          />
        </FormField>

        <FormField label="Tagline">
          <Select
            value={tag}
            placeholder="Select tagline"
            options={TAG_OPTIONS}
            onChange={setTag}
          />
        </FormField>

        {tag === "Custom" && (
          <TextInput
            style={styles.input}
            placeholder="Enter custom tagline"
            placeholderTextColor="#777"
            value={customTag}
            onChangeText={setCustomTag}
          />
        )}

        <FormField label="Size">
          <Select
            value={size}
            placeholder="Select size"
            options={SIZE_OPTIONS}
            onChange={setSize}
          />
        </FormField>

        <GradientButton title="Confirm" onPress={confirm} disabled={!isValid} />
      </View>

      <View style={styles.card}>
        <QRCard />
      </View>

      {/* ===== MODAL SELECT ===== */}
      <Modal visible={!!activeSelect} transparent animationType="slide">
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setActiveSelect(null)}
        >
          <View style={styles.modalSheet}>
            {activeSelect?.options.map((item) => (
              <Pressable
                key={item}
                style={styles.option}
                onPress={() => {
                  activeSelect.onChange(item);
                  setActiveSelect(null);
                }}
              >
                <Text style={styles.optionText}>{item}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </ScrollView>
  );
};
