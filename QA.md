# QA Notes — Professional Market Version

## Fixed

- Removed duplicate manifest route.
- Kept `app/manifest.ts` as the single manifest source.
- `app/manifest.webmanifest/route.ts` does not exist.

## Professional polish

- Removed student/demo language from user-facing storefront components.
- Removed portfolio language from the main storefront copy.
- Kept `/case-study` as a professional process page for portfolio review.
- Removed `/case-study` from main header navigation to preserve a real commercial market feel.
- Kept a subtle footer `Process` link for review access.
- Updated `/about` to read like a real market page.
- Added professional docs for architecture, design system and presentation.

## Validation

Completed successfully:

```bash
npm install
npm run typecheck
npx next build
npm run dev
npx next start
```

Observed:

- `npm run dev`: no duplicate manifest warning.
- `npx next build`: passed.
- `npx next start`: ready in production mode.

Production smoke test:
- `/`: `200`
- `/shop`: `200`
- `/search?q=milk%20eggs`: `200`
- `/product/whole-milk`: `200`
- `/checkout`: `200`
- `/case-study`: `200`
- `/about`: `200`
- `/manifest.webmanifest`: `200`

Known dependency note: `npm install` reports 3 audit advisories from package versions. They do not block typecheck, build, dev startup, production start or route tests.
