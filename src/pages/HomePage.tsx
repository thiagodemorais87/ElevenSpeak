import { lazy, Suspense } from 'react'
import { Hero } from '@/hero/Hero'
import { Manifesto } from '@/manifesto/Manifesto'
import { About } from '@/about/About'

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

function SectionFallback() {
  return <div className="min-h-[40vh] bg-obsidian" aria-hidden />
}

export function HomePage() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <About />
      <Suspense fallback={<SectionFallback />}>
        <TheSeven />
        <Methodology />
        <Experience />
        <Programs />
        <Plans />
        <SpeakingClub />
        <Resources />
        <Testimonials />
        <FAQ />
        <FinalCTA />
        <Footer />
      </Suspense>
    </main>
  )
}
