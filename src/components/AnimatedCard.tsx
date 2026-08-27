import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { easings } from '@/lib/animations'

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  featured?: boolean
}

export function AnimatedCard({
  children,
  className = '',
  featured = false,
}: AnimatedCardProps) {
  return (
    <motion.div
      className={className}
      data-cursor={featured ? 'explore' : undefined}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.35, ease: easings.smooth }}
    >
      {children}
    </motion.div>
  )
}
