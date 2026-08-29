import { lazy, Suspense } from 'react'
import { programs } from '@/data/programs'
import type { Program } from '@/data/programs'
import { SectionHeading } from '@/components/SectionHeading'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/useIsMobile'
import type { BentoCardProps } from '@/components/bits/MagicBento'

const MagicBento = lazy(() =>
  import('@/components/bits/MagicBento').then((m) => ({ default: m.MagicBento })),
)

const accentMap = {
  orange: 'bg-orange text-obsidian',
  blue: 'bg-blue text-yellow',
  ivory: 'bg-ivory text-obsidian',
} as const

const bentoItems: BentoCardProps[] = programs.map((program) => ({
  label: program.id,
  title: program.name,
}))

function ProgramCardContent({ program, index }: { program: Program; index: number }) {
  return (
    <>
      <div className="md:col-span-4">
        <span
          className={`inline-block rounded-full px-3 py-1 text-[10px] font-semibold tracking-wider ${accentMap[program.accent]}`}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="mt-4 font-display text-2xl font-bold md:text-3xl">{program.name}</h3>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] opacity-50">{program.format}</p>
      </div>
      <div className="space-y-4 text-sm leading-relaxed md:col-span-5 md:text-base">
        <p>
          <strong className="font-semibold">For:</strong> {program.forWhom}
        </p>
        <p>
          <strong className="font-semibold">Goal:</strong> {program.objective}
        </p>
        <ul className="space-y-1 opacity-80">
          {program.benefits.map((b) => (
            <li key={b}>— {b}</li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col items-start justify-between gap-6 md:col-span-3 md:items-end">
        <div className="h-[2px] w-10 bg-orange transition-all duration-300 group-hover:w-20" />
        <WhatsAppButton
          planName={program.name}
          label="LET'S TALK →"
          variant={index % 2 === 1 ? 'orange' : 'dark'}
        />
      </div>
    </>
  )
}

export function Programs() {
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()
  const disableFx = reduced || isMobile

  return (
    <section
      id="programs"
      className="relative bg-blue px-5 py-24 text-ivory md:px-8 md:py-32"
      aria-labelledby="programs-heading"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-12 w-px -translate-x-1/2 bg-gradient-to-b from-orange to-transparent"
        aria-hidden
      />
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="PROGRAMS"
          title="Programs that fit your journey."
          subtitle="Solutions with personality — not one-size-fits-all packages."
          theme="blue"
        />
        <h2 id="programs-heading" className="sr-only">
          Programs
        </h2>

        <div className="mt-14">
          <Suspense
            fallback={
              <div className="space-y-5">
                {programs.map((program, i) => (
                  <article
                    key={program.id}
                    className={`grid gap-6 border border-obsidian/20 p-6 md:grid-cols-12 md:p-8 ${
                      i % 2 === 1 ? 'bg-obsidian text-ivory' : 'bg-ivory text-obsidian'
                    }`}
                  >
                    <ProgramCardContent program={program} index={i} />
                  </article>
                ))}
              </div>
            }
          >
            <MagicBento
              embedded
              gridVariant="stack"
              items={bentoItems}
              enableStars={!disableFx}
              enableSpotlight={!disableFx}
              enableBorderGlow={!disableFx}
              enableTilt={false}
              enableMagnetism={false}
              clickEffect={!disableFx}
              disableAnimations={disableFx}
              spotlightRadius={360}
              glowColor="255, 107, 0"
              getCardClassName={(index) =>
                `grid gap-6 border-obsidian/20 p-6 transition duration-300 ease-out md:grid-cols-12 md:p-8 ${
                  !disableFx ? 'hover:-translate-y-1 hover:scale-[1.01]' : ''
                } ${index % 2 === 1 ? 'bg-obsidian text-ivory' : 'bg-ivory text-obsidian'}`
              }
              renderCardContent={(_, index) => (
                <ProgramCardContent program={programs[index]!} index={index} />
              )}
            />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
