import { Colors } from "@/constants/theme";
import {
  DarkTheme,
  DefaultTheme,
  type Theme,
} from "@react-navigation/native";

export function getNavigationTheme(
  colorScheme: "light" | "dark" | null | undefined,
): Theme {
  const isDark = colorScheme === "dark";
  const appTheme = Colors[isDark ? "dark" : "light"];
  const baseTheme = isDark ? DarkTheme : DefaultTheme;

  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: appTheme.primary,
      background: appTheme.background,
      card: appTheme.surface,
      text: appTheme.text,
      border: appTheme.border,
    },
  };
}
