Purpose
=======

This file provides concise, actionable guidance for AI coding assistants (and human contributors) working on Relay. Focus on small, safe changes that follow the project's TypeScript + Expo patterns, do not attempt risky platform changes, and respect user privacy and sensitive content.

**Repository Overview**
- **Language:** TypeScript (strict), React / React Native with Expo.
- **Routing:** expo-router (file-based routing under app/).
- **State & Domain:** domain/* holds models and Context providers (e.g., domain/cards/Card.ts, domain/cards/CardsContext.tsx).
- **Templates:** Default cards live in domain/cards/cards.templates.ts and are shaped by domain/cards/Card.ts.
- **Providers wired:** app/_layout.tsx composes CardsProvider and DisclosureProvider for app-wide state.

**Developer Conventions**
- **Types & Shape:** Always match the `Card` type in `domain/cards/Card.ts` when editing templates or adding cards.
- **IDs:** Use `tpl:` prefix for template IDs, `usr:` for user-generated IDs.
- **Dates:** Use ISO 8601 strings for `lastEditedAt` (e.g. `2026-02-12`).
- **Policies:** Use constants from `domain/cards/Card.constants.ts` for `sharing` and `quickAccess` values.
- **Paths:** Use project path alias `@/*` (see `tsconfig.json`).
- **Formatting & linting:** Project uses ESLint and VSCode auto actions. Run `npm run lint` before creating PRs.

**How to update or add templates**
1. Edit `domain/cards/cards.templates.ts` only for built-in template changes.
2. Ensure each new object conforms exactly to `Card` type (fields, enums, and `lastEditedAt`).
3. Use `SharingPolicy` and `QuickAccessPolicy` constants for policy fields.
4. Keep templates minimal; avoid adding medical/legal guidance beyond brief, non-actionable status strings.

**Context providers & hooks guidance**
- `CardsProvider` surface: `{ cards, getCardById, addCard, updateCard }`. Use `useCards()` only inside provider.
- `DisclosureProvider` and `useDisclosure()` follow the same pattern.
- If you need persistent storage, add a clear, tested abstraction in domain/*/*.storage.ts rather than touching provider internals.

**AI assistant rules / scope**
- Make small, focused edits; prefer adding new files or small updates over large refactors.
- Keep public APIs stable: do not rename public context methods without updating all usages.
- Do not add networked telemetry, analytics, or third-party tracking.
- Respect privacy: templates may contain sensitive content—do not convert templates into automated medical/legal advice.
- Avoid editing native iOS/Android config unless a platform-specific change is explicitly requested and tested.

**Testing & useful commands**
- Install: `npm install`
- Run Metro/Expo: `npm start` (or `npx expo start`)
- Lint: `npm run lint`

**Commit & PR notes**
- Keep commits small and descriptive. Example: "cards: add tpl:ordering-coffee-3-en template"
- When changing templates, include a short note why the template exists and what category it targets.

If you want, I can also:
- add a short CONTRIBUTING.md extract that documents these rules for human contributors,
- run lint and open a branch with these changes.
