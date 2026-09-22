/**
 * The mountain route. Everything on the tracker — flags, the walked path, the
 * climber, the metres pill — is derived from these two arrays, so the SVG and
 * the "до пиков" list can never disagree about where a peak sits.
 */

/** Height in metres of each of the five peaks, low to high. */
export const PEAKS_M = [700, 1500, 2300, 2800, 3200]

/** Route vertices in the 390×900 tracker viewBox: start, then one per peak. */
export const PTS: ReadonlyArray<readonly [number, number]> = [
  [30, 870],
  [262, 740],
  [110, 610],
  [262, 480],
  [215, 350],
  [300, 140],
]

/** Metre value of each vertex in {@link PTS} — the start point is 0 m. */
export const MS = [0, ...PEAKS_M]

/** Index of the final peak, which is drawn as the summit rather than a flag. */
export const SUMMIT_INDEX = PEAKS_M.length - 1

export interface Star {
  x: number
  y: number
  r: number
  o: number
}

/**
 * A fixed star field. Seeded from a sine hash rather than `Math.random` so
 * every frame on the canvas board shows the identical sky.
 */
export const STARS: Star[] = Array.from({ length: 34 }, (_, i) => {
  const s = Math.sin(i * 12.9898) * 43758.5453
  const f = (x: number) => x - Math.floor(x)
  return {
    x: Math.round(f(s) * 380 + 5),
    y: Math.round(f(s * 1.7) * 330 + 20),
    r: f(s * 2.3) > 0.7 ? 1.4 : 0.9,
    o: 0.35 + f(s * 3.1) * 0.5,
  }
})

/**
 * Position on the route for a given altitude, as `[x, y, segment]` where
 * `segment` is the index of the vertex the climber is heading towards.
 */
export function pointAt(m: number): [number, number, number] {
  const clamped = Math.max(0, Math.min(3200, m))
  for (let i = 1; i < MS.length; i++) {
    if (clamped <= MS[i]) {
      const k = (clamped - MS[i - 1]) / (MS[i] - MS[i - 1])
      const [x0, y0] = PTS[i - 1]
      const [x1, y1] = PTS[i]
      return [x0 + (x1 - x0) * k, y0 + (y1 - y0) * k, i]
    }
  }
  return [...PTS[SUMMIT_INDEX + 1], SUMMIT_INDEX + 1] as [number, number, number]
}

/** An SVG polyline following the route between two altitudes. */
export function pathFromTo(m0: number, m1: number): string {
  const [x0, y0, i0] = pointAt(m0)
  const [x1, y1, i1] = pointAt(m1)
  let d = `M${x0.toFixed(1)} ${y0.toFixed(1)}`
  for (let i = i0; i < i1; i++) d += ` L${PTS[i][0]} ${PTS[i][1]}`
  return d + ` L${x1.toFixed(1)} ${y1.toFixed(1)}`
}

/** `1850` → `"1 850"`: Russian grouping, with the thin space normalised. */
export function fmt(n: number): string {
  return n.toLocaleString('ru-RU').replace(/ |,/g, ' ')
}
