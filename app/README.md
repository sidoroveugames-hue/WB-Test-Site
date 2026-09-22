# Новый пик призов — implementation

React + Vite + TypeScript implementation of the Claude Design handoff in
`../project`. It recreates two things:

- **The prototype** — `Новый пик призов.dc.html`: one 390×844 phone frame with
  all five screens, RU/KZ copy, the animated mountain tracker and every overlay.
- **The review board** — `Экраны и состояния.dc.html`: the black canvas laying
  out twelve labelled frames (5 RU screens, 3 tracker states, 4 KZ screens).

## Running it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production bundle into dist/
npm run preview   # serve the build
```

Serve it over HTTP — assets are referenced from the site root (`/assets/…`), so
opening `dist/index.html` straight off the filesystem will not load the fonts
or imagery.

## Routes

| Route | What it shows |
| --- | --- |
| `#/` | A single interactive phone |
| `#/canvas` | The «Экраны и состояния» review board |

The design tool exposed four twiddles on the prototype (screen, language,
tracker state, character). Rather than add controls that aren't in the design,
they map onto query params on the phone route:

```
#/?screen=climb&lang=kz&tracker=peak&character=white
```

`screen` = `hero` · `climb` · `how` · `prizes` · `draws`
`lang` = `ru` · `kz`
`tracker` = `base` · `gain` · `peak`
`character` = `magenta` · `violet` · `white`

Anything unrecognised falls back to the first value.

## Layout of the source

```
src/
  App.tsx              hash routing between the phone and the board
  theme.ts             palette + one entry per text style
  catalog.ts           imagery, prices, icon paths
  map.ts               Kazakhstan outline, city dots, projection
  i18n/                ru.ts · kz.ts · the Dict shape they both satisfy
  tracker/
    geometry.ts        peaks, route vertices, pointAt / pathFromTo
    peaks.ts           peak naming (the summit takes a different noun)
    useTracker.ts      the base / gain / peak choreography
  components/          Phone, Tracker, BottomNav, Overlays, Icon
  screens/             one file per screen
  canvas/              the review board and its frames
```

Geometry lives in one place on purpose: the SVG route, the flag positions and
the "до пиков" list all read from `PEAKS_M` and `PTS`, so they cannot drift
apart.

Styling follows the prototype's own medium — inline style objects carrying the
exact pixel values, with colours and text styles pulled from `theme.ts`. Fonts,
resets and the six keyframes live in `styles.css`.

## Notes for whoever picks this up

- **The Kazakh copy is an unreviewed draft.** It was written by the design
  assistant during the mock-up phase and is carried over verbatim; see the
  warning at the top of `src/i18n/kz.ts`. «Вершина» → «Шоқы» in particular was
  flagged by the designer as needing a native speaker to confirm. Do not ship
  without a proofread.
- **Product thumbnails are placeholders.** The five cards in «ближе к Пику
  2300» are crops of the prize renders, not real catalogue cards.
- **Copy contains bracketed placeholders** — `[наименование ТОО]`, `[почта]` —
  that legal and support need to fill in.
- **The map is schematic.** The Kazakhstan outline is deliberately simplified.
- **Not built:** the "new participant", "after the summit", "season over" and
  error states. They were listed in the brief but not selected for the design,
  so there is nothing to implement them from.
- On the review board, the three tracker frames replay their animation when
  they scroll back into view, so a reviewer actually sees the toast and the
  confetti rather than arriving after they have finished.
