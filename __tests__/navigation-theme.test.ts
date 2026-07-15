import { getNavigationTheme } from "@/constants/navigation-theme";
import { Colors } from "@/constants/theme";

describe("getNavigationTheme", () => {
  it("uses the app dark palette for navigation elements", () => {
    const theme = getNavigationTheme("dark");

    expect(theme.dark).toBe(true);
    expect(theme.colors).toMatchObject({
      primary: Colors.dark.primary,
      background: Colors.dark.background,
      card: Colors.dark.surface,
      text: Colors.dark.text,
      border: Colors.dark.border,
    });
  });

  it("uses the app light palette when dark mode is not active", () => {
    const theme = getNavigationTheme("light");

    expect(theme.dark).toBe(false);
    expect(theme.colors).toMatchObject({
      primary: Colors.light.primary,
      background: Colors.light.background,
      card: Colors.light.surface,
      text: Colors.light.text,
      border: Colors.light.border,
    });
  });
});
