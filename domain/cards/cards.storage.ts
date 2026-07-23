/**
 * Persistent storage for the user's card collection.
 *
 * Responsibilities:
 * - store and load the user's card collection
 * - hide AsyncStorage from the rest of the application
 * - provide a stable API for future storage migrations
 *
 * Persistence model:
 * - best effort (operations never throw)
 * - failures are logged and reported through return values
 * - callers remain responsible for user-facing error handling
 *
 * Duplicate detection currently compares only title and message.
 * Additional comparison strategies (lists, media, etc.) may be
 * added in the future.
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card } from "./Card";

const STORAGE_KEY = "@relay_cards_v1";

// FUTURE: Later, I could allow fetching templates after init, as well as
// duplicating cards.
// However, these should be opened in edit view, and if a user wants to save
// duplicates without any changes, I could just alert "Card is duplicate. Save anyway?"
// However, as I need to implement more planned features, best write this duplicate checkers as modules (lists,
// media, ...) and an overarching isDuplicate() function (refactor this)
/**
 * Determines whether a card is considered a duplicate.
 *
 * Duplicate detection is intentionally delegated to helper functions
 * so additional comparison strategies can be added over time.
 *
 * @param newCard Card being added.
 * @param existingCards Existing user cards.
 * @returns `true` if an equivalent card already exists.
 */
function isDuplicate(newCard: Card, existingCards: Card[]): boolean {
  return isDuplicateTitleMessage(newCard, existingCards);
}

/**
 * Compares cards by title and message only.
 */
function isDuplicateTitleMessage(
  newCard: Card,
  existingCards: Card[],
): boolean {
  return existingCards.some(
    (card) => card.title === newCard.title && card.message === newCard.message,
  );
}

/**
 * Compares cards by title, message, and list contents.
 *
 * List order is ignored.
 */
function isDuplicateTitleMessageList(
  newCard: Card,
  existingCards: Card[],
): boolean {
  return existingCards.some((card) => {
    // Compare title and message
    const isTitleAndMessageSame =
      card.title === newCard.title && card.message === newCard.message;

    // someCard.list can be:
    // undefined (not provided)
    // null (explicitly set to null)
    // [] (empty array)
    // ["milk", "bread"] (array with items)

    // Compare lists (arrays of strings)
    if (!card.list && !newCard.list) {
      return isTitleAndMessageSame;
    }
    // If one has a list and the other doesn't (null or undefined), not a duplicate
    if (!card.list || !newCard.list) {
      return false;
    }
    // Compare lists by content (order-independent)
    // [] is a valid array, and the length/checks will pass if both are empty.
    const isListSame =
      card.list.length === newCard.list.length &&
      card.list.every((item) => newCard.list!.includes(item)) &&
      newCard.list.every((item) => card.list!.includes(item));

    return isTitleAndMessageSame && isListSame;
  });
}

/**
 * Storage service for the user's card collection.
 *
 * This object provides the application's persistence API for cards.
 * All interaction with AsyncStorage should go through this module.
 */
export const CardStorage = {
  /**
   * Persists the current card collection.
   *
   * Replaces the previously stored collection with the provided one.
   *
   * Duplicate detection currently logs a warning but does not prevent
   * saving the card.
   */
  // TODO: maybe rename saveCards to something that is easier to understand?
  async saveCards(cards: Card[]): Promise<boolean> {
    try {
      const newCards = [...cards]; // TODO: simplify this (do not need it)
      const json = JSON.stringify(newCards);
      await AsyncStorage.setItem(STORAGE_KEY, json);
      return true;
    } catch (error) {
      console.error("Failed to save cards, method saveCards:", error);
      return false;
      // Silently fails but returns false - don't crash the app for storage issues
    }
  },

  /**
   * Loads the user's card collection.
   *
   * Returns an empty collection if no cards have been stored yet
   * or if loading fails.
   */
  async loadCards(): Promise<Card[]> {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json == null) return [];
      const parsed = JSON.parse(json);

      if (!Array.isArray(parsed) || !parsed.every(isCard)) {
        return [];
      }
      return parsed;
    } catch (error) {
      console.error("Failed to load cards:", error);
      return [];
    }
  },

  /**
   * Removes all stored cards from the user's collection.
   *
   * Primarily intended for testing and future reset functionality.
   */
  async clearCards(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear cards:", error);
    }
  },

  /**
   * Returns whether a stored card collection exists.
   */
  async hasSavedCards(): Promise<boolean> {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      return !!json; // true if json exists and is not empty
    } catch (error) {
      console.error("Failed to check for saved cards:", error);
      return false;
    }
  },
};

function isCard(value: unknown): value is Card {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "title" in value &&
    "message" in value
  );
}
