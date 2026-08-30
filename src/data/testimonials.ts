export interface Testimonial {
  id: string
  name: string
  profile: string
  quote: string
  /** EDITÁVEL: caminho da foto ou null */
  photo: string | null
}

/**
 * Placeholders — substituir por depoimentos reais aprovados.
 * Não inventar nomes ou histórias de alunos reais.
 */
export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: '[Nome do aluno]',
    profile: '[Perfil — ex.: Profissional / Viajante]',
    quote:
      '[EDITÁVEL] Placeholder de depoimento. Substituir por um relato real sobre confiança, fluidez ou transformação.',
    photo: null,
  },
  {
    id: 't2',
    name: '[Nome do aluno]',
    profile: '[Perfil]',
    quote:
      '[EDITÁVEL] Segundo depoimento placeholder. Manter tom humano e específico quando o conteúdo real estiver pronto.',
    photo: null,
  },
  {
    id: 't3',
    name: '[Nome do aluno]',
    profile: '[Perfil]',
    quote:
      '[EDITÁVEL] Terceiro depoimento placeholder. Foque em comunicação, medo perdido e oportunidades abertas.',
    photo: null,
  },
]
