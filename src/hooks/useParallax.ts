import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from './useReducedMotion'

interface UseParallaxOptions {
  speed?: number
}

export function useParallax<T extends HTMLElement>({
  speed = 0.2,
}: UseParallaxOptions = {}) {
  const ref = useRef<T>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const node = ref.current
    if (!node) return

    const tween = gsap.to(node, {
      yPercent: speed * 40,
      ease: 'none',
      scrollTrigger: {
        trigger: node,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reduced, speed])

  return ref
}
