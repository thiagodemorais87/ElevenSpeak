import { useEffect, useRef, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { easings } from '@/lib/animations'
import { siteConfig } from '@/config/site'
import { RenataPicture } from '@/components/RenataPicture'

interface BrandPortraitProps {
  className?: string
  children?: ReactNode
}

export function BrandPortrait({ className = '', children }: BrandPortraitProps) {
  const reduced = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const scaleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = scaleRef.current
    const wrap = wrapRef.current
    if (reduced || !node || !wrap) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        node,
        { scale: 1, yPercent: 0 },
        {
          scale: 1.04,
          yPercent: 3,
          ease: 'none',
          scrollTrigger: {
            trigger: wrap,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    }, wrap)

    return () => ctx.revert()
  }, [reduced])

  return (
    <div ref={wrapRef} className={`brand-portrait relative ${className}`}>
      <div ref={scaleRef} className="relative">
        <motion.div
          data-cursor="view"
          className="relative overflow-hidden border border-obsidian/10 shadow-[0_24px_80px_rgba(0,0,0,0.2)]"
          initial={
            reduced
              ? false
              : {
                  clipPath: 'inset(0% 100% 0% 0%)',
                  scale: 1.03,
                  opacity: 0.2,
                }
          }
          whileInView={
            reduced
              ? undefined
              : {
                  clipPath: 'inset(0% 0% 0% 0%)',
                  scale: 1,
                  opacity: 1,
                }
          }
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85, ease: easings.cinematic }}
        >
          <RenataPicture
            alt={`${siteConfig.teacherName}, professora da Seven Speak`}
            className="aspect-[3/4] h-full w-full max-h-[70vh] object-cover object-top"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-obsidian/50 via-obsidian/10 to-transparent" />
        </motion.div>
      </div>
      {children}
    </div>
  )
}
