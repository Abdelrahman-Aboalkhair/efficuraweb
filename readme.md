# efficura

The public marketing website for **efficura** — a mortgage and lending brokerage by [efficura](https://efficura.com).

efficura connects borrowers with the right lenders, making it faster and simpler to compare mortgage and loan options. This repository contains the public-facing site: the landing pages that explain the product and capture new leads.

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router)
- [React](https://react.dev) 19
- [Tailwind CSS](https://tailwindcss.com) 4
- [TypeScript](https://www.typescriptlang.org)

## Getting started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. Pages auto-update as you edit files under `app/`.

## Scripts

| Command         | Description                                  |
| --------------- | -------------------------------------------- |
| `npm run dev`   | Start the local development server.          |
| `npm run build` | Create a production build.                   |
| `npm run start` | Serve the production build locally.          |
| `npm run lint`  | Run ESLint.                                  |

## Project structure

```
app/
  layout.tsx     Root layout, fonts, and site metadata
  page.tsx       Landing page
  globals.css    Global styles (Tailwind)
public/          Static assets
```

## Deployment

The site is deployed on [Vercel](https://vercel.com). Pushes to the production branch are built and released automatically; pull requests get preview deployments.

## Conventions for contributors

This project pins a specific Next.js version whose APIs may differ from older releases. Before writing code, read the relevant guide bundled in `node_modules/next/dist/docs/` and follow any deprecation notices. See [AGENTS.md](AGENTS.md) for details.

---

© efficura. All rights reserved.
