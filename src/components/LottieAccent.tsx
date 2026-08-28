import { Lottie, LottieInteractions, lottieInView } from 'lottie-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface LottieAccentProps {
  src: string
  className?: string
  loop?: boolean
  ariaHidden?: boolean
}

export function LottieAccent({
  src,
  className = '',
  loop = true,
  ariaHidden = true,
}: LottieAccentProps) {
  const reduced = useReducedMotion()

  if (reduced) return null

  return (
    <div className={className} aria-hidden={ariaHidden || undefined}>
      <LottieInteractions interactions={[lottieInView({ amount: 0.15 })]}>
        <Lottie src={src} loop={loop} autoplay={false} className="h-full w-full" />
      </LottieInteractions>
    </div>
  )
}
