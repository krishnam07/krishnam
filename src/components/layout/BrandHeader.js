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

// Routes shown when user is NOT logged in
const guestNavItems = [
  { label: "Home", route: "Home", icon: Home },
  { label: "Sign In", route: "Login", icon: LogIn },
  { label: "Register", route: "Register", icon: UserPlus },
  { label: "Scan QR", route: "Scanner", icon: ScanLine },
];

// Routes shown when user IS logged in
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

  // Check auth state every time menu opens
  useEffect(() => {
    async function checkAuth() {
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
      {/* Header title row */}
      <View style={styles.row}>
        <Pressable
          onPress={() => navigation.navigate("Home")}
          style={styles.logoRow}
          hitSlop={8}
        >
          <View style={styles.logoIcon}>
            <Search size={16} color="#e6eef8" />
          </View>
          <View>
            <Text style={styles.logoText}>Find My Things</Text>
            <Text style={styles.logoSub}>Tag. Scan. Recover.</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => setMenuOpen(true)}
          style={styles.menuBtn}
          hitSlop={8}
        >
          <Menu size={22} color="#e6eef8" />
        </Pressable>
      </View>

      {/* Full-screen menu modal */}
      <Modal
        visible={menuOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setMenuOpen(false)}>
          <Pressable style={styles.drawer} onPress={() => {}}>
            {/* Drawer header */}
            <View style={styles.drawerHeader}>
              <View>
                <Text style={styles.drawerTitle}>Find My Things</Text>
                {isLoggedIn && userName ? (
                  <Text style={styles.drawerSub}>Hi, {userName}</Text>
                ) : (
                  <Text style={styles.drawerSub}>Guest</Text>
                )}
              </View>
              <Pressable onPress={() => setMenuOpen(false)} hitSlop={8}>
                <X size={22} color="#e6eef8" />
              </Pressable>
            </View>

            {/* Nav items */}
            {navItems.map(({ label, route, icon: Icon }) => (
              <TouchableOpacity
                key={route}
                style={styles.navItem}
                onPress={() => handleNavigate(route)}
                activeOpacity={0.7}
              >
                <Icon size={18} color="#cfe6ff" />
                <Text style={styles.navLabel}>{label}</Text>
              </TouchableOpacity>
            ))}

            {/* Logout button for logged-in users */}
            {isLoggedIn && (
              <TouchableOpacity
                style={[styles.navItem, styles.logoutItem]}
                onPress={handleLogout}
                activeOpacity={0.7}
              >
                <LogOut size={18} color="#f87171" />
                <Text style={[styles.navLabel, { color: "#f87171" }]}>
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

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoIcon: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 6,
    borderRadius: 8,
  },
  logoText: {
    color: "#e6eef8",
    fontSize: 15,
    fontWeight: "700",
  },
  logoSub: {
    color: "#cfe6ff",
    fontSize: 10,
  },
  menuBtn: {
    padding: 4,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  drawer: {
    width: 260,
    minHeight: "100%",
    backgroundColor: "#0f1724",
    paddingTop: 56,
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 4,
  },
  drawerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(230,238,248,0.12)",
  },
  drawerTitle: {
    color: "#e6eef8",
    fontSize: 16,
    fontWeight: "700",
  },
  drawerSub: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 2,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 13,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  navLabel: {
    color: "#e6eef8",
    fontSize: 15,
    fontWeight: "500",
  },
  logoutItem: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(230,238,248,0.12)",
    paddingTop: 16,
  },
});
