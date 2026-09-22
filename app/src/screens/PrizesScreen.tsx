import { PRIZE_ART } from '../catalog'
import type { Dict } from '../i18n'
import { C, F } from '../theme'
import { SUMMIT_INDEX } from '../tracker/geometry'
import { peakName } from '../tracker/peaks'

interface PrizesScreenProps {
  t: Dict
}

/** Screen 04 — one card per peak, highest first. */
export function PrizesScreen({ t }: PrizesScreenProps) {
  const prizes = t.prizeCards.map((card, k) => {
    /** Cards run summit-down, peaks run bottom-up. */
    const peakIdx = SUMMIT_INDEX - k
    return {
      ...card,
      peak: peakName(t, peakIdx),
      peakColor: peakIdx === SUMMIT_INDEX ? C.magenta : C.lilac,
      ...PRIZE_ART[k],
    }
  })

  return (
    <div style={{ padding: '63px 16px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ font: F.title, padding: '8px 0 4px' }}>{t.prizesTitle}</div>
      {prizes.map((p, i) => (
        <div
          key={i}
          style={{
            background: C.card,
            borderRadius: 16,
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) 128px',
            minHeight: 128,
          }}
        >
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 6, justifyContent: 'center' }}>
            <div style={{ font: F.peakName, color: p.peakColor }}>{p.peak}</div>
            <div style={{ font: F.heading, textWrap: 'pretty' }}>{p.title}</div>
            {p.desc && <div style={{ font: F.caption, color: C.white, opacity: 0.85, textWrap: 'pretty' }}>{p.desc}</div>}
            <div style={{ font: F.caption, color: C.lilac }}>{p.winners}</div>
          </div>
          <img
            src={p.img}
            alt=""
            style={{ width: 128, height: '100%', minHeight: 128, objectFit: 'cover', objectPosition: p.pos, display: 'block' }}
          />
        </div>
      ))}
      <div style={{ font: F.caption, color: C.lilac, padding: '4px 0 8px' }}>{t.prizesNote}</div>
    </div>
  )
}
