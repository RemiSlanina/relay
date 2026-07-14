// 1. Default Starter Set
// To avoid overwhelm, start with a small, curated default set (5-7 cards) that covers the most common/urgent scenarios. For example:
// Sensory overload warning (tpl:sensory-overload-1-en)
// Ordering coffee (tpl:ordering-coffee-1-en)
// Need time (tpl:capacity-time-en)
// Medical disclosure (tpl:medical-need-1-en)
// Overwhelmed (tpl:capacity-overwhelmed-en)
// Boundaries: stop (tpl:boundaries-stop-en)
// Grocery list (tpl:grocery-list-en)

// + a Button with ""Show More" Option"
// 2. "Show More" Option
// Group the remaining cards by category (e.g., "Medical," "Work," "Family") and offer a "Show more" button in each category.
// Allow users to search or filter by category, priority, or keyword (e.g., "coffee," "boundaries").
// Consider a "Recommended for You" section based on usage patterns (e.g., if someone frequently uses food-ordering cards, suggest similar templates).

// 3. Onboarding Flow
// During first-time setup, ask users to select 3-5 cards from a shortlist to add to their quick-access toolbar.
// Offer a one-tap option to "Load all templates" for users who want everything upfront.

// 4. Customization Hints
// Add a tooltip or placeholder in the UI for editable fields (e.g., "Tap to add your own items" for grocery lists).
// For cards with list fields, pre-fill with common examples (e.g., "Milk, Bread, Eggs") but make it easy to clear or edit.

// 5. Visual Organization
// Use icons or colors to distinguish categories (e.g., red for emergencies, blue for tasks).
// For quick access, swipeable toolbar or home screen widget (if technically feasible).

// 6. Other:
// Use a toggle in settings to "Show all templates" or "Show only my cards."
// Implement a simple search bar to filter cards by title, category, set or message.

// tone => tones[] (later, perhaps, currently not feasible):
//   tones: {
//     minimal: "...",
//     formal: "..."
//   }

// Add to settings (important!):
// > Tone can affect how messages are received in high-power or authority contexts.
// > Choose the tone that best fits your situation.

// ----------------------------------------------------------------------

// export const SharingPolicy = {
//   INHERIT: "inherit",
//   PUBLIC: "public",
//   PRIVATE: "private",
// } as const;
// export const QuickAccessPolicy = {
//   ALLOWED: "allowed",
//   BLOCKED: "blocked",
//   INHERIT: "inherit",
// } as const;

// export type Category =
//   | "capacity"
//   | "support"
//   | "boundaries"
//   | "low-conflict-phrasing"
//   | "tasks"
//   | "medical"
//   | "work"
//   | "family";

// Tone is about how it SOUNDS, not how serious it is.

// Priority: Use 0 for urgent/emergency cards, 1 for common tasks.

// Start with a small curated default set (5 to 7 cards), then let users load more by category or all at once.
import { Card } from "./Card";
import { QuickAccessPolicy, SharingPolicy } from "./Card.constants";

export const TEMPLATE_CARDS: Card[] = [
  // ─────────────────────────────
  // Test Cases / Layout
  // ─────────────────────────────

  {
    id: "tpl:test-1-en-minimal",
    category: "tasks",
    priority: 0,
    disclosureIds: ["nonverbal"],
    lang: "en",
    title: "Layout Test 1 short",
    message: "lorem ipsum",
    sharing: SharingPolicy.PRIVATE,
    quickAccess: QuickAccessPolicy.BLOCKED,
    intent: "test",
    tone: "minimal",
    lastEditedAt: "2026-02-12",
    source: "template",
  },

  {
    id: "tpl:test-2-en-minimal",
    category: "tasks",
    priority: 0,
    disclosureIds: ["nonverbal"],
    lang: "en",
    title: "Layout Test 2 long",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    sharing: SharingPolicy.PRIVATE,
    quickAccess: QuickAccessPolicy.BLOCKED,
    intent: "test",
    tone: "minimal",
    lastEditedAt: "2026-02-12",
    source: "template",
  },

  {
    id: "tpl:test-3-en-minimal",
    category: "tasks",
    priority: 0,
    disclosureIds: ["nonverbal"],
    lang: "en",
    title: "Layout Test 3 list",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    sharing: SharingPolicy.PRIVATE,
    quickAccess: QuickAccessPolicy.BLOCKED,
    list: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
      "Lorem ipsum dolor sit amet",
    ],
    intent: "test",
    tone: "minimal",
    lastEditedAt: "2026-02-12",
    source: "template",
  },

  // ─────────────────────────────
  // Ordering food and drink
  // ─────────────────────────────

  {
    id: "tpl:ordering-coffee-1-en",
    category: "tasks",
    priority: 1,
    disclosureIds: ["cannot-speak"],
    lang: "en",
    title: "Ordering coffee",
    message:
      "Hello, I'd like an espresso doppio with a glass of water, please.",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "ordering espresso",
    tone: "formal",
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  // ─────────────────────────────
  // capacity / time / processing
  // ─────────────────────────────

  {
    id: "tpl:capacity-ticket-en",
    category: "capacity",
    priority: 1,
    lang: "en",
    disclosureIds: ["text-communication"],
    title: "Finding ticket ",
    message: "I have a valid ticket. This may take a moment.",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "finding a ticket",
    tone: "formal",
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  // ─────────────────────────────
  //            Empty
  // ─────────────────────────────

  {
    id: "tpl:xxx-en",
    category: "boundaries",
    priority: 1,
    lang: "en",
    title: "xxx",
    disclosureIds: ["health-issue"],
    message: "...",
    list: [],
    media: [],
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "empty",
    tone: "neutral",
    lastEditedAt: "2026-01-30",
    source: "template",
  },
];
