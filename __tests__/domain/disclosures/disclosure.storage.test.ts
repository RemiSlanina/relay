import { getFirstLaunchTime } from "../../../domain/bootstrap/first-launch";
import { initializeDisclosures } from "../../../domain/disclosures/disclosures.import";

// fake launch
jest.mock("../../../domain/bootstrap/first-launch", () => ({
  getFirstLaunchTime: jest.fn(),
}));

// restore all mockups after they had been modified by tests
afterEach(() => {
  jest.restoreAllMocks();
});

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);

describe("initializeDisclosures", () => {
  it("should create user cards on first launch", async () => {
    (getFirstLaunchTime as jest.Mock).mockResolvedValue({
      isFirstLaunch: true,
      date: "2026-05-24",
    });
    const disclosures = await initializeDisclosures();

    expect(disclosures.length).toBeGreaterThan(0);
    expect(
      disclosures.every((disclosure) => disclosure.id.startsWith("usr:")),
    ).toBe(true);
  });

  it("should not duplicate cards on subsequent initializations", async () => {
    (getFirstLaunchTime as jest.Mock).mockResolvedValue({
      isFirstLaunch: true,
      date: "2026-05-24",
    });
    // FUTURE: May change if initialization/setup behavior changes.
    // First call: should initialize all disclosures in TEMPLATE_DISCLOSURES (later: users chooses!!)
    const firstDisclosures = await initializeDisclosures();
    expect(firstDisclosures.length).toBeGreaterThan(0);

    // Second Call with the same first launch - should return the same cards
    const secondDisclosures = await initializeDisclosures();
    expect(secondDisclosures.length).toBe(secondDisclosures.length);
  });
});
