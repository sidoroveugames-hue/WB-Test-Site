import { ICONS, STEP_ART } from '../catalog'
import type { Dict } from '../i18n'
import { C, DIVIDER, F, HAIRLINE } from '../theme'

interface HowScreenProps {
  t: Dict
  tableOpen: boolean
  onToggleTable: () => void
  onRules: () => void
}

/** Screen 03 — the four steps, bonuses, and the collapsible heights table. */
export function HowScreen({ t, tableOpen, onToggleTable, onRules }: HowScreenProps) {
  const steps = t.steps.map((s, i) => ({ ...s, n: i + 1, ...STEP_ART[i] }))

  return (
    <div style={{ padding: '63px 16px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ font: F.title, padding: '8px 0' }}>{t.howTitle}</div>

      {steps.map((s) => (
        <div key={s.n} style={{ background: C.card, borderRadius: 16, padding: 16, display: 'flex', gap: 16 }}>
          <div style={{ font: F.display, color: C.magenta, width: 36, flex: 'none' }}>{s.n}</div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={C.white}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flex: 'none' }}
              >
                <path d={s.icon} />
                <circle cx={s.dot[0]} cy={s.dot[1]} r="1.75" fill={C.magenta} stroke="none" />
              </svg>
              <div style={{ font: F.button }}>{s.title}</div>
            </div>
            <div style={{ font: F.body, color: C.white, textWrap: 'pretty' }}>{s.text}</div>
          </div>
        </div>
      ))}

      {/* Bonuses, set on the brand's circle pattern. */}
      <div style={{ position: 'relative', background: C.card, borderRadius: 16, padding: 16, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -70, top: -70, width: 200, height: 200, borderRadius: '50%', background: C.violet, opacity: 0.55 }} />
        <div style={{ position: 'absolute', right: 20, bottom: -90, width: 150, height: 150, borderRadius: '50%', background: C.magenta, opacity: 0.5 }} />
        <div style={{ position: 'absolute', right: -30, top: 60, width: 90, height: 90, borderRadius: '50%', background: C.lilac, opacity: 0.5 }} />
        <div style={{ position: 'relative', maxWidth: 230 }}>
          <div style={{ font: F.title, marginBottom: 12 }}>{t.bonusTitle}</div>
          {t.bonuses.map((b, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 8,
                padding: '10px 0',
                borderTop: DIVIDER,
              }}
            >
              <div style={{ font: F.listStrong }}>{b.name}</div>
              <div
                style={{
                  background: C.magenta,
                  color: C.white,
                  borderRadius: 999,
                  padding: '3px 10px',
                  font: F.captionStrong,
                  whiteSpace: 'nowrap',
                }}
              >
                {b.chip}
              </div>
            </div>
          ))}
          <div style={{ font: F.caption, color: C.white, opacity: 0.85, paddingTop: 8, textWrap: 'pretty' }}>{t.bonusNote}</div>
        </div>
      </div>

      <div style={{ background: C.card, borderRadius: 16, overflow: 'hidden' }}>
        <button
          onClick={onToggleTable}
          style={{
            width: '100%',
            border: 0,
            background: 'transparent',
            color: C.white,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            padding: 16,
            minHeight: 56,
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <span style={{ font: F.button }}>{t.tableTitle}</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={C.white}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flex: 'none', transform: `rotate(${tableOpen ? 180 : 0}deg)`, transition: 'transform .2s' }}
          >
            <path d={ICONS.chevronDown} />
          </svg>
        </button>
        {tableOpen && (
          <div style={{ padding: '0 16px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', font: F.caption, color: C.lilac, paddingBottom: 8 }}>
              <span>{t.tableCol1}</span>
              <span>{t.tableCol2}</span>
            </div>
            {t.tableRows.map((r, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 12,
                  padding: '10px 0',
                  borderTop: HAIRLINE,
                  font: F.body,
                }}
              >
                <span>{r.cat}</span>
                <span style={{ font: F.bodyStrong, color: C.magenta }}>{r.m}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={onRules}
        style={{
          height: 52,
          borderRadius: 999,
          border: `1.5px solid ${C.white}`,
          background: 'transparent',
          color: C.white,
          font: F.button,
          cursor: 'pointer',
        }}
      >
        {t.rulesBtn}
      </button>
    </div>
  )
}
