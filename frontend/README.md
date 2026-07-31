# Clear Route UK — Frontend

A TypeScript + Next.js frontend for visualising UK routes, incidents and predictive timelines, with search/radius filters and crowd-sourced reporting.

> NOTE: This repository currently contains the frontend app at `frontend/`. There is no backend code in this repo — the frontend may expect external APIs or services for routing, data, or maps.

## Features
- Interactive map UI (frontend/src/components/map/MapContainer.tsx)
- Search & radius filtering (frontend/src/components/search/RadiusFilter.tsx)
- Predictive timeline view (frontend/src/components/timeline/PredictiveTimeline.tsx)
- Crowd-sourced reporting modal (frontend/src/components/crowdsource/ReportModal.tsx)
- Built with Next.js App Router + TypeScript

## Stack
- Next.js (App Router)
- React + TypeScript
- PostCSS (styling pipeline), ESLint (linting)
- npm (package-lock.json provided)

## Getting started (local)
1. Clone:
   git clone https://github.com/Yogendra-Bisht/clear-route-uk.git
2. Install and run:
   cd clear-route-uk/frontend
   npm install
   npm run dev
3. Open http://localhost:3000

Build and run production:

```
npm run build
npm start
```

## Project layout
Important files:
- `frontend/src/app/page.tsx` — main page
- `frontend/src/app/layout.tsx` — global layout
- `frontend/src/components/map/MapContainer.tsx` — map UI
- `frontend/src/components/search/RadiusFilter.tsx` — search controls
- `frontend/src/components/timeline/PredictiveTimeline.tsx` — timeline UI
- `frontend/src/components/crowdsource/ReportModal.tsx` — reporting modal

## Environment & Keys
No environment variables were found in the repository. If the app uses external APIs (maps, routing, analytics), add them to:
`frontend/.env.local`
and reference them via Next.js `process.env.NEXT_PUBLIC_*` variables.

## Development notes & suggestions
- Add a short CONTRIBUTING.md outlining how to run lint, tests, and make PRs.
- Add unit/integration tests (Jest/React Testing Library) for key components (MapContainer, RadiusFilter, ReportModal).
- Add CI workflow (GitHub Actions) that runs build + lint + tests.
- If a backend exists externally, document the API contract and required env vars.

## Contributing
1. Fork the repo
2. Create a branch: `git checkout -b feat/your-feature`
3. Commit and push
4. Open a PR describing the change

## License
This repository includes a LICENSE file at the project root. Check it for license details.

## Contact
If you maintain this project, include maintainer contact details here.
