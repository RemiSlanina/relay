# Relay — Communication Shortcuts

## Overview

Relay is a React Native application designed to reduce friction in non-verbal, high-stress or low-energy communication situations.

It provides pre-written, quickly accessible messages that can be shown instead of spoken, helping users navigate moments where verbal communication is difficult.

The project explores accessibility-first design, cognitive load reduction, and context-aware suggestion systems.

---

## Problem

In real-world interactions, there are situations where speaking is difficult or costly — for example due to:

- sensory overload
- fatigue or brain fog
- migraines or severe headaches
- temporary speech difficulty
- high-pressure public environments

Browsing, typing, or explaining repeatedly can increase stress.

Relay aims to minimize that friction by surfacing concise, ready-made messages with minimal interaction cost.

---

## Core Goals

- Replace verbal communication with pre-made cards
- Reduce cognitive load during high-stress moments
- Additional features planned:
  - Surface 1 primary + 2–3 fallback messages
  - Avoid scrolling for urgent use
  - Degrade gracefully when context confidence is low
  - Keep all inference fully on-device

---

## Current Features

- Template-based communication cards
- Custom card creation
- Local persistence using AsyncStorage
- Context scaffolding for future ranking logic
- Modular domain-driven folder structure

---

## Tech Stack

- React Native (Expo)
- TypeScript
- AsyncStorage
- File-based routing (Expo Router)

---

## Project Structure (Simplified)

```
app/               # Screens
   cards/
components/        # Reusable UI
domain/
  cards/           # Card models, templates, storage
  disclosures/     # Disclosure models and storage
  sets/            # Set models and storage
hooks/
assets/
```

## Running Locally

```bash
npm install
npx expo start
```
