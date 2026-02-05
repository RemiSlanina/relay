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

import { Card } from "./Card";
import { QuickAccessPolicy, SharingPolicy } from "./Card.constants";

export const TEMPLATE_CARDS: Card[] = [
  {
    id: "finding-tickets-en",
    category: "daily-life",
    priority: 1,
    lang: "en",
    title: "Finding tickets",
    context: "I am autistic",
    message:
      "I am searching for my ticket. I might struggle with overwhelm. Please bear with me!",
    list: [],
    media: [], // reserved for later, empty now
    sharing: SharingPolicy.INHERIT, // disclosure / sharing policy
    quickAccess: QuickAccessPolicy.ALLOWED, // disclosure / sharing policy // eligibility for fast surfaces
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  {
    id: "groceries-en",
    category: "daily-life",
    priority: 1,
    lang: "en",
    title: "Groceries",
    context: "I am overwhelmed due to Long Covid",
    message: "Please help me get the following items",
    list: [
      "Milk",
      "Bread",
      "Butter",
      "Cheesecake Protein Bars",
      "Tofu",
      "Salad",
      "Pizza",
      "Hamburger",
      "Hot Dogs",
    ],
    media: [],
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  {
    id: "migraine-general-info-en",
    category: "daily-life",
    priority: 1,
    lang: "en",
    title: "Migraine general info",
    context: "I have a migraine. I am overwhelmed.",
    message:
      "Please be patient and speak quietly. Turn down the lights if possible.",
    list: [],
    media: [],
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  {
    id: "shopping-list-en",
    category: "daily-life",
    priority: 1,
    lang: "en",
    title: "Shopping list",
    context: "",
    message: "Please help me get some items.",
    list: [
      "D3 drops (14,400 IU/ml)",
      "Vitamin D3 1600 IU",
      "Vitamin D3 drops 800 IU/ml",
      "Vitamin D3 drops 4000 IU",
    ],
    media: [],
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  {
    id: "making-an-appointment-en",
    category: "daily-life",
    priority: 2,
    lang: "en",
    title: "I need an appointment",
    context: "I rely on written communication",
    message: "I need an appointment for X.",
    list: [],
    media: [],
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  {
    id: "medical-data-it",
    category: "medical",
    priority: 1,
    lang: "it",
    title: "Informazioni mediche",
    context: "A volte ho difficoltà a parlare",
    message: "Soffro di asma e ho bisogno di farmaci.",
    list: ["Step 1", "Step 2", "Step 3"],
    media: [],
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    lastEditedAt: "2026-01-30",
    source: "template",
  },

  {
    id: "medical-data-en",
    category: "medical",
    priority: 1,
    lang: "en",
    title: "Medical information",
    context: "I sometimes struggle with speech",
    message: "I have asthma and need medication.",
    list: ["Step 1", "Step 2", "Step 3"],
    media: [],
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    lastEditedAt: "2026-01-30",
    source: "template",
  },
];
