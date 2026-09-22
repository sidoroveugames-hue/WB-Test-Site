import type { Dict } from '../i18n'
import { PEAKS_M, SUMMIT_INDEX } from './geometry'

/**
 * Display name of peak `i` — the final one is "the summit" and takes a
 * different noun in both languages.
 */
export const peakName = (t: Dict, i: number): string =>
  i === SUMMIT_INDEX ? `${t.summit} ${PEAKS_M[SUMMIT_INDEX]}` : `${t.peak} ${PEAKS_M[i]}`

/** Index of the lowest peak still above `metres`, or `-1` once all are passed. */
export const nextPeakIndex = (metres: number): number => PEAKS_M.findIndex((m) => m > metres)
