export interface Resource {
  id: string
  title: string
  description: string
  type: 'guide' | 'tips' | 'video' | 'tool'
  /** EDITÁVEL: null até o material existir */
  href: string | null
}

/**
 * Estrutura preparada — sem inventar links.
 */
export const resources: Resource[] = [
  {
    id: 'r1',
    title: 'Daily speaking prompts',
    description: 'Short prompts to speak out loud every day — build the habit.',
    type: 'tips',
    href: null,
  },
  {
    id: 'r2',
    title: 'Pronunciation mini-guide',
    description: '[EDITÁVEL] Guia rápido de pronúncia — link quando o material estiver pronto.',
    type: 'guide',
    href: null,
  },
  {
    id: 'r3',
    title: 'Confidence checklist',
    description: 'A simple checklist to prepare before meetings, calls or trips.',
    type: 'tool',
    href: null,
  },
  {
    id: 'r4',
    title: 'Listen & shadow sessions',
    description: '[EDITÁVEL] Playlist ou vídeo — adicionar URL real depois.',
    type: 'video',
    href: null,
  },
]
