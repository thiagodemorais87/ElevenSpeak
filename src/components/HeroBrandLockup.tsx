import { motion } from 'motion/react'
import { BrandLockupText } from '@/components/BrandLockupText'
import { useIntroContext } from '@/context/IntroContext'
import { useMouseParallax } from '@/hooks/useMouseParallax'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsDesktop } from '@/hooks/useIsDesktop'

export function HeroBrandLockup() {
  const reduced = useReducedMotion()
  const isDesktop = useIsDesktop()
  const { deferHeroEntrance } = useIntroContext()
  const parallaxRef = useMouseParallax<HTMLDivElement>({ strength: 10 })

  const lockup = <BrandLockupText variant="outline" layout="inline" />

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
      </motion.div>
    </div>
  )
}
