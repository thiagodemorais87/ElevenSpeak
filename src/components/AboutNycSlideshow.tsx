import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { aboutNycSlides } from '@/data/aboutNycSlides'
import { useInView } from '@/hooks/useInView'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const SET_MS = 5000
const FADE_MS = 1000

function MosaicCell({
  slide,
  animateKenBurns,
}: {
  slide: (typeof aboutNycSlides)[number]
  animateKenBurns: boolean
}) {
  return (
    <div className="relative min-h-0 flex-1 overflow-hidden">
      <picture className="absolute inset-0 block h-full w-full">
        <source srcSet={slide.image} type="image/webp" />
        <motion.img
          src={slide.fallback}
          alt=""
          className="about-nyc-slide h-full w-full object-cover"
          style={{ objectPosition: slide.objectPosition ?? 'center' }}
          initial={animateKenBurns ? { scale: 1 } : false}
          animate={animateKenBurns ? { scale: 1.06 } : undefined}
          transition={
            animateKenBurns
              ? { duration: SET_MS / 1000, ease: 'linear' }
              : undefined
          }
          loading="lazy"
          decoding="async"
        />
      </picture>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/55 via-obsidian/10 to-transparent" />

      <div className="absolute bottom-3 left-3 z-10 md:bottom-4 md:left-4">
        <p className="font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-orange md:text-xs">
          {slide.title}
        </p>
        <p className="mt-0.5 max-w-[11rem] font-display text-sm font-bold leading-tight text-ivory md:max-w-xs md:text-base">
          {slide.caption}
        </p>
      </div>
    </div>
  )
}

function getMosaicIndices(setIndex: number, total: number): number[] {
  const base = (setIndex * 4) % total
  return [0, 1, 2, 3].map((i) => (base + i) % total)
}

export function AboutNycSlideshow() {
  const reduced = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { rootMargin: '120px 0px', once: false })
  const slides = aboutNycSlides
  const [setIndex, setSetIndex] = useState(0)
  const setCount = Math.max(1, Math.ceil(slides.length / 4))
  const hasMultipleSets = setCount > 1 && slides.length >= 4
  const indices = getMosaicIndices(setIndex, slides.length)
  const mosaicSlides = indices.map((i) => slides[i]!).filter(Boolean)
  const animateKenBurns = !reduced && inView

  useEffect(() => {
    if (reduced || !hasMultipleSets || !inView) return

    const timer = window.setInterval(() => {
      setSetIndex((current) => (current + 1) % setCount)
    }, SET_MS)

    return () => window.clearInterval(timer)
  }, [hasMultipleSets, inView, reduced, setCount])

  if (mosaicSlides.length === 0) return null

  const mosaicContent = (
    <div className="about-nyc-mosaic grid h-full min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-2 p-2 md:gap-3 md:p-3">
      {mosaicSlides.slice(0, 4).map((slide) => (
        <MosaicCell key={slide.id} slide={slide} animateKenBurns={animateKenBurns} />
      ))}
    </div>
  )

  return (
    <div
      ref={containerRef}
      className="relative flex h-full min-h-[50vh] w-full flex-col bg-obsidian lg:min-h-full"
    >
      {hasMultipleSets && !reduced ? (
        <AnimatePresence mode="sync">
          <motion.div
            key={`mosaic-${setIndex}`}
            className="absolute inset-0 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: FADE_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
          >
            {mosaicContent}
          </motion.div>
        </AnimatePresence>
      ) : (
        mosaicContent
      )}
    </div>
  )
}
