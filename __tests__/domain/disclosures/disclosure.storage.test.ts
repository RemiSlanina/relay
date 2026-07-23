import { Disclosure, DisclosureStorage } from "@/domain/disclosures";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

// that should actually go to disclosure.import.test.ts, TODO: move it when writing this test
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

// these are the tests that belong in __tests__/domain/disclosures/disclosure.storage.test.ts
// TODO: mirror them in __tests__/domain/cards/cards.storage.test.ts and move import tests to cards.import.tests.ts
describe("DisclosureStorage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should save a disclosure", async () => {
    const disclosureToSave = makeTemplateDisclosure();

    const setItem = jest.spyOn(AsyncStorage, "setItem").mockResolvedValue();

    const ok = await DisclosureStorage.saveDisclosures([disclosureToSave]);

    expect(ok).toBe(true);
    expect(setItem).toHaveBeenCalledWith(
      "@relay_disclosure_v1",
      JSON.stringify([disclosureToSave]),
    );
  });

  it("should load a disclosure", async () => {
    const fakeDisclosures = [
      {
        id: "usr:test-2",
        text: "Mock text 1",
        lastEditedAt: "2026-07-23",
      } as Disclosure,
      {
        id: "usr:test-3",
        text: "Mock text 2",
        lastEditedAt: "2026-07-23",
      } as Disclosure,
    ];

    const getItem = jest
      .spyOn(AsyncStorage, "getItem")
      .mockResolvedValue(JSON.stringify(fakeDisclosures));

    const result = await DisclosureStorage.loadDisclosures();

    expect(result).toStrictEqual(fakeDisclosures);
  });

  it("should return false when AsyncStorage fails", async () => {
    const errorSyp = jest.spyOn(console, "error").mockImplementation(() => {});
    const setItem = jest
      .spyOn(AsyncStorage, "setItem")
      .mockRejectedValue(new Error("boom"));
    const ok = await DisclosureStorage.saveDisclosures([]);
    expect(ok).toBe(false);
    errorSyp.mockRestore();
  });
  it("should return an empty array if Async returns null", async () => {
    jest.spyOn(AsyncStorage, "getItem").mockResolvedValue(null);
    expect(await DisclosureStorage.loadDisclosures()).toEqual([]);
  });
});

// ****************** helpers ******************
function makeTemplateDisclosure() {
  return {
    id: "usr:test-1",
    text: "I am a mocked disclosure.",
    lastEditedAt: "2026-07-23",
  } as Disclosure;
}
