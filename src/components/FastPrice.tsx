import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface FastPriceProps {
  amount: number
  from?: number
  className?: string
  durationMs?: number
  delayMs?: number
}

function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
  })
}

/** Price count-up — triggers on viewport entry, optional delay for staggered cards. */
export function FastPrice({
  amount,
  from,
  className = '',
  durationMs = 260,
  delayMs = 0,
}: FastPriceProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const startFrom = from ?? Math.max(0, Math.round(amount * 0.15))
  const [display, setDisplay] = useState(reduced ? amount : startFrom)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const onVisible = () => setInView(true)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) onVisible()
      },
      { threshold: 0.2 },
    )
    observer.observe(node)

    const rect = node.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      onVisible()
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (reduced || !inView) return

    let raf = 0
    let alive = true
    let delayTimer = 0

    const run = () => {
      const fromValue = startFrom
      const start = performance.now()

      const tick = (now: number) => {
        if (!alive) return
        const t = Math.min(1, (now - start) / durationMs)
        const eased = 1 - (1 - t) ** 2
        const next = Math.round(fromValue + (amount - fromValue) * eased)
        setDisplay(next)
        if (t < 1) {
          raf = requestAnimationFrame(tick)
        } else {
          setDisplay(amount)
        }
      }

      setDisplay(fromValue)
      raf = requestAnimationFrame(tick)
    }

    if (delayMs > 0) {
      delayTimer = window.setTimeout(run, delayMs)
    } else {
      run()
    }

    return () => {
      alive = false
      window.clearTimeout(delayTimer)
      cancelAnimationFrame(raf)
    }
  }, [amount, inView, reduced, durationMs, delayMs, startFrom])

  const value = reduced ? amount : display

  return (
    <span ref={ref} className={className}>
      {formatBRL(value)}
    </span>
  )
}
