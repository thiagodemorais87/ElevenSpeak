export const siteConfig = {
  brandName: 'Seven Speak',
  slogan: 'Speak beyond words.',
  teacherName: 'Renata',
  whatsapp: '5511974666549',
  instagram: 'https://www.instagram.com/weare__english/',
  /** EDITÁVEL: substituir pelo e-mail real */
  email: 'hello@sevenspeak.com',
  /** Usado fora do Hero — bio curta editável */
  tagline:
    'Personalized English lessons designed around your voice, your goals and your life.',
} as const

export type SiteConfig = typeof siteConfig

/** Stats / bio detalhada: editar em src/data/about.ts (placeholders até confirmação). */
