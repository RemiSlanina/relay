import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirstLaunchTime } from "../bootstrap/first-launch";
import { Card } from "./Card";
import { TEMPLATE_CARDS } from "./cards.templates";

const STORAGE_KEY = "@relay_cards_v1";

function isDuplicate(newCard: Card, existingCards: Card[]): boolean {
  /**
   * check if two cards are duplicates
   * check title and message for now
   * simpler version (no check of lists)
   */
  return existingCards.some(
    (card) => card.title === newCard.title && card.message === newCard.message,
  );
}

// TODO: continue with persistence

function isTitleMessageListDuplicate(
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

    // [] (list) can be:
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

  async SaveCard(card: Card): Promise<void> {
    /**
     * save one card to storage if it is not a duplicate
     */
    try {
      const existingCards = await this.loadCards(); // Returns [] if no cards exist
      if (isDuplicate(card, existingCards)) {
        // should return false if no duplicates, and also if existinga rray is empty (TODO: test)
        // later: prompt the user to enter a new title if they want to save the card
        console.log(
          "Do you want to save the card? Please enter a new title or message.",
        );
        console.log("Duplicate card content. Not saving.");
        return;
      }
      // should work if existing array is empty (TODO: test)
      const updateCards = [...existingCards, card];
      const json = JSON.stringify(updateCards);
      await AsyncStorage.setItem(STORAGE_KEY, json);
      console.log("Saved card.");
    } catch (e) {
      console.error("Failed to save card, ", e);
    }
  },

  async saveCards(cards: Card[]): Promise<void> {
    try {
      // Filter out template cards if needed (only save user cards)
      // const userCards = cards.filter((card) => card.source === "user");
      // const userCards = cards.filter((card) => card.id.startsWith("usr:")); // *** TEST this in emulator
      // const copiedTemplates = cards.filter((card) => card.id.startsWith("tpl:"));

      // copy all cards
      //const newCards = [...cards];
      // rename the copied templates to have an id starting with "usr:"
      // newCards.forEach((c) => {
      //   if (c.id.startsWith("tpl:")) {
      //     const id = c.id.slice(3);
      //     c.id = `usr${id}-${Date.now()}`; // TODO: add a date stamp!
      //   }
      // }); // TODO: test and finish !!!!!!!!!!!!!!!!

      const newCards = [...cards];
      const json = JSON.stringify(newCards);
      await AsyncStorage.setItem(STORAGE_KEY, json);
      console.log("Saved", newCards.length, "user cards"); // consoooooole
      //console.log("Saved: ", await AsyncStorage.getItem(STORAGE_KEY)); //debugging
    } catch (error) {
      console.error("Failed to save cards:", error);
      // Silently fail - don't crash the app for storage issues
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

/**
 * Helper function to merge user cards with template cards
 * Ensures template cards are always available while preserving user cards
 */
export function mergeCardsWithTemplates(
  userCards: Card[],
  templateCards: Card[],
): Card[] {
  // // Create a map of user card IDs for quick lookup
  // const userCardIds = new Set(userCards.map((card) => card.id));
  // Start with all template cards
  const merged = [...templateCards];

  // // Add user cards that don't conflict with template IDs
  // userCards.forEach((userCard) => {
  //   if (!userCardIds.has(userCard.id)) {
  //     merged.push(userCard);
  //   }
  // });

  // correct implementation: (template cards!!!):
  const templateIds = new Set(templateCards.map((c) => c.id));

  // for now, use two separate arrays, one for the old templates, one for userCards
  // later, templates will be shipped, but the "chosen ones" will be copied directly into
  // user storage
  // template = no edit, user cards (and chosen templates) = editable
  userCards.forEach((userCard) => {
    if (!templateIds.has(userCard.id)) {
      merged.push(userCard);
    }
  }); // TODO: test and finish !!!!!!!!!!!!!!!!

  return merged;
}

function copyTemplateToUserCard(template: Card): Card {
  return {
    ...template,
    id: `usr${template.id.slice(3)}-${Date.now()}`,
    source: "user", // TODO: later update this only if the last edit was after FIRST_LAUNCH_KEY
  };
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
  const { isFirstLaunch, date } = await getFirstLaunchTime();
  if (isFirstLaunch) {
    // Initialize cards: for now, just copy all template cards
    return initializeUserCardsFromTemplates();
  } else {
    // load saved userCards
    return CardStorage.loadCards();
  }
}
