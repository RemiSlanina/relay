/**
 * Represents the type for an optional disclosure the user can show
 * f.e.: "I am autistic." or "I have a health condition"
 */

export type Disclosure = {
  id: string;
  templateId: string; // right now, this is used for referencing FUTURE: replace
  label?: string; // optional, for UI like "autism" or "cannot-speak"
  text: string; // what gets shown
  sensitive?: boolean; // default false
  /**
   * Timestamp of the last edit, in ISO format.
   */
  lastEditedAt: string;
};
