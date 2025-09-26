# Cursor Refactor Guide

## One-time setup
```bash
npm i
npm run mcp:init   # or: npx shadcn@latest mcp init --client cursor
```

If you have local font files, add them under `src/assets/fonts/` and update `src/styles/fonts.css` sources.
Otherwise the project will use `local()` fallbacks if the fonts are installed on your machine.

## Visual tokens
- Primary: Dark `#00233A`, Base `#0392F1`, Light `#C2DFF6`
- Secondary: Dark `#443642`, Base `#4E0BD4`, Light `#EAE4EC`
- Tertiary: `#E8DCCE`

Tailwind tokens available as `theme('colors.primary.dark')`, etc. CSS vars also set in `fonts.css`.

## Domain split
- `src/lib/domain/schema.ts` — Zod inputs & types
- `src/lib/domain/calc.ts` — `compute(inputs)` with monthly, yearly, equity and cashflow
- `src/lib/domain/selectors.ts` — UI helpers
- `src/lib/adapters/recharts.ts` — Maps Outputs → Recharts props

## What changed in UI
- `OutputTabs.tsx`: No inline math. Uses domain outputs & adapters.
- `InputForm.tsx`: Scenario/rate math marked `[moved to domain]` to extract later.
- `components/ui/chart.tsx`: No behavior change; theme colors available via Tailwind/CSS vars.

## Fonts
- Header: **Reckless Neue**
- Body: **Neue Haas Unica W1G**; bold uses **Neue Haas Unica W1G Heavy**
- If fonts are installed locally, they will be used via `local()` sources.
- To self-host, drop `.woff2` files in `src/assets/fonts` and change `@font-face src:` accordingly.

## Next steps for you
1. Open the repo in Cursor.
2. Run `npm run dev`.
3. Replace the placeholder formulas in `lib/domain/calc.ts` if needed.
4. (Optional) Remove `src/imports/*` if unused.
