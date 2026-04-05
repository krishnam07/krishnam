import { StyleSheet } from "react-native";

export const typography = {
  displayLg: {
    fontSize: 56,
    letterSpacing: -1,
    fontWeight: "700",
  },

  headlineLg: {
    fontSize: 32,
    fontWeight: "600",
  },

  bodyLg: {
    fontSize: 16,
    fontWeight: "400",
  },

  labelMd: {
    fontSize: 12,
    color: "#444655",
  },
};

export const theme = {
  colors: {
    // Base
    surface: "#f7f9fb",

    // Surface layers
    surfaceLow: "#f2f4f6",
    surfaceLowest: "#ffffff",
    surfaceHigh: "#e6e8ea",
    surfaceHighest: "#e0e3e5",

    // Primary (Lost state)
    primary: "#2346d5",
    primaryContainer: "#4361ee",

    // Success (Found state)
    tertiary: "#006431",

    // Text
    onSurface: "#191c1e",
    onSurfaceVariant: "#444655",

    // Error
    errorContainer: "#ffdad6",
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },

  radius: {
    sm: 8,
    md: 16,
    lg: 32,
    full: 9999,
  },
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },

  header: {
    height: 80,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(247,249,251,0.8)",
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  logoIcon: {
    backgroundColor: "rgba(35,70,213,0.1)",
    padding: 8,
    borderRadius: 12,
  },

  logoText: {
    fontSize: 20,
    fontWeight: "800",
    color: theme.colors.primary,
  },

  menu: {
    padding: 20,
    backgroundColor: theme.colors.surface,
    gap: 20,
  },

  menuItem: {
    fontSize: 18,
    fontWeight: "600",
  },

  menuButton: {
    padding: 16,
    borderRadius: 999,
    alignItems: "center",
  },

  menuButtonText: {
    color: "white",
    fontWeight: "700",
  },

  content: {
    padding: 20,
    gap: 40,
  },

  hero: {
    gap: 20,
  },

  heading: {
    fontSize: 36,
    fontWeight: "800",
    color: theme.colors.onSurface,
  },

  subText: {
    fontSize: 16,
    color: theme.colors.onSurfaceVariant,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 10,
  },

  primaryBtn: {
    padding: 14,
    borderRadius: 999,
    flex: 1,
    alignItems: "center",
  },

  primaryText: {
    color: "white",
    fontWeight: "700",
  },

  secondaryBtn: {
    backgroundColor: theme.colors.surfaceLow,
    padding: 14,
    borderRadius: 999,
    flex: 1,
    alignItems: "center",
  },

  heroImage: {
    width: "100%",
    height: 250,
    borderRadius: 24,
  },

  section: {
    gap: 20,
  },

  sectionTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: theme.colors.onSurface,
  },

  cardWrapper: {
    backgroundColor: theme.colors.surfaceLow,
    padding: 10,
    borderRadius: 24,
  },

  card: {
    backgroundColor: theme.colors.surfaceLowest,
    padding: 20,
    borderRadius: 24,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.onSurface,
  },

  cardDesc: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
  },

  section: {
    paddingVertical: theme.spacing.xl,
    gap: theme.spacing.xl, // spacing replaces dividers
  },

  header: {
    alignItems: "center",
    gap: theme.spacing.sm,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: theme.colors.onSurface,
  },

  subtitle: {
    fontSize: 16,
    color: theme.colors.onSurfaceVariant,
    textAlign: "center",
    maxWidth: 300,
  },

  stepsContainer: {
    gap: theme.spacing.xl, // ❌ no divider line
  },

  step: {
    alignItems: "center",
    gap: theme.spacing.lg,
  },

  stepIconWrapper: {
    // creates layering effect instead of border
    backgroundColor: theme.colors.surfaceLow,
    padding: 8,
    borderRadius: theme.radius.lg,
  },

  stepIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  stepNumber: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },

  stepContent: {
    alignItems: "center",
    gap: theme.spacing.sm,
  },

  stepTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.onSurface,
  },

  stepDescription: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    textAlign: "center",
    lineHeight: 20,
    maxWidth: 260,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.bg,
  },
  card: {
    backgroundColor: "#1a2540",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: colors.subtext,
  },
  input: {
    backgroundColor: "#243050",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: colors.text,
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 999,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
});

// Legacy aliases for older screens
export const colors = {
  bg: "#0f1724",
  primary: theme.colors.primary,
  success: "#22c55e",
  warning: "#f59e0b",
  text: "#e6eef8",
  subtext: "#94a3b8",
};
