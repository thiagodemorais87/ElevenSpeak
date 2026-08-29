/**
 * Conteúdo editável da seção About.
 * Stats e bio confirmados pela professora.
 */
export interface AboutStat {
  value: string
  label: string
  accent: 'orange' | 'blue'
}

export interface AboutHighlight {
  title: string
  description: string
}

export const aboutContent = {
  scriptName: 'Teacher Re',
  closingScript: 'Inglês que se usa. Confiança que fica.',
  body: [
    "Learning English isn't just grammar. It's learning how to communicate, lose the fear, gain confidence and speak with naturality — so you can take opportunities and develop your own voice.",
    'With 10+ years in New York and 100+ students transformed, Renata builds lessons around real situations, pronunciation and fluency that stick.',
  ],
  highlights: [
    {
      title: 'Pronúncia & fluidez',
      description: 'Sound natural, feel clear.',
    },
    {
      title: 'Inglês para situações reais',
      description: 'Meetings, travel, life.',
    },
    {
      title: 'Foco na comunicação',
      description: 'Meaning first — always.',
    },
  ] satisfies AboutHighlight[],
  stats: [
    { value: '10+', label: 'YEARS IN NYC', accent: 'orange' },
    { value: '100+', label: 'STUDENTS', accent: 'blue' },
    { value: 'FOCUS', label: 'COMMUNICATION', accent: 'orange' },
    { value: 'YOU', label: 'AT THE CENTER', accent: 'blue' },
  ] satisfies AboutStat[],
  polaroidCaption: 'New York changed everything',
  polaroidCaptionSecondary: 'Real teacher. Real results.',
  stickyNote: 'Find your voice.',
} as const
