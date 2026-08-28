import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface TiltCard3DProps {
  children: ReactNode
  className?: string
  featured?: boolean
  style?: CSSProperties
}

const MAX_TILT = 6

export function TiltCard3D({
  children,
  className = '',
  featured = false,
  style,
}: TiltCard3DProps) {
  const reduced = useReducedMotion()
  const cardRef = useRef<HTMLDivElement>(null)
  const shineRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)
  const target = useRef({ rx: 0, ry: 0, mx: 50, my: 50 })
  const current = useRef({ rx: 0, ry: 0, mx: 50, my: 50 })

  useEffect(() => {
    const card = cardRef.current
    if (reduced || !card) return

    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    let inView = true

    const tick = () => {
      if (!inView) {
        rafRef.current = 0
        return
      }
      current.current.rx += (target.current.rx - current.current.rx) * 0.1
      current.current.ry += (target.current.ry - current.current.ry) * 0.1
      current.current.mx += (target.current.mx - current.current.mx) * 0.12
      current.current.my += (target.current.my - current.current.my) * 0.12

      card.style.transform = `perspective(900px) rotateX(${current.current.rx}deg) rotateY(${current.current.ry}deg)`
      card.style.setProperty('--mouse-x', `${current.current.mx}%`)
      card.style.setProperty('--mouse-y', `${current.current.my}%`)

      rafRef.current = requestAnimationFrame(tick)
    }

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      target.current.ry = (px - 0.5) * MAX_TILT * 2
      target.current.rx = (0.5 - py) * MAX_TILT * 2
      target.current.mx = px * 100
      target.current.my = py * 100
      card.classList.add('tilt-card-active')
    }

    const onLeave = () => {
      target.current.rx = 0
      target.current.ry = 0
      target.current.mx = 50
      target.current.my = 50
      card.classList.remove('tilt-card-active')
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry?.isIntersecting ?? false
        if (inView && !rafRef.current) {
          rafRef.current = requestAnimationFrame(tick)
        }
      },
      { threshold: 0.01 },
    )
    observer.observe(card)

    card.addEventListener('mousemove', onMove, { passive: true })
    card.addEventListener('mouseleave', onLeave)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      observer.disconnect()
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafRef.current)
      card.style.transform = ''
      card.classList.remove('tilt-card-active')
    }
  }, [reduced])

  return (
    <div
      ref={cardRef}
      data-cursor={featured ? 'explore' : undefined}
      className={`tilt-card group relative ${className}`}
      style={style}
    >
      <div
        ref={shineRef}
        className="tilt-card-shine pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-300 group-[.tilt-card-active]:opacity-100"
        aria-hidden
      />
      <div className="tilt-card-inner relative z-[2]">{children}</div>
    </div>
  )
}

/** Inner layer with translateZ for parallax depth inside card. */
export function TiltCardLayer({
  children,
  depth = 8,
  className = '',
}: {
  children: ReactNode
  depth?: number
  className?: string
}) {
  return (
    <div
      className={`tilt-card-layer ${className}`}
      style={{ transform: `translateZ(${depth}px)` }}
    >
      {children}
    </div>
  )
}
