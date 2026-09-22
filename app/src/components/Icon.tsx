import type { CSSProperties } from 'react'
import { C } from '../theme'

interface IconProps {
  /** Path data from `ICONS`, drawn in a 24×24 viewBox. */
  d: string
  size?: number
  stroke?: string
  strokeOpacity?: number
  strokeWidth?: number
  style?: CSSProperties
}

/** The stroked 24×24 icon used throughout the design. */
export function Icon({ d, size = 24, stroke = C.white, strokeOpacity = 1, strokeWidth = 1.5, style }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeOpacity={strokeOpacity}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    >
      <path d={d} />
    </svg>
  )
}
