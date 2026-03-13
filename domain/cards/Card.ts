import { QuickAccessPolicy, SharingPolicy } from "./Card.constants";

export type SharingPolicyType =
  (typeof SharingPolicy)[keyof typeof SharingPolicy];

export type QuickAccessPolicyType =
  (typeof QuickAccessPolicy)[keyof typeof QuickAccessPolicy];

export type Category =
  | "capacity"
  | "support"
  | "boundaries"
  | "low-conflict"
  | "tasks"
  | "medical"
  | "work"
  | "family";

export type Tone = "neutral" | "formal" | "urgent" | "minimal" | "explanatory";

export type Card = {
  id: string; // starts with: usr: for userCards or tpl: for templates
  category: Category;
  priority: number;
  lang: string;
  title: string;
  disclosureIds?: string[]; // optional, empty by default
  message: string;
  list?: string[] | null | undefined; // omitted: undefined; can be explicitely set to null too
  media?: any[] | null | undefined;
  sharing: SharingPolicyType;
  quickAccess: QuickAccessPolicyType;
  intent?: string;
  tone?: Tone;
  lastEditedAt: string; // ISO date
  source: "template" | "user"; // don't use for pattern matching, use id.startsWith("usr:") /("tpl")
};
