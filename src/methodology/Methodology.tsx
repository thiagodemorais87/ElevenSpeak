import { motion } from 'motion/react'
import { methodology } from '@/data/methodology'
import { SectionHeading } from '@/components/SectionHeading'
import { easings } from '@/lib/animations'
import { useSectionPortal } from '@/hooks/useSectionPortal'

export function Methodology() {
  const portalRef = useSectionPortal()

  return (
    <section
      ref={portalRef}
      id="pillars"
      className="relative overflow-hidden bg-ivory px-5 py-24 text-obsidian md:px-8 md:py-32"
      aria-labelledby="method-pillars-heading"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-12 w-px -translate-x-1/2 bg-gradient-to-b from-lime/60 to-transparent"
        aria-hidden
      />
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="05 / 07"
          eyebrow="METHOD"
          title="Your English. Your rhythm."
          subtitle="Four pillars. One path to a voice that feels like yours."
          light
        />
        <h2 id="method-pillars-heading" className="sr-only">
          Method pillars
        </h2>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {methodology.map((pillar) => (
            <motion.article
              key={pillar.id}
              className="group relative min-h-[220px] overflow-hidden border border-obsidian/15 bg-warm-white p-6 md:p-8"
              whileHover={{ y: -4, scale: 1.015 }}
              transition={{ duration: 0.35, ease: easings.smooth }}
            >
              <div className="absolute -right-4 -top-6 font-display text-8xl font-bold text-obsidian/[0.04] transition group-hover:text-lime/25">
                {pillar.number}
              </div>
              <p className="text-xs tracking-[0.25em] text-magenta">{pillar.number}</p>
              <h3 className="mt-3 font-display text-2xl font-bold tracking-tight md:text-3xl">
                {pillar.title}
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-obsidian/65">
                {pillar.description}
              </p>
              <div className="mt-6 h-[2px] w-10 bg-lime transition-all duration-300 group-hover:w-20" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
