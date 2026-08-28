import { lazy, Suspense } from 'react'
import { motion } from 'motion/react'
import { BookOpen, Lightbulb, Video, Wrench } from 'lucide-react'
import { resources } from '@/data/resources'
import { SectionHeading } from '@/components/SectionHeading'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/useIsMobile'
import type { BentoCardProps } from '@/components/bits/MagicBento'

const MagicBento = lazy(() =>
  import('@/components/bits/MagicBento').then((m) => ({ default: m.MagicBento })),
)

const icons = {
  guide: BookOpen,
  tips: Lightbulb,
  video: Video,
  tool: Wrench,
} as const

const bentoItems: BentoCardProps[] = resources.map((resource) => ({
  label: resource.type,
  title: resource.title,
  description: resource.description,
}))

function ResourceCardInner({ index }: { index: number }) {
  const resource = resources[index]!
  const Icon = icons[resource.type]
  const reduced = useReducedMotion()

  return (
    <>
      <motion.div
        whileHover={reduced ? undefined : { scale: 1.12 }}
        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      >
        <Icon
          className="h-5 w-5 text-magenta transition group-hover:text-lime"
          aria-hidden
        />
      </motion.div>
      <h3 className="mt-4 font-display text-xl font-bold">{resource.title}</h3>
      <p className="mt-2 text-sm text-obsidian/65">{resource.description}</p>
      {!resource.href && (
        <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-obsidian/35">
          Coming soon · editable placeholder
        </p>
      )}
    </>
  )
}

export function Resources() {
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()
  const disableFx = reduced || isMobile

  return (
    <section
      id="resources"
      className="bg-ivory px-5 py-24 text-obsidian md:px-8 md:py-32"
      aria-labelledby="resources-heading"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="RESOURCES"
          title="Resources for your evolution."
          subtitle="Materiais e ideias para praticar entre as aulas. Links reais serão adicionados quando os conteúdos estiverem prontos."
          light
        />
        <h2 id="resources-heading" className="sr-only">
          Resources
        </h2>

        <div className="mt-12">
          <Suspense
            fallback={
              <div className="grid gap-4 sm:grid-cols-2">
                {resources.map((resource) => {
                  const Icon = icons[resource.type]
                  return (
                    <div
                      key={resource.id}
                      className="border border-obsidian/15 bg-warm-white p-6"
                    >
                      <Icon className="h-5 w-5 text-magenta" aria-hidden />
                      <h3 className="mt-4 font-display text-xl font-bold">{resource.title}</h3>
                      <p className="mt-2 text-sm text-obsidian/65">{resource.description}</p>
                    </div>
                  )
                })}
              </div>
            }
          >
            <MagicBento
              embedded
              gridVariant="quad"
              items={bentoItems}
              enableStars={!disableFx}
              enableSpotlight={!disableFx}
              enableBorderGlow={!disableFx}
              enableTilt={false}
              enableMagnetism={false}
              clickEffect={!disableFx}
              disableAnimations={disableFx}
              spotlightRadius={360}
              glowColor="255, 0, 122"
              getCardClassName={(index) => {
                const resource = resources[index]!
                const base =
                  'border-obsidian/15 bg-warm-white p-6 transition hover:border-lime/60'
                return resource.href ? `${base} block` : base
              }}
              renderCardContent={(_, index) => {
                const resource = resources[index]!
                const inner = <ResourceCardInner index={index} />
                if (resource.href) {
                  return (
                    <a
                      href={resource.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full"
                    >
                      {inner}
                    </a>
                  )
                }
                return inner
              }}
            />
          </Suspense>
        </div>

        <div className="mt-12 text-center">
          <WhatsAppButton label="GET FREE TIPS →" />
        </div>
      </div>
    </section>
  )
}
