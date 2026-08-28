import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export interface Preferences {
  reducedMotion: boolean
  isMobile: boolean
  isDesktop: boolean
  finePointer: boolean
}

const defaultPreferences: Preferences = {
  reducedMotion: false,
  isMobile: false,
  isDesktop: true,
  finePointer: true,
}

const PreferencesContext = createContext<Preferences>(defaultPreferences)

function readMatchMedia(query: string): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia(query).matches
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(() =>
    readMatchMedia('(prefers-reduced-motion: reduce)'),
  )
  const [isMobile, setIsMobile] = useState(() => readMatchMedia('(max-width: 767px)'))
  const [finePointer, setFinePointer] = useState(() => readMatchMedia('(pointer: fine)'))

  useEffect(() => {
    const reducedMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobileMq = window.matchMedia('(max-width: 767px)')
    const pointerMq = window.matchMedia('(pointer: fine)')

    const sync = () => {
      setReducedMotion(reducedMq.matches)
      setIsMobile(mobileMq.matches)
      setFinePointer(pointerMq.matches)
    }

    sync()
    reducedMq.addEventListener('change', sync)
    mobileMq.addEventListener('change', sync)
    pointerMq.addEventListener('change', sync)

    return () => {
      reducedMq.removeEventListener('change', sync)
      mobileMq.removeEventListener('change', sync)
      pointerMq.removeEventListener('change', sync)
    }
  }, [])

  const value = useMemo<Preferences>(
    () => ({
      reducedMotion,
      isMobile,
      isDesktop: !isMobile,
      finePointer,
    }),
    [reducedMotion, isMobile, finePointer],
  )

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
}

export function usePreferences(): Preferences {
  return useContext(PreferencesContext)
}
