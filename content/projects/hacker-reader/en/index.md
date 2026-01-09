---
title: "Hacker Reader"
description: "A native Hacker News reader for iOS, built with React Native and Expo."
date: "11/08/2025"
demoURL: "https://www.hackerreader.app/"
repoURL: "https://github.com/danielcspaiva/hacker-reader"
locale: "en"
---

![Hacker Reader](../assets/hero.png)

## Back to Mobile Development

Since leaving TC in 2023, where I worked as Mobile Lead, I've been entirely focused on Quarto à Vista — and with that, I ended up stepping away from mobile development for almost 3 years. An industry that, as we know, evolves very quickly.

Recently, some internal projects at Qavi started requiring mobile applications. We decided to adopt React Native with Expo, and I decided to use this opportunity to reenter the mobile world with a personal project.

I wanted to do the entire process from scratch — from design to development, including landing page, copy, app store publishing, and everything else.

## The Project

**Hacker Reader** is a native Hacker News reader for iOS — Y Combinator's forum known for gathering the main discussions about technology and entrepreneurship. Essential reading for anyone in the startup world.

I sought to leverage iOS-native features to the fullest to create a truly polished experience:

- **Liquid Glass** — modern and fluid visual effects
- **Link Previews** — rich link visualization with Open Graph
- **Context Menus** — native contextual menus for quick interactions
- **Native Tabs** — tab navigation following iOS standards
- **Home Screen Widgets** — widgets in three sizes displaying Top Stories with automatic updates

## Tech Stack

The project is a complete monorepo that includes:

- **Mobile App**: Expo SDK 54 + React Native 0.81 with React Compiler
- **Web**: Next.js 15 App Router for landing page and marketing
- **Features**: Hacker News authentication, voting, favorites, comments, API search, and persistent bookmarks
- **iOS Widgets**: Three sizes (small/medium/large) with deep linking and offline support

Everything in TypeScript, React Query for state management, Expo router for navigation and Expo UI for some native interfaces.

## Open Source

The app is completely open source under the MIT license. You can explore all the code, architecture, and technical decisions in the repository.

Links:

- [App Store](https://apps.apple.com/us/app/hacker-reader/id6754137305)
- [Website](https://www.hackerreader.app/)
- [GitHub](https://github.com/danielcspaiva/hacker-reader)

---

**If you download the app, let me know what you think — and leave your review on the App Store!** 🙏

*Android coming soon...*
