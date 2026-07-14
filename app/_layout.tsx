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
import { getNavigationTheme } from "@/constants/navigation-theme";
import { AccessibilityProvider } from "@/domain/accessibility/AccessibilityContext";
import { CardsProvider, useCards } from "@/domain/cards/CardsContext";
import { DisclosureProvider } from "@/domain/disclosures/DisclosureContext";
import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

function AppLayout() {
  const { persistenceError } = useCards();
  const navigationTheme = getNavigationTheme(useColorScheme());

  return (
    <>
      {persistenceError && <ErrorBanner message={persistenceError} />}
      <ThemeProvider value={navigationTheme}>
        <Stack />
      </ThemeProvider>
    </>
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
