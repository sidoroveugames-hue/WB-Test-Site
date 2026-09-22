import type { Lang } from './i18n'

/**
 * A deliberately simplified Kazakhstan outline — the designer noted it is
 * schematic, not cartographic. Pairs are `[lon, lat]`.
 */
const KZ_OUTLINE: ReadonlyArray<readonly [number, number]> = [
  [47.0, 49.0], [48.5, 50.5], [50.8, 51.7], [53.0, 51.5], [55.5, 50.6], [58.5, 51.1],
  [60.0, 50.7], [61.5, 51.3], [61.0, 52.9], [62.5, 54.0], [65.5, 54.6], [68.5, 55.2],
  [71.0, 54.2], [73.5, 54.0], [76.8, 54.3], [78.0, 52.9], [80.5, 51.2], [83.5, 51.0],
  [85.5, 49.6], [87.3, 49.1], [85.7, 47.2], [83.0, 47.2], [82.5, 45.4], [80.0, 45.0],
  [80.8, 43.2], [79.9, 42.0], [76.0, 42.9], [73.5, 42.5], [71.0, 42.8], [70.0, 41.8],
  [68.5, 40.6], [66.5, 41.2], [66.1, 43.0], [62.0, 43.5], [58.6, 45.5], [55.9, 41.3],
  [52.5, 41.8], [51.3, 43.3], [51.3, 45.5], [53.0, 46.9], [50.0, 47.0], [48.5, 46.6],
  [46.5, 47.6],
]

/** Where a city's caption sits relative to its dot. */
type Anchor = 'start' | 'end' | 'below'

/** `[name, lon, lat, dotRadius, captionAnchor]` — radius encodes prominence. */
const CITIES: ReadonlyArray<readonly [string, number, number, number, Anchor]> = [
  ['Алматы', 76.9, 43.2, 5, 'end'],
  ['Астана', 71.4, 51.2, 4, 'start'],
  ['Шымкент', 69.6, 42.3, 3.5, 'end'],
  ['Караганда', 73.1, 49.8, 3, 'start'],
  ['Актобе', 57.2, 50.3, 2.5, 'start'],
  ['Атырау', 51.9, 47.1, 2.5, 'start'],
  ['Павлодар', 76.9, 52.3, 2.5, 'start'],
  ['Усть-Каменогорск', 82.6, 49.9, 2.5, 'below'],
  ['Актау', 51.2, 43.6, 2, 'start'],
  ['Костанай', 63.6, 53.2, 2, 'start'],
]

/** Size of the map's SVG viewBox. */
export const MAP_SIZE = { width: 326, height: 190 } as const

/** Equirectangular projection tuned to fit the outline into {@link MAP_SIZE}. */
const proj = (lon: number, lat: number): [number, number] => [(lon - 46) * 7.6 + 6, (55.6 - lat) * 11.4 + 6]

/** The outline as an SVG `points` string. */
export const KZ_OUTLINE_POINTS = KZ_OUTLINE.map(([lo, la]) => proj(lo, la).map((v) => v.toFixed(1)).join(',')).join(' ')

export interface MapCity {
  name: string
  /** Dot centre. */
  x: number
  y: number
  r: number
  /** Caption position, and the horizontal nudge that aligns it to the dot. */
  labelX: number
  labelY: number
  labelShift: string
}

/** City dots with their captions already placed for the given language. */
export function mapCities(lang: Lang): MapCity[] {
  return CITIES.map(([name, lo, la, r, anchor]) => {
    const [x, y] = proj(lo, la)
    return {
      name: lang === 'kz' && name === 'Караганда' ? 'Қарағанды' : name,
      x,
      y,
      r,
      labelShift: anchor === 'end' ? '-100%' : anchor === 'below' ? '-85%' : '0',
      labelX: anchor === 'end' ? x - r - 4 : anchor === 'below' ? x : x + r + 4,
      labelY: anchor === 'below' ? y + r + 9 : y,
    }
  })
}
