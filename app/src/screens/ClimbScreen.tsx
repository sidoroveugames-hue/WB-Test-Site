import { ICONS, PRODUCT_ART } from '../catalog'
import { Icon } from '../components/Icon'
import { Tracker } from '../components/Tracker'
import type { Dict } from '../i18n'
import { C, F, HAIRLINE } from '../theme'
import { PEAKS_M, SUMMIT_INDEX, fmt } from '../tracker/geometry'
import { nextPeakIndex, peakName } from '../tracker/peaks'
import type { Character } from '../types'

interface ClimbScreenProps {
  t: Dict
  confirmed: number
  character: Character
  parallax: number
  confetti: boolean
  onBack: () => void
  onMenu: () => void
}

/** Screen 02 — the tracker, distance to each peak, and shoppable products. */
export function ClimbScreen({ t, confirmed, character, parallax, confetti, onBack, onMenu }: ClimbScreenProps) {
  const nextIdx = nextPeakIndex(confirmed)

  /** Highest peak first, so the goal sits at the top of the list. */
  const peakRows = PEAKS_M.map((m, i) => ({ m, i }))
    .reverse()
    .map(({ m, i }) => {
      const passed = confirmed >= m
      const isNext = i === nextIdx
      const prev = i ? PEAKS_M[i - 1] : 0
      return {
        name: peakName(t, i),
        passed,
        isNext,
        value: passed ? t.passed : t.left(fmt(m - confirmed)),
        valueColor: passed || isNext ? C.white : C.lilac,
        iconColor: passed ? C.magenta : isNext ? C.white : C.lilac,
        iconOpacity: passed || isNext ? 1 : 0.6,
        pct: `${Math.round(Math.max(0, Math.min(1, (confirmed - prev) / (m - prev))) * 100)}%`,
      }
    })

  const closerTitle = t.closer(peakName(t, nextIdx >= 0 ? nextIdx : SUMMIT_INDEX))
  const products = t.products.map((name, i) => ({ name, ...PRODUCT_ART[i] }))

  return (
    <div>
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 4,
          background: C.bg,
          padding: '47px 8px 0',
          height: 103,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <button
          onClick={onBack}
          aria-label={t.back}
          style={{
            width: 44,
            height: 44,
            border: 0,
            background: 'transparent',
            color: C.white,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Icon d={ICONS.chevronLeft} />
        </button>
        <div style={{ font: F.title }}>{t.climbTitle}</div>
        <button
          onClick={onMenu}
          aria-label={t.more}
          style={{
            width: 44,
            height: 44,
            border: 0,
            background: 'transparent',
            color: C.white,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill={C.white}>
            <circle cx="5" cy="12" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="19" cy="12" r="1.5" />
          </svg>
        </button>
      </div>

      <Tracker t={t} confirmed={confirmed} character={character} parallax={parallax} confetti={confetti} />

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ background: C.card, borderRadius: 16, padding: 16 }}>
          <div style={{ font: F.title, marginBottom: 8 }}>{t.toPeaks}</div>
          {peakRows.map((r, i) => (
            <div key={i} style={{ padding: '12px 0', borderBottom: HAIRLINE }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 24 }}>
                <Icon d={ICONS.flag} stroke={r.iconColor} strokeOpacity={r.iconOpacity} />
                <div style={{ flex: 1, font: F.peakName }}>{r.name}</div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    font: F.caption,
                    color: r.valueColor,
                    textAlign: 'right',
                  }}
                >
                  {r.passed && <Icon d={ICONS.check} size={16} stroke={C.magenta} strokeWidth={2} />}
                  <span>{r.value}</span>
                </div>
              </div>
              {r.isNext && (
                <div
                  style={{
                    margin: '10px 0 0 36px',
                    height: 4,
                    borderRadius: 2,
                    background: 'rgba(152,94,234,.25)',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ height: '100%', width: r.pct, background: C.magenta, borderRadius: 2 }} />
                </div>
              )}
            </div>
          ))}
          <div style={{ font: F.caption, color: C.lilac, paddingTop: 12 }}>{t.ticketsNote}</div>
        </div>

        <div style={{ background: C.card, borderRadius: 16, padding: '16px 0 16px' }}>
          <div style={{ font: F.title, padding: '0 16px 12px' }}>{closerTitle}</div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 16px', scrollbarWidth: 'none' }}>
            {products.map((p, i) => (
              <div key={i} style={{ flex: '0 0 140px', display: 'flex', flexDirection: 'column', gap: 8, cursor: 'pointer' }}>
                <div
                  style={{
                    position: 'relative',
                    height: 140,
                    borderRadius: 12,
                    backgroundColor: C.bg,
                    backgroundImage: `url(${p.img})`,
                    backgroundSize: p.size,
                    backgroundPosition: p.pos,
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      background: C.magenta,
                      color: C.white,
                      borderRadius: 999,
                      padding: '3px 8px',
                      font: F.captionStrong,
                    }}
                  >
                    {p.chip}
                  </div>
                </div>
                <div
                  style={{
                    font: F.caption,
                    color: C.white,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {p.name}
                </div>
                <div style={{ font: F.listStrong }}>{p.price}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: '16px 16px 0' }}>
            <button
              style={{
                width: '100%',
                height: 48,
                borderRadius: 999,
                border: `1.5px solid ${C.white}`,
                background: 'transparent',
                color: C.white,
                font: F.button,
                cursor: 'pointer',
              }}
            >
              {t.allGoods}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
