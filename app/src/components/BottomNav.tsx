import { ICONS } from '../catalog'
import { Icon } from '../components/Icon'
import type { Dict } from '../i18n'
import { C, F } from '../theme'
import type { ScreenId } from '../types'

interface BottomNavProps {
  t: Dict
  active: ScreenId
  onGo: (screen: ScreenId) => void
}

/** Four tabs; the hero screen is reached via the back arrow, not the bar. */
export function BottomNav({ t, active, onGo }: BottomNavProps) {
  const items: Array<{ id: ScreenId; label: string; icon: string }> = [
    { id: 'climb', label: t.navClimb, icon: ICONS.mountain },
    { id: 'how', label: t.navHow, icon: ICONS.check },
    { id: 'prizes', label: t.navPrizes, icon: ICONS.flag },
    { id: 'draws', label: t.navDraws, icon: ICONS.calendar },
  ]

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 80,
        padding: '6px 8px 24px',
        background: C.bg,
        borderTop: '1px solid rgba(255,255,255,.08)',
        display: 'grid',
        gridTemplateColumns: 'repeat(4,1fr)',
        zIndex: 6,
      }}
    >
      {items.map((n) => {
        const color = active === n.id ? C.magenta : C.white
        return (
          <button
            key={n.id}
            onClick={() => onGo(n.id)}
            style={{
              border: 0,
              background: 'transparent',
              color,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              minHeight: 44,
              cursor: 'pointer',
              padding: '0 2px',
            }}
          >
            <Icon d={n.icon} stroke={color} />
            <span style={{ font: F.nav, textAlign: 'center', textWrap: 'balance' }}>{n.label}</span>
          </button>
        )
      })}
    </div>
  )
}
