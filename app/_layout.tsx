// import { CardsProvider } from "@/cards/CardsContext";
// import { Slot } from "expo-router";

// export default function RootLayout() {
//   return (
//     <CardsProvider>
//       <Slot />
//     </CardsProvider>
//   );
// }

import { CardsProvider } from "@/domain/cards/CardsContext";
import { DisclosureProvider } from "@/domain/disclosures/DisclosureContext";
import { AccessibilityProvider } from "@/domain/accessibility/AccessibilityContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  // {console.log("RootLayout rendered")}
  return (
    <CardsProvider>
      <DisclosureProvider>
        <AccessibilityProvider>
          <Stack />
        </AccessibilityProvider>
      </DisclosureProvider>
    </CardsProvider>
  );
}
