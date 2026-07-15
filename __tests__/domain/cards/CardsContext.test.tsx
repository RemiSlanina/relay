jest.mock("../../../domain/cards/cards.storage", () => ({
  CardStorage: {
    saveCards: jest.fn().mockResolvedValue(true),
  },
}));
jest.mock("../../../domain/cards/cards.import", () => ({
  initializeCards: jest.fn().mockResolvedValue([]),
}));

import { act, renderHook, waitFor } from "@testing-library/react-native";
import {
  Card,
  CardStorage,
  CardsProvider,
  QuickAccessPolicy,
  SharingPolicy,
  initializeCards,
  useCards,
} from "../../../domain/cards";

// create a test wrapper component
// const wrapper = ({ children }: { children: React.ReactNode }) => (
//   <CardsProvider>{children}</CardsProvider>
// );
// create a wrapper for renderHook usually like:
const wrapper = ({ children }: React.PropsWithChildren) => (
  <CardsProvider>{children}</CardsProvider>
);

describe("CardsContext - create (addCard)", () => {
  it("should add a new card to the cards array", async () => {
    const { result } = renderHook(() => useCards(), { wrapper });

    await waitFor(() => {
      expect(result.current.loaded).toBe(true);
    });

    const newCard = makeNewCard();

    // Initial state should have cards from initialization
    const initialLength = result.current.cards.length;

    //Add a new card
    await act(async () => {
      result.current.addCard(newCard);
    });

    await waitFor(() => {
      expect(result.current.hasUnsavedChanges).toBe(false);
    });

    //check that the card was added
    expect(result.current.cards.length).toBe(initialLength + 1);
    expect(result.current.cards).toContainEqual(newCard);
  });

  it("should not add duplicate cards", async () => {
    const { result } = renderHook(() => useCards(), { wrapper });

    await waitFor(() => {
      expect(result.current.loaded).toBe(true);
    });

    const newCard: Card = {
      id: "usr:duplicate-test",
      category: "support",
      priority: 0,
      lang: "en",
      title: "Duplicate Test",
      message: "Duplicate message",
      sharing: SharingPolicy.PRIVATE,
      quickAccess: QuickAccessPolicy.BLOCKED,
      lastEditedAt: new Date().toISOString(),
      source: "user",
    };

    // Add the card once
    await act(async () => {
      result.current.addCard(newCard);
    });

    const lengthAfterFirstAdd = result.current.cards.length;

    // Try to add the same card again
    await act(async () => {
      result.current.addCard(newCard);
    });

    await waitFor(() => {
      expect(result.current.hasUnsavedChanges).toBe(false);
    });

    // Should have added another card
    // current implementation doesn't prevent duplicates... strange that it runs
    // i should decide about whether or not to explicitely prevent duplicates
    expect(result.current.cards.length).toBe(lengthAfterFirstAdd + 1);
  });
});

describe("CardsContext - edit (updateCard)", () => {
  it("should update an existing card", async () => {
    const { result } = renderHook(() => useCards(), { wrapper });

    await waitFor(() => {
      expect(result.current.loaded).toBe(true);
    });

    // get the first card
    const cardToUpdate = makeNewCard();

    await act(async () => {
      result.current.addCard(cardToUpdate);
    });

    const updatedCard: Card = {
      ...cardToUpdate,
      title: "Updated Title",
      message: "Updated Message",
    };

    // update the card
    await act(async () => {
      result.current.updateCard(updatedCard);
    });

    await waitFor(() => {
      expect(result.current.hasUnsavedChanges).toBe(false);
    });

    // check that the card was updated
    const UpdatedCardInState = result.current.getCardById(cardToUpdate.id);
    expect(UpdatedCardInState).toBeDefined(); // not undefined
    expect(UpdatedCardInState?.title).toBe("Updated Title");
    expect(UpdatedCardInState?.message).toBe("Updated Message");
  });

  it("should not modify other cards when updating one", async () => {
    const { result } = renderHook(() => useCards(), { wrapper });

    const cardToUpdate = makeNewCard();
    const otherCard = makeNewCard();
    cardToUpdate.id = "usr:test-456";
    cardToUpdate.title = "Other title";
    cardToUpdate.message = "Other message";

    await waitFor(() => {
      expect(result.current.loaded).toBe(true);
    });

    await act(async () => {
      result.current.addCard(cardToUpdate);
      result.current.addCard(otherCard);
    });

    const updatedCard: Card = {
      ...cardToUpdate,
      title: "Updated Title",
    };

    await act(async () => {
      result.current.updateCard(updatedCard);
    });

    await waitFor(() => {
      expect(result.current.hasUnsavedChanges).toBe(false);
    });

    // other card should be unchanged
    const otherCardAfterUpdate = result.current.getCardById(otherCard.id);
    expect(otherCardAfterUpdate).toEqual(otherCard);
  });

  it("should do nothing if card with id doesn't exist", async () => {
    const { result } = renderHook(() => useCards(), { wrapper });
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

    await waitFor(() => {
      expect(result.current.loaded).toBe(true);
    });

    const nonexistentCard = makeNewCard();

    // should actually have length 0
    const initialLength = result.current.cards.length;

    await act(async () => {
      result.current.updateCard(nonexistentCard);
    });

    await waitFor(async () => {
      expect(result.current.hasUnsavedChanges).toBe(false);
    });

    expect(warnSpy).toHaveBeenCalledWith(
      'updateCard(): no card found with id "usr:test-123".',
    );

    warnSpy.mockRestore();

    // should not add a new card
    expect(result.current.cards.length).toBe(initialLength);
    // should not contain a card with this id:
    expect(result.current.getCardById(nonexistentCard.id)).toBeUndefined();
    expect(result.current.cards.some((c) => c.id === nonexistentCard.id)).toBe(
      false,
    );
  });
});

describe("CardsContext - deleteCard test", () => {
  it("should delete the card with the given id, and not others", async () => {
    const { result } = renderHook(() => useCards(), { wrapper });

    const testCard = makeNewCard();
    const otherCard = { ...testCard, name: "other", id: "usr:2" };

    await waitFor(() => {
      expect(result.current.loaded).toBe(true);
    });

    await act(async () => {
      result.current.addCard(testCard);
      result.current.addCard(otherCard);
    });
    act(() => {
      result.current.deleteCard(testCard.id);
    });

    await waitFor(() => {
      expect(result.current.hasUnsavedChanges).toBe(false);
    });

    const remainingCards = result.current.cards;
    expect(remainingCards).toHaveLength(1);
    expect(remainingCards[0].id).toBe(otherCard.id);
  });
  it("should not delete anything if ID is unknown", async () => {
    const { result } = renderHook(() => useCards(), { wrapper });

    const testCard = makeNewCard();
    const otherCard = { ...testCard, id: "usr:test-456" };

    await waitFor(() => {
      expect(result.current.loaded).toBe(true);
    });
    await act(async () => {
      result.current.addCard(testCard);
      result.current.addCard(otherCard);
    });
    act(() => {
      result.current.deleteCard("does-not-exist");
    });

    await waitFor(() => {
      expect(result.current.hasUnsavedChanges).toBe(false);
    });

    const remainingCards = result.current.cards;
    expect(remainingCards.map((card) => card.id)).toEqual([
      testCard.id,
      otherCard.id,
    ]);
  });
});

describe("CardsContext - getCardById test", () => {
  it("should return the correct card by id", async () => {
    const { result } = renderHook(() => useCards(), { wrapper });

    const testCard = { ...makeNewCard(), id: "usr:1" };
    const otherCard = { ...testCard, id: "usr:2" };

    await waitFor(() => {
      expect(result.current.loaded).toBe(true);
    });
    await act(async () => {
      result.current.addCard(testCard);
      result.current.addCard(otherCard);
    });
    const foundCard = result.current.getCardById(testCard.id);

    await waitFor(() => {
      expect(result.current.hasUnsavedChanges).toBe(false);
    });

    expect(foundCard).toEqual(testCard);
  });

  it("should return undefined for non-existent id", async () => {
    const { result } = renderHook(() => useCards(), { wrapper });

    await waitFor(() => {
      expect(result.current.loaded).toBe(true);
    });

    const foundCard = result.current.getCardById("usr:non-existent-test-123");
    expect(foundCard).toBeUndefined();
  });
  // test persistence with cardsstorage after deleting:
  it("should persist cards after deleting a card", async () => {
    const { result } = renderHook(() => useCards(), { wrapper });

    const testCard = makeNewCard();
    await waitFor(() => {
      expect(result.current.loaded).toBe(true);
    });
    await act(async () => {
      result.current.addCard(testCard);
    });

    await waitFor(() => {
      expect(result.current.hasUnsavedChanges).toBe(false);
    });

    jest.clearAllMocks();
    act(() => {
      result.current.deleteCard(testCard.id);
    });
    await waitFor(() => {
      expect(CardStorage.saveCards).toHaveBeenCalledWith([]);
    });
  });
});

describe("CardsProvider initialization", () => {
  it("should load existing cards on initialization", async () => {
    const testCard = makeNewCard();
    (initializeCards as jest.Mock).mockResolvedValue([testCard]);

    const { result } = renderHook(() => useCards(), { wrapper });

    await waitFor(() => {
      expect(result.current.loaded).toBe(true);
    });

    expect(result.current.cards).toEqual([testCard]);
  });
});

describe("Cards Provider error handling", () => {
  it("should keep cards loaded when persistence fails", async () => {
    const testCard = makeNewCard();
    (initializeCards as jest.Mock).mockResolvedValue([testCard]);
    const { result } = renderHook(() => useCards(), { wrapper });

    await waitFor(() => {
      expect(result.current.loaded).toBe(true);
    });

    jest.clearAllMocks();
    // save cards fails:
    (CardStorage.saveCards as jest.Mock).mockResolvedValue(false);

    expect(result.current.cards).toEqual([testCard]);
  });
  // test for error handling
  it("should expose a persistence error when saving fails", async () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    (CardStorage.saveCards as jest.Mock).mockResolvedValue(false);
    const { result } = renderHook(() => useCards(), { wrapper });

    await waitFor(() => {
      expect(result.current.loaded).toBe(true);
    });

    const testCard = makeNewCard();

    await act(async () => {
      result.current.addCard(testCard);
    });

    await waitFor(() => {
      expect(result.current.persistenceError).toBe("Could not save changes.");
    });
    consoleSpy.mockRestore();
  });
});

// ****************** helpers ******************
function makeNewCard(): Card {
  const newCard: Card = {
    id: "usr:test-123",
    category: "support",
    priority: 0,
    lang: "en",
    title: "Test Card",
    message: "Test message",
    sharing: SharingPolicy.PRIVATE,
    quickAccess: QuickAccessPolicy.BLOCKED,
    lastEditedAt: new Date().toISOString(),
    source: "user",
  };

  return newCard;
}
