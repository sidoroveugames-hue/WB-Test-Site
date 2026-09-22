import type { ReactNode } from 'react'
import { Frame } from './Frame'
import { C, F } from '../theme'

interface GroupProps {
  title: string
  note: string
  children: ReactNode
}

/** A titled row of frames. */
function Group({ title, note, children }: GroupProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
        <span style={{ font: F.title }}>{title}</span>
        <span style={{ font: F.caption, color: C.lilac }}>{note}</span>
      </div>
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>{children}</div>
    </div>
  )
}

/**
 * «Экраны и состояния» — the review board: five Russian screens, the three
 * tracker states, and the Kazakh screens used to check long strings.
 */
export function Canvas() {
  return (
    <div
      style={{
        background: C.page,
        color: C.white,
        padding: 48,
        display: 'flex',
        flexDirection: 'column',
        gap: 56,
        fontFamily: 'Inter, sans-serif',
        width: 'max-content',
      }}
    >
      <Group title="экраны RU" note="390 × 844, интерактивные">
        <Frame caption="01 hero" screen="hero" lang="ru" />
        <Frame caption="02 мой подъём · в пути" screen="climb" lang="ru" trackerState="base" />
        <Frame caption="03 как участвовать" screen="how" lang="ru" />
        <Frame caption="04 призы" screen="prizes" lang="ru" />
        <Frame caption="05 тиражи · доверие · документы" screen="draws" lang="ru" />
      </Group>

      <Group title="состояния трекера" note="анимация запускается при открытии фрейма">
        <Frame
          caption="в пути · 1 850 м · персонаж маджента"
          screen="climb"
          lang="ru"
          trackerState="base"
          character="magenta"
          replayOnVisible
        />
        <Frame
          caption="метры начислены · +300 м · тост · персонаж фиолетовый"
          screen="climb"
          lang="ru"
          trackerState="gain"
          character="violet"
          replayOnVisible
        />
        <Frame
          caption="пик достигнут · Пик 2300 · конфетти · шторка · персонаж белый"
          screen="climb"
          lang="ru"
          trackerState="peak"
          character="white"
          replayOnVisible
        />
      </Group>

      <Group title="экраны KZ" note="проверка длинных строк">
        <Frame caption="01 hero" screen="hero" lang="kz" />
        <Frame caption="02 менің көтерілуім" screen="climb" lang="kz" trackerState="base" />
        <Frame caption="03 қалай қатысу" screen="how" lang="kz" />
        <Frame caption="04 жүлделер" screen="prizes" lang="kz" />
      </Group>
    </div>
  )
}
