import { lazy, Suspense } from 'react'
import { methodology } from '@/data/methodology'
import { colors } from '@/config/colors'
import { Reveal } from '@/components/Reveal'
import { WordReveal } from '@/components/WordReveal'
import { useSectionPortal } from '@/hooks/useSectionPortal'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/useIsMobile'

const MagicBento = lazy(() =>
  import('@/components/bits/MagicBento').then((m) => ({ default: m.MagicBento })),
)

const pillarLine = (
  <div className="relative mt-6 h-[2px] w-10 bg-orange transition-all duration-300 group-hover:w-20" />
)

const bentoItems = methodology.map((pillar) => ({
  color: colors.obsidian,
  textColor: colors.ivory,
  label: pillar.number,
  title: pillar.title,
  description: pillar.description,
}))

export function Methodology() {
  const portalRef = useSectionPortal()
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()
  const disableFx = reduced || isMobile

  return (
    <section
      ref={portalRef}
      id="pillars"
      className="relative overflow-hidden bg-ivory px-5 py-24 text-obsidian md:px-8 md:py-32"
      aria-labelledby="method-pillars-heading"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-12 w-px -translate-x-1/2 bg-gradient-to-b from-orange/60 to-transparent"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-xs tracking-[0.22em] uppercase text-obsidian/50">
              <span className="text-blue">05 / 07</span>
              <span>METHOD</span>
            </div>
            <WordReveal
              as="h2"
              id="method-pillars-heading"
              text="Your English. Your rhythm."
              className="font-display text-4xl font-bold leading-[0.95] tracking-tight text-obsidian sm:text-5xl md:text-6xl lg:text-7xl !justify-start"
            />
            <p className="max-w-xl text-base text-obsidian/70 md:text-lg">
              Four pillars. One path to a voice that feels like yours.
            </p>
          </div>
        </Reveal>

        <div className="mt-14">
          <Suspense
            fallback={
              <div className="grid gap-4 sm:grid-cols-2">
                {methodology.map((pillar) => (
                  <article
                    key={pillar.id}
                    className="min-h-[220px] border border-obsidian/15 bg-obsidian p-6 text-ivory md:p-8"
                  >
                    <p className="text-xs tracking-[0.25em] text-blue">{pillar.number}</p>
                    <h3 className="mt-3 font-display text-2xl font-bold tracking-tight md:text-3xl">
                      {pillar.title}
                    </h3>
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/65">
                      {pillar.description}
                    </p>
                  </article>
                ))}
              </div>
            }
          >
            <MagicBento
              embedded
              embeddedLayout="pillar"
              gridVariant="quad"
              items={bentoItems}
              textAutoHide={false}
              enableStars={!disableFx}
              enableSpotlight={!disableFx}
              enableBorderGlow={!disableFx}
              enableTilt={false}
              enableMagnetism={false}
              clickEffect={!disableFx}
              disableAnimations={disableFx}
              spotlightRadius={360}
              glowColor="216, 255, 62"
              renderCardExtra={() => pillarLine}
            />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
