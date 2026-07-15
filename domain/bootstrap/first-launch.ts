/**
 * First launch detection.
 *
 * This module tracks whether the application has been launched before.
 * It provides the basis for first-time setup flows like template
 * initialization.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * QUESTION / FUTURE:
 *
 * FIRST_LAUNCH_KEY only persists as long as the app's local storage exists.
 *
 * The key is lost when:
 * - the app is uninstalled and reinstalled
 * - the user clears app data
 *
 * If Relay later requires persistence across reinstalls,
 * the first-launch state may need to be stored outside
 * local device storage.
 */

/**
 * FIRST_LAUNCH_KEY stores the timestamp of the application's first launch.
 *
 * It is used to determine whether first-time setup should be performed.
 *
 * During development, resetting this key causes Relay to behave as if it
 * were launched for the first time, allowing template initialization and
 * onboarding to be tested again.
 */

export const FIRST_LAUNCH_KEY = "first_launch_time";

/**
 * Returns the application's first-launch state.
 *
 * If no first-launch timestamp exists, one is created automatically
 * and the current launch is treated as the first launch.
 *
 * @returns The stored timestamp together with the first-launch flag.
 */
export const getFirstLaunchTime = async (): Promise<{
  date: Date | null;
  isFirstLaunch: boolean;
}> => {
  try {
    const stored = await AsyncStorage.getItem(FIRST_LAUNCH_KEY);

    if (stored !== null) {
      return { isFirstLaunch: false, date: new Date(stored) };
    }
    const now = new Date().toISOString();
    await AsyncStorage.setItem(FIRST_LAUNCH_KEY, now);

    return { isFirstLaunch: true, date: new Date(now) };
  } catch (e) {
    console.error("Error handling first launch time: ", e);
    return { isFirstLaunch: false, date: null };
  }
};

/**
 * Removes the first-launch marker.
 *
 * Intended for development and testing.
 */
export const resetFirstLaunch = async () => {
  await AsyncStorage.removeItem(FIRST_LAUNCH_KEY);
};
