import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirstLaunchTime } from "../bootstrap/first-launch";
import { Card } from "./Card";
import { TEMPLATE_CARDS } from "./cards.templates";

const STORAGE_KEY = "@relay_cards_v1";

// Later, I could allow fetching templates after init, as well as
// duplicating cards.
// However, these should be opened in edit view, and if a user wants to save
// duplicates without any changes, I could just alert "Card is duplicate. Save anyway?"
// However, as I need to implement more planned features, best write this duplicate checkers as modules (lists,
// media, ...) and an overarching isDuplicate() function (refactor this)
/**
 * Function to check for duplicates, for later use in checking before saving cards/templates duplicated
 * by the user. User gets an alert if they try to save cards that are purely duplicates.
 *
 * Next feature I want to implement is List.
 * @param newCard
 * @param existingCards
 * @returns true if cards are equal except for id (is always unique)
 */
function isDuplicate(newCard: Card, existingCards: Card[]): boolean {
  return isDuplicateTitleMessage(newCard, existingCards);
}

function isDuplicateTitleMessage(
  newCard: Card,
  existingCards: Card[],
): boolean {
  /**
   * check if two cards are duplicates
   * check title and message for now
   * simpler version (no check of lists)
   */
  return existingCards.some(
    (card) => card.title === newCard.title && card.message === newCard.message,
  );
}

function isDuplicateTitleMessageList(
  newCard: Card,
  existingCards: Card[],
): boolean {
  /**
   * Check if two cards are duplicates:
   * - Compare title, message, and list (array of strings)
   */
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
    // If both have no list (undefined or null), skip list check
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
 * CardStorage - Handles persistent storage of user-created cards
 *
 * Features:
 * - Automatic JSON serialization/deserialization
 * - Error handling with graceful fallbacks
 * - Versioned storage key for future migrations
 */

export const CardStorage = {
  /**
   * Save all cards to persistent storage
   * @param cards Array of cards to save
   */

  async saveCard(card: Card): Promise<boolean> {
    /**
     * save one card to storage if it is not a duplicate
     */
    try {
      const existingCards = await this.loadCards(); // Returns [] if no cards exist
      if (isDuplicate(card, existingCards)) {
        // Future TODO: should check for duplicates and
        // prompt the user whether they want to save duplicate cards (turn off in settings)
        console.log("Duplicate card detected: CardStorage saveCard()...");
      }
      const updatedCards = [...existingCards, card];
      return this.saveCards(updatedCards);
    } catch (e) {
      console.error("Failed to save card, method saveCard, ", e);
      return false;
    }
  },

  async saveCards(cards: Card[]): Promise<boolean> {
    try {
      const newCards = [...cards];
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
   * Load saved cards from persistent storage
   * @returns Array of saved user cards, or empty array if none exist
   */
  async loadCards(): Promise<Card[]> {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      return json ? JSON.parse(json) : [];
    } catch (error) {
      console.error("Failed to load cards:", error);
      return []; // Return empty array on error
    }
  },

  /**
   * Clear all saved cards from storage
   * Useful for testing or when user wants to reset
   */
  async clearCards(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear cards:", error);
    }
  },

  /**
   * Check if any cards are stored
   * @returns true if cards exist in storage, false otherwise
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

export function copyTemplateToUserCard(template: Card): Card {
  return {
    ...template,
    id: `usr${template.id.slice(3)}-${Date.now()}`,
    lastEditedAt: `${Date.now()}`,
    source: "user", // TODO: later update this only if the last edit was after FIRST_LAUNCH_KEY
  };
}
export async function importTemplateCard(template: Card): Promise<Card[]> {
  return importTemplateCards([template]);
}
export async function importTemplateCards(templates: Card[]): Promise<Card[]> {
  // later duplicate handling?
  const existingCards = await CardStorage.loadCards();
  const importedCards = templates.map(copyTemplateToUserCard);
  const updatedCards = [...existingCards, ...importedCards];
  await CardStorage.saveCards(updatedCards);
  return updatedCards;
}

/**
 * Initialize user cards from templates (one-time setup)
 * Copies selected or all templates, converts tpl: → usr:, and saves
 *
 * @param templates Array of template cards to copy. If not provided, use all.
 * @returns Array of newly created user cards
 */
async function initializeUserCardsFromTemplates(
  templates: Card[] = TEMPLATE_CARDS,
): Promise<Card[]> {
  const savedUserCards = await CardStorage.loadCards();
  if (savedUserCards.length > 0) {
    // already initialized
    return savedUserCards;
  }
  const userCards = templates.map(copyTemplateToUserCard);
  await CardStorage.saveCards(userCards);
  return userCards;
}

export async function initializeCards(): Promise<Card[]> {
  // date seems unused. clear or keep for future use
  const { isFirstLaunch, date } = await getFirstLaunchTime();
  if (isFirstLaunch) {
    // Initialize cards: for now, just copy all template cards
    return initializeUserCardsFromTemplates();
  } else {
    // load saved userCards
    return CardStorage.loadCards();
  }
}
