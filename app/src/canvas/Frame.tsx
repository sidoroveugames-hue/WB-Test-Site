import { useEffect, useRef, useState } from 'react'
import { Phone, PHONE_SIZE, type PhoneProps } from '../components/Phone'
import { C, F } from '../theme'

interface FrameProps extends PhoneProps {
  /** Caption printed above the frame, as on the design canvas. */
  caption: string
  /**
   * Remount the frame each time it scrolls back into view, so its tracker
   * animation plays when the reviewer actually reaches it — the board's
   * «анимация запускается при открытии фрейма» note.
   */
  replayOnVisible?: boolean
}

/** One labelled 390×844 frame on the review board. */
export function Frame({ caption, replayOnVisible = false, ...phone }: FrameProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [run, setRun] = useState(0)
  const visibleRef = useRef(true)

  useEffect(() => {
    const el = ref.current
    if (!replayOnVisible || !el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting
        if (visible && !visibleRef.current) setRun((n) => n + 1)
        visibleRef.current = visible
      },
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [replayOnVisible])

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ font: F.caption, color: C.lilac }}>{caption}</span>
      <div style={{ width: PHONE_SIZE.width, height: PHONE_SIZE.height }}>
        <Phone key={run} {...phone} />
      </div>
    </div>
  )
}
