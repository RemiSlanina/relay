# Developer Comment Conventions

These markers are intentionally searchable with `rg`.

## TODO

Implementation that is intentionally incomplete.

Search:

rg "TODO"

---

## FUTURE

Planned improvement or future feature.

Search:

rg "FUTURE"

---

## IDEA

A possible implementation or feature that has not been decided.

Search:

rg "IDEA"

---

## QUESTION

Open design question or uncertainty.

Search:

rg "QUESTION"

---

## NOTE

Context that future contributors should know.

Search:

rg "NOTE"

---

## Combined searches

Find implementation work:

rg "TODO"

Find future work:

rg "FUTURE|IDEA"

Find everything interesting:

rg "TODO|FUTURE|IDEA|QUESTION"

## Comment Style

When using searchable markers (`TODO`, `FUTURE`, `IDEA`, `QUESTION`, `NOTE`), prefer writing a complete sentence on the same line.

Good:

```ts
// TODO: Sort cards alphabetically.
```

```ts
// FUTURE: Retry failed persistence automatically.
```

```ts
// QUESTION: Should duplicate detection ignore whitespace?
```

Avoid:

```ts
// TODO:
```

```ts
// FUTURE:
```

Reason:

- `rg` output already contains enough context to understand the reminder.
- Often there is no need to open the file after searching.
- Search results remain concise and self-explanatory.

## Documentation

> Public APIs should be understandable from their documentation without reading the implementation.

Prefer comments that explain:

- why a function exists
- what responsibility it has
- important assumptions
- future constraints
- design decisions
- surprises

Avoid comments that merely repeat the code.

Good:

"The first launch timestamp is used to determine whether initial setup should run."

Avoid:

"Get first launch timestamp."
