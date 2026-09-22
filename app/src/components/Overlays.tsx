import { ICONS } from '../catalog'
import type { Dict } from '../i18n'
import { C, F } from '../theme'

interface MenuProps {
  t: Dict
  onClose: () => void
}

/** Kebab-menu popover on the climb screen. Tapping anywhere dismisses it. */
export function Menu({ t, onClose }: MenuProps) {
  return (
    <>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, zIndex: 20 }} />
      <div
        style={{
          position: 'absolute',
          top: 96,
          right: 16,
          zIndex: 21,
          background: C.card,
          borderRadius: 16,
          padding: 8,
          minWidth: 200,
          boxShadow: '0 12px 32px rgba(0,0,0,.5)',
        }}
      >
        {t.menu.map((m, i) => (
          <button
            key={i}
            className="menu-item"
            onClick={onClose}
            style={{
              width: '100%',
              border: 0,
              background: 'transparent',
              color: C.white,
              textAlign: 'left',
              padding: 12,
              minHeight: 44,
              font: '400 15px/20px Inter',
              cursor: 'pointer',
              borderRadius: 10,
            }}
          >
            {m}
          </button>
        ))}
      </div>
    </>
  )
}

/** "+300 м" accrual toast — shown for three seconds in the `gain` state. */
export function Toast({ t }: { t: Dict }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 56,
        left: 16,
        right: 16,
        zIndex: 30,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          background: C.card,
          borderRadius: 999,
          padding: '10px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          boxShadow: '0 8px 24px rgba(0,0,0,.4)',
          animation: 'toastin .25s ease-out',
        }}
      >
        <span style={{ font: F.heading, color: C.magenta }}>{t.toast}</span>
        <span style={{ font: F.caption }}>{t.toastSub}</span>
      </div>
    </div>
  )
}

interface PeakSheetProps {
  t: Dict
  /** Display name of the peak just crossed, e.g. "Пик 2300". */
  peak: string
  onClose: () => void
}

/** Celebration sheet that slides up after a peak is crossed. */
export function PeakSheet({ t, peak, onClose }: PeakSheetProps) {
  return (
    <>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 40 }} />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 41,
          background: C.card,
          borderRadius: '24px 24px 0 0',
          padding: '12px 16px 40px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          animation: 'sheetin .3s ease-out',
        }}
      >
        <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(255,255,255,.25)', alignSelf: 'center', marginBottom: 8 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill={C.magenta} stroke={C.white} strokeWidth={1} strokeLinejoin="round">
            <path d={ICONS.flag} />
          </svg>
          <div style={{ font: F.title }}>{t.sheetTitle(peak)}</div>
        </div>
        <div style={{ font: F.body, textWrap: 'pretty' }}>{t.sheetText(peak)}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
          <button
            style={{
              height: 52,
              borderRadius: 999,
              border: `1.5px solid ${C.white}`,
              background: 'transparent',
              color: C.white,
              font: F.button,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.white} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d={ICONS.share} />
            </svg>
            {t.share}
          </button>
          <button
            onClick={onClose}
            style={{
              height: 52,
              borderRadius: 999,
              border: 0,
              background: C.magenta,
              color: C.white,
              font: F.button,
              cursor: 'pointer',
            }}
          >
            {t.next}
          </button>
        </div>
      </div>
    </>
  )
}
