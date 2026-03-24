import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { captureRef } from "react-native-view-shot";
import QRCode from "react-native-qrcode-svg";

import { appStyles, colors } from "../styles";
import { getUser, buildUserQrPayload } from "../services";
import { VEHICLE_OPTIONS, SIZE_OPTIONS, TAG_OPTIONS } from "../constants";
import {
  getQrSizeByLabel,
  getPreviewScaleBySize,
  getPreviewWidthBySize,
} from "../helpers";

const brandLogo = require("../assets/kd.png");

export const CustomizeQrScreen = ({ navigation, route }) => {
  const [user, setUser] = useState(route?.params?.user || null);
  const [vehicle, setVehicle] = useState("");
  const [size, setSize] = useState("");
  const [tagOption, setTagOption] = useState("");
  const [customTag, setCustomTag] = useState("");
  const [processing, setProcessing] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const previewRef = useRef(null);
  const qrRef = useRef(null);

  useEffect(() => {
    async function loadUser() {
      if (user) return;
      const localUser = await getUser();
      if (localUser) {
        setUser(localUser);
      }
    }
    loadUser();
  }, [user]);

  const basePayload = buildUserQrPayload(user);
  const hasBaseQr = Boolean(basePayload);

  const finalTagline = tagOption === "Custom" ? customTag.trim() : tagOption;
  const canConfirm = Boolean(
    vehicle &&
    size &&
    tagOption &&
    (tagOption !== "Custom" || customTag.trim()),
  );
  const qrSize = getQrSizeByLabel(size);
  const previewScale = getPreviewScaleBySize(size);
  const previewPadding = Math.round(14 * previewScale);
  const previewRadius = Math.round(18 * previewScale);
  const qrWrapperPadding = Math.round(11 * previewScale);
  const qrWrapperRadius = Math.round(14 * previewScale);
  const taglineFontSize = Math.round(21 * previewScale);
  const taglineLineHeight = Math.round(27 * previewScale);
  const taglineMarginLeft = Math.round(14 * previewScale);
  const previewMaxWidth = getPreviewWidthBySize(size);

  const customizedQrPayload = useMemo(() => {
    if (!hasBaseQr) return null;
    const source = JSON.parse(basePayload);
    return JSON.stringify({
      ...source,
      customization: {
        qrType: vehicle || null,
        dimensions: size || null,
        tagline: finalTagline || null,
      },
      source: "scanner-book-mobile",
    });
  }, [basePayload, finalTagline, hasBaseQr, size, vehicle]);

  function resetAfterVehicle(nextVehicle) {
    setVehicle(nextVehicle);
    setSize("");
    setTagOption("");
    setCustomTag("");
    setConfirmed(false);
  }

  function resetAfterSize(nextSize) {
    setSize(nextSize);
    setConfirmed(false);
  }

  function handleTagChange(nextTag) {
    setTagOption(nextTag);
    setSize("");
    if (nextTag !== "Custom") {
      setCustomTag("");
    }
    setConfirmed(false);
  }

  async function confirm() {
    if (!hasBaseQr) {
      Alert.alert("QR unavailable", "Please complete profile details first.");
      return;
    }

    if (!canConfirm) {
      Alert.alert(
        "Incomplete",
        "Please complete QR type, dimensions and tagline.",
      );
      return;
    }

    setProcessing(true);
    setConfirmed(true);
    setProcessing(false);
    Alert.alert(
      "Confirmed",
      "Customization applied. You can now download your QR.",
    );
  }

  async function handleDownload() {
    if (!confirmed) {
      Alert.alert(
        "Confirm first",
        "Please confirm customization before downloading.",
      );
      return;
    }

    if (!previewRef.current) {
      Alert.alert("Download failed", "Preview is not ready yet.");
      return;
    }

    try {
      const safeName = (user?.name || "user")
        .replace(/[^a-zA-Z0-9_-]/g, "_")
        .toLowerCase();
      const fileUri = await captureRef(previewRef.current, {
        format: "png",
        quality: 1,
        result: "tmpfile",
        fileName: `${safeName}_custom_qr_preview`,
      });

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        const asset = await MediaLibrary.createAssetAsync(fileUri);
        const album = await MediaLibrary.getAlbumAsync("Scanner Book");
        if (!album) {
          await MediaLibrary.createAlbumAsync("Scanner Book", asset, false);
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        }
        Alert.alert(
          "Downloaded",
          "Preview image saved to your phone gallery (Scanner Book album).",
        );
        return;
      }

      const canShare = await Sharing.isAvailableAsync();
      if (canShare) {
        await Sharing.shareAsync(fileUri, {
          mimeType: "image/png",
          dialogTitle: "Save or share your QR image",
          UTI: "public.png",
        });
        return;
      }

      Alert.alert("Image created", `Saved at: ${fileUri}`);
    } catch (err) {
      Alert.alert(
        "Download failed",
        err?.message || "Unable to create image right now.",
      );
    }
  }

  return (
    <ScrollView
      style={appStyles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <View style={appStyles.card}>
        <Text style={appStyles.title}>Customize your QR</Text>
        <Text style={[appStyles.subtitle, { marginTop: 8 }]}>
          Set QR type, dimensions and tagline before download.
        </Text>

        <View style={{ marginTop: 14 }}>
          <Text
            style={[
              appStyles.subtitle,
              { color: colors.text, fontWeight: "700", fontSize: 13 },
            ]}
          >
            QR type
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#2b4c73",
              borderRadius: 10,
              marginTop: 8,
              overflow: "hidden",
            }}
          >
            <Picker
              selectedValue={vehicle}
              onValueChange={(value) => resetAfterVehicle(value)}
              dropdownIconColor={colors.text}
              style={{ color: colors.text, backgroundColor: "#0c1a2d" }}
            >
              <Picker.Item label="Select QR type" value="" color="#8ea9c7" />
              {VEHICLE_OPTIONS.map((option) => (
                <Picker.Item
                  key={option}
                  label={option}
                  value={option}
                  color={colors.text}
                />
              ))}
            </Picker>
          </View>
        </View>

        {vehicle ? (
          <View style={{ marginTop: 14 }}>
            <Text
              style={[
                appStyles.subtitle,
                { color: colors.text, fontWeight: "700", fontSize: 13 },
              ]}
            >
              Add something interesting
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#2b4c73",
                borderRadius: 10,
                marginTop: 8,
                overflow: "hidden",
              }}
            >
              <Picker
                selectedValue={tagOption}
                onValueChange={(value) => handleTagChange(value)}
                dropdownIconColor={colors.text}
                style={{ color: colors.text, backgroundColor: "#0c1a2d" }}
              >
                <Picker.Item
                  label="Select an option"
                  value=""
                  color="#8ea9c7"
                />
                {TAG_OPTIONS.map((option) => (
                  <Picker.Item
                    key={option}
                    label={option}
                    value={option}
                    color={colors.text}
                  />
                ))}
              </Picker>
            </View>
          </View>
        ) : null}

        {tagOption === "Custom" ? (
          <View style={{ marginTop: 12 }}>
            <Text
              style={[
                appStyles.subtitle,
                { color: colors.text, fontWeight: "700", fontSize: 13 },
              ]}
            >
              Your custom tagline
            </Text>
            <TextInput
              style={[appStyles.input, { marginTop: 8 }]}
              value={customTag}
              onChangeText={(text) => {
                setCustomTag(text);
                setConfirmed(false);
              }}
              placeholder="Enter your tagline"
              placeholderTextColor="#8ea9c7"
            />
          </View>
        ) : null}

        {tagOption ? (
          <View style={{ marginTop: 14 }}>
            <Text
              style={[
                appStyles.subtitle,
                { color: colors.text, fontWeight: "700", fontSize: 13 },
              ]}
            >
              Dimensions
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#2b4c73",
                borderRadius: 10,
                marginTop: 8,
                overflow: "hidden",
              }}
            >
              <Picker
                selectedValue={size}
                onValueChange={(value) => resetAfterSize(value)}
                dropdownIconColor={colors.text}
                style={{ color: colors.text, backgroundColor: "#0c1a2d" }}
              >
                <Picker.Item
                  label="Select dimensions"
                  value=""
                  color="#8ea9c7"
                />
                {SIZE_OPTIONS.map((option) => (
                  <Picker.Item
                    key={option}
                    label={option}
                    value={option}
                    color={colors.text}
                  />
                ))}
              </Picker>
            </View>
          </View>
        ) : null}

        <View style={[appStyles.row, { marginTop: 18 }]}>
          <Pressable
            style={[
              appStyles.button,
              {
                flex: 1,
                backgroundColor: colors.success,
                opacity: processing ? 0.7 : 1,
              },
            ]}
            onPress={confirm}
            disabled={processing}
          >
            <Ionicons name="checkmark-circle" size={16} color="#fff" />
            <Text style={appStyles.buttonText}>Confirm</Text>
          </Pressable>
          <Pressable
            style={[appStyles.button, { flex: 1, backgroundColor: "#334155" }]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="close-circle" size={16} color="#fff" />
            <Text style={appStyles.buttonText}>Cancel</Text>
          </Pressable>
        </View>
      </View>

      <View style={[appStyles.card, { alignItems: "center" }]}>
        <Text style={[appStyles.subtitle, { marginBottom: 10, fontSize: 13 }]}>
          QR Preview
        </Text>
        {hasBaseQr && confirmed ? (
          <View
            ref={previewRef}
            collapsable={false}
            style={{
              width: previewMaxWidth,
              backgroundColor: "#f3f9ff",
              borderWidth: 1,
              borderColor: "#cfe2ff",
              borderRadius: previewRadius,
              padding: previewPadding,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: "#fff",
                  padding: qrWrapperPadding,
                  borderRadius: qrWrapperRadius,
                  borderWidth: 1,
                  borderColor: "#dbeafe",
                  shadowColor: "#60a5fa",
                  shadowOpacity: 0.2,
                  shadowRadius: 10,
                  shadowOffset: { width: 0, height: 4 },
                  elevation: 4,
                }}
              >
                <QRCode
                  value={customizedQrPayload}
                  size={qrSize}
                  ecl="H"
                  getRef={(ref) => {
                    qrRef.current = ref;
                  }}
                  logo={brandLogo}
                  logoSize={Math.max(24, Math.round(qrSize * 0.18))}
                  logoBackgroundColor="transparent"
                />
              </View>

              <View style={{ flex: 1, marginLeft: taglineMarginLeft }}>
                <Text
                  style={{
                    color: "#102a43",
                    fontSize: taglineFontSize,
                    fontWeight: "800",
                    lineHeight: taglineLineHeight,
                  }}
                >
                  {finalTagline || "Scan to connect"}
                </Text>
                <Text
                  style={{
                    color: "#0f1724",
                    marginTop: 8,
                    fontSize: 14,
                    fontWeight: "700",
                  }}
                >
                  Scanner Book
                </Text>
                <Text style={{ color: "#365a7a", marginTop: 4, fontSize: 12 }}>
                  Scan. Connect. Help.
                </Text>
              </View>
            </View>
          </View>
        ) : hasBaseQr ? (
          <View
            style={{
              width: "100%",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#2b4c73",
              padding: 12,
            }}
          >
            <Text style={[appStyles.subtitle, { marginTop: 0 }]}>
              Select all options and tap Confirm to see the final QR preview
              with tagline.
            </Text>
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
            <Text style={[appStyles.subtitle, { marginTop: 0 }]}>
              QR unavailable: full name and contact number are required.
            </Text>
          </View>
        )}

        <Pressable
          style={[
            appStyles.button,
            {
              marginTop: 14,
              width: "100%",
              backgroundColor:
                confirmed && hasBaseQr ? colors.primary : "#334155",
            },
          ]}
          onPress={handleDownload}
          disabled={!confirmed || !hasBaseQr}
        >
          <Ionicons name="download" size={16} color="#fff" />
          <Text style={appStyles.buttonText}>Download QR</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
