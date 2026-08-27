import { useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface CountUpProps {
  /** e.g. "10+" or "100+" */
  value: string
  className?: string
  durationMs?: number
}

function parseStat(value: string): { target: number; suffix: string } | null {
  const match = value.match(/^(\d+)(.*)$/)
  if (!match?.[1]) return null
  return { target: Number(match[1]), suffix: match[2] ?? '' }
}

export function CountUp({ value, className = '', durationMs = 1400 }: CountUpProps) {
  const reduced = useReducedMotion()
  const parsed = useMemo(() => parseStat(value), [value])
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)
  const doneRef = useRef(false)

  useEffect(() => {
    if (!parsed || reduced) return

    const node = ref.current
    if (!node || doneRef.current) return

    let raf = 0
    let alive = true

    const animate = () => {
      if (doneRef.current || !alive) return
      doneRef.current = true

      const { target, suffix } = parsed
      setDisplay(`0${suffix}`)
      const start = performance.now()

      const tick = (now: number) => {
        if (!alive) return
        const t = Math.min(1, (now - start) / durationMs)
        const eased = 1 - (1 - t) ** 3
        setDisplay(`${Math.round(target * eased)}${suffix}`)
        if (t < 1) {
          raf = requestAnimationFrame(tick)
        } else {
          setDisplay(`${target}${suffix}`)
        }
      }

      raf = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          animate()
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    )

    observer.observe(node)

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      observer.disconnect()
      // Allow Strict Mode remount to animate once for real
      doneRef.current = false
    }
  }, [parsed, reduced, durationMs])

  if (!parsed || reduced) {
    return <span className={className}>{value}</span>
  }

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
