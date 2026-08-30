import { lazy, Suspense } from 'react'
import { motion } from 'motion/react'
import { BrandLockupText } from '@/components/BrandLockupText'
import { heroTextLoopPhrases } from '@/data/programsBento'
import { colors } from '@/config/colors'
import { useIntroContext } from '@/context/IntroContext'
import { useMouseParallax } from '@/hooks/useMouseParallax'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsDesktop } from '@/hooks/useIsDesktop'
import { useIsMobile } from '@/hooks/useIsMobile'

const TextLoop = lazy(() =>
  import('@/components/bits/TextLoop').then((m) => ({ default: m.TextLoop })),
)

export function HeroBrandLockup() {
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()
  const isDesktop = useIsDesktop()
  const { deferHeroEntrance } = useIntroContext()
  const parallaxRef = useMouseParallax<HTMLDivElement>({ strength: 10 })
  const showTextLoop = !reduced && !isMobile

  const lockup = <BrandLockupText variant="outline" layout="inline" />

  const textLoop = showTextLoop ? (
    <Suspense fallback={null}>
      <div className="pointer-events-none mt-4 w-full max-w-3xl opacity-90">
        <TextLoop
          text={heroTextLoopPhrases.join(' · ')}
          shape="arch"
          curviness={72}
          speed={48}
          separator=" · "
          fontSize={18}
          fontWeight={600}
          letterSpacing={3}
          uppercase
          color={colors.orange}
          ribbon={false}
          className="h-16 md:h-20"
        />
      </div>
    </Suspense>
  ) : null

  if (reduced) {
    return (
      <div>
        <BrandLockupText variant="static" layout="inline" />
      </div>
    )
  }

  if (deferHeroEntrance) {
    return (
      <div ref={parallaxRef}>
        <motion.div
          initial={{ opacity: 0.92 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {lockup}
          {textLoop}
        </motion.div>
      </div>
    )
  }

  return (
    <div ref={parallaxRef}>
      <motion.div
        initial={{
          opacity: 0,
          y: 48,
          filter: isDesktop ? 'blur(8px)' : 'blur(0px)',
        }}
        animate={{
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
        }}
        transition={{
          type: 'spring',
          stiffness: 120,
          damping: 18,
          mass: 0.9,
        }}
      >
        {lockup}
        {textLoop}
      </motion.div>
    </div>
  )
}
