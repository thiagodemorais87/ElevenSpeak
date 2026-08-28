import { useEffect, useRef } from 'react'
import { usePreferences } from '@/context/PreferencesContext'
import { useReducedMotion } from './useReducedMotion'

interface ParallaxOptions {
  strength?: number
}

export function useMouseParallax<T extends HTMLElement>({
  strength = 20,
}: ParallaxOptions = {}) {
  const ref = useRef<T>(null)
  const reduced = useReducedMotion()
  const { finePointer } = usePreferences()

  useEffect(() => {
    if (reduced || strength === 0 || !finePointer) return
    const node = ref.current
    if (!node) return

    let raf = 0
    let inView = true
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
      if (!inView) {
        raf = 0
        return
      }
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08
      node.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      raf = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry?.isIntersecting ?? false
        if (inView && !raf) {
          raf = requestAnimationFrame(tick)
        }
      },
      { threshold: 0.01 },
    )
    observer.observe(node)

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
      cancelAnimationFrame(raf)
      node.style.transform = ''
    }
  }, [reduced, strength, finePointer])

  return ref
}
