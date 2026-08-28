import { useEffect, useRef } from 'react'
import { useInView } from 'motion/react'
import { gsap } from '@/lib/gsap'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { VoiceWave } from '@/components/VoiceWave'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsDesktop } from '@/hooks/useIsDesktop'
import { usePreferences } from '@/context/PreferencesContext'
import { Magnet } from '@/components/bits/Magnet'
import { WordReveal } from '@/components/WordReveal'

const CTA_DOTS = [0, 1, 2, 3, 4] as const

export function FinalCTA() {
  const reduced = useReducedMotion()
  const isDesktop = useIsDesktop()
  const { finePointer } = usePreferences()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { amount: 0.2, once: true })
  const showMagnet = inView && !reduced && finePointer
  const animateDecor = inView && !reduced

  useEffect(() => {
    if (reduced || !ref.current) return
    const el = ref.current
    const from = isDesktop ? { opacity: 0.4, y: 24 } : { opacity: 0.5, y: 20 }
    const to = { opacity: 1, y: 0 }

    const tween = gsap.fromTo(el, from, {
      ...to,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top 92%',
        end: 'top 58%',
        scrub: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      gsap.set(el, { clearProps: 'opacity,transform' })
    }
  }, [reduced, isDesktop])

  const button = (
    <WhatsAppButton label="Talk to Seven Speak →" className="px-8 py-4 text-base" />
  )

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden bg-obsidian px-5 py-24 text-ivory md:px-8 md:py-32"
      aria-labelledby="cta-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(216,255,62,0.12),transparent_70%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="text-[11px] tracking-[0.3em] text-lime">07 / 07</p>
        <WordReveal
          as="h2"
          id="cta-heading"
          text="Your voice is waiting."
          className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl"
        />
        <WordReveal
          as="p"
          text="Start speaking."
          className="mt-4 font-display text-3xl font-medium text-ivory/80 md:text-5xl"
          stagger={0.12}
        />

        <div className="mt-8 flex justify-center">
          <VoiceWave active={animateDecor} />
        </div>

        <div className="mt-12">
          {showMagnet ? (
            <Magnet>
              <div className="inline-block transition-transform duration-200 hover:scale-[1.06]">
                {button}
              </div>
            </Magnet>
          ) : (
            <div className="inline-block">{button}</div>
          )}
        </div>

        <div
          className={`mt-16 flex items-center justify-center gap-3 ${animateDecor ? 'cta-dots-active' : ''}`}
          aria-hidden
        >
          {CTA_DOTS.map((i) => (
            <span
              key={i}
              className="cta-dot h-1.5 w-1.5 rounded-full bg-lime opacity-60"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
          <span className="ml-4 font-display text-4xl font-bold text-ivory/15">7</span>
        </div>
      </div>
    </section>
  )
}
