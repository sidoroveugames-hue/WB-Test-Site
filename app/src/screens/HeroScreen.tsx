import type { Dict, Lang } from '../i18n'
import { C, DIVIDER, F } from '../theme'

interface HeroScreenProps {
  t: Dict
  lang: Lang
  onLang: (lang: Lang) => void
  onStart: () => void
}

/** Screen 01 — key visual, language switch and the headline facts. */
export function HeroScreen({ t, lang, onLang, onStart }: HeroScreenProps) {
  return (
    <div>
      <div style={{ position: 'relative', height: 506, overflow: 'hidden' }}>
        <img
          src="/assets/kv-night.png"
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '50% 100%',
            transform: 'scale(1.42)',
            transformOrigin: '6% 0%',
          }}
        />
        {/* Scrim: darkens the top for the status bar and the bottom for the copy. */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg,rgba(26,26,26,.72) 0%,rgba(26,26,26,.25) 30%,rgba(26,26,26,0) 55%,rgba(26,26,26,.9) 100%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: 47,
            left: 16,
            right: 16,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <img src="/assets/logo-pill.svg" alt="wb" style={{ height: 24, width: 'auto', display: 'block' }} />
          <div style={{ display: 'flex', background: 'rgba(43,43,43,.8)', borderRadius: 999, padding: 2 }}>
            {(['ru', 'kz'] as const).map((code) => (
              <button
                key={code}
                onClick={() => onLang(code)}
                style={{
                  border: 0,
                  height: 32,
                  padding: '0 12px',
                  borderRadius: 999,
                  background: lang === code ? C.magenta : 'transparent',
                  color: C.white,
                  font: F.captionStrong,
                  cursor: 'pointer',
                }}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div style={{ position: 'absolute', top: 104, left: 16, right: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <img
            src="/assets/logo-text-full.svg"
            alt="wildberries"
            style={{ height: 22, width: 'auto', alignSelf: 'flex-start', display: 'block' }}
          />
          <div style={{ font: F.display, textWrap: 'pretty' }}>{t.heroTitle}</div>
          <div style={{ font: F.title, color: C.white }}>{t.heroSub}</div>
        </div>
      </div>

      <div style={{ padding: '8px 16px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ font: F.body, textWrap: 'pretty' }}>{t.heroText}</div>
        <button
          onClick={onStart}
          style={{
            border: 0,
            height: 52,
            borderRadius: 999,
            background: C.magenta,
            color: C.white,
            font: F.button,
            cursor: 'pointer',
            padding: '0 24px',
          }}
        >
          {t.ctaMy}
        </button>
        <div style={{ font: F.caption, color: C.lilac, textAlign: 'center' }}>{t.dates}</div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            marginTop: 8,
            borderTop: DIVIDER,
            paddingTop: 16,
          }}
        >
          {t.facts.map((f, i) => (
            <div key={i} style={{ padding: '0 8px', borderLeft: DIVIDER, font: F.caption, textWrap: 'pretty' }}>
              <div style={{ font: F.heading, marginBottom: 4 }}>{f.big}</div>
              <div>{f.small}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
