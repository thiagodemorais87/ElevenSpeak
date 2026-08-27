import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { useMagnetic } from '@/hooks/useMagnetic'

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  href?: string
  strength?: number
}

export function MagneticButton({
  children,
  className = '',
  href,
  strength = 0.3,
  ...props
}: MagneticButtonProps) {
  const { ref, onMove, onLeave } = useMagnetic<HTMLButtonElement>(strength)

  const classes = `inline-flex items-center justify-center transition-transform duration-200 will-change-transform ${className}`

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        data-cursor="talk"
        onMouseMove={(e) => {
          const btn = e.currentTarget
          const rect = btn.getBoundingClientRect()
          const x = e.clientX - rect.left - rect.width / 2
          const y = e.clientY - rect.top - rect.height / 2
          btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translate(0,0)'
        }}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={ref}
      type="button"
      className={classes}
      data-cursor="talk"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...props}
    >
      {children}
    </button>
  )
}
