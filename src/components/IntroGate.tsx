import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { IntroContext } from '@/context/IntroContext'
import { IntroLoader } from '@/components/IntroLoader'
import { useIntroSeen } from '@/hooks/useIntroSeen'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface IntroGateProps {
  children: ReactNode
  onIntroActiveChange?: (active: boolean) => void
}

export function IntroGate({ children, onIntroActiveChange }: IntroGateProps) {
  const reduced = useReducedMotion()
  const { hasSeen, markSeen } = useIntroSeen()

  const shouldPlayIntro = !hasSeen && !reduced
  const [fromIntro] = useState(() => shouldPlayIntro)
  const [phase, setPhase] = useState<'intro' | 'done'>(() =>
    shouldPlayIntro ? 'intro' : 'done',
  )

  const introActive = phase === 'intro'

  useEffect(() => {
    onIntroActiveChange?.(introActive)
  }, [introActive, onIntroActiveChange])

  useEffect(() => {
    document.body.classList.toggle('intro-active', introActive)
    return () => document.body.classList.remove('intro-active')
  }, [introActive])

  const handleIntroComplete = useCallback(() => {
    markSeen()
    setPhase('done')
  }, [markSeen])

  const contextValue = useMemo(
    () => ({
      deferHeroEntrance: fromIntro && phase === 'done',
    }),
    [fromIntro, phase],
  )

  return (
    <IntroContext.Provider value={contextValue}>
      {phase === 'done' && (
        <div className="opacity-100 transition-opacity duration-500">{children}</div>
      )}

      {phase === 'intro' && <IntroLoader onComplete={handleIntroComplete} />}
    </IntroContext.Provider>
  )
}
