import { Disclosure } from "./Disclosure";
// Optional contextual disclosures attached to a card.
// These are short, low-cognitive-load statements.

export const DISCLOSURE_TEMPLATES: Disclosure[] = [
  // Autism / overload
  {
    id: "autism",
    text: "I'm autistic and may be overwhelmed.",
    sensitive: true,
  },
  {
    id: "overwhelmed",
    text: "I'm currently overwhelmed.",
    sensitive: false,
  },

  // nonverbal identity
  { id: "nonverbal", text: "I’m in a nonverbal phase." },

  // Speech-related (diagnosis-free, function-based)
  {
    id: "cannot-speak",
    text: "I am currently unable to speak. Please read the message on my screen.",
    sensitive: false,
  },
  {
    id: "text-communication",
    text: "I use text to communicate. Please respond in writing if possible.",
    sensitive: false,
  },
  {
    id: "non-speaking",
    text: "I am non-speaking.",
    sensitive: true,
  },

  // Hearing-related (separate from speech)
  {
    id: "hard-of-hearing",
    text: "I am hard of hearing. Please face me when speaking.",
    sensitive: false,
  },
  {
    id: "cannot-hear-clearly",
    text: "I cannot hear clearly. Please write it down if possible.",
    sensitive: false,
  },

  // Health / medical (kept general)
  {
    id: "health-issue",
    text: "I'm experiencing a health issue.",
    sensitive: false,
  },
  {
    id: "neurological",
    text: "I'm dealing with a neurological condition.",
    sensitive: true,
  },

  // Privacy-preserving option
  {
    id: "private",
    text: "I'm unable to explain my condition right now.",
    sensitive: true,
  },
];
