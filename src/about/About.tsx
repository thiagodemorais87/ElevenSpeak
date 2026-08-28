import { WhatsAppButton } from '@/components/WhatsAppButton'
import { CountUp } from '@/components/CountUp'
import { HandwrittenStroke } from '@/components/HandwrittenStroke'
import { AboutNycSlideshow } from '@/components/AboutNycSlideshow'
import { aboutContent } from '@/data/about'
import { useSectionPortal } from '@/hooks/useSectionPortal'

const accentClass = {
  lime: 'text-obsidian',
  magenta: 'text-magenta',
} as const

function isNumericStat(value: string) {
  return /^\d+/.test(value)
}

export function About() {
  const portalRef = useSectionPortal()

  return (
    <section
      id="about"
      ref={portalRef}
      className="relative overflow-hidden bg-obsidian text-ivory"
      aria-labelledby="about-heading"
    >
      <div
        className="pointer-events-none absolute -top-16 left-[55%] z-20 hidden h-32 w-px bg-gradient-to-b from-lime/40 to-transparent lg:block"
        aria-hidden
      />

      <div className="grid lg:grid-cols-12 lg:items-stretch">
        <div className="relative z-10 flex flex-col justify-center px-5 py-24 md:px-8 lg:col-span-5 lg:py-32">
          <p className="text-[11px] tracking-[0.3em] text-lime">03 / 07 · ABOUT</p>
          <h2
            id="about-heading"
            className="mt-4 font-display text-5xl font-bold leading-none tracking-tight md:text-7xl"
          >
            ABOUT
            <span className="text-magenta">.</span>
          </h2>
          <p className="mt-3 font-script text-3xl text-magenta">{aboutContent.scriptName}</p>

          <div className="mt-8 space-y-5 text-sm leading-relaxed text-ivory/75 md:text-base">
            {aboutContent.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="font-script text-2xl text-ivory">{aboutContent.closingScript}</p>
            <div className="pt-2">
              <HandwrittenStroke text="Don't just learn English." className="text-magenta" />
            </div>
          </div>

          <div className="mt-10 space-y-4">
            {aboutContent.highlights.map((item) => (
              <div key={item.title} className="flex gap-3 border-l border-lime/40 pl-4">
                <div>
                  <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-lime">
                    {item.title}
                  </p>
                  <p className="text-sm text-ivory/55">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <WhatsAppButton />
          </div>
        </div>

        <div className="relative flex min-h-[50vh] overflow-hidden bg-obsidian lg:col-span-7 lg:min-h-full">
          <AboutNycSlideshow />
          <div className="pointer-events-none absolute bottom-6 right-6 z-20 max-w-[150px] rotate-2 bg-lime p-4 text-obsidian shadow-lg md:bottom-10 md:right-10">
            <p className="font-script text-lg leading-tight">
              {aboutContent.stickyNote}
              <span className="mt-1 block text-base" aria-hidden>
                ♥
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 border-t border-obsidian/10 bg-ivory text-obsidian md:grid-cols-4">
        {aboutContent.stats.map((stat) => (
          <div
            key={`${stat.label}-${stat.value}`}
            className="border-r border-obsidian/10 px-5 py-6 last:border-r-0"
          >
            <p
              className={`font-display text-2xl font-bold md:text-3xl ${accentClass[stat.accent]}`}
            >
              {isNumericStat(stat.value) ? (
                <CountUp value={stat.value} />
              ) : (
                stat.value
              )}
            </p>
            <p className="mt-1 text-[10px] tracking-[0.2em] text-obsidian/50">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
