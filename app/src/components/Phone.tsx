import { useEffect, useRef, useState } from 'react'
import { BottomNav } from './BottomNav'
import { Menu, PeakSheet, Toast } from './Overlays'
import { ClimbScreen } from '../screens/ClimbScreen'
import { DrawsScreen } from '../screens/DrawsScreen'
import { HeroScreen } from '../screens/HeroScreen'
import { HowScreen } from '../screens/HowScreen'
import { PrizesScreen } from '../screens/PrizesScreen'
import { dictFor, type Lang } from '../i18n'
import { C, F } from '../theme'
import { PEAKS_M } from '../tracker/geometry'
import { peakName } from '../tracker/peaks'
import { useTracker, type TrackerState } from '../tracker/useTracker'
import type { Character, ScreenId } from '../types'

/** The frame the whole design is drawn at. */
export const PHONE_SIZE = { width: 390, height: 844 } as const

/** Scroll distance over which the mountain parallax reaches full offset. */
const PARALLAX_RANGE = 900

export interface PhoneProps {
  /** Screen to open on. Changing it later navigates the frame. */
  screen?: ScreenId
  lang?: Lang
  /** Which tracker choreography to play on mount. */
  trackerState?: TrackerState
  character?: Character
}

/**
 * One 390×844 phone frame — the whole prototype. Every prop is also live
 * state inside, so a frame can be pinned to a state on the canvas board and
 * still be navigated when it is the only thing on screen.
 */
export function Phone({ screen: screenProp = 'hero', lang: langProp = 'ru', trackerState = 'base', character = 'magenta' }: PhoneProps) {
  const [screen, setScreen] = useState<ScreenId>(screenProp)
  const [lang, setLang] = useState<Lang>(langProp)
  const [menuOpen, setMenuOpen] = useState(false)
  const [tableOpen, setTableOpen] = useState(false)
  const [winnersOpen, setWinnersOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(-1)
  const [parallax, setParallax] = useState(0)

  const scrollRef = useRef<HTMLDivElement>(null)
  const { fx, closeSheet } = useTracker(trackerState)

  useEffect(() => setScreen(screenProp), [screenProp])
  useEffect(() => setLang(langProp), [langProp])
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = 0
    setParallax(0)
  }, [screen])

  const t = dictFor(lang)
  const go = (next: ScreenId) => {
    setScreen(next)
    setMenuOpen(false)
  }

  const sheetPeak = fx.sheetPeak === null ? '' : peakName(t, PEAKS_M.indexOf(fx.sheetPeak))

  return (
    <div
      style={{
        width: PHONE_SIZE.width,
        height: PHONE_SIZE.height,
        flex: 'none',
        background: C.bg,
        position: 'relative',
        overflow: 'hidden',
        color: C.white,
        fontFamily: 'Inter, sans-serif',
        fontSize: 15,
        lineHeight: '22px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 47,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingBottom: 6,
          font: F.statusBar,
          zIndex: 5,
          pointerEvents: 'none',
          /* The hero's key visual runs under the status bar; other screens don't. */
          background: screen === 'hero' ? 'transparent' : C.bg,
        }}
      >
        9:41
      </div>

      <div
        ref={scrollRef}
        onScroll={(e) => setParallax(Math.min(1, Math.max(0, e.currentTarget.scrollTop / PARALLAX_RANGE)))}
        style={{ position: 'absolute', inset: 0, overflowY: 'auto', paddingBottom: 96, scrollbarWidth: 'none' }}
      >
        {screen === 'hero' && <HeroScreen t={t} lang={lang} onLang={setLang} onStart={() => go('climb')} />}
        {screen === 'climb' && (
          <ClimbScreen
            t={t}
            confirmed={fx.shown}
            character={character}
            parallax={parallax}
            confetti={fx.confetti}
            onBack={() => go('hero')}
            onMenu={() => setMenuOpen((v) => !v)}
          />
        )}
        {screen === 'how' && (
          <HowScreen t={t} tableOpen={tableOpen} onToggleTable={() => setTableOpen((v) => !v)} onRules={() => go('draws')} />
        )}
        {screen === 'prizes' && <PrizesScreen t={t} />}
        {screen === 'draws' && (
          <DrawsScreen
            t={t}
            lang={lang}
            winnersOpen={winnersOpen}
            onToggleWinners={() => setWinnersOpen((v) => !v)}
            openFaq={openFaq}
            onToggleFaq={(i) => setOpenFaq((prev) => (prev === i ? -1 : i))}
          />
        )}
      </div>

      {screen !== 'hero' && <BottomNav t={t} active={screen} onGo={go} />}
      {menuOpen && <Menu t={t} onClose={() => setMenuOpen(false)} />}
      {fx.toastOpen && <Toast t={t} />}
      {fx.sheetOpen && <PeakSheet t={t} peak={sheetPeak} onClose={closeSheet} />}
    </div>
  )
}
