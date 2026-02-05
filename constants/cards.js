//  DEPRECATED

const SharingPolicy = {
  INHERIT: "inherit",
  PUBLIC: "public",
  PRIVATE: "private",
};

const QuickAccessPolicy = {
  ALLOWED: "allowed",
  BLOCKED: "blocked",
  INHERIT: "inherit",
};

//  DEPRECATED

export const DUMMY_CARDS = [
  {
    id: "finding-tickets-en",
    category: "daily-life",
    priority: "1",
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
  },

  {
    id: "shopping-list-en",
    category: "daily-life",
    priority: "1",
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
  },

  {
    id: "making-an-appointment-en",
    category: "daily-life",
    priority: "2",
    lang: "en",
    title: "I need an appointment",
    context: "I rely on written communication",
    message: "I need an appointment for X.",
    list: [],
    media: [],
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    lastEditedAt: "2026-01-30",
  },

  {
    id: "medical-data-it",
    category: "medical",
    priority: "1",
    lang: "it",
    title: "Informazioni mediche",
    context: "A volte ho difficoltà a parlare",
    message: "Soffro di asma e ho bisogno di farmaci.",
    list: ["Step 1", "Step 2", "Step 3"],
    media: [],
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    lastEditedAt: "2026-01-30",
  },

  {
    id: "medical-data-en",
    category: "medical",
    priority: "1",
    lang: "en",
    title: "Medical information",
    context: "I sometimes struggle with speech",
    message: "I have asthma and need medication.",
    list: ["Step 1", "Step 2", "Step 3"],
    media: [],
    sharing: SharingPolicy.INHERIT,
    quickAccess: QuickAccessPolicy.ALLOWED,
    lastEditedAt: "2026-01-30",
  },
];
