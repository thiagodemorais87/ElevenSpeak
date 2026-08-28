import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useReducedMotion } from './useReducedMotion'

interface UseSmoothScrollOptions {
  enabled?: boolean
}

export function useSmoothScroll({ enabled = true }: UseSmoothScrollOptions = {}) {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !enabled) return

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1.2,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    document.documentElement.classList.add('lenis', 'lenis-smooth')

    return () => {
      gsap.ticker.remove(ticker)
      lenis.destroy()
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
    }
  }, [reduced, enabled])
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
