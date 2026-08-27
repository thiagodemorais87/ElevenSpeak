import { programs } from '@/data/programs'
import { SectionHeading } from '@/components/SectionHeading'
import { WhatsAppButton } from '@/components/WhatsAppButton'

const accentMap = {
  lime: 'bg-lime text-obsidian',
  magenta: 'bg-magenta text-ivory',
  ivory: 'bg-ivory text-obsidian',
} as const

export function Programs() {
  return (
    <section
      id="programs"
      className="relative bg-magenta px-5 py-24 text-ivory md:px-8 md:py-32"
      aria-labelledby="programs-heading"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-12 w-px -translate-x-1/2 bg-gradient-to-b from-lime to-transparent"
        aria-hidden
      />
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="PROGRAMS"
          title="Programs that fit your journey."
          subtitle="Solutions with personality — not one-size-fits-all packages."
        />
        <h2 id="programs-heading" className="sr-only">
          Programs
        </h2>

        <div className="mt-14 space-y-5">
          {programs.map((program, i) => (
            <article
              key={program.id}
              className={`grid gap-6 border border-obsidian/20 p-6 md:grid-cols-12 md:p-8 ${
                i % 2 === 1 ? 'bg-obsidian text-ivory' : 'bg-ivory text-obsidian'
              }`}
            >
              <div className="md:col-span-4">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-[10px] font-semibold tracking-wider ${accentMap[program.accent]}`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold md:text-3xl">
                  {program.name}
                </h3>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] opacity-50">
                  {program.format}
                </p>
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
              <div className="flex items-end md:col-span-3 md:justify-end">
                <WhatsAppButton
                  planName={program.name}
                  label="LET'S TALK →"
                  variant={i % 2 === 1 ? 'lime' : 'dark'}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
