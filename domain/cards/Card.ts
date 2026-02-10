import { QuickAccessPolicy, SharingPolicy } from "./Card.constants";

export type SharingPolicyType =
  (typeof SharingPolicy)[keyof typeof SharingPolicy];

export type QuickAccessPolicyType =
  (typeof QuickAccessPolicy)[keyof typeof QuickAccessPolicy];

export type Category =
  | "capacity"
  | "boundaries"
  | "low-conflict"
  | "tasks"
  | "medical"
  | "work"
  | "family";

export type Card = {
  id: string;
  category: string;
  priority: number;
  lang: string;
  title: string;
  disclosureIds?: string[]; // optional, empty by default
  message: string;
  list?: string[];
  media?: any[];
  sharing: SharingPolicyType;
  quickAccess: QuickAccessPolicyType;
  lastEditedAt: string; // ISO date
  source: "template" | "user";
};
