import { usePreferences } from '@/context/PreferencesContext'

/** true when viewport is below 768px (Tailwind md). */
export function useIsMobile() {
  return usePreferences().isMobile
}
