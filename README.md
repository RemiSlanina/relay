# Relay. communication shortcuts

## Overview:

pre-written, low-effort messages that reduce friction in real-world interactions

> Relay provides quick, ready-made messages for situations where speaking is difficult or showing cards is easier.
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

DEPRECATED

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

## TODO

Do usability first:

- navigation (stack currently)
- selection
- display
- text scaling
- maybe haptic feedback, maybe not
- hide button
- sets
- set templates
- editing features
- saving cards
- saving disclosures
- saving sets
- add styles
- adding themes (dark, light, at least)
- add intro/setup funnel (how to use)
- add media (qr, photos)
- add language button and switch language button?
- decide on how many languages to ship (?)
- card sharing and optional accounts (database)
- lockscreen access
- important before shipping: add PRIVACY features, legal notes, disclosure

## Authority violence/misunderstanding:

All built-in templates describe the user’s state or capacity.
None instruct, refuse, or challenge the other person.

## ideas

### IDs for cards: template vs user:

prefix tpl vs usr

```
tpl:cannot-speak-en
usr:9f3a2c4e
```

#### maybe later: (but not right now)

Where these things live (very explicit answer)

- Shape → Card.ts
- Allowed values → Card.constants.ts
- Default data → cards.templates.ts
- User state → cards.store.ts
- Persistence → cards.storage.ts (later)

### older ideas/structure

```


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

## next step: todo

1. Custom Card Creation

- “+ Add card” button
- Title
- Optional disclosure
- Body text
- Save
- Persist locally

2.  Persistence
    AsyncStorage or similar

3.  Hide/Show Disclosure Toggle

- Boolean state
- Animated collapse later
- Default visible or hidden depending on card type
  It respects sensory context.

4. implement something I've forgotten

5. implement local persistence (cards.storage.ts)

6. enhance create card features (tone, category selection, ...)
7. edit functionality (create an edit screen)
   8 improved ui: add more polished animations and transitions,

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
