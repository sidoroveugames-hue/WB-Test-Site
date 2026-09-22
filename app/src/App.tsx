import { useEffect, useState } from 'react'
import { Canvas } from './canvas/Canvas'
import { Phone, PHONE_SIZE } from './components/Phone'
import type { Lang } from './i18n'
import { C } from './theme'
import type { TrackerState } from './tracker/useTracker'
import type { Character, ScreenId } from './types'

const SCREENS: ScreenId[] = ['hero', 'climb', 'how', 'prizes', 'draws']
const LANGS: Lang[] = ['ru', 'kz']
const TRACKER_STATES: TrackerState[] = ['base', 'gain', 'peak']
const CHARACTERS: Character[] = ['magenta', 'violet', 'white']

function useHash(): string {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return hash
}

/** Pick `value` from `allowed`, falling back to the first entry. */
function oneOf<T extends string>(value: string | null, allowed: T[]): T {
  return allowed.find((a) => a === value) ?? allowed[0]
}

/**
 * Two routes:
 *   `#/canvas` — the «Экраны и состояния» review board.
 *   anything else — a single interactive phone. The design tool's twiddles map
 *     onto query params, e.g. `#/?screen=climb&tracker=peak&character=white`.
 */
export function App() {
  const hash = useHash()
  const [path, query = ''] = hash.replace(/^#/, '').split('?')

  if (path === '/canvas') return <Canvas />

  const params = new URLSearchParams(query)
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', minHeight: PHONE_SIZE.height, background: C.page }}>
      <Phone
        screen={oneOf(params.get('screen'), SCREENS)}
        lang={oneOf(params.get('lang'), LANGS)}
        trackerState={oneOf(params.get('tracker'), TRACKER_STATES)}
        character={oneOf(params.get('character'), CHARACTERS)}
      />
    </div>
  )
}
