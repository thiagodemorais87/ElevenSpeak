import { useEffect, useRef } from 'react'
import { useReducedMotion } from './useReducedMotion'

interface ScrollParallaxOptions {
  strength?: number
  enabled?: boolean
}

/** Vertical parallax from scroll — for mobile portrait layers. */
export function useScrollParallax<T extends HTMLElement>({
  strength = 12,
  enabled = true,
}: ScrollParallaxOptions = {}) {
  const ref = useRef<T>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !enabled || strength === 0) return
    const node = ref.current
    if (!node) return

    let raf = 0
    const tick = () => {
      const rect = node.getBoundingClientRect()
      const vh = window.innerHeight
      const center = rect.top + rect.height / 2
      const progress = (center - vh / 2) / vh
      const y = progress * strength
      node.style.transform = `translate3d(0, ${y}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      if (node) node.style.transform = ''
    }
  }, [reduced, enabled, strength])

  return ref
}
