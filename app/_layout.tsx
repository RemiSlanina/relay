// import { CardsProvider } from "@/cards/CardsContext";
// import { Slot } from "expo-router";

// export default function RootLayout() {
//   return (
//     <CardsProvider>
//       <Slot />
//     </CardsProvider>
//   );
// }

import ErrorBanner from "@/components/ErrorBanner";
import { Colors } from "@/constants/theme";
import { AccessibilityProvider } from "@/domain/accessibility/AccessibilityContext";
import { CardsProvider, useCards } from "@/domain/cards/CardsContext";
import { DisclosureProvider } from "@/domain/disclosures/DisclosureContext";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { Platform, useColorScheme } from "react-native";
import { useEffect } from "react";

function AppLayout() {
  const { persistenceError } = useCards();
  const colorScheme = useColorScheme();

  const navigationTheme = colorScheme === "dark" 
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          primary: Colors.dark.primary,
          background: Colors.dark.background,
          card: Colors.dark.surface,
          text: Colors.dark.text,
          border: Colors.dark.border,
        },
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          primary: Colors.light.primary,
          background: Colors.light.background,
          card: Colors.light.surface,
          text: Colors.light.text,
          border: Colors.light.border,
        },
      };

  useEffect(() => {
    if (Platform.OS === "web" && typeof document !== "undefined") {
      document.body.style.backgroundColor = navigationTheme.colors.background;
    }
  }, [navigationTheme.colors.background]);

  return (
    <ThemeProvider value={navigationTheme}>
      {persistenceError && <ErrorBanner message={persistenceError} />}
      <Stack />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <CardsProvider>
      <DisclosureProvider>
        <AccessibilityProvider>
          <AppLayout />
        </AccessibilityProvider>
      </DisclosureProvider>
    </CardsProvider>
  );
}
