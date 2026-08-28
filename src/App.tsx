import { lazy, Suspense, useCallback, useState } from 'react'
import { IntroGate } from '@/components/IntroGate'
import { Navbar } from '@/navigation/Navbar'
import { ScrollProgress } from '@/components/ScrollProgress'
import { HomePage } from '@/pages/HomePage'
import { PreferencesProvider, usePreferences } from '@/context/PreferencesContext'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

const CustomCursor = lazy(() =>
  import('@/components/CustomCursor').then((m) => ({ default: m.CustomCursor })),
)

function AppShell() {
  const [introActive, setIntroActive] = useState(false)
  const { finePointer, reducedMotion } = usePreferences()
  const showCursor = finePointer && !reducedMotion

  const handleIntroActiveChange = useCallback((active: boolean) => {
    setIntroActive(active)
  }, [])

  useSmoothScroll({ enabled: !introActive })

  return (
    <IntroGate onIntroActiveChange={handleIntroActiveChange}>
      <ScrollProgress />
      {showCursor && (
        <Suspense fallback={null}>
          <CustomCursor />
        </Suspense>
      )}
      <Navbar />
      <HomePage />
    </IntroGate>
  )
}

export default function App() {
  return (
    <PreferencesProvider>
      <AppShell />
    </PreferencesProvider>
  )
}
