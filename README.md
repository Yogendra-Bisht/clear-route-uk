## What this is
A TypeScript Next.js frontend for a UK-focused route/incident visualization tool — a mapping UI that supports searching/filtering, a predictive timeline, and crowd-sourced reporting. It's intended for end-users and contributors who want to run or develop the web front-end (no backend code was found in this repository).

### Stack
- **Language(s):** TypeScript (primary), CSS, small JS
- **Framework / runtime:** Next.js (App Router — evidenced by src/app/layout.tsx and src/app/page.tsx)
- **Notable libraries / tooling:** Next.js, React (implicit), TypeScript, PostCSS (postcss.config.mjs), ESLint (eslint.config.mjs), npm (package-lock.json)

## How it's organized
```
LICENSE
.gitignore
frontend/                       Next.js app (main source)
  package.json                  npm scripts & deps (frontend)
  package-lock.json
  next.config.ts
  tsconfig.json
  postcss.config.mjs
  eslint.config.mjs
  README.md                     frontend-specific notes
  AGENTS.md / CLAUDE.md         auxiliary docs
  public/                       static assets
  src/
    app/
      layout.tsx                App layout (Next.js App Router)
      page.tsx                  Main page — entrypoint for the UI
      globals.css               global styling
      favicon.ico
    components/
      Navbar.tsx
      crowdsource/ReportModal.tsx
      map/MapContainer.tsx      Map UI and data/interaction wiring
      search/RadiusFilter.tsx   Search / radius filter controls
      timeline/PredictiveTimeline.tsx
    data/                       static or seed data (directory present)
    lib/                        utility modules (directory present)
    types/                      shared TypeScript types (directory present)
```

How it fits together: The Next.js App Router serves the UI from src/app/page.tsx. The page composes multiple components — MapContainer renders the interactive map, search components provide filtering (e.g., RadiusFilter), PredictiveTimeline shows chronological/predictive events, and ReportModal allows crowd-sourced incident reporting. Static assets live in public/. Build and dev configuration reside in the frontend package.json, next.config.ts, and PostCSS/ESLint configs.

## How to run it
The shortest path to run the frontend locally:
1. Clone the repo
2. Start the frontend
```
git clone https://github.com/Yogendra-Bisht/clear-route-uk.git
cd clear-route-uk/frontend
npm install
npm run dev
```
- Open http://localhost:3000 (default Next.js dev port).
- To build for production:
```
npm run build
npm start
```
Notes:
- I didn't find a backend/service in this repo; MapContainer and data components may expect external APIs (APIs/keys are not present). If your deployment relies on API keys or external services, put them in frontend/.env.local (Next.js convention).
- No CI/workflows or tests were found at top-level; add CI and tests if you need reproducible CI runs.

## Try asking
- Where does the map data come from in frontend/src/components/map/MapContainer.tsx — is there a backend or external tile/API provider required?
- Are there shared type definitions for the project in frontend/src/types to document the API shapes used by PredictiveTimeline and ReportModal?
- The frontend README.md mentions X (see frontend/README.md) — is that feature implemented in src/app/page.tsx or is it planned?
