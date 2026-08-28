import { useCallback, useState } from 'react'

const INTRO_SEEN_KEY = 'seven-speak-intro-v1'

function readIntroSeen(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return sessionStorage.getItem(INTRO_SEEN_KEY) === '1'
  } catch {
    return false
  }
}

export function useIntroSeen() {
  const [hasSeen, setHasSeen] = useState(readIntroSeen)

  const markSeen = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, '1')
    } catch {
      // ignore quota / private mode
    }
    setHasSeen(true)
  }, [])

  return { hasSeen, markSeen }
}
