import { Reveal } from './Reveal'

interface SectionHeadingProps {
  index?: string
  eyebrow?: string
  title: string
  subtitle?: string
  light?: boolean
  className?: string
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  subtitle,
  light = false,
  className = '',
}: SectionHeadingProps) {
  return (
    <Reveal className={className}>
      <div className="flex flex-col gap-3">
        {(index || eyebrow) && (
          <div
            className={`flex items-center gap-3 text-xs tracking-[0.22em] uppercase ${
              light ? 'text-obsidian/50' : 'text-ivory/50'
            }`}
          >
            {index && (
              <span className={light ? 'text-blue' : 'text-orange'}>{index}</span>
            )}
            {eyebrow && <span>{eyebrow}</span>}
          </div>
        )}
        <h2
          className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight ${
            light ? 'text-obsidian' : 'text-ivory'
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={`max-w-xl text-base md:text-lg ${
              light ? 'text-obsidian/70' : 'text-ivory/70'
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </Reveal>
  )
}
