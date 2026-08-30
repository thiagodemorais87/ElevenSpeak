import { Reveal } from './Reveal'

export type SectionTheme = 'dark' | 'light'

interface SectionHeadingProps {
  index?: string
  eyebrow?: string
  title: string
  subtitle?: string
  light?: boolean
  theme?: SectionTheme
  className?: string
}

const themeStyles: Record<
  SectionTheme,
  { meta: string; index: string; title: string; subtitle: string }
> = {
  dark: {
    meta: 'text-ivory/50',
    index: 'text-orange',
    title: 'text-ivory',
    subtitle: 'text-ivory/70',
  },
  light: {
    meta: 'text-obsidian/50',
    index: 'text-blue',
    title: 'text-obsidian',
    subtitle: 'text-obsidian/70',
  },
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  subtitle,
  light = false,
  theme,
  className = '',
}: SectionHeadingProps) {
  const resolvedTheme = theme ?? (light ? 'light' : 'dark')
  const styles = themeStyles[resolvedTheme]

  return (
    <Reveal className={className}>
      <div className="flex flex-col gap-3">
        {(index || eyebrow) && (
          <div
            className={`flex items-center gap-3 text-xs tracking-[0.22em] uppercase ${styles.meta}`}
          >
            {index && <span className={styles.index}>{index}</span>}
            {eyebrow && <span>{eyebrow}</span>}
          </div>
        )}
        <h2
          className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight ${styles.title}`}
        >
          {title}
        </h2>
        {subtitle && (
          <p className={`max-w-xl text-base md:text-lg ${styles.subtitle}`}>{subtitle}</p>
        )}
      </div>
    </Reveal>
  )
}
