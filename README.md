# MONGSTER — GRAND MLBB INVITATION

Production-ready Next.js invitation generator with a database-free dynamic route.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000` and `/admin`.

## Build

```bash
npm run build
npm start
```

## Deploy to Vercel

Push the project to GitHub, import it into Vercel, and add the variables from `.env.example` under Project Settings → Environment Variables.

The invitation route is `/invite/[slug]`; no database is used. Community names are derived from the URL slug.

## Event poster

Place the supplied poster at `public/assets/event/event-poster.webp`. A built-in SVG fallback is included so the project remains visually complete if the poster is not yet supplied.
