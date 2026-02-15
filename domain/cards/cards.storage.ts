import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card } from "./Card";

const STORAGE_KEY = "@relay_cards_v1";

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
  async saveCards(cards: Card[]): Promise<void> {
    try {
      // Filter out template cards if needed (only save user cards)
      const userCards = cards.filter((card) => card.source === "user");
      const json = JSON.stringify(userCards);
      await AsyncStorage.setItem(STORAGE_KEY, json);
      console.log("Saved", userCards.length, "user cards"); // consoooooole
      console.log("Saved: ", await AsyncStorage.getItem(STORAGE_KEY)); //debugging
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
  });

  return merged;
}
