import { RU } from './ru'
import { KZ } from './kz'
import type { Dict, Lang } from './types'

export const DICTS: Record<Lang, Dict> = { ru: RU, kz: KZ }

export const dictFor = (lang: Lang): Dict => DICTS[lang]

export * from './types'
export { RU, KZ }
