export type Lang = 'ru' | 'kz'

export interface Fact { big: string; small: string }
export interface Bonus { name: string; chip: string }
export interface TableRow { cat: string; m: string }
export interface StepCopy { title: string; text: string }
export interface PrizeCard { title: string; desc?: string; winners: string }
export interface Winner { name: string; city: string; prize: string; m: string }
/** `[question, answer]` — kept as a tuple so the copy deck stays terse. */
export type FaqEntry = [string, string]

/**
 * Every string the prototype renders, for one language. The handful of
 * function-valued entries exist because Russian inflects the peak name
 * differently per sentence ("Пик 2300" → "до Пику 2300" / "розыгрыш Пика 2300").
 */
export interface Dict {
  back: string
  more: string

  heroTitle: string
  heroSub: string
  heroText: string
  ctaJoin: string
  ctaMy: string
  dates: string
  facts: Fact[]

  climbTitle: string
  /** Label on the greyed-out stretch of route: metres not yet confirmed. */
  pending: string
  /** Noun for peaks 1–4. */
  peak: string
  /** Noun for the final peak. */
  summit: string

  toPeaks: string
  passed: string
  left: (n: string) => string
  ticketsNote: string
  closer: (peakName: string) => string
  allGoods: string
  products: string[]

  howTitle: string
  steps: StepCopy[]
  bonusTitle: string
  bonuses: Bonus[]
  bonusNote: string
  tableTitle: string
  tableCol1: string
  tableCol2: string
  tableRows: TableRow[]
  rulesBtn: string

  prizesTitle: string
  prizeCards: PrizeCard[]
  prizesNote: string

  drawsTitle: string
  nextDraw: string
  drawDate: string
  countdown: string
  remind: string
  archiveTitle: string
  archiveCard: string
  winnersBtn: string
  videoLabel: string
  winnersCols: string
  winners: Winner[]
  mapTitle: string
  trustTitle: string
  theses: string[]
  trustNote: string
  faqTitle: string
  faq: FaqEntry[]
  docsTitle: string
  docs: string[]
  contacts: string[]
  legal: string

  navClimb: string
  navHow: string
  navPrizes: string
  navDraws: string
  menu: string[]

  toast: string
  toastSub: string
  sheetTitle: (peakName: string) => string
  sheetText: (peakName: string) => string
  share: string
  next: string
}
