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
    title: 'Prompts diários de fala',
    description: 'Prompts curtos para falar em voz alta todo dia — criar o hábito.',
    type: 'tips',
    href: null,
  },
  {
    id: 'r2',
    title: 'Mini-guia de pronúncia',
    description: '[EDITÁVEL] Guia rápido de pronúncia — link quando o material estiver pronto.',
    type: 'guide',
    href: null,
  },
  {
    id: 'r3',
    title: 'Checklist de confiança',
    description: 'Um checklist simples para se preparar antes de reuniões, calls ou viagens.',
    type: 'tool',
    href: null,
  },
  {
    id: 'r4',
    title: 'Sessões de listen & shadow',
    description: '[EDITÁVEL] Playlist ou vídeo — adicionar URL real depois.',
    type: 'video',
    href: null,
  },
]
