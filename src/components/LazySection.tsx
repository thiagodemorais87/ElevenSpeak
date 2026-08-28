import { Suspense, useRef, type ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'

function SectionFallback() {
  return <div className="section-deferred min-h-[40vh] shimmer-skeleton" aria-hidden />
}

interface LazySectionProps {
  children: ReactNode
}

export function LazySection({ children }: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { rootMargin: '200px 0px', once: true })

  return (
    <div ref={ref}>
      {inView ? (
        <Suspense fallback={<SectionFallback />}>{children}</Suspense>
      ) : (
        <SectionFallback />
      )}
    </div>
  )
}
