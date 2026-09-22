import { ICONS } from '../catalog'
import { Icon } from '../components/Icon'
import type { Dict, Lang } from '../i18n'
import { KZ_OUTLINE_POINTS, MAP_SIZE, mapCities } from '../map'
import { C, DIVIDER, F, HAIRLINE } from '../theme'

interface DrawsScreenProps {
  t: Dict
  lang: Lang
  winnersOpen: boolean
  onToggleWinners: () => void
  /** Index of the expanded FAQ entry, or `-1`. */
  openFaq: number
  onToggleFaq: (i: number) => void
}

/** Screen 05 — upcoming and past draws, the winners map, trust, FAQ, documents. */
export function DrawsScreen({ t, lang, winnersOpen, onToggleWinners, openFaq, onToggleFaq }: DrawsScreenProps) {
  const cities = mapCities(lang)

  return (
    <div style={{ padding: '63px 16px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ font: F.title, padding: '8px 0' }}>{t.drawsTitle}</div>

      <div style={{ background: C.card, borderRadius: 16, padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.white} strokeWidth={1.5} strokeLinecap="round">
            <rect x="4" y="5" width="16" height="15" rx="2" />
            <path d="M4 10h16M8 3v4M16 3v4" />
            <circle cx="16" cy="15" r="1.75" fill={C.magenta} stroke="none" />
          </svg>
          <div style={{ font: F.title }}>{t.nextDraw}</div>
        </div>
        <div style={{ font: F.body }}>{t.drawDate}</div>
        <div style={{ font: F.display, color: C.magenta }}>{t.countdown}</div>
        <button
          style={{
            marginTop: 8,
            height: 48,
            borderRadius: 999,
            border: `1.5px solid ${C.white}`,
            background: 'transparent',
            color: C.white,
            font: F.button,
            cursor: 'pointer',
          }}
        >
          {t.remind}
        </button>
      </div>

      <div style={{ font: F.title, paddingTop: 8 }}>{t.archiveTitle}</div>
      <div style={{ position: 'relative', background: C.card, borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: -60, bottom: -80, width: 180, height: 180, borderRadius: '50%', background: C.violet, opacity: 0.45 }} />
        <div style={{ position: 'absolute', right: -40, top: -60, width: 140, height: 140, borderRadius: '50%', background: C.lilac, opacity: 0.4 }} />
        <div style={{ position: 'relative', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div
            style={{
              height: 140,
              borderRadius: 12,
              background: C.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              color: C.lilac,
              font: F.caption,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.white} strokeWidth={1.5} strokeLinejoin="round">
              <path d={ICONS.play} />
            </svg>
            {t.videoLabel}
          </div>
          <div style={{ font: F.button }}>{t.archiveCard}</div>
          <button
            onClick={onToggleWinners}
            style={{
              height: 44,
              borderRadius: 999,
              border: 0,
              background: C.magenta,
              color: C.white,
              font: F.button,
              cursor: 'pointer',
            }}
          >
            {t.winnersBtn}
          </button>
          {winnersOpen && (
            <div>
              <div style={{ font: F.caption, color: C.lilac, paddingBottom: 6 }}>{t.winnersCols}</div>
              {t.winners.map((w, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '2px 12px',
                    padding: '8px 0',
                    borderTop: HAIRLINE,
                    font: F.caption,
                  }}
                >
                  <span style={{ font: F.captionStrong }}>{w.name}</span>
                  <span style={{ textAlign: 'right' }}>{w.city}</span>
                  <span style={{ opacity: 0.85 }}>{w.prize}</span>
                  <span style={{ textAlign: 'right', color: C.magenta }}>{w.m}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ background: C.card, borderRadius: 16, padding: 16 }}>
        <div style={{ font: F.title, marginBottom: 8 }}>{t.mapTitle}</div>
        <div style={{ position: 'relative', width: MAP_SIZE.width, height: MAP_SIZE.height }}>
          <svg
            viewBox={`0 0 ${MAP_SIZE.width} ${MAP_SIZE.height}`}
            width={MAP_SIZE.width}
            height={MAP_SIZE.height}
            style={{ display: 'block' }}
          >
            <polygon points={KZ_OUTLINE_POINTS} fill="none" stroke={C.white} strokeWidth={1.5} strokeLinejoin="round" opacity=".7" />
            {cities.map((c, i) => (
              <circle key={i} cx={c.x.toFixed(1)} cy={c.y.toFixed(1)} r={c.r} fill={C.magenta} />
            ))}
          </svg>
          {cities.map((c, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: Number(c.labelX.toFixed(1)),
                top: Number(c.labelY.toFixed(1)),
                transform: `translate(${c.labelShift},-50%)`,
                font: F.mapCity,
                color: C.white,
                whiteSpace: 'nowrap',
              }}
            >
              {c.name}
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: C.card, borderRadius: 16, padding: 16, display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={C.white}
            strokeWidth={1.5}
            strokeLinejoin="round"
            style={{ flex: 'none', marginTop: 2 }}
          >
            <path d="M12 3l8 3v6c0 4.5-3.5 7.5-8 9-4.5-1.5-8-4.5-8-9V6z" />
            <path d="M9 12l2 2 4-4" stroke={C.magenta} strokeLinecap="round" />
          </svg>
          <div style={{ font: F.title, textWrap: 'pretty' }}>{t.trustTitle}</div>
        </div>
        {t.theses.map((th, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, font: F.body, textWrap: 'pretty' }}>
            <span style={{ color: C.magenta, flex: 'none' }}>—</span>
            <span>{th}</span>
          </div>
        ))}
        <div style={{ font: F.caption, color: C.lilac, textWrap: 'pretty' }}>{t.trustNote}</div>
      </div>

      <div style={{ font: F.title, paddingTop: 8 }}>{t.faqTitle}</div>
      <div style={{ background: C.card, borderRadius: 16, overflow: 'hidden' }}>
        {t.faq.map(([q, a], i) => (
          <div key={i} style={{ borderTop: HAIRLINE }}>
            <button
              onClick={() => onToggleFaq(i)}
              style={{
                width: '100%',
                border: 0,
                background: 'transparent',
                color: C.white,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                padding: '14px 16px',
                minHeight: 52,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <span style={{ font: F.listStrong }}>{q}</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke={C.white}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flex: 'none', transform: `rotate(${openFaq === i ? 180 : 0}deg)`, transition: 'transform .2s' }}
              >
                <path d={ICONS.chevronDown} />
              </svg>
            </button>
            {openFaq === i && (
              <div style={{ padding: '0 16px 16px', font: F.body, color: C.white, opacity: 0.9, textWrap: 'pretty' }}>{a}</div>
            )}
          </div>
        ))}
      </div>

      <div style={{ font: F.title, paddingTop: 8 }}>{t.docsTitle}</div>
      <div style={{ background: C.card, borderRadius: 16, overflow: 'hidden' }}>
        {t.docs.map((d, i) => (
          <a
            key={i}
            href="#"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              padding: '14px 16px',
              minHeight: 52,
              borderTop: HAIRLINE,
              textDecoration: 'none',
              color: C.white,
              font: F.body,
            }}
          >
            <span>{d}</span>
            <Icon d={ICONS.chevronRight} size={20} style={{ flex: 'none' }} />
          </a>
        ))}
      </div>

      <div style={{ font: F.caption, color: C.lilac, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {t.contacts.map((c, i) => (
          <div key={i}>{c}</div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '16px 0 8px', borderTop: DIVIDER }}>
        <img src="/assets/logo-pill.svg" alt="wb" style={{ height: 24, width: 'auto', alignSelf: 'flex-start', display: 'block' }} />
        <div style={{ font: F.legal, fontStretch: '75%', color: C.white, opacity: 0.7, textWrap: 'pretty' }}>{t.legal}</div>
      </div>
    </div>
  )
}
