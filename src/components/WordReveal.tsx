import { motion } from 'motion/react'
import { useMemo } from 'react'
import { easings } from '@/lib/animations'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/useIsMobile'

interface WordRevealProps {
  text: string
  className?: string
  as?: 'h2' | 'p' | 'span'
  stagger?: number
  id?: string
}

export function WordReveal({
  text,
  className = '',
  as: Tag = 'span',
  stagger = 0.08,
  id,
}: WordRevealProps) {
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()
  const words = text.split(/\s+/)

  const hiddenVariant = useMemo(
    () => ({
      opacity: 0,
      y: isMobile ? 32 : 20,
    }),
    [isMobile],
  )

  const visibleTransition = useMemo(
    () => ({
      duration: 0.5,
      ease: easings.cinematic,
    }),
    [],
  )

  if (reduced) {
    return (
      <Tag id={id} className={className}>
        {text}
      </Tag>
    )
  }

  const MotionTag = motion[Tag] as typeof motion.span

  return (
    <MotionTag
      id={id}
      className={`${className} flex flex-wrap justify-center gap-x-[0.28em] gap-y-1`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          variants={{
            hidden: hiddenVariant,
            visible: (wordIndex: number) => ({
              opacity: 1,
              y: 0,
              transition: {
                delay: wordIndex * stagger,
                ...visibleTransition,
              },
            }),
          }}
          custom={i}
        >
          {word}
        </motion.span>
      ))}
    </MotionTag>
  )
}
