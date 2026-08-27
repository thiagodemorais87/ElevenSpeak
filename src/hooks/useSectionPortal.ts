import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsDesktop } from '@/hooks/useIsDesktop'

/** Subtle enter animation inside existing section bounds — no height change. */
export function useSectionPortal(enabled = true) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const isDesktop = useIsDesktop()

  useEffect(() => {
    if (!enabled || reduced || !ref.current) return
    const el = ref.current

    const from = isDesktop
      ? { opacity: 0.35, y: 28, clipPath: 'inset(8% 0 0 0)' }
      : { opacity: 0.5, y: 16 }

    const to = isDesktop
      ? { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' }
      : { opacity: 1, y: 0 }

    const tween = gsap.fromTo(el, from, {
      ...to,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        end: 'top 55%',
        scrub: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      gsap.set(el, { clearProps: 'opacity,transform,clipPath' })
    }
  }, [enabled, reduced, isDesktop])

  return ref
}
