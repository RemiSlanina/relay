/**
 * React Context for managing the application's card collection.
 *
 * This module provides a centralized API for accessing and modifying
 * the user's cards throughout the application.
 *
 * Responsibilities:
 * - initialize the user's card collection
 * - expose card state through React Context
 * - automatically persist changes
 * - expose persistence failures to the UI
 */

import { createContext, useContext, useEffect, useState } from "react";
import { Card, CardStorage, initializeCards } from ".";

/**
 * Public API exposed by the cards context.
 */
type CardsContextValue = {
  /**
   * The current collection of user cards.
   */
  cards: Card[];

  /**
   * Retrieves a card by its ID.
   * @returns The card with the matching ID, or undefined if not found.
   */
  getCardById: (id: string) => Card | undefined;

  /**
   * Adds a card to the current collection.
   */
  addCard: (card: Card) => void;

  /**
   * Updates an existing card in the collection.
   * The updated card will be automatically persisted.
   */
  updateCard: (card: Card) => void;

  /**
   * Removes a card from the collection by its ID.
   * The change will be automatically persisted.
   */
  deleteCard: (cardId: string) => void;

  /**
   * Indicates whether card initialization has completed.
   */
  loaded: boolean;

  /**
   * Error message from the last persistence failure, or null if successful.
   */
  persistenceError: string | null;

  /**
   * Indicates whether local changes have not yet been persisted.
   */
  hasUnsavedChanges: boolean;
};

const CardsContext = createContext<CardsContextValue | null>(null);

/**
 * Provides the cards context to the component tree.
 *
 * This component owns the application's card state and coordinates
 * initialization, updates, and persistence.
 */
export function CardsProvider({ children }: { children: React.ReactNode }) {
  const [cards, setCards] = useState<Card[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [persistenceError, setPersistenceError] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);

  // Initialize cards on mount by loading from storage or templates.
  useEffect(() => {
    const loadCards = async () => {
      const initializedCards = await initializeCards();

      setCards(initializedCards);
      setLoaded(true);
    };

    loadCards();
  }, []);

  // Automatically persist cards whenever they change (after initial load).
  useEffect(() => {
    if (!loaded) return;

    const persistCards = async () => {
      setHasUnsavedChanges(true);
      try {
        const ok = await CardStorage.saveCards(cards);

        if (!ok) {
          console.error("saveCards() reported failure.");
          setPersistenceError("Could not save changes.");
          // FUTURE: Retry failed persistence automatically.
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
    // Prevent accidental addition of new cards via updateCard.
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
        // No card with this ID was found.
        console.warn(`updateCard(): no card found with id "${updated.id}".`);
        return prev;
      }
      return next;
    });
  }

  function deleteCard(cardId: string) {
    setCards((prev) => prev.filter((c) => c.id !== cardId));
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

/**
 * Hook to access the cards context.
 *
 * Returns the current cards state and operations for managing cards.
 *
 * @returns The cards context value.
 * @throws Error if used outside of a CardsProvider.
 */
export function useCards() {
  const ctx = useContext(CardsContext);
  if (!ctx) {
    throw new Error("useCards must be used inside CardsProvider");
  }
  return ctx;
}
