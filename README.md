# Relay. communication shortcuts

## Overview:

pre-written, low-effort messages that reduce friction in real-world interactions

> Relay provides quick, ready-made messages for situations where speaking is difficult or unnecessary.
>
> It can be useful during:
>
> - autistic shutdowns or burnout
> - nonverbal or minimally verbal moments
> - migraines or severe headaches
> - brain fog (e.g. long COVID, ME/CFS)
> - sensory overload
> - post-stroke or temporary speech difficulty

## Folder Structure

### refactor into something like this:

```

app/
  index.tsx
  _layout.tsx
  cards/
    [id].tsx

components/
  CardView.tsx

domain/
  cards/
    Card.ts
    card.constants.ts
    card.templates.ts
    card.store.ts          # deprecated, TODO delete
    CardsContext.tsx       # Provider
    card.storage.ts

  disclosures/            # context is now disclosure, to avoid naming conflicts
    Disclosure.ts
    disclosure.templates.ts
    disclosure.store.ts     # deprecated, TODO delete
    DisclosureContext.ts    # Provider
    disclosure.storage.ts

  card-sets/
    card-set.storage.ts
    card-set.template.ts
    CardSet.ts

hooks/
  useCards.ts

assets/
constants/              # TODO delete leftovers from cards.js and cards.ts
  cards.js              # deprecated, TODO delete
  cards.ts              # deprecated, TODO delete

```

## ideas

for Card.ts and stuff:

```
type Card = {
  id: string
  title: string
  message: string
  contextIds?: string[]   // optional, empty by default
  category: Category
  ...
}

```

Set.ts or CardSet.ts:

```
type CardSet = {
  id: string
  title: string
  cardIds?: string[]        // explicit picks
  categories?: Category[]  // OR implicit filter
  isDefault?: boolean
}
```

Then it becomes a user-created context.
You don’t need a special case.
user creates a new context
assigns it to one card
doesn’t reuse it
Same system. No branching logic.

Context.ts:

```
contexts?: {
  id: string
  label?: string        // optional, for UI like "Work", "Private"
  text: string          // what gets shown
  sensitive?: boolean   // default false
}[]
```

context template examples:
“I’m having a health issue.”
“I’m autistic and overwhelmed.” (sensitive)
“I’m in a nonverbal phase.”
“Neurological issue, temporary.”

card.templates example:

```
{
  id: "cant-speak-en",
  category: "capacity",
  title: "Can't speak",
  message: "I can’t speak right now.",
  contextIds: [
    "health", "autism" ,
  ],
  sharing: SharingPolicy.INHERIT,
  quickAccess: QuickAccessPolicy.ALLOWED,
  source: "template",
}
```

#### maybe later: (but not right now)

I could add a src/ later, but don't need it. If I add backend.

```
src/                      # maybe, maybe not (currently not)
  app/                    # expo router (or screens)
    index.tsx
    card.tsx              # display a card

  components/
    CardView.tsx

  cards/                  # domain folder (important)
    Card.ts               # model (was models/Card.ts)
    Cards.constants.ts    # SharingPolicy, QuickAccessPolicy as const
    cards.templates.ts    # shipped defaults
    cards.store.ts        # state logic
    CardsContext.tsx      # turn store into context (TODO)
    cards.storage.ts      # persistence (later)

  hooks/
    useCards.ts           # optional thin wrapper

  assets/
  constants/              # TODO delete leftovers from cards.js and cards.ts

```

Where these things live (very explicit answer)

- Shape → Card.ts
- Allowed values → Card.constants.ts
- Default data → cards.templates.ts
- User state → cards.store.ts
- Persistence → cards.storage.ts (later)

### older ideas:

```
new
src/
  data/
    cards.templates.ts      // DUMMY_CARDS live here
  models/
    Card.ts                 // type / interface
  state/
    cardsStore.ts           // app-level card state
  storage/
    cardsStorage.ts         // save/load from device
  components/
    CardView.tsx
  screens/
    index.tsx
    card.tsx



old but useful
/relay-app
  /app          # screens/pages
  /assets       # Fonts, images, etc.
  /components   # Reusable UI (buttons, cards, etc.)
  /constants    # theme.ts, enums, etc.
  /hooks        # Custom hooks
  /scripts      # Build/deploy scripts
  App.tsx       # Entry point

```

## Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
