import { useState } from "react";
import { Card } from "./Card";
import { TEMPLATE_CARDS } from "./cards.templates";

export function useCardsStore() {
  const [cards, setCards] = useState<Card[]>(TEMPLATE_CARDS);

  function getCardById(id: string) {
    return cards.find((c) => c.id === id);
  }

  function addCard(card: Card) {
    setCards((prev) => [...prev, card]);
  }

  function updateCard(card: Card) {
    setCards((prev) => prev.map((c) => (c.id === card.id ? card : c)));
  }

  return { cards, addCard, updateCard, getCardById };
}
