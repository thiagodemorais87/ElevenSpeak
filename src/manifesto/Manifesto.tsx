import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { colors } from '@/config/colors'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsDesktop } from '@/hooks/useIsDesktop'
import { HandwrittenStroke } from '@/components/HandwrittenStroke'
import { BlurText } from '@/components/bits/BlurText'

export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const isDesktop = useIsDesktop()

  useEffect(() => {
    if (reduced || !sectionRef.current) return

    const ctx = gsap.context(() => {
      // Desktop only: section rise handoff (skip on mobile to reduce scrub load)
      if (isDesktop) {
        gsap.fromTo(
          sectionRef.current,
          { y: 40 },
          {
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 95%',
              end: 'top 55%',
              scrub: true,
            },
          },
        )
      }

      const words = gsap.utils.toArray<HTMLElement>('.manifesto-word')
      if (!words.length) return

      const useBlur = isDesktop
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'bottom 45%',
          scrub: true,
        },
      })

      words.forEach((word, i) => {
        tl.fromTo(
          word,
          {
            scale: 0.94,
            opacity: 0.3,
            ...(useBlur ? { filter: 'blur(3px)' } : {}),
          },
          {
            scale: 1.06,
            opacity: 1,
            ...(useBlur ? { filter: 'blur(0px)' } : {}),
            color: word.dataset.accent === 'orange' ? colors.orange : colors.obsidian,
            duration: 1,
          },
          i * 0.15,
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced, isDesktop])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ivory px-5 py-24 text-obsidian md:px-8 md:py-32"
      aria-labelledby="manifesto-heading"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-16 w-px -translate-x-1/2 bg-gradient-to-b from-orange/50 to-transparent"
        aria-hidden
      />
      <div className="editorial-grid-dark pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-5xl">
        <p className="mb-10 text-[11px] tracking-[0.3em] text-obsidian/40">02 / 07</p>
        <h2 id="manifesto-heading" className="sr-only">
          Manifesto
        </h2>
        <p className="font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          English isn&apos;t just something you{' '}
          <span className="manifesto-word inline-block" data-accent="orange">
            learn
          </span>
          .
        </p>
        <p className="mt-8 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          It&apos;s something you{' '}
          <span className="manifesto-word inline-block" data-accent="orange">
            live
          </span>
          .
        </p>
        <p className="mt-14 max-w-2xl font-display text-xl leading-relaxed text-obsidian/70 md:text-2xl">
          Find your{' '}
          <span className="manifesto-word inline-block font-semibold" data-accent="orange">
            voice
          </span>
          . Build{' '}
          <span className="manifesto-word inline-block font-semibold" data-accent="orange">
            confidence
          </span>
          . Speak beyond words.
        </p>
        <div className="mt-12 font-script text-3xl text-blue md:text-4xl">
          <BlurText text="Listen more. Speak more. Believe in your process." delay={50} />
        </div>
        <div className="mt-8">
          <HandwrittenStroke text="Your voice, your rules." className="text-obsidian/80" />
        </div>
      </div>
    </section>
  )
}
