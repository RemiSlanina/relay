/**
 * Test suite for Card storage lifecycle
 */
import { getFirstLaunchTime } from "../../../domain/bootstrap/first-launch";
import { Card } from "../../../domain/cards/Card";
import {
  QuickAccessPolicy,
  SharingPolicy,
} from "../../../domain/cards/Card.constants";
import {
  CardStorage,
  copyTemplateToUserCard,
  importTemplateCard,
  initializeCards,
} from "../../../domain/cards/cards.storage";

// fake launch
jest.mock("../../../domain/bootstrap/first-launch", () => ({
  getFirstLaunchTime: jest.fn(),
}));

// restore all mockups after they had been modified by tests
afterEach(() => {
  jest.restoreAllMocks();
});

describe("initializeCards", () => {
  it("should create user cards on first launch", async () => {
    (getFirstLaunchTime as jest.Mock).mockResolvedValue({
      isFirstLaunch: true,
      date: "2026-05-24",
    });
    const cards = await initializeCards();

    expect(cards.length).toBeGreaterThan(0);
    expect(cards.every((card) => card.id.startsWith("usr:"))).toBe(true);
    // expect(cards[0].id.startsWith("usr:")).toBe(true);
    // expect(cards[0].source).toBe("user"); // might change later
  });

  it("should not duplicate cards on subsequent initializations", async () => {
    (getFirstLaunchTime as jest.Mock).mockResolvedValue({
      isFirstLaunch: true,
      date: "2026-05-24",
    });
    // TODO: after setup implementation, this might change
    // First call: should initialize all cards in TEMPLATE_CARDS (later: users chooses!!)
    const firstCards = await initializeCards();
    expect(firstCards.length).toBeGreaterThan(0);

    // Second Call with the same first launch - should return the same cards
    const secondCards = await initializeCards();
    expect(secondCards.length).toBe(firstCards.length);
  });
});

describe("Card Import", () => {
  it("should convert template card to user card", () => {
    const card = makeTemplateCard();

    const userCard = copyTemplateToUserCard(card);
    // console.log(userCard);
    expect(userCard.id.startsWith("usr:")).toBe(true);
    expect(userCard.title).toBe(card.title);
    expect(userCard.message).toBe(card.message);
    expect(userCard.lastEditedAt).not.toBe(card.lastEditedAt);
    expect(userCard.id).not.toBe(card.id);

    expect(userCard.category).toBe(card.category);
    expect(userCard.quickAccess).toBe(card.quickAccess);
    expect(userCard.sharing).toBe(card.sharing);
  });

  it("does not modify the original template", () => {
    const card = makeTemplateCard();

    const original = { ...card };

    copyTemplateToUserCard(card);

    // should not have changed:
    expect(card).toEqual(original);
  });
});

describe("Load Card if not First Launch", () => {
  it("should load saved cards when not first launch", async () => {
    (getFirstLaunchTime as jest.Mock).mockResolvedValue({
      isFirstLaunch: false,
      date: "2026-05-03",
    });

    const fakeCards = [
      {
        id: "usr:test",
        title: "Hello",
        message: "world",
      } as Card,
    ];

    jest.spyOn(CardStorage, "loadCards").mockResolvedValue(fakeCards);

    const cards = await initializeCards();

    expect(cards).toEqual(fakeCards);
  });
});

describe("Import Template Card", () => {
  it("should copy and add a template card to existing user cards array", async () => {
    (getFirstLaunchTime as jest.Mock).mockResolvedValue({
      isFirstLaunch: false,
      date: "2026-05-03",
    });

    const fakeCards = [
      {
        id: "usr:test",
        title: "Hello",
        message: "world",
      } as Card,
    ];
    const template = {
      id: "tpl:test-2",
      title: "I am a ",
      message: "template mock up card.",
    } as Card;

    jest.spyOn(CardStorage, "loadCards").mockResolvedValue(fakeCards);
    jest.spyOn(CardStorage, "saveCards").mockResolvedValue(true);

    const mixedCards = await importTemplateCard(template);

    expect(CardStorage.saveCards).toHaveBeenCalled();
    expect(mixedCards).toHaveLength(2);
    expect(mixedCards[0]).toEqual(fakeCards[0]);

    expect(mixedCards[1].title).toBe("I am a ");
    expect(mixedCards[1].message).toBe("template mock up card.");
    expect(mixedCards[1].id.startsWith("usr:")).toBe(true);
  });
});

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn().mockResolvedValue(undefined),
  getItem: jest.fn().mockResolvedValue(JSON.stringify([])),
}));

describe("CardsStorage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should save a card and call SaveCards", async () => {
    const fakeCards = [
      {
        id: "usr:test",
        title: "Hello",
        message: "world",
      } as Card,
    ];
    const cardToSave = {
      id: "usr:test-1",
      title: "I am a",
      message: "mock up card.",
    } as Card;

    jest.spyOn(CardStorage, "loadCards").mockResolvedValue(fakeCards);
    jest.spyOn(CardStorage, "saveCards").mockResolvedValue(true);

    await CardStorage.saveCard(cardToSave);

    expect(CardStorage.saveCards).toHaveBeenCalledWith([
      ...fakeCards,
      cardToSave,
    ]);
  });
});

// ****************** helpers ******************
function makeTemplateCard() {
  const template: Card = {
    id: "tpl:test-1-en",
    category: "tasks",
    lang: "en",
    priority: 0,
    title: "Test Card",
    message: "This is a test card",
    sharing: SharingPolicy.PRIVATE,
    quickAccess: QuickAccessPolicy.BLOCKED,
    lastEditedAt: "2026-02-12",
    source: "template",
  };
  return template;
}
