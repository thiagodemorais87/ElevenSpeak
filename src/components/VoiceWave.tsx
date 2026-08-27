import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/** Minimal voice metaphor — not a music equalizer. */
export function VoiceWave({ className = '' }: { className?: string }) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.5, once: false })
  const bars = [0.35, 0.7, 0.45, 0.9, 0.5, 0.75, 0.4]

  return (
    <div
      ref={ref}
      className={`flex h-6 items-end justify-center gap-1 ${className}`}
      aria-hidden
    >
      {bars.map((base, i) => (
        <motion.span
          key={i}
          className="w-[2px] rounded-full bg-lime/70"
          style={{ height: '100%', originY: 1 }}
          animate={
            reduced || !inView
              ? { scaleY: base }
              : {
                  scaleY: [base * 0.7, base, base * 0.85, base * 0.95, base * 0.7],
                }
          }
          transition={
            reduced || !inView
              ? { duration: 0 }
              : {
                  duration: 2.8 + i * 0.12,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.08,
                }
          }
        />
      ))}
    </div>
  )
}
