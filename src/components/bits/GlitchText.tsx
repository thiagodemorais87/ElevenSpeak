import type { CSSProperties, ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface GlitchTextProps {
  children: string
  speed?: number
  enableShadows?: boolean
  enableOnHover?: boolean
  className?: string
  as?: 'span' | 'div'
  dot?: ReactNode
}

interface GlitchCSSProperties extends CSSProperties {
  '--after-duration': string
  '--before-duration': string
  '--after-shadow': string
  '--before-shadow': string
  '--glitch-bg': string
}

/**
 * React Bits–inspired GlitchText (TS + Tailwind), adapted for Seven Speak.
 */
export function GlitchText({
  children,
  speed = 0.6,
  enableShadows = true,
  enableOnHover = false,
  className = '',
  as: Tag = 'span',
  dot,
}: GlitchTextProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <Tag className={className}>
        {children}
        {dot}
      </Tag>
    )
  }

  const inlineStyles: GlitchCSSProperties = {
    '--after-duration': `${speed * 3}s`,
    '--before-duration': `${speed * 2}s`,
    '--after-shadow': enableShadows ? '-4px 0 #d8ff3e' : 'none',
    '--before-shadow': enableShadows ? '4px 0 #ff2d95' : 'none',
    '--glitch-bg': '#101010',
  }

  const pseudoClasses = !enableOnHover
    ? 'after:content-[attr(data-text)] after:absolute after:top-0 after:left-[10px] after:text-inherit after:bg-[var(--glitch-bg)] after:overflow-hidden after:[clip-path:inset(0_0_0_0)] after:[text-shadow:var(--after-shadow)] after:animate-glitch-after ' +
      'before:content-[attr(data-text)] before:absolute before:top-0 before:left-[-10px] before:text-inherit before:bg-[var(--glitch-bg)] before:overflow-hidden before:[clip-path:inset(0_0_0_0)] before:[text-shadow:var(--before-shadow)] before:animate-glitch-before'
    : "after:content-[''] after:absolute after:top-0 after:left-[10px] after:text-inherit after:bg-[var(--glitch-bg)] after:overflow-hidden after:[clip-path:inset(0_0_0_0)] after:opacity-0 " +
      "before:content-[''] before:absolute before:top-0 before:left-[-10px] before:text-inherit before:bg-[var(--glitch-bg)] before:overflow-hidden before:[clip-path:inset(0_0_0_0)] before:opacity-0 " +
      'hover:after:content-[attr(data-text)] hover:after:opacity-100 hover:after:[text-shadow:var(--after-shadow)] hover:after:animate-glitch-after ' +
      'hover:before:content-[attr(data-text)] hover:before:opacity-100 hover:before:[text-shadow:var(--before-shadow)] hover:before:animate-glitch-before'

  return (
    <Tag
      className={`relative mx-auto inline-block select-none ${pseudoClasses} ${className}`}
      style={inlineStyles}
      data-text={children}
    >
      {children}
      {dot}
    </Tag>
  )
}
