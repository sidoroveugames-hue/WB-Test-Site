import { useEffect, useRef, useState } from 'react'

export type TrackerState = 'base' | 'gain' | 'peak'

/** Confirmed altitude the demo user starts at. */
export const BASE_M = 1850
/** Altitude after the "+300 м" accrual lands. */
export const GAIN_M = 2150
/** Peak crossed in the `peak` state. */
export const PEAK_M = 2300
/** Metres in transit — earned but not yet confirmed. */
export const PENDING_M = 300

/** Duration of the altitude count-up, in ms. */
const CLIMB_MS = 600
/** How long the "+300 м" toast stays up. */
const TOAST_MS = 3000
/** Delay between crossing a peak and the celebration sheet sliding in. */
const SHEET_DELAY_MS = 500
/** How long confetti falls for. */
const CONFETTI_MS = 1400

export interface TrackerFx {
  /** Altitude currently rendered — animates towards the state's target. */
  shown: number
  toastOpen: boolean
  sheetOpen: boolean
  /** Peak the celebration sheet is about, in metres. */
  sheetPeak: number | null
  confetti: boolean
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const REST: TrackerFx = { shown: BASE_M, toastOpen: false, sheetOpen: false, sheetPeak: null, confetti: false }

/**
 * Drives the tracker's choreography for one of the three designed states.
 * Runs on mount and re-runs whenever `state` changes, so each frame on the
 * canvas board plays its own animation as soon as it appears.
 */
export function useTracker(state: TrackerState) {
  const [fx, setFx] = useState<TrackerFx>(REST)
  const rafRef = useRef<number | null>(null)
  const timersRef = useRef<number[]>([])

  useEffect(() => {
    const patch = (next: Partial<TrackerFx>) => setFx((prev) => ({ ...prev, ...next }))

    const after = (ms: number, fn: () => void) => {
      timersRef.current.push(window.setTimeout(fn, ms))
    }

    const animateTo = (from: number, to: number, done?: () => void) => {
      const dur = prefersReducedMotion() ? 0 : CLIMB_MS
      const t0 = performance.now()
      const step = (now: number) => {
        const k = dur ? Math.min(1, (now - t0) / dur) : 1
        const eased = 1 - Math.pow(1 - k, 3)
        patch({ shown: Math.round(from + (to - from) * eased) })
        if (k < 1) rafRef.current = requestAnimationFrame(step)
        else done?.()
      }
      rafRef.current = requestAnimationFrame(step)
    }

    if (state === 'base') {
      patch({ shown: BASE_M, toastOpen: false, sheetOpen: false, confetti: false })
    } else if (state === 'gain') {
      patch({ shown: BASE_M, sheetOpen: false, confetti: false })
      animateTo(BASE_M, GAIN_M, () => {
        patch({ toastOpen: true })
        after(TOAST_MS, () => patch({ toastOpen: false }))
      })
    } else {
      patch({ shown: GAIN_M, toastOpen: false, sheetOpen: false })
      animateTo(GAIN_M, PEAK_M, () => {
        patch({ confetti: true, sheetPeak: PEAK_M })
        after(SHEET_DELAY_MS, () => patch({ sheetOpen: true }))
        after(CONFETTI_MS, () => patch({ confetti: false }))
      })
    }

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      timersRef.current.forEach(clearTimeout)
      timersRef.current = []
    }
  }, [state])

  const closeSheet = () => setFx((prev) => ({ ...prev, sheetOpen: false }))

  return { fx, closeSheet }
}
