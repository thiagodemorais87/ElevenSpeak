import { useEffect, useRef } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react'
import { gsap } from '@/lib/gsap'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { VoiceWave } from '@/components/VoiceWave'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsDesktop } from '@/hooks/useIsDesktop'
import { Magnet } from '@/components/bits/Magnet'

export function FinalCTA() {
  const reduced = useReducedMotion()
  const isDesktop = useIsDesktop()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { amount: 0.25, once: false })
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 80, damping: 20 })
  const sy = useSpring(my, { stiffness: 80, damping: 20 })
  const blobX = useTransform(sx, (v) => v * 80)
  const blobY = useTransform(sy, (v) => v * 80)

  useEffect(() => {
    if (reduced || !ref.current) return
    const el = ref.current
    const from = isDesktop
      ? { opacity: 0.4, clipPath: 'polygon(0 12%, 100% 0, 100% 100%, 0 100%)' }
      : { opacity: 0.5, y: 20 }
    const to = isDesktop
      ? { opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }
      : { opacity: 1, y: 0 }

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
      gsap.set(el, { clearProps: 'opacity,transform,clipPath' })
    }
  }, [reduced, isDesktop])

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden bg-obsidian px-5 py-24 text-ivory md:px-8 md:py-32"
      aria-labelledby="cta-heading"
      onMouseMove={(e) => {
        if (reduced || !ref.current || !inView) return
        const rect = ref.current.getBoundingClientRect()
        mx.set((e.clientX - rect.left) / rect.width - 0.5)
        my.set((e.clientY - rect.top) / rect.height - 0.5)
      }}
    >
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/10 blur-3xl"
        style={{
          x: reduced || !inView ? 0 : blobX,
          y: reduced || !inView ? 0 : blobY,
          scale: 8,
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="text-[11px] tracking-[0.3em] text-lime">07 / 07</p>
        <h2
          id="cta-heading"
          className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl"
        >
          Your voice is waiting.
        </h2>
        <p className="mt-4 font-display text-3xl font-medium text-ivory/80 md:text-5xl">
          Start speaking.
        </p>

        <div className="mt-8 flex justify-center">
          <VoiceWave />
        </div>

        <div className="mt-12">
          <Magnet>
            <motion.div
              className="inline-block"
              whileHover={reduced ? undefined : { scale: 1.06 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <WhatsAppButton
                label="Talk to Seven Speak →"
                className="px-8 py-4 text-base"
              />
            </motion.div>
          </Magnet>
        </div>

        <div className="mt-16 flex items-center justify-center gap-3" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-lime"
              animate={
                reduced || !inView
                  ? { y: 0, opacity: 0.6 }
                  : { y: [0, -8, 0], opacity: [0.4, 1, 0.4] }
              }
              transition={
                reduced || !inView
                  ? { duration: 0 }
                  : {
                      duration: 2.4,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: 'easeInOut',
                    }
              }
            />
          ))}
          <span className="ml-4 font-display text-4xl font-bold text-ivory/15">7</span>
        </div>
      </div>
    </section>
  )
}
