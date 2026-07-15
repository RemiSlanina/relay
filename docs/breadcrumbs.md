# Bread crumbs 🥺🍞

---

> Persistence model:
>
> - Best effort (not guaranteed currently).
> - Failed saves are reported to the user.
> - The app remains usable.
>
> Open question:
> Disclosures currently have their own context.
> CRUD for disclosures is not implemented yet.
> Not part of card CRUD completion.

## 🥺🍞 2026-07-15

### Finished

- Added roadmap.md
- Added decisions.md
- Reorganized documentation

### Learned

- ADRs document architectural decisions.
- Roadmap separates product planning from technical backlog.

### Next

- Disclosure persistence

## 🥺🍞 2026-07-13

Finished:

- Prepare for public github repo
- Ignored coverage/ and other files accidentally tracked
- Updated Readme
- Updated icons and splash screen
- Removed unnecessary test

## 🥺🍞 2026-07-13

Finished:

- Cleaned unsused css in edit and create card
- Recycled saveCard in CardsStorage
- added a state for hasUnsavedChanges to CardsContext and expose it
- update updateCards CardsContext to check if changes to the array were even made (it returns the old array otherwise)

Test Suites: 5 passed, 5 total
Tests: 26 passed, 26 total
Snapshots: 0 total
Time: 1.547 s, estimated 2 s

## 🥺🍞 2026-07-12

Persistence branch completed.

Finished:

- CRUD persistence
- Persistence error handling
- Error banner
- Test coverage (25 passing)
- Manual Android verification
- Resolved Expo/Babel environment issue
- Small cleanup (deleting comments...)
- Started refacting template cards (templates and templates.extra)

Outcome:
Persistence is considered complete.
Future work (lineage, sharing, disclosures) continues on separate branches.

## 🥺🍞 2026-07-06

Persistence branch

Added:

- Persistence error handling in CardsContext
  - added persistenceError state
  - failed saves now expose an error message
  - added tests for failed persistence

- ErrorBanner component
  - displays persistence errors in UI
  - supports light/dark theme

Fixed:

- Replaced TypeScript wrapper type String with primitive string
- Added missing theme colors for error states / dark mode
- Improved dark mode contrast

Status:

- npm test -- --runInBand
  - Test Suites: 5 passed, 5 total
  - Tests: 25 passed, 25 total

Next:

- review remaining persistence tasks
- clean debug logs/comments
- test app manually when Android cooperates

## 🥺🍞 2026-07-05

Persistence branch

Added:

- CardsContext tests
  - deleteCard removes only the matching card
  - deleteCard ignores unknown IDs
  - deleteCard triggers persistence
  - CardsProvider loads initialized cards

Fixed:

- Fixed noisy CardsContext tests
- Mocked CardStorage.saveCards() to return successful save
  - cause: mock returned undefined
  - context interpreted it as failed persistence
- Wrapped missing addCard() state updates in act()
  - fixed React test warnings

Status:

- npm test -- --runInBand
  - Test Suites: 5 passed, 5 total
  - Tests: 23 passed, 23 total

Next:

- continue persistence error handling
- decide user-facing handling for failed saves

## 🥺🍞 2026-06-21

- Expand tests for cards storage and cards context
- Fix typos (trim typo in edit screen and date (ISO) inconsistency)
- Prepare for prestistence error handling

Next:

- tests
- prestistence error handling

---

## 🥺🍞 2026-06-09

Persistence branch

Did today:

- testing for domain/cards/cards.storage.ts
- testing for domain/cards/CardsContext.tsx

Next:

write tests for

- initializeCards
- create
- edit
- delete
- CardForm
  i.e,
- first launch creates cards
- non-first launch loads cards
- template import works
- edit updates card
- delete removes card

Does state survive process death?
Does state survive restart?
Does state load correctly?

1. Create card
   → restart app
   → card still exists

2. Edit card
   → restart app
   → edits still exist

3. Delete card
   → restart app
   → card stays deleted

4. First launch initialization
   → only runs once
   → no duplicate template cards appear

Testing observations:

- CardsContext tests produced React warning:
  "An update to CardsProvider inside a test was not wrapped in act(...)"

Cause:

- CardsProvider runs initializeCards() inside useEffect()
- renderHook() mounts the real provider
- initializeCards() resolves asynchronously and updates state after test startup
- React expects tests to wait for those updates

Fix:

- Made context tests async
- Waited for provider initialization:

```ts
await waitFor(() => {
  expect(result.current.loaded).toBe(true);
});
```

Learned:

- renderHook() mounts a real React tree
- useEffect() still runs during tests
- async state updates can trigger act(...) warnings even when assertions pass
- waitFor() can be used to wait for async provider initialization

## 🥺🍞 2026-06-08

Edit routing

Finished:

- [x] Edit button now navigates to /cards/edit/[id]
- [x] Edit screen opens correctly

Observation:

- Routing bug was incorrect path string, not CardForm or updateCard

Infrastructure status:

✓ Metro builds Web
✓ Metro builds Android
✓ babel-preset-expo resolved

Current blocker:

- Android runtime crash
- Web works
- Error: "private properties are not supported"
- Likely runtime/dependency issue rather than React code

> Expo stopped resolving babel-preset-expo after dependency updates.
> Symptoms:

> - Metro starts
> - Bundling fails
> - Cannot find module 'babel-preset-expo'

> Fix:
> `npm install --save-dev babel-preset-expo`

(Update: works on web now, but android still broken (Samsung A05s))

> Metro Watchers error occured again, too.
> Not quite sure what fixed it this time, but I'm pretty sure last time it was

```
rm -rf node_modules
rm package-lock.json
npm install
```

> Or hard clear cache and run again.

Persistence branch

Finished:

- migrate creation/editing code to CardForm
- use CardForm in create.tsx
- use CardForm in edit/[id].tsx
- fix path for router `/cards/edit/${card.id}`

Next:

- [ ] Tests
- [ ] Infrastructure fix

....

Next:

- [x] edit card (edit/[id].tsx) does not... react
- [x] implement CardFrom in edit, too
- [ ] test both create and edit, and dependencies if not tested yet (form...)

CardForm observations:

- form UI duplicated between create and edit
- save logic should stay in screens
- CardForm should not know about addCard/updateCard

## 🥺🍞 2026-06-07

> 🍞 Alert bug was actually web testing.
> Android Alert works.

Edit and delete card feature

Finished:

- [x] Added Edit button
- [x] Added Delete button
- [x] Added delete confirmation dialog
- [x] Implemented deleteCard() flow
- [x] Created edit/[id].tsx
- [x] Load card by route parameter
- [x] updateCard() wired into edit screen

Learned:

- useCards() returns an object, functions must be destructured
- toISOString() needs ()
- all hooks must be called before any conditional return
- useEffect() is a hook too
- Alert behaved differently on Web vs Android
- Metro ENOSPC issue was fixed by removing android/app/.cxx

Current state:

- Edit screen exists
- Form mostly copied from create.tsx
- Theme now has inputText color for white input fields
- Edit screen still needs polish/testing

Observation:

- create.tsx and edit/[id].tsx now contain largely duplicated form UI and state
- CardForm.tsx was created to eventually hold shared form fields and validation
- save behavior should remain in screens (create -> addCard, edit -> updateCard)

Next:

- [ ] Finish edit form UI (ie link edit screen via button)
- [ ] Move shared form UI into components/CardForm.tsx
- [ ] Verify editing persists after app restart
- [ ] Add/edit tests if needed
- [ ] Continue persistence branch
- [ ] Consider CardForm extraction after edit works

Future:

- [ ] Template import UI
- [ ] Decide where template import belongs
- [ ] Refresh/reload strategy

## 🥺🍞 2026-05-31

Persistence branch

Finished:

- initializeCards tests
- importTemplateCard test
- removed saveCard architecture

Next:

- [ ] UI path for importing a template
- [ ] decide where import button lives (settings/cards list/...)
- [x] delete a single card
- [ ] edit card
- [ ] refresh function (refresh card/card list)
- [ ] test
