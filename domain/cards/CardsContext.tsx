// fix bug (STACK)
import { createContext, useContext, useState, useEffect } from "react";
import { Card } from "./Card";
import { TEMPLATE_CARDS } from "./cards.templates";
import { CardStorage, mergeCardsWithTemplates } from "./cards.storage";

type CardsContextValue = {
  cards: Card[];
  getCardById: (id: string) => Card | undefined;
  addCard: (card: Card) => void;
  updateCard: (card: Card) => void;
  deleteCard: (cardId: string) => void;
  loaded: boolean; // Track if initial load is complete
};

const CardsContext = createContext<CardsContextValue | null>(null);

export function CardsProvider({ children }: { children: React.ReactNode }) {
  const [cards, setCards] = useState<Card[]>(TEMPLATE_CARDS);
  const [loaded, setLoaded] = useState(false);

  // Load saved cards when provider initializes
  useEffect(() => {
    async function loadSavedCards() {
      try {
        const savedUserCards = await CardStorage.loadCards();
        const mergedCards = mergeCardsWithTemplates(savedUserCards, TEMPLATE_CARDS);
        setCards(mergedCards);
      } catch (error) {
        console.error('Failed to load saved cards:', error);
        // Fall back to just template cards if loading fails
        setCards(TEMPLATE_CARDS);
      } finally {
        setLoaded(true);
      }
    }
    
    loadSavedCards();
  }, []);

  // Save cards whenever they change (after initial load)
  useEffect(() => {
    if (loaded) {
      CardStorage.saveCards(cards);
    }
  }, [cards, loaded]);

  function getCardById(id: string) {
    return cards.find((c) => c.id === id);
  }

  function addCard(card: Card) {
    setCards((prev) => [...prev, card]);
  }

  function updateCard(card: Card) {
    setCards((prev) => prev.map((c) => (c.id === card.id ? card : c)));
  }

  function deleteCard(cardId: string) {
    setCards((prev) => prev.filter((c) => c.id !== cardId));
  }

  return (
    <CardsContext.Provider value={{ cards, getCardById, addCard, updateCard, deleteCard, loaded }}>
      {children}
    </CardsContext.Provider>
  );
}

export function useCards() {
  const ctx = useContext(CardsContext);
  if (!ctx) {
    throw new Error("useCards must be used inside CardsProvider");
  }
  return ctx;
}
