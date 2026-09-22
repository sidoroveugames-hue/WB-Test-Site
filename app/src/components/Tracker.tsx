import { useId } from 'react'
import type { Dict } from '../i18n'
import { C, F } from '../theme'
import type { Character } from '../types'
import { PEAKS_M, PTS, STARS, SUMMIT_INDEX, fmt, pathFromTo, pointAt } from '../tracker/geometry'
import { nextPeakIndex, peakName } from '../tracker/peaks'
import { PENDING_M, prefersReducedMotion } from '../tracker/useTracker'

/** The tracker's own coordinate space. */
const W = 390
const H = 900

const CONFETTI_COUNT = 42
const CONFETTI_COLORS = [C.magenta, C.violet, C.lilac]

interface TrackerProps {
  t: Dict
  /** Confirmed altitude in metres — the climber's position. */
  confirmed: number
  character: Character
  /** 0…1 scroll progress, drives the mountain-range parallax. */
  parallax: number
  confetti: boolean
}

/**
 * The mountain route: parallax ranges, the full path, the walked and pending
 * stretches, one flag per peak, and the climber. Everything is positioned from
 * `confirmed` so the whole scene moves as the altitude animates.
 */
export function Tracker({ t, confirmed, character, parallax, confetti }: TrackerProps) {
  const uid = useId().replace(/:/g, '')
  const glowId = `glow8-${uid}`
  const flagGlowId = `glowFlag-${uid}`

  const nextIdx = nextPeakIndex(confirmed)
  const [cx, cy] = pointAt(confirmed)
  const [gx, gy] = pointAt(confirmed + PENDING_M)
  const fullPath = pathFromTo(0, 3200)

  const parFar = Math.round(parallax * 16)
  const parMid = Math.round(parallax * 8)

  const flags = PEAKS_M.map((m, i) => {
    const [x, y] = PTS[i + 1]
    const passed = confirmed >= m
    const isNext = i === nextIdx
    const isSummit = i === SUMMIT_INDEX
    return {
      x,
      y,
      poleTop: y - 30,
      tri: `${x},${y - 30} ${x + 18},${y - 23} ${x},${y - 16}`,
      isSummit,
      /** Peaks that are neither the summit nor the current target sit still. */
      isStatic: !isSummit && !isNext,
      /** The target peak's outline pulses. */
      pulses: isNext && !isSummit,
      glow: passed && !isSummit,
      fill: passed ? C.magenta : 'none',
      stroke: passed ? C.magenta : C.lilac,
      strokeOp: passed ? 1 : 0.4,
      label: peakName(t, i),
      labelX: isSummit ? x - 50 : x + 26,
      labelY: isSummit ? y - 72 : y - 30,
      textColor: passed || isNext ? C.white : C.lilac,
    }
  })

  const jacket = character === 'violet' ? C.violet : character === 'white' ? C.white : C.magenta
  const hat = character === 'white' ? C.magenta : character === 'violet' ? C.lilac : C.violet

  const showConfetti = confetti && !prefersReducedMotion()

  return (
    <div style={{ position: 'relative', height: H, overflow: 'hidden' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ display: 'block' }}>
        <defs>
          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <filter id={flagGlowId} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {STARS.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={C.white} opacity={s.o} />
        ))}

        {/* Two parallax ranges behind the main massif. */}
        <g style={{ transform: `translateY(${parFar}px)` }}>
          <polygon
            points="0,470 40,400 90,430 140,360 190,410 240,340 300,390 350,330 390,380 390,900 0,900"
            fill={C.lilac}
            opacity=".2"
          />
        </g>
        <g style={{ transform: `translateY(${parMid}px)` }}>
          <polygon
            points="0,600 50,520 110,570 170,480 230,540 280,470 340,520 390,450 390,900 0,900"
            fill={C.violet}
            opacity=".4"
          />
        </g>

        {/* The snow-white massif, its foothills, and rock outcrops. */}
        <polygon
          points="0,900 0,700 40,620 60,600 80,540 130,470 150,455 170,400 210,320 230,300 250,240 280,180 300,140 318,190 335,215 360,300 375,320 390,360 390,900"
          fill={C.white}
        />
        <polygon points="0,900 0,760 60,720 120,780 200,760 260,830 330,790 390,830 390,900" fill={C.card} />
        <polygon points="60,690 100,640 130,690 110,720" fill={C.card} />
        <polygon points="200,560 240,520 270,570 235,600" fill={C.card} />
        <polygon points="320,420 350,380 380,440 345,470" fill={C.card} />
        <polygon points="150,430 185,395 205,440 170,455" fill={C.card} />
        <polygon points="260,260 285,225 305,270 275,290" fill={C.card} />

        {/* Breathing halo under the whole route. */}
        <path
          d={fullPath}
          fill="none"
          stroke={C.magenta}
          strokeWidth={10}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${glowId})`}
          style={{ animation: 'breathe 4s ease-in-out infinite' }}
        />
        {/* Route still to walk. */}
        <path
          d={fullPath}
          fill="none"
          stroke={C.lilac}
          strokeOpacity=".4"
          strokeWidth={3}
          strokeDasharray="6 8"
          strokeLinecap="round"
        />
        {/* Route already walked. */}
        <path d={pathFromTo(0, confirmed)} fill="none" stroke={C.magenta} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        {/* Metres earned but not yet confirmed. */}
        <path
          d={pathFromTo(confirmed, confirmed + PENDING_M)}
          fill="none"
          stroke={C.ghost}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {flags.map((f, i) => (
          <g key={i}>
            {f.glow && <polygon points={f.tri} fill={C.magenta} opacity=".7" filter={`url(#${flagGlowId})`} />}
            <line x1={f.x} y1={f.y} x2={f.x} y2={f.poleTop} stroke={C.white} strokeWidth={1.5} strokeLinecap="round" />
            {f.isStatic && (
              <polygon
                points={f.tri}
                fill={f.fill}
                stroke={f.stroke}
                strokeOpacity={f.strokeOp}
                strokeWidth={1.5}
                strokeLinejoin="round"
              />
            )}
            {f.pulses && (
              <polygon
                points={f.tri}
                fill="none"
                stroke={C.magenta}
                strokeWidth={1.5}
                strokeLinejoin="round"
                style={{
                  animation: 'pulse 1.8s ease-in-out infinite',
                  transformOrigin: `${f.x}px ${f.y - 23}px`,
                  transformBox: 'view-box',
                }}
              />
            )}
          </g>
        ))}

        {/* Climber. */}
        <g transform={`translate(${cx.toFixed(1)} ${cy.toFixed(1)})`}>
          <g transform="translate(-12 -48)">
            <rect x="4" y="16" width="6" height="18" rx="3" fill={C.card} />
            <rect x="6" y="14" width="12" height="22" rx="5" fill={jacket} />
            <rect x="7" y="34" width="4" height="12" rx="2" fill={C.card} />
            <rect x="13" y="34" width="4" height="12" rx="2" fill={C.card} />
            <circle cx="12" cy="8" r="6" fill={C.white} />
            <path d="M6 7a6 6 0 0112 0z" fill={hat} />
            <line x1="20" y1="20" x2="24" y2="46" stroke={C.white} strokeWidth={1.5} strokeLinecap="round" />
          </g>
        </g>
      </svg>

      {/* Flag captions sit outside the SVG so they use real text layout. */}
      {flags.map((f, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: f.labelX,
            top: f.labelY,
            height: 24,
            padding: '0 10px',
            borderRadius: 12,
            background: C.bg,
            color: f.textColor,
            font: F.flagLabel,
            whiteSpace: 'nowrap',
          }}
        >
          {f.label}
        </div>
      ))}

      {/* The summit is marked with the brand pill rather than a flag. */}
      <img src="/assets/logo-pill.svg" alt="wb" style={{ position: 'absolute', left: 280, top: 100, width: 44, height: 26, display: 'block' }} />

      <div
        style={{
          position: 'absolute',
          left: Number(gx.toFixed(1)) + 10,
          top: Number(gy.toFixed(1)) - 26,
          transform: `translateX(${gx > 280 ? '-100%' : '0'})`,
          color: C.ghost,
          font: F.captionStrong,
          whiteSpace: 'nowrap',
        }}
      >
        {t.pending}
      </div>

      <div
        style={{
          position: 'absolute',
          left: Math.round(cx - 112),
          top: Math.round(cy - 42),
          height: 28,
          padding: '0 12px',
          borderRadius: 14,
          background: C.bg,
          color: C.white,
          font: F.meters,
          whiteSpace: 'nowrap',
        }}
      >
        {fmt(confirmed)} м
      </div>

      {showConfetti && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {Array.from({ length: CONFETTI_COUNT }, (_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${(i * 37) % 100}%`,
                top: `${(cy / H) * 100 - 25}%`,
                width: i % 3 ? 6 : 9,
                height: i % 2 ? 10 : 6,
                borderRadius: i % 4 ? 1 : 999,
                background: CONFETTI_COLORS[i % 3],
                animation: `fall 1.2s cubic-bezier(.2,.6,.4,1) ${(i % 7) * 40}ms forwards`,
              }}
            />
          ))}
        </div>
      )}

      {confetti && (
        <div
          style={{
            position: 'absolute',
            left: cx - 60,
            top: cy - 60,
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'radial-gradient(circle,rgba(255,0,255,.6),rgba(255,0,255,0) 70%)',
            pointerEvents: 'none',
            animation: 'flash .8s ease-out forwards',
          }}
        />
      )}
    </div>
  )
}
