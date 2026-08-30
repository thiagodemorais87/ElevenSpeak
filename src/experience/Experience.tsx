import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsDesktop } from '@/hooks/useIsDesktop'

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const isDesktop = useIsDesktop()

  useEffect(() => {
    if (reduced || !sectionRef.current) return

    const useBlur = isDesktop

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 45%',
          scrub: true,
        },
      })

      tl.fromTo(
        '.exp-before',
        {
          opacity: 1,
          scale: 1,
          y: 0,
          ...(useBlur ? { filter: 'blur(0px)' } : {}),
        },
        {
          opacity: 0.12,
          scale: 0.97,
          y: -16,
          ...(useBlur ? { filter: 'blur(5px)' } : {}),
        },
      ).fromTo(
        '.exp-after',
        {
          opacity: 0,
          scale: 1.03,
          y: 24,
          ...(useBlur ? { filter: 'blur(6px)' } : {}),
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          ...(useBlur ? { filter: 'blur(0px)' } : {}),
        },
        0.15,
      )

      gsap.fromTo(
        '.exp-handoff',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'center center',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced, isDesktop])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-obsidian px-5 py-24 text-ivory md:px-8 md:py-32"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-[11px] tracking-[0.3em] text-orange">06 / 07</p>
        <h2
          id="experience-heading"
          className="mt-4 font-display text-3xl font-bold tracking-tight md:text-5xl"
        >
          O que acontece quando você começa a falar?
        </h2>

        <div className="relative mt-16 min-h-[180px] md:min-h-[220px]">
          <p
            className={`exp-before absolute inset-x-0 font-display text-2xl font-medium leading-snug text-ivory/80 md:text-4xl lg:text-5xl ${
              reduced ? 'relative mb-8 opacity-40' : ''
            }`}
          >
            “Eu sei o que quero dizer…”
          </p>
          <p
            className={`exp-after absolute inset-x-0 font-display text-2xl font-bold leading-snug text-orange md:text-4xl lg:text-5xl ${
              reduced ? 'relative opacity-100' : ''
            }`}
          >
            “Eu consigo dizer de verdade.”
          </p>
        </div>

        <p className="mx-auto mt-20 max-w-lg text-sm text-ivory/55 md:text-base">
          Da hesitação à expressão. Do saber ao falar. Essa é a transformação
          para a qual a Seven Speak foi feita.
        </p>
      </div>

      <div
        className="exp-handoff mx-auto mt-16 h-[2px] w-full max-w-xs origin-left bg-orange"
        aria-hidden
      />
    </section>
  )
}
