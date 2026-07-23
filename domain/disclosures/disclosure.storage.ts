/**
 * Persistent storage for user-created disclosures or selected templates imported as user disclosures.
 *
 * Responsibilities:
 * - store and load the user's disclosures collection
 * - hide AsyncStorage from the rest of the application
 * - provide a stable API for future storage migrations
 *
 * Persistence model:
 * - best effort (operations never throw)
 * - failures are logged and reported through return values
 * - callers remain responsible for user-facing error handling
 *
 * FUTURE feature: Duplicate detection (not yet implemtned)
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Disclosure } from "./Disclosure";

const STORAGE_KEY = "@relay_disclosure_v1";

export const DisclosureStorage = {
  /**
   * Loads all persisted disclosures.
   *
   * Returns an empty array if no disclosures have been stored yet
   * or if loading fails.
   *
   * @returns The persisted disclosures, or an empty array if none
   * are available or loading fails.
   */
  async loadDisclosures(): Promise<Disclosure[]> {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      //console.log("json:", json);
      //console.log(typeof json);
      if (json == null) return [];
      const parsed = JSON.parse(json);
      if (!Array.isArray(parsed) || !parsed.every(isDisclosure)) return [];
      return parsed;
    } catch (error) {
      console.error("Failed to load disclosures:", error);
      return [];
    }
  },

  /**
   * Persists disclosures without preserving the previous collection.
   *
   * Replaces the previously stored collection with the provided one.
   *
   * @param disclosures The disclosures to persist.
   * @returns `true` if the disclosures were saved successfully;
   * otherwise `false`.
   */
  async saveDisclosures(disclosures: Disclosure[]): Promise<boolean> {
    try {
      const json = JSON.stringify(disclosures);
      await AsyncStorage.setItem(STORAGE_KEY, json);
      return true;
    } catch (error) {
      console.error(
        "Failed to save disclosures, method saveDisclosures:",
        error,
      );
      return false;
    }
  },

  /**
   * Removes all stored disclosures from the user's collection.
   *
   * Primarily intended for testing and future reset functionality.
   */
  async clearDisclosures(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear cards:", error);
    }
  },
};

/**
 * Helper function:
 * Validate disclosure for loading from Async to prevent malformed data.
 */
function isDisclosure(value: unknown): value is Disclosure {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "text" in value
  );
}
