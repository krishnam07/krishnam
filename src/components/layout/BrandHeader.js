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
      {/* HEADER */}
      <View style={styles.row}>
        <Pressable
          onPress={() => navigation.navigate("Home")}
          style={styles.logoRow}
        >
          <View style={styles.logoIcon}>
            <Search size={16} color={theme.colors.primary} />
          </View>

          <View>
            <Text style={styles.logoText}>Find My Things</Text>
            <Text style={styles.logoSub}>Tag. Scan. Recover.</Text>
          </View>
        </Pressable>

        <Pressable onPress={() => setMenuOpen(true)} style={styles.menuBtn}>
          <Menu size={22} color={theme.colors.onSurface} />
        </Pressable>
      </View>

      {/* DRAWER */}
      <Modal
        visible={menuOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setMenuOpen(false)}>
          <Pressable style={styles.drawer} onPress={() => {}}>
            {/* HEADER */}
            <View style={styles.drawerHeader}>
              <View>
                <Text style={styles.drawerTitle}>Find My Things</Text>

                <Text style={styles.drawerSub}>
                  {isLoggedIn && userName ? `Hi, ${userName}` : "Guest"}
                </Text>
              </View>

              <Pressable onPress={() => setMenuOpen(false)}>
                <X size={22} color={theme.colors.onSurface} />
              </Pressable>
            </View>

            {/* NAV ITEMS */}
            {navItems.map(({ label, route, icon: Icon }) => (
              <TouchableOpacity
                key={route}
                style={styles.navItem}
                onPress={() => handleNavigate(route)}
                activeOpacity={0.7}
              >
                <Icon size={18} color={theme.colors.onSurface} />
                <Text style={styles.navLabel}>{label}</Text>
              </TouchableOpacity>
            ))}

            {/* LOGOUT */}
            {isLoggedIn && (
              <TouchableOpacity
                style={[styles.navItem, styles.logoutItem]}
                onPress={handleLogout}
              >
                <LogOut size={18} color={theme.colors.tertiary} />
                <Text
                  style={[styles.navLabel, { color: theme.colors.tertiary }]}
                >
                  Logout
                </Text>
              </TouchableOpacity>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};
