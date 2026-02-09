import { Disclosure } from "./Disclosure";

export const DISCLOSURE_TEMPLATES: Disclosure[] = [
  {
    id: "autism",
    text: "I'm autistic. I might be overwhelmed.",
    sensitive: true,
  },
  { id: "health", text: "I'm having a health issue." },
  { id: "work", text: "I'm currently unwell." },
  {
    id: "neurological",
    text: "I’m dealing with a neurological issue.",
    sensitive: true,
  },
  { id: "nonverbal", text: "I’m in a nonverbal phase." },
  {
    id: "private",
    text: "My condition is causing overwhelm.",
    sensitive: true,
  },
];
