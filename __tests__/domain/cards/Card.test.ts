/**
 * Test suite for Card model
 */

import {
  QuickAccessPolicy,
  SharingPolicy,
} from "../../../app-example/constants/cards";
import {
  Card,
  QuickAccessPolicyType,
  SharingPolicyType,
} from "../../../domain/cards/Card";

describe("Card Model", () => {
  it("should create a card with required properties", () => {
    const card: Card = {
      id: "tpl:test-1-en",
      category: "tasks",
      lang: "en",
      priority: 0,
      title: "Test Card",
      message: "This is a test card",
      sharing: SharingPolicy.PRIVATE as SharingPolicyType, // there seems to be an error here with dual import
      quickAccess: QuickAccessPolicy.BLOCKED as QuickAccessPolicyType, // fix it later.
      // disclosureIds: ["nonverbal"],
      // intent: "test",
      // tone: "minimal",
      lastEditedAt: "2026-02-12",
      source: "template",
    };

    expect(card.id).toBe("tpl:test-1-en");
    expect(card.category).toBe("tasks");
    expect(card.lang).toBe("en");
    expect(card.priority).toBe(0);
    expect(card.title).toBe("Test Card");
    expect(card.message).toBe("This is a test card");
    expect(card.sharing).toBe(SharingPolicy.PRIVATE);
    expect(card.quickAccess).toBe(QuickAccessPolicy.BLOCKED);
    expect(card.lastEditedAt).toBe("2026-02-12");
    expect(card.source).toBe("template");
  });

  it("should create a card with optional properties", () => {
    const card: Card = {
      id: "usr:test-2-en-minimal-1772221713254",
      category: "tasks",
      priority: 0,
      disclosureIds: ["nonverbal"],
      lang: "en",
      title: "Card Test 2",
      message: "Lorem ipsum dolor sit amet..",
      sharing: SharingPolicy.PRIVATE as SharingPolicyType,
      quickAccess: QuickAccessPolicy.BLOCKED as QuickAccessPolicyType,
      intent: "test",
      tone: "minimal",
      lastEditedAt: "2026-02-12",
      source: "template",
    };

    expect(card.id).toBe("usr:test-2-en-minimal-1772221713254");
    expect(card.category).toBe("tasks");
    expect(card.disclosureIds).toEqual(["nonverbal"]);
    expect(card.lang).toBe("en");
    expect(card.priority).toBe(0);
    expect(card.title).toBe("Card Test 2");
    expect(card.message).toBe("Lorem ipsum dolor sit amet..");
    expect(card.sharing).toBe(SharingPolicy.PRIVATE);
    expect(card.quickAccess).toBe(QuickAccessPolicy.BLOCKED);
    expect(card.intent).toBe("test");
    expect(card.tone).toBe("minimal");
    expect(card.lastEditedAt).toBe("2026-02-12");
    expect(card.source).toBe("template");
  });

  // it("should update updatedAt when modified", () => {
  //   const card: Card = ({
  //     id: "test-3",
  //     title: "Test Card 3",
  //     message: "Original content",
  //     category: "test",
  //   });

  //   const originalUpdatedAt = card.updatedAt;

  //   // Simulate modification
  //   card.title = "Updated Title";

  //   // updatedAt should be updated
  //   expect(card.updatedAt).not.toBe(originalUpdatedAt);
  // });

  //   it("should serialize to JSON", () => {
  //     const card = new Card({
  //       id: "test-4",
  //       title: "Test Card 4",
  //       content: "Test content",
  //       category: "test",
  //     });

  //     const json = card.toJSON();

  //     expect(json).toHaveProperty("id", "test-4");
  //     expect(json).toHaveProperty("title", "Test Card 4");
  //     expect(json).toHaveProperty("content", "Test content");
  //     expect(json).toHaveProperty("category", "test");
  //     expect(json).toHaveProperty("createdAt");
  //     expect(json).toHaveProperty("updatedAt");
  //   });
});
