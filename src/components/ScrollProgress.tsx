import { useScrollProgress } from '@/hooks/useScrollProgress'

export function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[90] h-[2px] w-full bg-transparent"
      aria-hidden
    >
      <div
        className="h-full origin-left bg-lime transition-[width] duration-100 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}
