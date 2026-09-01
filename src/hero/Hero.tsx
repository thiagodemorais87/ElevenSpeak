import { useEffect, useRef, lazy, Suspense } from 'react'
import { motion } from 'motion/react'
import { gsap } from '@/lib/gsap'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { HandwrittenStroke } from '@/components/HandwrittenStroke'
import { HeroMiniCarousel } from '@/components/HeroMiniCarousel'
import { HeroBrandLockup } from '@/components/HeroBrandLockup'
import { heroPlasmaProps } from '@/data/heroPlasma'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/useIsMobile'
import { easings } from '@/lib/animations'

const PlasmaWave = lazy(() =>
  import('@/components/bits/PlasmaWave').then((m) => ({ default: m.PlasmaWave })),
)

function fadeIn(reduced: boolean, delay: number) {
  if (reduced) return {}
  return {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.5, ease: easings.smooth },
  }
}

export function Hero() {
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()
  const showPlasma = !reduced && !isMobile
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduced || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.to('.hero-handoff', {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '65% top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col overflow-x-hidden bg-obsidian text-ivory"
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="editorial-grid absolute inset-0 opacity-[0.08]" />
        {showPlasma ? (
          <div className="absolute inset-0 opacity-[0.4]">
            <Suspense fallback={null}>
              <PlasmaWave {...heroPlasmaProps} className="h-full w-full" />
            </Suspense>
          </div>
        ) : (
          <>
            <div className="absolute -right-24 top-0 h-[55vh] w-[55vh] rounded-full bg-orange/15 blur-3xl" />
            <div className="absolute -left-20 bottom-24 h-72 w-72 rounded-full bg-blue/10 blur-3xl" />
          </>
        )}
      </div>

      <div className="relative mx-auto flex flex-1 flex-col justify-center px-5 pb-28 pt-28 md:px-8 md:pb-36 lg:max-w-7xl lg:pt-24">
        <div className="relative z-10 w-full max-w-4xl">
          <HeroBrandLockup />

          <motion.div className="mt-8" {...fadeIn(reduced, 0.35)}>
            <HandwrittenStroke text="Find your voice." className="text-orange" />
          </motion.div>

          <motion.div className="mt-8" {...fadeIn(reduced, 0.45)}>
            <WhatsAppButton label="LET'S TALK →" />
          </motion.div>

          <div
            className="hero-handoff pointer-events-none absolute -bottom-16 left-0 hidden h-16 w-px bg-gradient-to-b from-orange/40 to-transparent opacity-0 md:block"
            aria-hidden
          />
        </div>
      </div>

      <HeroMiniCarousel />
    </section>
  )
}
