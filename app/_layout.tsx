import { CardsProvider } from "@/cards/CardsContext";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <CardsProvider>
      <Slot />
    </CardsProvider>
  );
}
