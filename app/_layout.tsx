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
import { AccessibilityProvider } from "@/domain/accessibility/AccessibilityContext";
import { CardsProvider, useCards } from "@/domain/cards/CardsContext";
import { DisclosureProvider } from "@/domain/disclosures/DisclosureContext";
import { Stack } from "expo-router";

function AppLayout() {
  const { persistenceError } = useCards();

  return (
    <>
      {persistenceError && <ErrorBanner message={persistenceError} />}
      <Stack />
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
