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
    primaryContainer: "#5b73f0", // 👈 brighter for contrast

    /* Success */
    tertiary: "#006431",

    /* Text */
    onSurface: "#191c1e",
    onSurfaceVariant: "#444655",

    /* Error */
    errorContainer: "#ffdad6",

    logout: "#f87171",
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
    paddingVertical: 16, // ⬆ better touch + weight
    paddingHorizontal: 24, // ⬅ FIX: missing before
    borderRadius: theme.radius.full,
    alignItems: "center",
    justifyContent: "center", // ⬅ ensure vertical centering
    flexDirection: "row", // ⬅ for icon support
    gap: 8, // ⬅ spacing between text/icon
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

  sectionTitle: {
    ...typography.headlineLg,
    color: theme.colors.onSurface,
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

  ctaWrapper: {
    marginTop: theme.spacing.xl,
  },

  ctaContainer: {
    padding: theme.spacing.xxl,
    borderRadius: theme.radius.xl,
    alignItems: "center",
    gap: theme.spacing.lg,
    overflow: "hidden",
  },

  ctaTitle: {
    ...typography.headlineLg,
    color: "#fff",
    textAlign: "center",
  },

  ctaSubtitle: {
    ...typography.bodyLg,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    maxWidth: 280,
  },

  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: theme.radius.full,
    backgroundColor: "#fff",
  },

  ctaButtonText: {
    color: theme.colors.primary,
    fontWeight: "700",
  },

  /* Glow (Glass-like softness) */
  ctaGlowTop: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.1)",
    top: -60,
    right: -60,
  },

  ctaGlowBottom: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.1)",
    bottom: -60,
    left: -60,
  },

  footer: {
    marginTop: theme.spacing.xxl,
    paddingVertical: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.surfaceLow,
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
    alignItems: "center",
    gap: theme.spacing.xl,
  },

  footerBrand: {
    alignItems: "center",
    gap: theme.spacing.sm,
  },

  footerLogoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },

  footerLogoText: {
    ...typography.headlineLg,
    color: theme.colors.primary,
  },

  footerTagline: {
    ...typography.bodyLg,
    color: theme.colors.onSurfaceVariant,
    textAlign: "center",
  },

  footerLinks: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: theme.spacing.lg,
  },

  footerBottom: {
    ...typography.labelMd,
    color: theme.colors.onSurfaceVariant,
    opacity: 0.6,
  },

  signupContent: {
    padding: theme.spacing.lg,
    gap: theme.spacing.xl,
  },

  signupHeader: {
    gap: theme.spacing.sm,
  },

  signupTitle: {
    ...typography.displayLg,
    fontSize: 36,
    color: theme.colors.onSurface,
  },

  signupSubtitle: {
    ...typography.bodyLg,
    color: theme.colors.onSurfaceVariant,
  },

  /* FORM LAYERING */
  formWrapper: {
    backgroundColor: theme.colors.surfaceLow,
    padding: theme.spacing.sm,
    borderRadius: theme.radius.lg,
  },

  formCard: {
    backgroundColor: theme.colors.surfaceLowest,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.lg,
    gap: theme.spacing.lg,
  },

  /* INPUT SYSTEM */
  inputGroup: {
    gap: theme.spacing.xs,
  },

  label: {
    ...typography.labelMd,
    color: theme.colors.onSurfaceVariant,
  },

  input: {
    backgroundColor: theme.colors.surfaceHighest,
    borderRadius: theme.radius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    color: theme.colors.onSurface,
  },

  /* SWITCH */
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  forgotWrapper: {
    alignItems: "flex-end",
    marginTop: -8,
  },

  forgotText: {
    ...typography.labelMd,
    color: theme.colors.primary,
  },

  signupLinkWrapper: {
    alignItems: "center",
    gap: theme.spacing.xs,
  },

  signupText: {
    ...typography.bodyLg,
    color: theme.colors.onSurfaceVariant,
  },

  signupLink: {
    ...typography.titleMd,
    color: theme.colors.primary,
  },
  textArea: {
    backgroundColor: theme.colors.surfaceHighest,
    borderRadius: theme.radius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    color: theme.colors.onSurface,
    minHeight: 120,
    textAlignVertical: "top", // important for Android
  },

  contactInfo: {
    alignItems: "center",
    gap: theme.spacing.xs,
  },

  contactText: {
    ...typography.bodyLg,
    color: theme.colors.onSurfaceVariant,
  },

  contactLink: {
    ...typography.titleMd,
    color: theme.colors.primary,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  logoIcon: {
    backgroundColor: "#e6eef8",
    padding: 6,
    borderRadius: 10,
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
    padding: 6,
  },

  backdrop: {
    flex: 1,
    backgroundColor: "rgba(25,28,30,0.4)",
    alignItems: "flex-end",
  },

  drawer: {
    width: 260,
    height: "100%",
    backgroundColor: theme.colors.surfaceLow,
    paddingTop: 56,
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 8,
  },

  drawerHeader: {
    marginBottom: 24,
    gap: 4,
  },

  drawerTitle: {
    color: theme.colors.onSurface,
    fontSize: 16,
    fontWeight: "700",
  },

  drawerSub: {
    color: theme.colors.primary,
    fontSize: 12,
  },

  navItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
  },

  navLabel: {
    color: theme.colors.onSurface,
    fontSize: 15,
    fontWeight: "500",
  },

  logoutItem: {
    marginTop: 16,
  },
});
