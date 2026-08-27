import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Testimonial } from '@/data/testimonials'
import { easings } from '@/lib/animations'

interface TestimonialSliderProps {
  items: Testimonial[]
}

export function TestimonialSlider({ items }: TestimonialSliderProps) {
  const [index, setIndex] = useState(0)
  const current = items[index]

  if (!current) return null

  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length)
  const next = () => setIndex((i) => (i + 1) % items.length)

  return (
    <div
      className="relative"
      onTouchStart={(e) => {
        const startX = e.touches[0]?.clientX ?? 0
        const onEnd = (ev: TouchEvent) => {
          const endX = ev.changedTouches[0]?.clientX ?? startX
          const dx = endX - startX
          if (dx > 50) prev()
          if (dx < -50) next()
          window.removeEventListener('touchend', onEnd)
        }
        window.addEventListener('touchend', onEnd)
      }}
    >
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={current.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: easings.smooth }}
          className="max-w-4xl"
        >
          <span className="font-display text-6xl leading-none text-magenta md:text-8xl">
            “
          </span>
          <p className="mt-2 font-display text-2xl font-medium leading-snug text-obsidian md:text-4xl lg:text-5xl">
            {current.quote}
          </p>
          <footer className="mt-8 flex flex-col gap-1">
            <cite className="font-display text-lg not-italic text-obsidian">
              {current.name}
            </cite>
            <span className="text-xs uppercase tracking-[0.2em] text-obsidian/50">
              {current.profile}
            </span>
          </footer>
        </motion.blockquote>
      </AnimatePresence>

      <div className="mt-10 flex items-center gap-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous testimonial"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-obsidian/20 text-obsidian transition hover:border-obsidian hover:bg-obsidian hover:text-ivory"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next testimonial"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-obsidian/20 text-obsidian transition hover:border-obsidian hover:bg-obsidian hover:text-ivory"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <div className="ml-2 flex gap-2" role="tablist" aria-label="Testimonials">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 w-6 rounded-full transition ${
                i === index ? 'bg-magenta' : 'bg-obsidian/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
