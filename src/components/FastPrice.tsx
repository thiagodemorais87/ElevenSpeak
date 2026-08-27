import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface FastPriceProps {
  amount: number
  className?: string
  durationMs?: number
}

function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
  })
}

/** Fast price reveal — 200–300ms, re-triggers on amount change (plan toggle). */
export function FastPrice({
  amount,
  className = '',
  durationMs = 260,
}: FastPriceProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const currentRef = useRef(0)
  const [display, setDisplay] = useState(amount)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (reduced) {
      currentRef.current = amount
      return
    }
    if (!inView) return

    const from = currentRef.current
    const start = performance.now()
    let raf = 0
    let alive = true

    const tick = (now: number) => {
      if (!alive) return
      const t = Math.min(1, (now - start) / durationMs)
      const eased = 1 - (1 - t) ** 2
      const next = Math.round(from + (amount - from) * eased)
      setDisplay(next)
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        currentRef.current = amount
        setDisplay(amount)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => {
      alive = false
      cancelAnimationFrame(raf)
      currentRef.current = amount
    }
  }, [amount, inView, reduced, durationMs])

  const value = reduced || !inView ? amount : display

  return (
    <span ref={ref} className={className}>
      {formatBRL(value)}
    </span>
  )
}
