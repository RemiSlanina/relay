import AsyncStorage from "@react-native-async-storage/async-storage";

// Attention/TODO:
// App reinstall: FIRST_LAUNCH_KEY gone
// Clear app data: FIRST_LAUNCH_KEY gone
// true persistence => possibly switch to backend later.

/**
 * FIRST_LAUNCH_KEY stores the date of first launch in ISO String format
 * this key is used to determine if setup needs to be showed
 *
 * During testing and debugging this will determine if templates will be copied
 * to storage (i guess?)
 */

const FIRST_LAUNCH_KEY = "first_launch_time";

/**
 * GETTER = SETTER.
 * get FIRST_LAUNCH_KEY from storage.
 * if none exists, CREATE one
 */
export const getFirstLaunchTime = async () => {
  try {
    const stored = await AsyncStorage.getItem(FIRST_LAUNCH_KEY);

    if (stored !== null) {
      return new Date(stored);
    }
    const now = new Date().toISOString();
    await AsyncStorage.setItem(FIRST_LAUNCH_KEY, now);

    return new Date(now);
  } catch (e) {
    console.error("Error handling first launch time: ", e);
    return null;
  }
};
