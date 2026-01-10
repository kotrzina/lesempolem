# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Application

- It's a web page with a running competition. There are pages with basic info, registration form, and results from previous years.
- Whole page is localized in Czech.

## Commands

```bash
# Development
yarn start                    # Run dev server on http://localhost:3000

# Build
yarn build                    # Production build to /build folder

# Testing
yarn test                     # Run Jest tests
yarn test -- --testPathPattern="ComponentName"  # Run single test file
yarn cypress                  # Run Cypress e2e tests
yarn cypress-open             # Open Cypress interactive mode

# Linting
yarn lint                     # Check for linting errors
yarn fix                      # Auto-fix linting errors
```

Note: With Node 17+, you may need `export NODE_OPTIONS=--openssl-legacy-provider` before running commands.

## Architecture

This is a React 19 + TypeScript website for the Lesempolem running race event (ultramarathon, marathon, 14km) held in Veselice, Czech Republic.

### Project Structure

- **`src/pages/`** - Page components matching routes (Homepage, Registration, Results, Info, Contact, etc.)
- **`src/components/`** - Reusable UI components (Nav, Footer, Break, Photo, GenderIcon, LpDate)
- **`src/api/backend.ts`** - API client for racer registration (uses `REACT_APP_BACKEND_URL` env var)
- **`src/Address.ts`** - Route path definitions (enum)

### Routing

Routes defined in `App.tsx` using React Router v7. URLs use Czech names (e.g., `/registrace.html`, `/vysledky.html`). Results pages are dynamically generated for each year (`/vysledky-{year}.html`).

### Data Patterns

- **Registration**: Live API calls via `src/api/backend.ts` (PUT to register, GET to fetch registered racers)
- **Race Results**: Static JSON files in `src/pages/Result/results/{year}.json` loaded via dynamic imports
- **Event Info**: Static JSON in `src/pages/Info/texts.json`

### Key Technologies

- React Bootstrap + Bootstrap 5.3.3 for UI
- Leaflet + react-leaflet for maps
- FontAwesome for icons
- All components are functional with hooks
