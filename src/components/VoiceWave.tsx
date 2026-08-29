import { useRef } from 'react'
import { useInView } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const BARS = [0.35, 0.7, 0.45, 0.9, 0.5, 0.75, 0.4] as const

/** Minimal voice metaphor — not a music equalizer. */
export function VoiceWave({
  className = '',
  active: activeProp,
}: {
  className?: string
  active?: boolean
}) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.5, once: true })
  const active = activeProp ?? (inView && !reduced)

  return (
    <div
      ref={ref}
      className={`voice-wave flex h-6 items-end justify-center gap-1 ${active ? 'voice-wave-active' : ''} ${className}`}
      aria-hidden
    >
      {BARS.map((base, i) => (
        <span
          key={i}
          className="voice-wave-bar w-[2px] rounded-full bg-orange/70"
          style={{
            height: `${base * 100}%`,
            animationDelay: `${i * 0.08}s`,
            animationDuration: `${2.8 + i * 0.12}s`,
          }}
        />
      ))}
    </div>
  )
}
