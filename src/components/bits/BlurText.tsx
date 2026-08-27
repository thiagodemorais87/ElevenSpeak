import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * React Bits–inspired BlurText (TS + Tailwind), adapted for Seven Speak.
 */
interface BlurTextProps {
  text: string
  className?: string
  delay?: number
  animateBy?: 'words' | 'letters'
}

export function BlurText({
  text,
  className = '',
  delay = 40,
  animateBy = 'words',
}: BlurTextProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLParagraphElement>(null)
  const [observed, setObserved] = useState(false)
  const inView = reduced || observed
  const units = animateBy === 'words' ? text.split(' ') : text.split('')

  useEffect(() => {
    if (reduced) return
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setObserved(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [reduced])

  return (
    <p ref={ref} className={className} aria-label={text}>
      {units.map((unit, i) => (
        <span
          key={`${unit}-${i}`}
          className="inline-block will-change-[filter,opacity,transform]"
          style={{
            marginRight: animateBy === 'words' ? '0.3em' : undefined,
            filter: inView ? 'blur(0px)' : 'blur(10px)',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(12px)',
            transition: reduced
              ? undefined
              : `filter 0.55s ease ${i * delay}ms, opacity 0.55s ease ${i * delay}ms, transform 0.55s ease ${i * delay}ms`,
          }}
        >
          {unit === ' ' ? '\u00A0' : unit}
        </span>
      ))}
    </p>
  )
}
