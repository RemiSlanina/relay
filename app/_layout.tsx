// import { CardsProvider } from "@/cards/CardsContext";
// import { Slot } from "expo-router";

// export default function RootLayout() {
//   return (
//     <CardsProvider>
//       <Slot />
//     </CardsProvider>
//   );
// }

import { CardsProvider } from "@/cards/CardsContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <CardsProvider>
      <Stack />
    </CardsProvider>
  );
}
