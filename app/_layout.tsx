// import { CardsProvider } from "@/cards/CardsContext";
// import { Slot } from "expo-router";

// export default function RootLayout() {
//   return (
//     <CardsProvider>
//       <Slot />
//     </CardsProvider>
//   );
// }

import { CardsStoreProvider } from "@/domain/cards/CardsContext";
import { DisclosureStoreProvider } from "@/domain/disclosures/DisclosureContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  // {console.log("RootLayout rendered")}
  return (
    <CardsStoreProvider>
      <DisclosureStoreProvider>
        <Stack />
      </DisclosureStoreProvider>
    </CardsStoreProvider>
  );
}
