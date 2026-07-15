/**
 * Card domain types.
 *
 * This module defines the core data structures for communication cards.
 * Cards represent pre-written messages that users can quickly send in
 * various communication scenarios.
 */

import { QuickAccessPolicy, SharingPolicy } from "./Card.constants";

export type SharingPolicyType =
  (typeof SharingPolicy)[keyof typeof SharingPolicy];

export type QuickAccessPolicyType =
  (typeof QuickAccessPolicy)[keyof typeof QuickAccessPolicy];

/**
 * Card categories represent the purpose or context of a communication card.
 * Used for filtering, sorting, and organizing cards in the UI.
 */
export type Category =
  | "capacity"
  | "support"
  | "boundaries"
  | "low-conflict"
  | "tasks"
  | "medical"
  | "work"
  | "family";

/**
 * Tone indicates the style or manner in which a message should be delivered.
 * Affects how messages are received in different contexts.
 */
export type Tone = "neutral" | "formal" | "urgent" | "minimal" | "explanatory";

/**
 * A communication card containing a pre-written message.
 *
 * Cards can be either:
 * - templates (id starts with "tpl:") - pre-defined, read-only cards
 * - user cards (id starts with "usr:") - user-created or imported cards
 *
 * The `source` field currently exists for backwards compatibility.
 * Prefer checking `id.startsWith("usr:")` or `id.startsWith("tpl:")` for
 * pattern matching.
 */
export type Card = {
  /**
   * Unique identifier.
   * Template cards: start with "tpl:"
   * User cards: start with "usr:"
   */
  id: string;

  /**
   * Original template ID.
   *
   * Present for cards imported from templates.
   * Undefined for user-created cards.
   * Used for tracing lineage and potentially detecting duplicates.
   */
  templateId?: string;

  /**
   * The card's category, used for organization and filtering.
   */
  category: Category;

  /**
   * Display priority.
   *
   * Lower numbers indicate higher priority.
   * Priority 0 is reserved for urgent or emergency cards.
   */
  priority: number;

  /**
   * Language code (e.g., "en", "de").
   */
  lang: string;

  /**
   * The card's title, displayed in card lists and navigation.
   */
  title: string;

  /**
   * IDs of optional disclosures shown together with this card.
   *
   * Each ID references a disclosure template that provides additional
   * context without requiring the user to include it in the main message.
   */
  disclosureIds?: string[];

  /**
   * Message shown to the communication partner.
   */
  message: string;

  /**
   * Optional list of items (e.g., for grocery or task lists).
   * Can be undefined (not provided), null (explicitly empty), or an array.
   */
  list?: string[] | null | undefined;

  /**
   * Optional media attachments.
   * FUTURE: Media model not yet defined.
   */
  media?: any[] | null | undefined;

  /**
   * Controls how this card can be shared with others.
   */
  sharing: SharingPolicyType;

  /**
   * Controls whether this card appears in quick-access UI.
   */
  quickAccess: QuickAccessPolicyType;

  /**
   * The intent or purpose of this communication.
   * Used for semantic categorization.
   */
  intent?: string;

  /**
   * The stylistic tone of this communication. Delivery style of a communication card.
   *
   * Tone affects phrasing rather than meaning.
   */
  tone?: Tone;

  /**
   * Timestamp of the last edit, in ISO format.
   */
  lastEditedAt: string;

  /**
   * Origin of this card.
   * Note: prefer checking id prefix (usr:/tpl:) for pattern matching.
   */
  source: "template" | "user";
};
