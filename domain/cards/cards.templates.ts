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
//   | "boundaries"
//   | "low-conflict-phrasing"
//   | "tasks"
//   | "medical"
//   | "work"
//   | "family";

import { Card } from "./Card";
import { QuickAccessPolicy, SharingPolicy } from "./Card.constants";

export const TEMPLATE_CARDS: Card[] = [
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
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  {
    id: "tpl:capacity-ticket-en",
    category: "capacity",
    priority: 1,
    lang: "en",
    disclosureIds: ["work", "private"],
    title: "Finding ticket / documents",
    message: "I have valid documents. This may take a moment.",
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
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
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  // ─────────────────────────────
  // Work / public-facing
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
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  // ─────────────────────────────
  // Explanations / descriptive
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
    title: "What's wrong?",
    disclosureIds: ["work", "private"],
    message: "What's wrong?",
    list: [],
    media: [],
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
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
    lastEditedAt: "2026-01-30",
    source: "template",
  },
  {
    id: "tpl:emergency-pets-en",
    category: "tasks",
    priority: 1,
    lang: "en",
    title: "Emergency : Pets", // for hospital/emergencies
    disclosureIds: ["work", "private"],
    message:
      "I have pets at home. Please help me find someone to look after them. My pets:",
    list: ["2 cats", "a dog", "fish"],
    media: [],
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
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
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  {
    id: "tpl:get-on-board-en",
    category: "tasks",
    priority: 1,
    lang: "en",
    title: "Help boarding.",
    disclosureIds: ["work", "private"],
    message: "I need to get on board. Please help.",
    list: [],
    media: [],
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
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
    lastEditedAt: "2026-01-30",
    source: "template",
  },
];
