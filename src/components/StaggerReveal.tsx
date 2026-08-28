import { motion } from 'motion/react'
import { useMemo, type ReactNode } from 'react'
import { durations, easings, staggerContainer } from '@/lib/animations'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/useIsMobile'

interface StaggerRevealProps {
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
  as?: 'div' | 'ul' | 'section'
}

function buildItemVariants(mobile: boolean) {
  return {
    hidden: { opacity: 0, y: mobile ? 40 : 24 },
    visible: mobile
      ? {
          opacity: 1,
          y: 0,
          transition: {
            type: 'spring' as const,
            stiffness: 260,
            damping: 24,
          },
        }
      : {
          opacity: 1,
          y: 0,
          transition: { duration: durations.base, ease: easings.smooth },
        },
  }
}

function buildContainerVariants(stagger: number, delay: number) {
  return {
    hidden: staggerContainer.hidden,
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  }
}

export function StaggerReveal({
  children,
  className = '',
  stagger = 0.08,
  delay = 0.05,
  as = 'div',
}: StaggerRevealProps) {
  const reduced = useReducedMotion()
  const Component = motion[as]
  const containerVariants = useMemo(
    () => buildContainerVariants(stagger, delay),
    [stagger, delay],
  )

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {children}
    </Component>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'li' | 'article'
}

export function StaggerItem({
  children,
  className = '',
  as = 'div',
}: StaggerItemProps) {
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()
  const Component = motion[as]
  const itemVariants = useMemo(() => buildItemVariants(isMobile), [isMobile])

  if (reduced) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <Component className={className} variants={itemVariants}>
      {children}
    </Component>
  )
}
