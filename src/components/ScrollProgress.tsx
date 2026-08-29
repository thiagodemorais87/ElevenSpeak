import { memo, useEffect, useRef } from 'react'
import { subscribeScrollMetrics } from '@/hooks/useScrollMetrics'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function journeyStep(progress: number): number {
  if (progress <= 0) return 1
  return Math.min(7, Math.floor(progress * 7) + 1)
}

export const ScrollProgress = memo(function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    return subscribeScrollMetrics(({ progress }) => {
      if (barRef.current) {
        barRef.current.style.width = `${progress * 100}%`
      }
      if (labelRef.current) {
        const step = journeyStep(progress)
        labelRef.current.textContent = `${String(step).padStart(2, '0')} / 07`
      }
    })
  }, [])

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[90] h-[2px] w-full bg-transparent"
      aria-hidden
    >
      <div
        ref={barRef}
        className={`relative h-full origin-left bg-orange ${reduced ? '' : 'journey-glow'}`}
        style={{ width: '0%' }}
      />
      <span
        ref={labelRef}
        className="absolute right-3 top-2 hidden font-display text-[9px] tracking-[0.25em] text-orange/70 sm:block md:right-5"
        aria-hidden
      >
        01 / 07
      </span>
    </div>
  )
})
