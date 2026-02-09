import { useState } from "react";
import { Disclosure } from "./Disclosure";
import { DISCLOSURE_TEMPLATES } from "./disclosure.templates";

export function useCardsStore() {
  const [disclosures, setDisclosure] =
    useState<Disclosure[]>(DISCLOSURE_TEMPLATES);

  function getCardById(id: string) {
    return disclosures.find((c) => c.id === id);
  }

  function addCard(card: Disclosure) {
    setDisclosure((prev) => [...prev, card]);
  }

  function updateCard(card: Disclosure) {
    setDisclosure((prev) => prev.map((c) => (c.id === card.id ? card : c)));
  }

  return { disclosures, addCard, updateCard, getCardById };
}
