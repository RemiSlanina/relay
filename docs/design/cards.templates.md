# Template Library Design

This document records design decisions, experiments, and future ideas for
Relay's template card library.

Unlike the roadmap, it focuses on the reasoning behind the design rather
than implementation status.

## Starter Set

The default installation should include only a small curated collection
(roughly 5 to 7 cards).

Reason:

- reduce cognitive load
- avoid overwhelming new users
- provide immediately useful examples

Possible starter cards:

- Sensory overload
- Ordering coffee
- Need more time
- Medical disclosure
- Boundaries: Stop
- Grocery list

The user should be able to add more/others if they like. The import flow should minimize cognitive load (decent button 'see more' ...).

## Future Library

see [Backlog:Template refactor](/docs/backlog.md)

Categories:

- Medical
- Work
- Family
- Travel
- ...

Ideas:

- "Show more"
- Search
- Recommended templates
- Category browsing

## Archived Notes

### Original Starter Set Idea

Start with a small curated default set (5 to 7 cards).

Possible cards:

- Sensory overload
- Ordering coffee
- Need time
- Medical disclosure
- Boundaries: Stop
- Grocery list

### "Show More"

Group remaining templates by category.

Possible categories:

- Medical
- Work
- Family

Allow:

- search
- category browsing
- recommendations

### Design History

1. Default Starter Set
   To avoid overwhelm, start with a small, curated default set (5-7 cards) that covers the most common/urgent scenarios. For example:
   Sensory overload warning (tpl:sensory-overload-1-en)
   Ordering coffee (tpl:ordering-coffee-1-en)
   Need time (tpl:capacity-time-en)
   Medical disclosure (tpl:medical-need-1-en)
   Overwhelmed (tpl:capacity-overwhelmed-en)
   Boundaries: stop (tpl:boundaries-stop-en)
   Grocery list (tpl:grocery-list-en)

- a Button with ""Show More" Option"

2. "Show More" Option
   Group the remaining cards by category (e.g., "Medical," "Work," "Family") and offer a "Show more" button in each category.
   Allow users to search or filter by category, priority, or keyword (e.g., "coffee," "boundaries").
   Consider a "Recommended for You" section based on usage patterns (e.g., if someone frequently uses food-ordering cards, suggest similar templates).

3. Onboarding Flow
   During first-time setup, ask users to select 3-5 cards from a shortlist to add to their quick-access toolbar.
   Offer a one-tap option to "Load all templates" for users who want everything upfront.

4. Customization Hints
   Add a tooltip or placeholder in the UI for editable fields (e.g., "Tap to add your own items" for grocery lists).
   For cards with list fields, pre-fill with common examples (e.g., "Milk, Bread, Eggs") but make it easy to clear or edit.

5. Visual Organization
   Use icons or colors to distinguish categories (e.g., red for emergencies, blue for tasks).
   For quick access, swipeable toolbar or home screen widget (if technically feasible).

6. Other:
   Use a toggle in settings to "Show all templates" or "Show only my cards."
   Implement a simple search bar to filter cards by title, category, set or message.

```
tone => tones[] (later, perhaps, currently not feasible):
  tones: {
    minimal: "...",
    formal: "..."
  }
```

Add to settings (important!):

> Tone can affect how messages are received in high-power or authority contexts.
> Choose the tone that best fits your situation.

---

```
export const SharingPolicy = {
  INHERIT: "inherit",
  PUBLIC: "public",
  PRIVATE: "private",
} as const;
export const QuickAccessPolicy = {
  ALLOWED: "allowed",
  BLOCKED: "blocked",
  INHERIT: "inherit",
} as const;
```

export type Category =
| "capacity"
| "support"
| "boundaries"
| "low-conflict-phrasing"
| "tasks"
| "medical"
| "work"
| "family";

```
Tone is about how it SOUNDS, not how serious it is.

Priority: Use 0 for urgent/emergency cards, 1 for common tasks.

Start with a small curated default set (5 to 7 cards), then let users load more by category or all at once.
```
