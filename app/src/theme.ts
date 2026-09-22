/** Palette lifted verbatim from the prototype. */
export const C = {
  /** Canvas / page backdrop. */
  page: '#000',
  /** Phone background and sticky headers. */
  bg: '#1A1A1A',
  /** Raised card surface. */
  card: '#2B2B2B',
  /** Primary accent — CTAs, the walked part of the route, passed flags. */
  magenta: '#FF00FF',
  /** Deep accent — mid mountain range, bonus blobs. */
  violet: '#7F30E3',
  /** Muted accent — captions, unreached peaks, far mountain range. */
  lilac: '#985EEA',
  /** Unconfirmed ("in transit") metres. */
  ghost: '#6B6B6B',
  white: '#fff',
} as const

/**
 * Font shorthands, one per text style in the design. Written as CSS `font`
 * shorthand so they stay byte-comparable with the prototype's inline styles.
 */
export const F = {
  /** 700 36/40 WB Sans — hero title, step numerals, countdown. */
  display: "700 36px/40px 'WB Sans'",
  /** 500 24/28 WB Sans — section and screen titles. */
  title: "500 24px/28px 'WB Sans'",
  /** 700 20/24 WB Sans — fact numerals, prize titles. */
  heading: "700 20px/24px 'WB Sans'",
  /** 700 20/28 WB Sans — the metres pill on the tracker. */
  meters: "700 20px/28px 'WB Sans'",
  /** 500 14/18 WB Sans — peak names in the "до пиков" list. */
  peakName: "500 14px/18px 'WB Sans'",
  /** 500 14/24 WB Sans — flag labels on the mountain. */
  flagLabel: "500 14px/24px 'WB Sans'",

  /** 400 15/22 Inter — body copy. */
  body: '400 15px/22px Inter',
  /** 500 15/20 Inter — list rows, bonus names. */
  listStrong: '500 15px/20px Inter',
  /** 500 15/22 Inter — emphasised table cell. */
  bodyStrong: '500 15px/22px Inter',
  /** 500 16/20 Inter — buttons, step titles. */
  button: '500 16px/20px Inter',
  /** 400 13/18 Inter — captions and secondary copy. */
  caption: '400 13px/18px Inter',
  /** 500 13/18 Inter — chips and the ghost-metres label. */
  captionStrong: '500 13px/18px Inter',
  /** 600 15/18 Inter — status bar clock. */
  statusBar: '600 15px/18px Inter',
  /** 500 11/14 Inter — bottom navigation labels. */
  nav: '500 11px/14px Inter',
  /** 400 10/12 Inter — city labels on the Kazakhstan map. */
  mapCity: '400 10px/12px Inter',
  /** 400 12/16 Roboto Flex (75% width) — legal small print. */
  legal: "400 12px/16px 'Roboto Flex'",
} as const

/** Hairline used between rows inside cards. */
export const HAIRLINE = '1px solid rgba(255,255,255,.08)'
/** Slightly stronger divider used between sections. */
export const DIVIDER = '1px solid rgba(255,255,255,.1)'
