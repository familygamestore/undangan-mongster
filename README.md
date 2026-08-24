# MONGSTER — GRAND MLBB INVITATION

Next.js + React + TypeScript invitation generator for MONGSTER.

## Features
- `/admin` generates a dynamic invitation URL without a database.
- `/invite/[slug]` renders the community name from the URL.
- Clipboard API for Copy Link.
- WhatsApp share action.
- Real-time event countdown.
- Responsive mobile-first esports visual system.
- Environment-based event configuration.
- Ready for GitHub and Vercel.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build check

```bash
npm run build
```

## Assets

Place the real assets into:

- `public/assets/branding/mongster-logo.png`
- `public/assets/event/event-poster.webp`
- `public/assets/event/event-poster-desktop.webp`
- `public/assets/event/hero-background.webp`
- `public/assets/event/event-logo.webp`
- `public/assets/communities/[slug]-logo.png`

Placeholder asset files are not included because the specification requires real MONGSTER artwork.

## Environment

Copy `.env.example` to `.env.local` and set the event configuration and WhatsApp number.

No database, Google Sheets, Firebase, Supabase, SQL, MongoDB, VPS, or external CMS is required.
