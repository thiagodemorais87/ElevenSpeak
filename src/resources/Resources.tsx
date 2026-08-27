import { BookOpen, Lightbulb, Video, Wrench } from 'lucide-react'
import { resources } from '@/data/resources'
import { SectionHeading } from '@/components/SectionHeading'
import { WhatsAppButton } from '@/components/WhatsAppButton'

const icons = {
  guide: BookOpen,
  tips: Lightbulb,
  video: Video,
  tool: Wrench,
} as const

export function Resources() {
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

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {resources.map((resource) => {
            const Icon = icons[resource.type]
            const className =
              'border border-obsidian/15 bg-warm-white p-6 transition hover:border-obsidian/35'
            const inner = (
              <>
                <Icon className="h-5 w-5 text-magenta" aria-hidden />
                <h3 className="mt-4 font-display text-xl font-bold">{resource.title}</h3>
                <p className="mt-2 text-sm text-obsidian/65">{resource.description}</p>
                {!resource.href && (
                  <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-obsidian/35">
                    Coming soon · editable placeholder
                  </p>
                )}
              </>
            )

            return resource.href ? (
              <a
                key={resource.id}
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`block ${className}`}
              >
                {inner}
              </a>
            ) : (
              <div key={resource.id} className={className}>
                {inner}
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <WhatsAppButton label="GET FREE TIPS →" />
        </div>
      </div>
    </section>
  )
}
