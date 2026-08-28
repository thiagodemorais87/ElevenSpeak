import { usePreferences } from '@/context/PreferencesContext'

/** true when viewport is at least 768px (Tailwind md). */
export function useIsDesktop() {
  return usePreferences().isDesktop
}
