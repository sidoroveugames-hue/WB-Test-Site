/**
 * Non-translatable content: imagery, prices and icon geometry. The product
 * shots are crops of the prize renders — the designer flagged these as
 * placeholders to be swapped for real catalogue cards.
 */

export interface ProductArt {
  img: string
  /** `background-size` for the crop. */
  size: string
  /** `background-position` for the crop. */
  pos: string
  /** Metres badge shown on the thumbnail. */
  chip: string
  price: string
}

/** Parallel to `Dict.products`, which supplies the names. */
export const PRODUCT_ART: ProductArt[] = [
  { img: '/assets/prize-3200.png', size: '360%', pos: '12% 78%', chip: '+300 м', price: '189 990 ₸' },
  { img: '/assets/prize-3200.png', size: '360%', pos: '52% 70%', chip: '+300 м', price: '149 990 ₸' },
  { img: '/assets/prize-1500.png', size: '240%', pos: '40% 55%', chip: '+500 м', price: '219 990 ₸' },
  { img: '/assets/prize-700.png', size: '300%', pos: '12% 60%', chip: '+300 м', price: '389 990 ₸' },
  { img: '/assets/prize-700.png', size: '380%', pos: '34% 82%', chip: '+300 м', price: '49 990 ₸' },
]

export interface PrizeArt {
  img: string
  /** `object-position` for the 128px-wide card thumbnail. */
  pos: string
}

/** Parallel to `Dict.prizeCards`, which is ordered highest peak first. */
export const PRIZE_ART: PrizeArt[] = [
  { img: '/assets/prize-3200.png', pos: '50% 60%' },
  { img: '/assets/prize-2800.png', pos: '40% 60%' },
  { img: '/assets/prize-2300.png', pos: '70% 60%' },
  { img: '/assets/prize-1500.png', pos: '45% 55%' },
  { img: '/assets/prize-700.png', pos: '30% 55%' },
]

/** Shared 24×24 icon paths, stroked unless stated otherwise. */
export const ICONS = {
  flag: 'M6 21V4h11l-2 4 2 4H6',
  mountain: 'M3 18l6-10 4 6 2-3 6 7z',
  check: 'M5 12l5 5 9-10',
  calendar: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  chevronDown: 'M6 9l6 6 6-6',
  chevronRight: 'M9 6l6 6-6 6',
  chevronLeft: 'M15 5l-7 7 7 7',
  share: 'M12 15V4M8 8l4-4 4 4M5 13v6h14v-6',
  play: 'M8 5v14l11-7z',
  tag: 'M4 4h7l9 9-7 7-9-9z',
  box: 'M3 8l9-4 9 4-9 4zM3 8v9l9 4 9-4V8M12 12v9',
} as const

export interface StepArt {
  icon: string
  /** Magenta dot placed inside the step icon. */
  dot: readonly [number, number]
}

/** Parallel to `Dict.steps`. */
export const STEP_ART: StepArt[] = [
  { icon: ICONS.tag, dot: [8, 8] },
  { icon: ICONS.box, dot: [12, 3.5] },
  { icon: ICONS.mountain, dot: [9, 8] },
  { icon: ICONS.flag, dot: [17, 8] },
]
