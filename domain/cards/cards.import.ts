/**
 * Card import and initialization.
 *
 * This module is responsible for:
 * - initializing a user's card collection on first launch
 * - importing template cards into an existing collection
 * - converting template cards into user-owned cards
 *
 * Storage is delegated to CardStorage.
 */

import { getFirstLaunchTime } from "../bootstrap/first-launch";
import { Card } from "./Card";
import { CardStorage } from "./cards.storage";
import { TEMPLATE_CARDS } from "./cards.templates";
/**
 * Initializes the user's card collection from one or more templates.
 *
 * If user cards already exist, they are returned unchanged.
 * Otherwise, the provided templates are converted into user cards,
 * saved to persistent storage, and returned.
 *
 * This function is intended for first-time initialization only.
 *
 * @param templates Template cards to initialize from.
 * @returns The initialized user card collection.
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

/**
 * Returns the user's card collection.
 *
 * On the first launch, the starter templates are copied into
 * persistent storage before being returned.
 *
 * On subsequent launches, the previously stored user cards are loaded.
 *
 * This function hides the application's first-launch logic from callers.
 *
 * @returns The user's initialized card collection.
 */
export async function initializeCards(): Promise<Card[]> {
  // QUESTION: date seems unused. clear or keep for future use
  const { isFirstLaunch, date } = await getFirstLaunchTime();
  if (isFirstLaunch) {
    return initializeUserCardsFromTemplates();
  } else {
    return CardStorage.loadCards();
  }
}

/**
 * Creates a user-owned copy of a template card.
 *
 * The returned card:
 * - receives a unique user ID
 * - receives a new lastEditedAt timestamp
 * - is marked as a user-created card
 *
 * The original template is never modified.
 *
 * @param template Template card to copy.
 * @returns Newly created user card.
 */
export function copyTemplateToUserCard(template: Card): Card {
  return {
    ...template,
    id: `usr${template.id.slice(3)}-${Date.now()}`,
    lastEditedAt: `${Date.now()}`,
    source: "user", // FUTURE: later update this only if the last edit was after FIRST_LAUNCH_KEY
  };
}

/**
 * Imports a single template card into the user's collection.
 *
 * This is a convenience wrapper around importTemplateCards().
 *
 * @param template Template card to import.
 * @returns Updated user card collection.
 */
export async function importTemplateCard(template: Card): Promise<Card[]> {
  return importTemplateCards([template]);
}

/**
 * Imports one or more template cards into the user's collection.
 *
 * Existing user cards are preserved.
 * Imported templates are converted into user-owned cards before being
 * appended to the collection.
 *
 * The updated collection is saved before being returned.
 *
 * @param templates Template cards to import.
 * @returns Updated user card collection.
 */
export async function importTemplateCards(templates: Card[]): Promise<Card[]> {
  // QUESTION: later duplicate handling?
  const existingCards = await CardStorage.loadCards();
  const importedCards = templates.map(copyTemplateToUserCard);
  const updatedCards = [...existingCards, ...importedCards];
  await CardStorage.saveCards(updatedCards);
  return updatedCards;
}
