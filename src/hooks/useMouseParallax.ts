import { useEffect, useRef } from 'react'
import { useReducedMotion } from './useReducedMotion'

interface ParallaxOptions {
  strength?: number
}

export function useMouseParallax<T extends HTMLElement>({
  strength = 20,
}: ParallaxOptions = {}) {
  const ref = useRef<T>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || strength === 0) return
    const node = ref.current
    if (!node) return

    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    let raf = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const onMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      targetX = px * strength
      targetY = py * strength
    }

    const tick = () => {
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08
      node.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      node.style.transform = ''
    }
  }, [reduced, strength])

  return ref
}
