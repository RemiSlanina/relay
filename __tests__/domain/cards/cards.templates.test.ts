/**
 * Test suite for card templates
 */

import { TEMPLATE_CARDS } from "../../../domain/cards/cards.templates";

describe("Card Templates", () => {
  it("should have at least one template", () => {
    expect(TEMPLATE_CARDS.length).toBeGreaterThan(0);
  });

  it("should have valid template structure", () => {
    TEMPLATE_CARDS.forEach((template) => {
      expect(template).toHaveProperty("id");
      expect(template).toHaveProperty("title");
      expect(template).toHaveProperty("message");
      expect(template).toHaveProperty("category");
    });
  });

  it("should have unique template IDs", () => {
    const ids = TEMPLATE_CARDS.map((template) => template.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
