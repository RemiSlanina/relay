/**
 * Theme system for Relay app
 * Designed for accessibility and neurodivergent users
 * Uses calm colors, high contrast, and clear typography
 */

import { Appearance } from "react-native";

// Color palette designed for low sensory overload
export const palette = {
  // Calm, accessible colors
  primary: "#6B8CAE", // Soft blue - calming but visible
  primaryDark: "#4A6B8A", // Darker variant
  secondary: "#8FAE9F", // Soft green - restful
  background: "#F8F9FA", // Very light gray - reduces glare
  backgroundDark: "#1E293B", // Dark blue-gray - less harsh than black
  surface: "#FFFFFF", // Pure white for cards
  surfaceDark: "#2A3441", // Dark surface
  text: "#2C3E50", // High contrast, readable text
  textDark: "#E8F0F5", // Light text for dark mode
  textSecondary: "#5d6768", // Secondary text
  textSecondaryDark: "#B8C5D1", // Secondary text dark mode
  border: "hsla(0, 0%, 88%, 0.2)", // Subtle borders
  borderDark: "hsla(212, 23%, 29%, 0.2)", // Dark mode borders
  error: "#E74C3C", // Error states
  success: "#2ECC71", // Success states
  warning: "#F39C12", // Warning states
};

export const Colors = {
  light: {
    background: palette.background,
    surface: palette.surface,
    text: palette.text,
    textSecondary: palette.textSecondary,
    primary: palette.primary,
    secondary: palette.secondary,
    border: palette.border,
    error: palette.error,
    success: palette.success,
    warning: palette.warning,
  },
  dark: {
    background: palette.backgroundDark,
    surface: palette.surfaceDark,
    text: palette.textDark,
    textSecondary: palette.textSecondaryDark,
    primary: palette.primaryDark,
    secondary: palette.secondary,
    border: palette.borderDark,
    error: palette.error,
    success: palette.success,
    warning: palette.warning,
  },
};

export const Spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
};

export const Typography = {
  // Font sizes - designed to be readable but not overwhelming
  xxs: 12,
  xs: 14,
  sm: 16,
  md: 18,
  lg: 20,
  xl: 24,
  xxl: 28,
  xxxl: 32,

  // Font weights - avoid extreme weights for readability
  light: "300" as const,
  regular: "400" as const,
  medium: "500" as const,
  semiBold: "600" as const,
  bold: "700" as const,
};

export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const BorderDesign = {
  light: 1,
  medium: 3,
  bold: 5,
};

// Get current color scheme
const colorScheme = Appearance.getColorScheme();

export function getCurrentTheme() {
  return colorScheme === "dark" ? Colors.dark : Colors.light;
}

export function getAdaptiveColor(lightColor: string, darkColor: string) {
  return colorScheme === "dark" ? darkColor : lightColor;
}
