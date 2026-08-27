<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Layout & components

Reusable layout primitives live in `components/`. Use them instead of hand-rolling width or spacing classes on each page — they are the single source of truth for the site's rhythm.

- **`<Container>`** (`components/Container.tsx`) — **horizontal** rhythm. Centers content, caps its width (`max-w-8xl`), and applies the side gutters. Every section's content goes inside a `Container`. Full-bleed backgrounds (colored bars, gradients) sit *outside* the `Container`, which then wraps only the inner content.
- **`<Sections>`** (`components/Sections.tsx`) — **vertical** rhythm. Wraps a page's top-level `<section>` blocks and owns the space *between* them via a flex `gap`. Drop a new `<section>` in as a direct child and it's spaced correctly with no extra classes. Do **not** put per-section vertical padding on the sections; one that needs a different offset from the rest (e.g. the hero's gap below the nav) sets it on itself.

Guiding principle: space *between* siblings belongs to their shared parent (a `gap`, i.e. `Sections`) — never to a wrapper nested inside one of the siblings. Don't duplicate the spacing or width tokens across pages; change them in these components.

The custom container width scale (`max-w-8xl` … `max-w-12xl`) is defined in `app/globals.css` under `@theme`.

# Copy, SEO & naming

Before writing or editing site copy, metadata, or SEO artefacts, read `docs/SITE-CONTEXT.md` — the source of truth for brand naming (lowercase "efficura"/"labrador", the assistant is "Effi"), the positioning line, the compliance disclaimer, per-page messaging, and the hard guardrails (no internal codenames, no competitor references, fictional demo data only, claim only shipped functionality).

The SEO conventions live in `docs/SEO-PLAN.md` and must not be broken by new work:

- Page `title` metadata has **no** "| efficura" suffix — the root layout's title template owns it. Canonicals and `og:url` also come from the root layout; don't add per-page ones.
- Every new page must export `metadata` (title + description) and be added to the route list in `app/sitemap.ts`; keep `public/llms.txt` in sync when pages are added, removed, or repositioned.
- Retired routes get a permanent redirect in `next.config.ts`, never a dead link.
- Structured data goes through `components/JsonLd.tsx`. JobPosting emits only for roles with `externallyOpenSince` set in careers-data.
- Social cards are build-time `opengraph-image.tsx` routes (site default in `app/`, per-page overrides in route folders).
