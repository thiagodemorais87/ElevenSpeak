import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { sevenSteps } from '@/data/sevenSteps'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsDesktop } from '@/hooks/useIsDesktop'
import { easings } from '@/lib/animations'

export function TheSeven() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef(0)
  const [active, setActive] = useState(0)
  const reduced = useReducedMotion()
  const isDesktop = useIsDesktop()
  const usePin = !reduced && isDesktop

  useEffect(() => {
    if (!usePin || !sectionRef.current || !pinRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: isDesktop ? '+=250%' : '+=180%',
        pin: pinRef.current,
        scrub: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${Math.min(100, self.progress * 100)}%`
          }
          const idx = Math.min(
            sevenSteps.length - 1,
            Math.floor(self.progress * sevenSteps.length),
          )
          if (idx !== activeRef.current) {
            activeRef.current = idx
            setActive(idx)
          }
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [usePin, isDesktop])

  const handleStepClick = (index: number) => {
    activeRef.current = index
    setActive(index)
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${((index + 1) / sevenSteps.length) * 100}%`
    }
  }

  const step = sevenSteps[active] ?? sevenSteps[0]
  const stepLabel = String(active + 1).padStart(2, '0')
  const lineWidth = `${((active + 1) / sevenSteps.length) * 100}%`

  const bgAccent = active % 2 === 0 ? 'bg-orange/[0.04]' : 'bg-blue/[0.05]'

  return (
    <section
      id="method"
      ref={sectionRef}
      className="relative overflow-hidden bg-obsidian text-ivory"
      aria-labelledby="seven-heading"
    >
      <div
        className={`pointer-events-none absolute inset-0 transition-colors duration-500 ${bgAccent}`}
        aria-hidden
      />

      <div
        ref={pinRef}
        className="relative flex min-h-[100svh] flex-col justify-center px-5 py-24 md:px-8"
      >
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[11px] tracking-[0.3em] text-orange">04 / 07</p>
              <h2
                id="seven-heading"
                className="mt-3 font-display text-5xl font-bold tracking-tight md:text-7xl"
              >
                THE SEVEN
              </h2>
              <p className="mt-3 max-w-md text-ivory/75">
                Sete passos. Um objetivo: a sua voz.
              </p>
            </div>

            {/* Always-legible number: crossfade only, no morph */}
            <div className="relative h-[4.5rem] min-w-[8rem] md:h-28 md:min-w-[11rem]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={stepLabel}
                  className="absolute inset-0 flex items-baseline font-display text-6xl font-bold tabular-nums text-orange md:text-8xl"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.28, ease: easings.smooth }}
                >
                  {stepLabel}
                  <span className="text-ivory/30"> / 07</span>
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-10 h-[2px] w-full bg-ivory/10">
            <div
              ref={progressBarRef}
              className="h-full bg-orange transition-[width] duration-150 ease-out"
              style={usePin ? { width: '0%' } : { width: lineWidth }}
            />
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20, clipPath: 'inset(0 0 40% 0)' }}
                  animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: easings.cinematic }}
                >
                  <p className="font-script text-2xl text-blue">
                    {step.label} — Jornada
                  </p>
                  <h3 className="mt-2 font-display text-4xl font-bold md:text-6xl">
                    {step.title}
                  </h3>
                  <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/70 md:text-lg">
                    {step.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="md:col-span-5">
              <ul className="space-y-2" aria-label="Sete passos">
                {sevenSteps.map((s, i) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => handleStepClick(i)}
                      className={`flex w-full items-center gap-4 border-l-2 px-4 py-2 text-left transition ${
                        i === active
                          ? 'border-orange text-ivory'
                          : 'border-transparent text-ivory/35 hover:text-ivory/60'
                      }`}
                    >
                      <span className="font-display text-xs tracking-widest">
                        {s.label}
                      </span>
                      <span className="font-display text-sm font-semibold">{s.title}</span>
                      {i === active && (
                        <span
                          className="seven-active-dot ml-auto h-1.5 w-1.5 rounded-full bg-orange"
                          aria-hidden
                        />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {reduced && (
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sevenSteps.map((s) => (
                <article key={s.id} className="border border-ivory/15 p-5">
                  <p className="text-xs text-orange">{s.label}</p>
                  <h3 className="mt-1 font-display text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-ivory/60">{s.description}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
