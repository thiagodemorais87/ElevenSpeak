import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { gsap } from '@/lib/gsap'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { BrandPortrait } from '@/components/BrandPortrait'
import { HandwrittenStroke } from '@/components/HandwrittenStroke'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { easings } from '@/lib/animations'

export function Hero() {
  const reduced = useReducedMotion()
  const [introDone, setIntroDone] = useState(reduced)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduced) return
    const t = window.setTimeout(() => setIntroDone(true), 2000)
    return () => window.clearTimeout(t)
  }, [reduced])

  useEffect(() => {
    if (reduced || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.to('.hero-headline', {
        yPercent: -28,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      // Handoff bridge into Manifesto
      gsap.to('.hero-handoff', {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '60% top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  const words = ['Speak', 'beyond', 'words.']

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden bg-obsidian text-ivory"
    >
      {!reduced && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center bg-obsidian"
          initial={{ opacity: 1 }}
          animate={{ opacity: introDone ? 0 : 1 }}
          transition={{ duration: 0.45 }}
          style={{ pointerEvents: introDone ? 'none' : 'auto' }}
        >
          <div className="text-center">
            <motion.p
              className="font-display text-3xl font-bold tracking-tight md:text-5xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easings.cinematic }}
            >
              SEVEN SPEAK
              <span className="text-lime">.</span>
            </motion.p>
            <motion.p
              className="mt-3 text-[11px] tracking-[0.35em] text-ivory/45"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              01 — 07
            </motion.p>
          </div>
        </motion.div>
      )}

      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 items-center gap-10 px-5 pb-36 pt-28 md:grid-cols-12 md:gap-8 md:px-8 md:pb-32 lg:pt-24">
        <div className="hero-headline relative z-10 md:col-span-5 lg:col-span-5">
          <h1 className="font-display text-[13vw] font-bold leading-[0.85] tracking-tight sm:text-7xl md:text-8xl lg:text-[6.25rem]">
            <span className="block">SEVEN</span>
            <span className="block">
              SPEAK
              <span className="text-lime">.</span>
            </span>
          </h1>

          <div className="mt-8 flex flex-wrap gap-x-3 gap-y-1 font-display text-2xl font-medium md:text-3xl lg:text-4xl">
            {words.map((word, i) => (
              <motion.span
                key={word}
                className="inline-block overflow-hidden"
                initial={{ y: reduced ? 0 : 44, opacity: reduced ? 1 : 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: reduced ? 0 : 1.05 + i * 0.16,
                  duration: 0.55,
                  ease: easings.cinematic,
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          <motion.div
            className="mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduced ? 0 : 1.55 }}
          >
            <HandwrittenStroke text="Find your voice." className="text-magenta" />
          </motion.div>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduced ? 0 : 1.7, duration: 0.5, ease: easings.smooth }}
          >
            <WhatsAppButton label="LET'S TALK →" />
          </motion.div>

          <motion.p
            className="mt-12 text-[10px] tracking-[0.35em] text-ivory/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduced ? 0 : 2 }}
            aria-hidden
          >
            01 / 07
          </motion.p>
        </div>

        <div className="relative z-10 md:col-span-7 lg:col-span-7">
          <BrandPortrait
            variant="hero"
            className="mx-auto max-w-md md:max-w-none md:-mr-4 lg:-mr-8"
            showOrbit
            mouseParallax
            priority
          />
          <div
            className="hero-handoff pointer-events-none absolute -bottom-24 left-1/2 hidden h-24 w-[1px] -translate-x-1/2 bg-gradient-to-b from-lime/50 to-transparent opacity-0 md:block"
            aria-hidden
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 grid grid-cols-2 border-t border-ivory/10 bg-obsidian/95 backdrop-blur-sm md:grid-cols-4">
        {[
          { t: 'SPEAK EVERY DAY', d: 'Practice that builds confidence.' },
          { t: 'REAL ENGLISH', d: 'Language you actually use.' },
          { t: 'FLUENCY IN ACTION', d: 'Small steps, big transformation.' },
          { t: 'YOUR VOICE', d: 'English that moves with you.' },
        ].map((item) => (
          <div
            key={item.t}
            className="border-r border-ivory/10 px-4 py-4 last:border-r-0 md:px-5 md:py-5"
          >
            <p className="font-display text-[10px] font-semibold tracking-[0.15em] text-lime md:text-[11px]">
              {item.t}
            </p>
            <p className="mt-1 text-[11px] text-ivory/55">{item.d}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
