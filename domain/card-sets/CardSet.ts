// TODO : update rom categories?: string[]; to categories?: Category[]; if using premade categories
// later:
// currentTone = "neutral"
// visibleCards = cards.filter(c => c.tone === currentTone)

import { QuickAccessPolicyType, SharingPolicyType, Tone } from "../cards/Card";

export type CardSet = {
  id: string;
  title: string;
  cardIds?: string[]; // explicit picks
  tone?: Tone;
  intent?: string;
  categories?: string[];
  isDefault?: boolean;

  priority?: number;
  lang?: string;
  disclosureIds?: string[];
  list?: string[];
  media?: any[];
  sharing: SharingPolicyType;
  quickAccess: QuickAccessPolicyType;
  lastEditedAt: string; // ISO date
};
