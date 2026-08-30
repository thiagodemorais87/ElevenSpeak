import { useEffect, useRef, useState } from 'react'
import { heroCarouselItems } from '@/data/heroLoops'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/useIsMobile'

export function HeroMiniCarousel() {
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()
  const ref = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || reduced) return

    const observer = new IntersectionObserver(
      ([entry]) => setPaused(!entry?.isIntersecting),
      { threshold: 0.05 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [reduced])

  if (reduced) {
    return (
      <div className="relative z-20 border-t border-ivory/15 bg-ivory px-5 py-4 md:px-8">
        <p className="text-center font-display text-[9px] font-semibold tracking-[0.12em] text-obsidian/80 md:text-[10px]">
          {heroCarouselItems.slice(0, 4).join(' · ')}
        </p>
      </div>
    )
  }

  const duration = isMobile ? 42 : 38

  return (
    <div
      ref={ref}
      className="hero-carousel-mask relative z-20 overflow-hidden border-t border-ivory/15 bg-ivory py-4"
    >
      <div
        className={`hero-carousel-track flex w-max gap-3 px-3 ${paused ? 'hero-carousel-paused' : ''}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {[...heroCarouselItems, ...heroCarouselItems].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex min-w-[140px] shrink-0 items-center justify-center border border-obsidian/20 bg-warm-white px-4 py-2 font-display text-[9px] font-semibold tracking-[0.12em] text-obsidian md:text-[10px]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
