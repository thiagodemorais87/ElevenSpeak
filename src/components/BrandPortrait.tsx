import { useEffect, useRef, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMouseParallax } from '@/hooks/useMouseParallax'
import { useIsDesktop } from '@/hooks/useIsDesktop'
import { easings } from '@/lib/animations'
import { siteConfig } from '@/config/site'
import { RenataPicture } from '@/components/RenataPicture'

interface BrandPortraitProps {
  variant?: 'hero' | 'about'
  className?: string
  children?: ReactNode
  showOrbit?: boolean
  mouseParallax?: boolean
  priority?: boolean
}

export function BrandPortrait({
  variant = 'hero',
  className = '',
  children,
  showOrbit = true,
  mouseParallax,
  priority = false,
}: BrandPortraitProps) {
  const reduced = useReducedMotion()
  const isDesktop = useIsDesktop()
  const wrapRef = useRef<HTMLDivElement>(null)
  const scaleRef = useRef<HTMLDivElement>(null)
  const glitchRef = useRef<HTMLDivElement>(null)
  const isHero = variant === 'hero'
  const allowMouse = mouseParallax ?? isHero
  const enableMouse = allowMouse && !reduced
  const mouseRef = useMouseParallax<HTMLDivElement>({
    strength: enableMouse ? 7 : 0,
  })

  useEffect(() => {
    const node = scaleRef.current
    const wrap = wrapRef.current
    if (reduced || !node || !wrap) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        node,
        { scale: 1, yPercent: 0 },
        {
          scale: isHero ? 1.1 : 1.06,
          yPercent: isHero ? 6 : 4,
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
  }, [reduced, isHero])

  useEffect(() => {
    if (!isHero || reduced || !isDesktop || !glitchRef.current) return
    const el = glitchRef.current
    const tl = gsap.timeline({ delay: 1.55 })
    tl.to(el, { x: 3, skewX: 0.6, opacity: 0.92, duration: 0.04 })
      .to(el, { x: -2, skewX: -0.4, opacity: 1, duration: 0.05 })
      .to(el, { x: 1, skewX: 0.2, duration: 0.04 })
      .to(el, { x: 0, skewX: 0, opacity: 1, duration: 0.06 })
    return () => {
      tl.kill()
      gsap.set(el, { clearProps: 'transform,opacity' })
    }
  }, [isHero, reduced, isDesktop])

  return (
    <div
      ref={wrapRef}
      className={`brand-portrait relative ${className}`}
      data-variant={variant}
    >
      <div ref={scaleRef} className="relative">
        <div ref={glitchRef}>
          <motion.div
            ref={enableMouse ? mouseRef : undefined}
            data-cursor="view"
            className={`relative overflow-hidden ${
              enableMouse ? 'will-change-transform' : ''
            } ${
              isHero
                ? 'border border-lime/40'
                : 'border border-obsidian/10 shadow-[0_24px_80px_rgba(0,0,0,0.35)]'
            }`}
            initial={
              reduced
                ? false
                : {
                    clipPath: isHero
                      ? 'inset(38% 18% 38% 18%)'
                      : 'inset(0% 100% 0% 0%)',
                    scale: isHero ? 1.18 : 1.04,
                    opacity: 0.15,
                  }
            }
            whileInView={
              isHero || reduced
                ? undefined
                : {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    scale: 1,
                    opacity: 1,
                  }
            }
            animate={
              reduced || !isHero
                ? undefined
                : {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    scale: 1,
                    opacity: 1,
                  }
            }
            viewport={isHero ? undefined : { once: true, amount: 0.3 }}
            transition={{
              delay: reduced ? 0 : isHero ? 0.65 : 0.05,
              duration: isHero ? 1.15 : 0.95,
              ease: easings.cinematic,
            }}
          >
            <RenataPicture
              alt={`${siteConfig.teacherName}, professora da Seven Speak`}
              className={
                isHero
                  ? 'aspect-[4/5] w-full object-cover object-top md:aspect-[3/4] lg:max-h-[78vh]'
                  : 'aspect-[3/4] h-full min-h-[60vh] w-full object-cover object-top lg:min-h-[75vh]'
              }
              priority={priority}
            />
            <div
              className={`pointer-events-none absolute inset-0 ${
                isHero
                  ? 'bg-gradient-to-t from-obsidian/55 via-transparent to-transparent'
                  : 'bg-gradient-to-r from-obsidian/65 via-obsidian/15 to-transparent'
              }`}
            />
          </motion.div>
        </div>

        {showOrbit && (
          <>
            <motion.div
              className="pointer-events-none absolute -right-3 bottom-[12%] h-14 w-14 rounded-full border border-lime/35 md:h-16 md:w-16"
              initial={reduced ? false : { scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: reduced ? 0 : 1.85, duration: 0.55, ease: easings.smooth }}
              aria-hidden
            />
            <motion.span
              className="pointer-events-none absolute left-3 top-6 hidden text-[10px] tracking-[0.35em] text-ivory/30 md:block"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduced ? 0 : 1.95 }}
              aria-hidden
            >
              SPEAK
            </motion.span>
          </>
        )}
      </div>
      {children}
    </div>
  )
}
