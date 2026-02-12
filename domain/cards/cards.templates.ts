// 1. Default Starter Set
// To avoid overwhelm, start with a small, curated default set (5–7 cards) that covers the most common/urgent scenarios. For example:
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
// During first-time setup, ask users to select 3–5 cards from a shortlist to add to their quick-access toolbar.
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

import { Card } from "./Card";
import { QuickAccessPolicy, SharingPolicy } from "./Card.constants";

export const TEMPLATE_CARDS: Card[] = [
  // ─────────────────────────────
  //            Misc
  // ─────────────────────────────

  // Sensory Overload
  {
    id: "tpl:sensory-overload-1-en",
    category: "capacity",
    priority: 0,
    lang: "en",
    title: "Sensory overload warning",
    message:
      "I’m experiencing sensory overload. I may need to step away or take a break.",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "sensory overload",
    tone: "minimal",
    lastEditedAt: "2026-02-12",
    source: "template",
  },

  // Social Boundaries
  {
    id: "tpl:no-eye-contact-1-en",
    category: "capacity",
    priority: 0,
    lang: "en",
    title: "No eye contact needed",
    message:
      "I communicate better without eye contact. Please don’t take it personally.",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "eye contact",
    tone: "neutral",
    lastEditedAt: "2026-02-12",
    source: "template",
  },

  // Executive Dysfunction
  {
    id: "tpl:decision-fatigue-1-en",
    category: "capacity",
    priority: 1,
    lang: "en",
    title: "Decision help",
    message: "I’m having trouble deciding. Could you suggest 1–2 options?",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "decision help",
    tone: "neutral",
    lastEditedAt: "2026-02-12",
    source: "template",
  },

  // Public Transport
  {
    id: "tpl:transport-help-1-en",
    category: "tasks",
    priority: 1,
    lang: "en",
    title: "Asking for directions",
    message:
      "Could you point me to the nearest exit/quiet area? I’m feeling overwhelmed.",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "asking for directions",
    tone: "formal",
    lastEditedAt: "2026-02-12",
    source: "template",
  },

  // Transportation
  {
    id: "tpl:help-with-luggage-seat-1-en",
    category: "support",
    priority: 1,
    lang: "en",
    title: "Help with luggage/seat",
    message: "I need help with my luggage/seat.",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "help with luggage/seat",
    tone: "neutral",
    lastEditedAt: "2026-02-12",
    source: "template",
  },

  // Social Scripts
  {
    id: "tpl:conversation-processing-time-1-en",
    category: "capacity",
    priority: 1,
    lang: "en",
    title: "Conversation processing time",
    message:
      "I’d like to join the conversation, but I need a moment to process.",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "time to process",
    tone: "neutral",
    lastEditedAt: "2026-02-12",
    source: "template",
  },

  // Tech Support
  {
    id: "tpl:tech-device-1-en",
    category: "support",
    priority: 1,
    lang: "en",
    title: "Tech device support [device]", // if feasible, auto update [device] later
    message:
      "I’m having trouble with [device]. Could you guide me step by step?",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "get tech support [device]", // if feasible, auto update [device] later
    tone: "neutral",
    lastEditedAt: "2026-02-12",
    source: "template",
  },

  // Pet Care
  {
    id: "tpl:pet-care-1-en",
    category: "support",
    priority: 1,
    lang: "en",
    title: "Pet Care",
    message: "My pet needs medication. Here’s the schedule: [list].",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "help with pet medication",
    tone: "neutral",
    lastEditedAt: "2026-02-12",
    source: "template",
  },

  // ─────────────────────────────
  // Explanations / Apology
  // ─────────────────────────────

  {
    id: "tpl:sorry-1-en",
    category: "family",
    priority: 0,
    disclosureIds: ["nonverbal"],
    lang: "en",
    title: "Saying sorry",
    message: "Sorry.",
    sharing: SharingPolicy.PRIVATE,
    quickAccess: QuickAccessPolicy.BLOCKED,
    intent: "saying sorry",
    tone: "minimal",
    lastEditedAt: "2026-02-12",
    source: "template",
  },

  {
    id: "tpl:eye-contact-fail-1-en",
    category: "capacity",
    priority: 0,
    lang: "en",
    title: "Apologizing - eye contact",
    message: "Sorry. Eye contact is difficult for me.",
    sharing: SharingPolicy.PRIVATE,
    quickAccess: QuickAccessPolicy.BLOCKED,
    intent: "apologizing - eye contact",
    tone: "explanatory",
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
    lang: "en",
    title: "Ordering coffee",
    message: "Hello, an espresso with a glass of water, please.",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "ordering espresso",
    tone: "formal",
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  {
    id: "tpl:ordering-hamburger-1-en",
    category: "tasks",
    priority: 1,
    lang: "en",
    title: "Ordering hamburger + salad",
    message: "Hello, could I get some water, a hamburger and a salad, please?",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "eye contact",
    tone: "formal",
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  {
    id: "tpl:ordering-coffee-2-en",
    category: "tasks",
    priority: 1,
    lang: "en",
    title: "Ordering coffee",
    message: "Hello, a latte with soy milk, please.",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "ordering cafe latte",
    tone: "formal",
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  {
    id: "tpl:ordering-pizza-1-en",
    category: "tasks",
    priority: 1,
    lang: "en",
    title: "Ordering pizza",
    message: "I'd like a pizza margherita and a glass of water, please.",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "ordering pizza default",
    tone: "formal",
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  // ─────────────────────────────
  // capacity / time / processing
  // ─────────────────────────────

  {
    id: "tpl:capacity-time-en",
    category: "capacity",
    priority: 1,
    lang: "en",
    disclosureIds: ["work", "private"],
    title: "Need time",
    message: "This may take a moment.",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "need time",
    tone: "minimal",
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  {
    id: "tpl:capacity-documents-en",
    category: "capacity",
    priority: 1,
    lang: "en",
    disclosureIds: ["work", "private"],
    title: "Finding documents",
    message: "I have valid documents. This may take a moment.",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "finding documents",
    tone: "formal",
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  {
    id: "tpl:capacity-ticket-en",
    category: "capacity",
    priority: 1,
    lang: "en",
    disclosureIds: ["work", "private"],
    title: "Finding ticket ",
    message: "I have a valid ticket. This may take a moment.",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "finding a ticket",
    tone: "formal",
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  {
    id: "tpl:capacity-speech-en",
    category: "capacity",
    priority: 1,
    lang: "en",
    title: "Can’t speak",
    message: "I’m having difficulty speaking right now.",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "can't speak",
    tone: "neutral",
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  {
    id: "tpl:capacity-processing-en",
    category: "capacity",
    priority: 1,
    lang: "en",
    title: "Can’t process information",
    message: "I’m having difficulty processing information.",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "can’t process information",
    tone: "neutral",
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  {
    id: "tpl:capacity-overwhelmed-en",
    category: "capacity",
    priority: 1,
    lang: "en",
    title: "Overwhelmed",
    message: "I’m overwhelmed and need time.",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "overwhelmed",
    tone: "neutral",
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  {
    id: "tpl:capacity-listening-only-en",
    category: "capacity",
    priority: 1,
    lang: "en",
    title: "Listening only",
    message: "I can listen, but responding is difficult right now.",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "listening only",
    tone: "neutral",
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  // ─────────────────────────────
  // Medical / health framing
  // ─────────────────────────────

  {
    id: "tpl:medical-unwell-en",
    category: "medical",
    priority: 1,
    lang: "en",
    title: "Unwell (brief)",
    message: "I’m safe, but I’m unwell.",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "unwell (brief)",
    tone: "neutral",
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  {
    id: "tpl:medical-temporary-en",
    category: "medical",
    priority: 1,
    lang: "en",
    title: "Temporary condition",
    message: "This will pass. I need time.",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "temporary condition needing time",
    tone: "neutral",
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  {
    id: "tpl:disclosure-neurological-en",
    category: "medical",
    priority: 1,
    lang: "en",
    title: "Health disclosure (brief)",
    message: "I’m dealing with a neurological issue.",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "health disclosure (brief)",
    tone: "neutral",
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  // Medical/Access Needs
  {
    id: "tpl:medical-need-1-en",
    category: "medical",
    priority: 0,
    lang: "en",
    title: "Medical disclosure",
    message:
      "I have a chronic illness. I may need to sit/leave suddenly. Thank you for understanding.",
    sharing: SharingPolicy.PRIVATE,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "medical disclosure",
    tone: "explanatory",
    lastEditedAt: "2026-02-12",
    source: "template",
  },

  // ─────────────────────────────
  //    Work / public-facing
  // ─────────────────────────────

  {
    id: "tpl:work-pause-en",
    category: "work",
    priority: 1,
    lang: "en",
    title: "Need a pause",
    message: "I’m having a health issue and need a pause.",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "request work break",
    tone: "formal",
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  {
    id: "tpl:work-later-en",
    category: "work",
    priority: 1,
    lang: "en",
    title: "Respond later",
    message: "I’ll respond as soon as I can.",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "delay response",
    tone: "neutral",
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  {
    id: "tpl:work-unavailable-en",
    category: "work",
    priority: 1,
    lang: "en",
    title: "Not available",
    message: "I’m not available for discussion right now.",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "unavailable for discussion",
    tone: "neutral",
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  // ─────────────────────────────
  // Support / assistance
  // ─────────────────────────────

  {
    id: "tpl:support-water-en",
    category: "capacity",
    priority: 1,
    lang: "en",
    title: "Need water",
    message: "Water would help.",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "request water",
    tone: "minimal",
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  // ─────────────────────────────
  // Emergency framing
  // ─────────────────────────────

  {
    id: "tpl:emergency-not-needed-en",
    category: "medical",
    priority: 1,
    lang: "en",
    title: "No emergency",
    message: "I don’t need emergency services.",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "decline emergency services",
    tone: "formal",
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  {
    id: "tpl:emergency-disclosure-en",
    category: "medical",
    priority: 1,
    lang: "en",
    disclosureIds: ["work", "private"],
    title: "Emergency disclosure",
    message: "I have the following conditions and need help.",
    list: ["asthma", "diabetes", "MCAS"],
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "emergency medical disclosure",
    tone: "formal",
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  // ─────────────────────────────
  // Explanations / descriptive (internal note: having police, authority in mind)
  // ─────────────────────────────

  {
    id: "tpl:explanations-processing-en",
    category: "explanations",
    priority: 1,
    lang: "en",
    title: "Explanations: processing difficulty",
    message: "I’m overwhelmed and having difficulty processing instructions.",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "explain processing difficulty",
    tone: "explanatory",
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  {
    id: "tpl:explanations-disability-en",
    category: "explanations",
    priority: 1,
    lang: "en",
    title: "Explanations: disability",
    message: "I have a disability that affects communication.",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "explain communication disability",
    tone: "explanatory",
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  {
    id: "tpl:explanations-documents-en",
    category: "explanations",
    priority: 1,
    lang: "en",
    title: "Explanations: finding documents",
    message: "I have valid documents. I need time to locate them.",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "explain document location delay",
    tone: "explanatory",
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  // ─────────────────────────────
  // Family / friends / private
  // ─────────────────────────────

  {
    id: "tpl:status-en",
    category: "family",
    priority: 1,
    lang: "en",
    title: "Asking what's wrong?",
    disclosureIds: ["work", "private"],
    message: "What's wrong?",
    list: [],
    media: [],
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "ask about well-being",
    tone: "neutral",
    lastEditedAt: "2026-01-30",
    source: "template",
  },
  {
    id: "tpl:presence-en",
    category: "family",
    priority: 1,
    lang: "en",
    title: "I'm here.",
    disclosureIds: ["work", "private"],
    message: "I'm here.",
    list: [],
    media: [],
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "indicate presence",
    tone: "minimal",
    lastEditedAt: "2026-01-30",
    source: "template",
  },
  {
    id: "tpl:love-en",
    category: "family",
    priority: 1,
    lang: "en",
    title: "Love",
    disclosureIds: ["work", "private"],
    message: "I love you.",
    list: [],
    media: [],
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "express love",
    tone: "minimal",
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  // ─────────────────────────────
  // Assertive / boundaries
  // ─────────────────────────────

  {
    id: "tpl:boundaries-don-t-want-en",
    category: "boundaries",
    priority: 1,
    lang: "en",
    title: "Boundaries: don't want",
    message: "I’m overwhelmed and I don’t want this.",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "set boundary - decline",
    tone: "urgent",
    lastEditedAt: "2026-01-30",
    source: "template",
  },
  {
    id: "tpl:boundaries-stop-en",
    category: "boundaries",
    priority: 1,
    lang: "en",
    title: "Boundaries: stop",
    message: "I am overwhelmed! Please stop!",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "set boundary - stop",
    tone: "urgent",
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  {
    id: "tpl:boundaries-stop-not-consent-en",
    category: "boundaries",
    priority: 1,
    lang: "en",
    title: "Boundaries: stop (silence is not consent)",
    message:
      "Please stop! Silence is not consent. I am overwhelmed and I want you to stop.",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "set boundary - stop with consent clarification",
    tone: "urgent",
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  // ─────────────────────────────
  //       Tasks / Lists
  // ─────────────────────────────

  {
    id: "tpl:grocery-list-en",
    category: "tasks",
    priority: 1,
    lang: "en",
    title: "Grocery list",
    disclosureIds: ["work", "private"],
    message: "I need help to get some items.",
    list: ["Milk", "Butter", "Bread"],
    media: [],
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "request grocery assistance",
    tone: "neutral",
    lastEditedAt: "2026-01-30",
    source: "template",
  },
  {
    id: "tpl:need-to-do-something-en",
    category: "tasks",
    priority: 1,
    lang: "en",
    title: "I need to do something",
    disclosureIds: ["work", "private"],
    message:
      "I need to do something. I can't talk right now. Please help me, I will show you.",
    list: [],
    media: [],
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "request task assistance",
    tone: "urgent",
    lastEditedAt: "2026-01-30",
    source: "template",
  },
  {
    id: "tpl:emergency-pets-en",
    category: "tasks",
    priority: 1,
    lang: "en",
    title: "Emergency: Pets", // for hospital/emergencies
    disclosureIds: ["work", "private"],
    message:
      "I have pets at home. Please help me find someone to look after them. My pets:",
    list: ["2 cats", "a dog", "fish"],
    media: [],
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "emergency pet care request",
    tone: "formal",
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  {
    id: "tpl:buy-ticket-en",
    category: "tasks",
    priority: 1,
    lang: "en",
    title: "Buy a ticket",
    disclosureIds: ["work", "private"],
    message: "I need to buy a ticket.",
    list: ["1 adult", "New York", "senior citizens discount"],
    media: [],
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "purchase ticket",
    tone: "minimal",
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  {
    id: "tpl:get-on-board-en",
    category: "tasks",
    priority: 1,
    lang: "en",
    title: "Help boarding",
    disclosureIds: ["work", "private"],
    message: "I need to get on board. Please help.",
    list: [],
    media: [],
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    intent: "request boarding assistance",
    tone: "minimal",
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
    disclosureIds: ["work", "private"],
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
