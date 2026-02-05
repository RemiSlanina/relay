//TODO
import { createContext, useContext, useState } from "react";
import { Card } from "./Card";
import { TEMPLATE_CARDS } from "./cards.templates";

type CardsContextValue = {
  cards: Card[];
  getCardById: (id: string) => Card | undefined;
  addCard: (card: Card) => void;
  updateCard: (card: Card) => void;
};

const CardsContext = createContext<CardsContextValue | null>(null);

export function CardsProvider({ children }: { children: React.ReactNode }) {
  const [cards, setCards] = useState<Card[]>(TEMPLATE_CARDS);

  function getCardById(id: string) {
    return cards.find((c) => c.id === id);
  }

  // addCard updateCard
  function addCard(card: Card) {
    setCards((prev) => [...prev, card]);
  }

  function updateCard(card: Card) {
    setCards((prev) => prev.map((c) => (c.id === card.id ? card : c)));
  }

  return (
    <CardsContext.Provider value={{ cards, getCardById, addCard, updateCard }}>
      {children}
    </CardsContext.Provider>
  );
}

export function useCardsStore() {
  const ctx = useContext(CardsContext);
  if (!ctx) {
    throw new Error("useCardsStore must be used inside CardsProvider");
  }
  return ctx;
}
