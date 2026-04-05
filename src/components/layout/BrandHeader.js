import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  Search,
  Menu,
  X,
  User,
  QrCode,
  ScanLine,
  Home,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react-native";

import { getToken, getUser, clearSession } from "../../services";
import { theme, styles } from "../../styles";

//
// 🔥 MOCK MODE
// "auth"  → logged in
// "guest" → logged out
// "real"  → actual backend
//
const MOCK_MODE = "guest";

const guestNavItems = [
  { label: "Home", route: "Home", icon: Home },
  { label: "Sign In", route: "Login", icon: LogIn },
  { label: "Register", route: "Register", icon: UserPlus },
  { label: "Scan QR", route: "Scanner", icon: ScanLine },
];

const authNavItems = [
  { label: "Home", route: "Home", icon: Home },
  { label: "Profile", route: "Profile", icon: User },
  { label: "My QR Code", route: "QR", icon: QrCode },
  { label: "Customize QR", route: "CustomizeQR", icon: QrCode },
  { label: "Scan QR", route: "Scanner", icon: ScanLine },
];

export const BrandHeader = ({ navigation }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      // ✅ MOCK AUTH
      if (MOCK_MODE === "auth") {
        setIsLoggedIn(true);
        setUserName("Vishal Dev");
        return;
      }

      if (MOCK_MODE === "guest") {
        setIsLoggedIn(false);
        setUserName(null);
        return;
      }

      // ✅ REAL AUTH
      const token = await getToken();
      const user = await getUser();

      setIsLoggedIn(!!token && !!user);
      setUserName(user?.name || null);
    }

    checkAuth();
  }, [menuOpen]);

  async function handleLogout() {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await clearSession();
          setMenuOpen(false);
          setIsLoggedIn(false);
          navigation.navigate("Home");
        },
      },
    ]);
  }

  function handleNavigate(route) {
    setMenuOpen(false);
    navigation.navigate(route);
  }

  const navItems = isLoggedIn ? authNavItems : guestNavItems;

  return (
    <>
      <View style={styles.headerContainer}>
        <Pressable
          onPress={() => navigation.navigate("Home")}
          style={styles.logoRow}
        >
          <View style={styles.logoTextWrap}>
            <Text style={styles.logoText}>Find My Things</Text>
            <Text style={styles.logoSub}>Tag. Scan. Recover.</Text>
          </View>
        </Pressable>

        <View style={styles.rightActions}>
          <View style={styles.logoIcon}>
            <Search size={16} color={theme.colors.primary} />
          </View>

          <Pressable onPress={() => setMenuOpen(true)} style={styles.menuBtn}>
            <Menu size={22} color={theme.colors.onSurface} />
          </Pressable>
        </View>
      </View>

      {/* DRAWER */}
      <Modal
        visible={menuOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setMenuOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setMenuOpen(false)}>
          <Pressable style={styles.bottomSheet} onPress={() => {}}>
            {/* Drag Handle */}
            <View style={styles.dragHandle} />

            {/* HEADER */}
            <View style={styles.sheetHeader}>
              <View>
                <Text style={styles.sheetTitle}>Find My Things</Text>
                <Text style={styles.sheetSub}>
                  {isLoggedIn && userName ? `Hi, ${userName}` : "Guest"}
                </Text>
              </View>

              <Pressable onPress={() => setMenuOpen(false)}>
                <X size={22} color={theme.colors.onSurface} />
              </Pressable>
            </View>

            {/* NAV ITEMS */}
            <View style={styles.navList}>
              {navItems.map(({ label, route, icon: Icon }) => (
                <Pressable
                  key={route}
                  style={({ pressed }) => [
                    styles.navItem,
                    pressed && { opacity: 0.7 },
                  ]}
                  onPress={() => handleNavigate(route)}
                >
                  <View style={styles.navIcon}>
                    <Icon size={18} color={theme.colors.primary} />
                  </View>

                  <Text style={styles.navLabel}>{label}</Text>
                </Pressable>
              ))}
            </View>

            {/* LOGOUT */}
            {isLoggedIn && (
              <Pressable style={styles.logoutBtn} onPress={handleLogout}>
                <LogOut size={18} color="#fff" />
                <Text style={styles.logoutText}>Logout</Text>
              </Pressable>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};
