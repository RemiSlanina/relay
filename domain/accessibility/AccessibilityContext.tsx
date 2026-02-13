// accessibility scaffold - expand before shipping!

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AccessibilityInfo } from "react-native";

export type MotionSetting = "full" | "reduced" | "none";
export type HapticsSetting = "normal" | "minimal" | "off";
export type SoundSetting = "on" | "soft" | "off";
export type ColorIntensitySetting = "normal" | "muted";
export type DensitySetting = "compact" | "comfortable";
export type ThemeSetting = "system" | "light" | "dark";
export type TextSizeSetting = "normal" | "large" | "larger";

export type AccessibilitySettings = {
  motion: MotionSetting;
  haptics: HapticsSetting;
  sound: SoundSetting;
  colorIntensity: ColorIntensitySetting;
  density: DensitySetting;
  theme: ThemeSetting;
  textSize: TextSizeSetting;
  highContrast: boolean;
  calmMode: boolean; // Master switch for reduced stimulation
};

type AccessibilityContextValue = {
  settings: AccessibilitySettings;
  setSettings: (settings: Partial<AccessibilitySettings>) => void;
  toggleSetting: <K extends keyof AccessibilitySettings>(
    key: K,
    value?: AccessibilitySettings[K],
  ) => void;
  resetToDefaults: () => void;
  systemPrefersReducedMotion: boolean;
};

const defaultSettings: AccessibilitySettings = {
  motion: "full",
  haptics: "normal",
  sound: "on",
  colorIntensity: "normal",
  density: "comfortable",
  theme: "system",
  textSize: "normal",
  highContrast: false,
  calmMode: false,
};

const AccessibilityContext = createContext<AccessibilityContextValue | null>(
  null,
);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] =
    useState<AccessibilitySettings>(defaultSettings);
  const [systemPrefersReducedMotion, setSystemPrefersReducedMotion] =
    useState(false);

  useEffect(() => {
    // Check system accessibility preferences
    AccessibilityInfo.isReduceMotionEnabled().then(
      setSystemPrefersReducedMotion,
    );

    // Listen for system preference changes
    const subscription = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      setSystemPrefersReducedMotion,
    );

    return () => {
      subscription.remove();
    };
  }, []);

  // Automatically enable calm mode if system prefers reduced motion
  useEffect(() => {
    if (systemPrefersReducedMotion && settings.calmMode !== true) {
      setSettings((prev) => ({ ...prev, calmMode: true, motion: "none" }));
    }
  }, [systemPrefersReducedMotion]);

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const toggleSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value?: AccessibilitySettings[K],
  ) => {
    setSettings((prev) => {
      const currentValue = prev[key];
      let newValue: AccessibilitySettings[K];

      if (value !== undefined) {
        newValue = value;
      } else {
        // Toggle logic for different setting types
        switch (key) {
          case "calmMode":
          case "highContrast":
            newValue = !currentValue as any;
            break;
          case "motion":
            newValue =
              currentValue === "full"
                ? "reduced"
                : currentValue === "reduced"
                  ? "none"
                  : ("full" as any);
            break;
          case "haptics":
            newValue =
              currentValue === "normal"
                ? "minimal"
                : currentValue === "minimal"
                  ? "off"
                  : ("normal" as any);
            break;
          case "sound":
            newValue =
              currentValue === "on"
                ? "soft"
                : currentValue === "soft"
                  ? "off"
                  : ("on" as any);
            break;
          case "colorIntensity":
            newValue = currentValue === "normal" ? "muted" : ("normal" as any);
            break;
          case "density":
            newValue =
              currentValue === "compact" ? "comfortable" : ("compact" as any);
            break;
          case "theme":
            newValue =
              currentValue === "system"
                ? "light"
                : currentValue === "light"
                  ? "dark"
                  : ("system" as any);
            break;
          case "textSize":
            newValue =
              currentValue === "normal"
                ? "large"
                : currentValue === "large"
                  ? "larger"
                  : ("normal" as any);
            break;
          default:
            newValue = currentValue;
        }
      }

      // Special logic for calm mode
      if (key === "calmMode" && newValue === true) {
        return {
          ...prev,
          calmMode: true,
          motion: "none",
          haptics: "minimal",
          sound: "soft",
          colorIntensity: "muted",
        };
      }

      return { ...prev, [key]: newValue };
    });
  };

  const resetToDefaults = () => {
    setSettings(defaultSettings);
  };

  // Calculate effective motion setting (respects both calm mode and system preferences)
  const effectiveMotion =
    settings.calmMode || systemPrefersReducedMotion ? "none" : settings.motion;

  return (
    <AccessibilityContext.Provider
      value={{
        settings: { ...settings, motion: effectiveMotion },
        setSettings: updateSettings,
        toggleSetting,
        resetToDefaults,
        systemPrefersReducedMotion,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) {
    throw new Error(
      "useAccessibility must be used inside AccessibilityProvider",
    );
  }
  return ctx;
}

export function useMotionSetting() {
  const { settings } = useAccessibility();
  return settings.motion;
}

export function useCalmMode() {
  const { settings } = useAccessibility();
  return settings.calmMode;
}
