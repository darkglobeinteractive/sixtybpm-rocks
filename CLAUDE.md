# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About

This is the front-end of a public treasure hunt project at sixtybpm.rocks. Users submit codes found on painted rocks ("Roaming Stones") and can browse a gallery of all stones that have been found.

## Commands

```bash
npm start        # Start dev server (localhost:3000)
npm run build    # Production build
npm test         # Run tests
```

## Architecture

**Stack:** React 17, Create React App, vanilla CSS, Axios

**API:** All data comes from a WordPress REST API at `https://60bpm.com/wp-json/wp/v2`. The Axios instance is configured in [src/apis/sixtybpm.js](src/apis/sixtybpm.js).

**Data flow:**
- `App` (class component) fetches the Roaming Stones gallery on `componentDidMount` using collection ID `119` from the 60bpm.com WordPress API, filtering out items where the location field is "TBD"
- `Stones` renders the gallery grid; `Stone` renders individual cards
- `Form` (functional with hooks) handles code submissions — the form POSTs directly to `https://60bpm.com/roaming-stones/` as a server-side action, not via the REST API

**Component mix:** `App` and `Stones` are class components; `Form`, `Header`, `Footer`, and `Spinner` are functional components with hooks.

**Analytics:** Google Analytics (G-G34N3TG15X) and Google Tag Manager (GTM-W579GLD) are loaded in `public/index.html`. The submit button has `id="submit-roaming-stone-code"` for GTM event tracking.

**Styling:** Plain CSS files in [src/css/](src/css/), one per component. No CSS-in-JS, no Tailwind.
