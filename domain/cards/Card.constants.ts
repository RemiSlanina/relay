/**
 * Shared policy constants used by card metadata.
 *
 * These values describe behaviors that may later be inherited from
 * higher-level objects such as card sets.
 */
//   ***************************************
/**
 * Card sharing policies.
 *
 * Determines how a card may be shared or inherited.
 *
 * - INHERIT: Use the parent or container policy.
 * - PUBLIC: Card may be shared publicly.
 * - PRIVATE: Card remains private.
 */
export const SharingPolicy = {
  INHERIT: "inherit",
  PUBLIC: "public",
  PRIVATE: "private",
} as const;

/**
 * Quick access policies.
 *
 * Determines whether a card may appear in quick-access interfaces.
 *
 * - ALLOWED: Card may appear in quick-access UI.
 * - BLOCKED: Exclude the card from quick access.
 * - INHERIT: Use the parent or container policy.
 */
export const QuickAccessPolicy = {
  ALLOWED: "allowed",
  BLOCKED: "blocked",
  INHERIT: "inherit",
} as const;
