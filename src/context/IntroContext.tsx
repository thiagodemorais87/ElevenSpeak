import { createContext, useContext } from 'react'

interface IntroContextValue {
  deferHeroEntrance: boolean
}

export const IntroContext = createContext<IntroContextValue>({
  deferHeroEntrance: false,
})

export function useIntroContext() {
  return useContext(IntroContext)
}
