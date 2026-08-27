import { useRef, type ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * React Bits–inspired Magnet effect for wrappers (TS + Tailwind).
 */
interface MagnetProps {
  children: ReactNode
  className?: string
  padding?: number
  strength?: number
}

export function Magnet({
  children,
  className = '',
  padding = 40,
  strength = 0.35,
}: MagnetProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      className={`inline-block transition-transform duration-200 will-change-transform ${className}`}
      onMouseMove={(e) => {
        if (reduced || !ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        if (Math.abs(dx) > rect.width / 2 + padding) return
        if (Math.abs(dy) > rect.height / 2 + padding) return
        ref.current.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = 'translate(0,0)'
      }}
    >
      {children}
    </div>
  )
}
