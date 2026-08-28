import { lazy } from 'react'
import { Hero } from '@/hero/Hero'
import { About } from '@/about/About'
import { LazySection } from '@/components/LazySection'

const Manifesto = lazy(() =>
  import('@/manifesto/Manifesto').then((m) => ({ default: m.Manifesto })),
)
const TheSeven = lazy(() =>
  import('@/seven/TheSeven').then((m) => ({ default: m.TheSeven })),
)
const Methodology = lazy(() =>
  import('@/methodology/Methodology').then((m) => ({ default: m.Methodology })),
)
const Experience = lazy(() =>
  import('@/experience/Experience').then((m) => ({ default: m.Experience })),
)
const Programs = lazy(() =>
  import('@/programs/Programs').then((m) => ({ default: m.Programs })),
)
const Plans = lazy(() =>
  import('@/plans/Plans').then((m) => ({ default: m.Plans })),
)
const SpeakingClub = lazy(() =>
  import('@/speaking-club/SpeakingClub').then((m) => ({ default: m.SpeakingClub })),
)
const Resources = lazy(() =>
  import('@/resources/Resources').then((m) => ({ default: m.Resources })),
)
const Testimonials = lazy(() =>
  import('@/testimonials/Testimonials').then((m) => ({ default: m.Testimonials })),
)
const FAQ = lazy(() => import('@/faq/FAQ').then((m) => ({ default: m.FAQ })))
const FinalCTA = lazy(() =>
  import('@/cta/FinalCTA').then((m) => ({ default: m.FinalCTA })),
)
const Footer = lazy(() =>
  import('@/footer/Footer').then((m) => ({ default: m.Footer })),
)

export function HomePage() {
  return (
    <main>
      <Hero />
      <LazySection>
        <Manifesto />
      </LazySection>
      <About />
      <LazySection>
        <TheSeven />
      </LazySection>
      <LazySection>
        <Methodology />
      </LazySection>
      <LazySection>
        <Experience />
      </LazySection>
      <LazySection>
        <Programs />
      </LazySection>
      <LazySection>
        <Plans />
      </LazySection>
      <LazySection>
        <SpeakingClub />
      </LazySection>
      <LazySection>
        <Resources />
      </LazySection>
      <LazySection>
        <Testimonials />
      </LazySection>
      <LazySection>
        <FAQ />
      </LazySection>
      <LazySection>
        <FinalCTA />
      </LazySection>
      <LazySection>
        <Footer />
      </LazySection>
    </main>
  )
}
