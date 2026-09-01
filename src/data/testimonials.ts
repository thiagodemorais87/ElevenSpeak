export interface Testimonial {
  id: string
  name: string
  profile: string
  quote: string
  /** EDITÁVEL: caminho da foto ou null */
  photo: string | null
}

/** Depoimentos reais aprovados. */
export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Gabriel Fernandes',
    profile: 'Aluno',
    quote:
      'Fazer aulas de inglês com a professora Renata mudou completamente a minha relação com o idioma. Antes, eu tinha muita dificuldade  na hora de falar. A metodologia dela é extremamente prática, focada em situações reais do dia a dia, o que me deu a confiança que faltava para finalmente destravar a conversação. Recomendo de olhos fechados para quem quer fluência de verdade!',
    photo: null,
  },
]
