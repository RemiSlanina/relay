// template → user conversion logic
// TODO: move here from cards.storage.ts later
import { getFirstLaunchTime } from "../bootstrap/first-launch";
import { Card } from "./Card";
import { CardStorage } from "./cards.storage";
import { TEMPLATE_CARDS } from "./cards.templates";
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
 
domain/cards/

cards.storage.ts
    saveCards()
    loadCards()
    clearCards()
    hasSavedCards()

cards.initialization.ts
    copyTemplateToUserCard()
    initializeCards()
    initializeUserCardsFromTemplates()
    importTemplateCard()
    importTemplateCards()


 */
