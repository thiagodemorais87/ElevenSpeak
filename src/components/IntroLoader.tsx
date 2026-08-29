import { useEffect, useState, lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BrandLockupText, brandLockupIntroClass } from '@/components/BrandLockupText'
import { aboutContent } from '@/data/about'
import { colors } from '@/config/colors'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { easings } from '@/lib/animations'

const Orb = lazy(() =>
  import('@/components/bits/Orb').then((m) => ({ default: m.Orb })),
)

interface IntroLoaderProps {
  onComplete: () => void
}

const MIN_DISPLAY_MS = 2200
const FALLBACK_DISPLAY_MS = 400
const FONT_WAIT_MS = 300
const EXIT_MS = 500

async function waitForFonts() {
  if (!document.fonts?.ready) return
  await Promise.race([
    document.fonts.ready,
    new Promise<void>((resolve) => window.setTimeout(resolve, FONT_WAIT_MS)),
  ])
}

function preloadHeroChunks() {
  void import('@/components/bits/PlasmaWave')
  void import('@/cta/FinalCTA')
}

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()
  const showOrb = !reduced && !isMobile
  const displayMs = showOrb ? MIN_DISPLAY_MS : FALLBACK_DISPLAY_MS
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      await waitForFonts()
      preloadHeroChunks()
      await new Promise<void>((resolve) => window.setTimeout(resolve, displayMs))
      if (!cancelled) setVisible(false)
    }

    void run()
    return () => {
      cancelled = true
    }
  }, [displayMs])

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="intro-loader"
          role="status"
          aria-live="polite"
          aria-label="Carregando Seven Speak"
          className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-obsidian"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: EXIT_MS / 1000, ease: easings.cinematic }}
        >
          <span className="sr-only">Carregando Seven Speak</span>

          {showOrb && (
            <div className="absolute inset-0 flex items-center justify-center opacity-70">
              <Suspense fallback={null}>
                <div className="h-[min(50vh,30rem)] w-[min(50vh,30rem)]">
                  <Orb hue={95} backgroundColor={colors.obsidian} className="h-full w-full" />
                </div>
              </Suspense>
            </div>
          )}

          <motion.div
            className="relative z-10 flex flex-col items-center text-center"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, ease: easings.cinematic }}
          >
            <BrandLockupText
              variant="static"
              layout="inline"
              className={brandLockupIntroClass}
            />
            <p className="mt-4 font-script text-2xl text-blue md:text-3xl">
              {aboutContent.scriptName}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
