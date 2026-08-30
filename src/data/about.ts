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
    'Aprender inglês não é só gramática. É aprender a se comunicar, perder o medo, ganhar confiança e falar com naturalidade — para aproveitar oportunidades e desenvolver a sua própria voz.',
    'Com mais de 10 anos em Nova York e mais de 100 alunos transformados, Renata monta as aulas em torno de situações reais, pronúncia e fluidez que ficam.',
  ],
  highlights: [
    {
      title: 'Pronúncia & fluidez',
      description: 'Soar natural, sentir clareza.',
    },
    {
      title: 'Inglês para situações reais',
      description: 'Reuniões, viagens, vida.',
    },
    {
      title: 'Foco na comunicação',
      description: 'Significado primeiro — sempre.',
    },
  ] satisfies AboutHighlight[],
  stats: [
    { value: '10+', label: 'ANOS EM NYC', accent: 'orange' },
    { value: '100+', label: 'ALUNOS', accent: 'blue' },
    { value: 'FOCO', label: 'COMUNICAÇÃO', accent: 'orange' },
    { value: 'VOCÊ', label: 'NO CENTRO', accent: 'blue' },
  ] satisfies AboutStat[],
  polaroidCaption: 'Nova York mudou tudo',
  polaroidCaptionSecondary: 'Professora de verdade. Resultados de verdade.',
  stickyNote: 'Find your voice.',
} as const
