/**
 * Starter template cards.
 *
 * This module contains the small default template collection copied into a
 * new user's card library during first-time setup.
 *
 * The starter set intentionally remains small to reduce cognitive load.
 * Additional templates are available in cards.templates.extra.ts.
 *
 * These templates are used to initialize a user's card collection on first
 * launch and can be imported into existing collections.
 *
 * Template card IDs start with "tpl:" prefix.
 *
 * Design notes:
 * - Priority 0 represents urgent or emergency cards.
 * - Priority 1 represents common everyday cards.
 * - Tone describes delivery style, not seriousness.
 *
 * The starter template collection intentionally remains small to
 * reduce cognitive load during first use.
 *
 * Additional templates can be imported later.
 *
 * FUTURE:
 * - Onboarding: let users select 3-5 cards from a shortlist
 * - "Show more" option with categorized browsing
 * - Search/filter by category, priority, or keyword
 * - "Recommended for You" based on usage patterns
 * - Toggle in settings: "Show all templates" vs "Show only my cards"
 */

import { Card } from "./Card";
import { QuickAccessPolicy, SharingPolicy } from "./Card.constants";

/**
 * Default template cards.
 *
 * These are the starter cards that new users receive on first launch.
 * They cover common communication scenarios across various categories.
 */

/**
 * Default template cards.
 *
 * See docs/design/templates.md for the design rationale behind the
 * starter collection and template library.
 */
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
