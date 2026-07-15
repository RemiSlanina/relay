import { createContext, useContext, useEffect, useState } from "react";
import { Card } from "./Card";
import { CardStorage } from "./cards.storage";
import { initializeCards } from "./cards.import";

type CardsContextValue = {
  cards: Card[];
  getCardById: (id: string) => Card | undefined;
  addCard: (card: Card) => void;
  updateCard: (card: Card) => void;
  deleteCard: (cardId: string) => void;
  loaded: boolean; // Track if initial load is complete
  persistenceError: string | null;
  hasUnsavedChanges: boolean;
};

const CardsContext = createContext<CardsContextValue | null>(null);

export function CardsProvider({ children }: { children: React.ReactNode }) {
  const [cards, setCards] = useState<Card[]>([]); // [] or TEMPLATE_CARDS
  const [loaded, setLoaded] = useState(false);
  const [persistenceError, setPersistenceError] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);

  // initialize cards:
  useEffect(() => {
    const loadCards = async () => {
      const initializedCards = await initializeCards();

      setCards(initializedCards);
      setLoaded(true);
    };

    loadCards();
  }, []);

  // Save cards whenever they change (after initial load)
  useEffect(() => {
    if (!loaded) return;

    const persistCards = async () => {
      setHasUnsavedChanges(true);
      try {
        const ok = await CardStorage.saveCards(cards);
        //console.log("ok: ", ok);

        if (!ok) {
          console.error("saveCards() reported failure.");
          setPersistenceError("Could not save changes.");
          // Future TODO:
          // - track whether there are unsaved changes
          // - retry failed persistence
          // - warn before closing if changes are still unsaved
        } else {
          setPersistenceError(null);
          setHasUnsavedChanges(false);
        }
      } catch (error) {
        console.error("saveCards() threw:", error);
        setPersistenceError("Could not save changes.");
      }
    };

    persistCards();
  }, [cards, loaded]);

  function getCardById(id: string) {
    return cards.find((c) => c.id === id);
  }

  function addCard(card: Card) {
    setCards((prev) => [...prev, card]);
  }

  function updateCard(updated: Card) {
    //setCards((prev) => prev.map((c) => (c.id === card.id ? card : c)));
    setCards((prev) => {
      let changed = false;

      const next = prev.map((card) => {
        if (card.id !== updated.id) {
          return card;
        }

        changed = true;
        return updated;
      });
      if (!changed) {
        // no card with this id was found
        console.warn(`updateCard(): no card found with id "${updated.id}".`);
        return prev;
      }
      return next;
    });
  }

  function deleteCard(cardId: string) {
    // console.log("Context deleting:", cardId);
    setCards((prev) => {
      // console.log("Before:", prev.length);
      const next = prev.filter((c) => c.id !== cardId);
      // console.log("After:", next.length);
      return next;
    });
  }

  return (
    <CardsContext.Provider
      value={{
        cards,
        getCardById,
        addCard,
        updateCard,
        deleteCard,
        loaded,
        persistenceError,
        hasUnsavedChanges,
      }}
    >
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
