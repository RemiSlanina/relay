# Backlog

## 📚🤔 Open

- added templateId?: string; to Cards.ts for lineage (see future ideas)
- added a banner for persistence failure

## Future Ideas

### Icons

Wordmark accidentally appears in icon and favicon.

Icons and splash shoulc only use the logo, not the wordmarks.

Take care to export with 1024x1024 in settings (inkscape export settings).

### Dark mode

Expo Router navigation header doesn't respect dark mode. Fix this.

### Update policy

`updateCard()` currently ignores unknown IDs.

Open question:

- Is this purely a programmer error?
- Should updateCard() return boolean?
- Should development builds warn when an unknown ID is updated?
- Unknown IDs should not trigger persistence.

### Tracking unsaved changes

CardsContext already exposes hasUnsavedChanges
When the app is closed, the app should remind the user about unsaved changes (simple alert) in case they wish to retry.

I want an option to turn such features off in settings.

Disclosures:

- either add a separate hasUnsavedChanges to CardsContext later and check both
- or even add a hybid hasGlobalUnsavedChanges that combines both into a global state.

### Template refactor

see [Templates: Future Library](/docs/design/cards.templates.md)

- [ ] refactor templates using the following model:

instead of

```
domain/cards/
    cards.templates.ts          // Starter set (ships)
    cards.templates.extra.ts    // Additional templates
    cards.templates.dev.ts      // Layout tests, lorem ipsum, experiments (gitignored if desired)
```

better

```
domain/cards/templates/
    starter.ts
    medical.ts
    travel.ts
    work.ts
    family.ts
    experimental.ts
```

### Import Management

- Warn after repeated imports of same template (warn after 5 duplicate imports without any edits other than id?)
- Count imports by template
- Consider disabling warning in settings
- Investigate accidental-import protection

### Card Lineage

- Decide whether templateId should be persisted
- Show original template information
- Consider import history

### Sharing

- Explore createdBy field
- Explore sharedBy field
- Design ownership model

### Disclosure Code

- rename useDisclosure() to useDisclosures()

### templateId in disclosures (and cards)

Should imported disclosures retain an optional `templateId`
to preserve their origin, or did this become obsolete?
Likewise for cards templateId: Is the relationship unnecessary?
(I believe I wanted to track and prevent multiple accidental cloning actions later in import.)
Maybe look at this again when implementing import (not during setup, later imports from tmpl or sharing).
