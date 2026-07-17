import { Disclosure } from "./Disclosure";
// Optional contextual disclosures attached to a card.
// These are short, low-cognitive-load statements.

export const TEMPLATES_DISCLOSURES: Disclosure[] = [
  // Autism / overload
  {
    id: "tpl:autism",
    templateId: "autism",
    text: "I'm autistic and may be overwhelmed.",
    sensitive: true,
    lastEditedAt: "2026-07-14",
  },
  {
    id: "tpl:overwhelmed",
    templateId: "overwhelmed",
    text: "I'm currently overwhelmed.",
    sensitive: false,
    lastEditedAt: "2026-07-14",
  },

  // nonverbal identity
  {
    id: "tpl:nonverbal",
    templateId: "nonverbal",
    text: "I`m in a nonverbal phase.",
    lastEditedAt: "2026-07-14",
  },

  // Speech-related (diagnosis-free, function-based)
  {
    id: "tpl:cannot-speak",
    templateId: "cannot-speak",
    text: "I am currently unable to speak. Please read the message on my screen.",
    sensitive: false,
    lastEditedAt: "2026-07-14",
  },
  {
    id: "tpl:text-communication",
    templateId: "text-communication",
    text: "I use text to communicate. Please respond in writing if possible.",
    sensitive: false,
    lastEditedAt: "2026-07-14",
  },
  {
    id: "tpl:non-speaking",
    templateId: "non-speaking",
    text: "I am non-speaking.",
    sensitive: true,
    lastEditedAt: "2026-07-14",
  },

  // Hearing-related (separate from speech)
  {
    id: "tpl:hard-of-hearing",
    templateId: "hard-of-hearing",
    text: "I am hard of hearing. Please face me when speaking.",
    sensitive: false,
    lastEditedAt: "2026-07-14",
  },
  {
    id: "tpl:cannot-hear-clearly",
    templateId: "cannot-hear-clearly",
    text: "I cannot hear clearly. Please write it down if possible.",
    sensitive: false,
    lastEditedAt: "2026-07-14",
  },

  // Health / medical (kept general)
  {
    id: "tpl:health-issue",
    templateId: "health-issue",
    text: "I'm experiencing a health issue.",
    sensitive: false,
    lastEditedAt: "2026-07-14",
  },
  {
    id: "tpl:neurological",
    templateId: "neurological",
    text: "I'm dealing with a neurological condition.",
    sensitive: true,
    lastEditedAt: "2026-07-14",
  },

  // Privacy-preserving option
  {
    id: "tpl:private",
    templateId: "private",
    text: "I'm unable to explain my condition right now.",
    sensitive: true,
    lastEditedAt: "2026-07-14",
  },
];
