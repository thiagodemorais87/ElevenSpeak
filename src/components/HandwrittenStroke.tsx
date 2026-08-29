import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface HandwrittenStrokeProps {
  text: string
  className?: string
}

export function HandwrittenStroke({ text, className = '' }: HandwrittenStrokeProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const drawn = reduced || visible

  useEffect(() => {
    if (reduced) return
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [reduced])

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <p
        className={`font-script text-2xl md:text-3xl transition-opacity duration-500 ${
          drawn ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {text}
      </p>
      <svg
        className="absolute -bottom-1 left-0 h-3 w-full overflow-visible"
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M2 8 C 40 2, 80 12, 120 6 S 180 2, 198 7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-orange"
          style={{
            strokeDasharray: 220,
            strokeDashoffset: drawn ? 0 : 220,
            transition: reduced ? undefined : 'stroke-dashoffset 0.85s ease',
          }}
        />
      </svg>
    </div>
  )
}
