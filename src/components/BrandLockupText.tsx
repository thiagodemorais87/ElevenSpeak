import { GlitchText } from '@/components/bits/GlitchText'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export const brandLockupHeadlineClass =
  'font-display text-[11vw] font-bold leading-none tracking-tight sm:text-6xl md:text-7xl lg:text-[6.25rem]'

export const brandLockupIntroClass =
  'font-display text-[9vw] font-bold leading-none tracking-tight sm:text-5xl md:text-6xl lg:text-7xl'

interface BrandLockupTextProps {
  variant?: 'static' | 'glitch' | 'outline'
  layout?: 'inline' | 'stack'
  className?: string
  glitchSpeed?: number
}

function StaticLockupInline() {
  return (
    <span className="whitespace-nowrap text-ivory">
      SEVEN SPEAK<span className="text-lime">.</span>
    </span>
  )
}

function OutlineLockupInline() {
  return (
    <span className="brand-lockup-outline relative z-10 inline-block whitespace-nowrap font-display text-[11vw] font-bold leading-none tracking-tight sm:text-6xl md:text-7xl lg:text-[6.25rem]">
      SEVEN SPEAK<span className="brand-lockup-dot">.</span>
    </span>
  )
}

function GlitchLockupInline({ glitchSpeed }: { glitchSpeed: number }) {
  return (
    <span className="inline-flex flex-wrap items-baseline justify-center gap-x-[0.22em] text-ivory sm:flex-nowrap">
      <GlitchText speed={glitchSpeed} className="text-ivory">
        SEVEN
      </GlitchText>
      <GlitchText
        speed={glitchSpeed}
        className="text-ivory"
        dot={<span className="text-lime">.</span>}
      >
        SPEAK
      </GlitchText>
    </span>
  )
}

function LockupInline({
  variant,
  glitchSpeed,
}: {
  variant: 'static' | 'glitch' | 'outline'
  glitchSpeed: number
}) {
  if (variant === 'outline') return <OutlineLockupInline />
  if (variant === 'glitch') return <GlitchLockupInline glitchSpeed={glitchSpeed} />

  return <StaticLockupInline />
}

function LockupStack({
  variant,
  glitchSpeed,
}: {
  variant: 'static' | 'glitch' | 'outline'
  glitchSpeed: number
}) {
  if (variant === 'glitch') {
    return (
      <>
        <span className="block">
          <GlitchText speed={glitchSpeed} className="text-ivory">
            SEVEN
          </GlitchText>
        </span>
        <span className="block">
          <GlitchText
            speed={glitchSpeed}
            className="text-ivory"
            dot={<span className="text-lime">.</span>}
          >
            SPEAK
          </GlitchText>
        </span>
      </>
    )
  }

  if (variant === 'outline') {
    return (
      <span className="brand-lockup-outline relative z-10 block font-display text-[11vw] font-bold leading-none tracking-tight sm:text-6xl md:text-7xl lg:text-[6.25rem]">
        <span className="block">SEVEN</span>
        <span className="block">
          SPEAK<span className="brand-lockup-dot">.</span>
        </span>
      </span>
    )
  }

  return (
    <>
      <span className="block text-ivory">SEVEN</span>
      <span className="block text-ivory">
        SPEAK
        <span className="text-lime">.</span>
      </span>
    </>
  )
}

export function BrandLockupText({
  variant = 'static',
  layout = 'inline',
  className = '',
  glitchSpeed = 0.6,
}: BrandLockupTextProps) {
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()
  const effectiveVariant =
    variant === 'outline' && (reduced || isMobile) ? 'static' : variant
  const headlineClass = (className || brandLockupHeadlineClass).trim()

  return (
    <h1 className={headlineClass}>
      <span className="sr-only">SEVEN SPEAK.</span>
      {layout === 'inline' ? (
        <LockupInline variant={effectiveVariant} glitchSpeed={glitchSpeed} />
      ) : (
        <LockupStack variant={effectiveVariant} glitchSpeed={glitchSpeed} />
      )}
    </h1>
  )
}
