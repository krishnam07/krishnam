import { StyleSheet } from "react-native";

/* =========================
   🎨 TYPOGRAPHY (Editorial)
========================= */
export const typography = {
  displayLg: {
    fontSize: 56,
    letterSpacing: -1.5,
    fontWeight: "700",
  },

  headlineLg: {
    fontSize: 32,
    fontWeight: "600",
  },

  titleMd: {
    fontSize: 20,
    fontWeight: "700",
  },

  bodyLg: {
    fontSize: 16,
    fontWeight: "400",
  },

  labelMd: {
    fontSize: 12,
    fontWeight: "500",
  },
};

/* =========================
   🎨 COLORS (Strict DS)
========================= */
export const theme = {
  colors: {
    /* Base */
    surface: "#f7f9fb",

    /* Surface Layers (NO-LINE RULE CORE) */
    surfaceLow: "#f2f4f6",
    surfaceLowest: "#ffffff",
    surfaceHigh: "#e6e8ea",
    surfaceHighest: "#e0e3e5",

    /* Brand */
    primary: "#2346d5",
    primaryContainer: "#4361ee",

    /* Success */
    tertiary: "#006431",

    /* Text */
    onSurface: "#191c1e",
    onSurfaceVariant: "#444655",

    /* Error */
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
    lg: 24,
    xl: 32,
    full: 9999,
  },
};

/* =========================
   🧱 GLOBAL STYLES
========================= */
export const styles = StyleSheet.create({
  /* Screen */
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },

  content: {
    padding: theme.spacing.lg,
    gap: theme.spacing.xl,
  },

  /* =========================
     HEADER (Glass Ready)
  ========================= */
  header: {
    height: 80,
    paddingHorizontal: theme.spacing.lg,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(247,249,251,0.8)",
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },

  logoIcon: {
    backgroundColor: "rgba(35,70,213,0.1)",
    padding: theme.spacing.sm,
    borderRadius: theme.radius.md,
  },

  logoText: {
    ...typography.headlineLg,
    color: theme.colors.primary,
  },

  /* =========================
     HERO
  ========================= */
  hero: {
    gap: theme.spacing.lg,
  },

  heading: {
    ...typography.displayLg,
    color: theme.colors.onSurface,
  },

  subText: {
    ...typography.bodyLg,
    color: theme.colors.onSurfaceVariant,
  },

  buttonRow: {
    flexDirection: "row",
    gap: theme.spacing.sm,
  },

  /* =========================
     BUTTONS
  ========================= */
  primaryBtn: {
    paddingVertical: 14,
    borderRadius: theme.radius.full,
    alignItems: "center",
    flex: 1,
  },

  primaryText: {
    color: "#fff",
    fontWeight: "700",
  },

  secondaryBtn: {
    backgroundColor: theme.colors.surfaceLow,
    paddingVertical: 14,
    borderRadius: theme.radius.full,
    alignItems: "center",
    flex: 1,
  },

  /* =========================
     IMAGE
  ========================= */
  heroImage: {
    width: "100%",
    height: 250,
    borderRadius: theme.radius.xl,
  },

  /* =========================
     SECTION (NO DIVIDERS)
  ========================= */
  section: {
    paddingVertical: theme.spacing.xl,
    gap: theme.spacing.xl,
  },

  sectionHeader: {
    alignItems: "center",
    gap: theme.spacing.sm,
  },

  sectionTitle: {
    ...typography.headlineLg,
    color: theme.colors.onSurface,
  },

  sectionSubtitle: {
    ...typography.bodyLg,
    color: theme.colors.onSurfaceVariant,
    textAlign: "center",
  },

  /* =========================
     CARD SYSTEM (Layered)
  ========================= */
  cardWrapper: {
    backgroundColor: theme.colors.surfaceLow,
    padding: theme.spacing.sm,
    borderRadius: theme.radius.lg,
  },

  card: {
    backgroundColor: theme.colors.surfaceLowest,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.lg,
  },

  cardTitle: {
    ...typography.titleMd,
    color: theme.colors.onSurface,
  },

  cardDesc: {
    ...typography.bodyLg,
    color: theme.colors.onSurfaceVariant,
  },

  /* =========================
     STEP SYSTEM
  ========================= */
  stepsContainer: {
    gap: theme.spacing.xl,
  },

  step: {
    alignItems: "center",
    gap: theme.spacing.lg,
  },

  stepIconWrapper: {
    backgroundColor: theme.colors.surfaceLow,
    padding: theme.spacing.sm,
    borderRadius: theme.radius.lg,
  },

  stepIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  stepNumber: {
    color: "#fff",
    fontWeight: "700",
  },

  stepContent: {
    alignItems: "center",
    gap: theme.spacing.sm,
  },

  stepTitle: {
    ...typography.titleMd,
    color: theme.colors.onSurface,
  },

  stepDescription: {
    ...typography.bodyLg,
    color: theme.colors.onSurfaceVariant,
    textAlign: "center",
  },

  /* =========================
     INPUT (Soft Inset)
  ========================= */
  input: {
    backgroundColor: theme.colors.surfaceHighest,
    borderRadius: theme.radius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    color: theme.colors.onSurface,
  },
});
