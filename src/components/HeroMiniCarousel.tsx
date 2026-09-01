import { lazy, Suspense } from 'react'
import { heroCarouselItems } from '@/data/heroLoops'
import { colors } from '@/config/colors'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/useIsMobile'

const TextLoop = lazy(() =>
  import('@/components/bits/TextLoop').then((m) => ({ default: m.TextLoop })),
)

const loopText = heroCarouselItems.join(' · ')

const bandMask =
  'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'

export function HeroMiniCarousel() {
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()

  if (reduced) {
    return (
      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-[5] -mb-16 px-5 md:bottom-12 md:-mb-24">
        <p className="text-center font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-ivory/55 md:text-xs">
          {heroCarouselItems.slice(0, 4).join(' · ')}
        </p>
      </div>
    )
  }

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-52 -mb-16 w-full md:h-72 md:-mb-24 lg:h-[22rem]"
      style={{
        maskImage: bandMask,
        WebkitMaskImage: bandMask,
      }}
    >
      <Suspense fallback={null}>
        <TextLoop
          text={loopText}
          shape="wave"
          fit="cover"
          speed={isMobile ? 48 : 58}
          separator=" · "
          curviness={isMobile ? 70 : 95}
          fontSize={isMobile ? 18 : 28}
          fontWeight={600}
          letterSpacing={3}
          uppercase
          color={colors.ivory}
          ribbon
          ribbonColor={colors.orange}
          ribbonWidth={isMobile ? 36 : 52}
          pauseOnHover={false}
          className="h-full w-full opacity-85"
        />
      </Suspense>
    </div>
  )
}
