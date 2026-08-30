export interface MethodPillar {
  id: string
  number: string
  title: string
  description: string
}

export const methodology: MethodPillar[] = [
  {
    id: 'personal',
    number: '01',
    title: 'PESSOAL',
    description:
      'Aulas moldadas à sua vida, ao seu ritmo e ao inglês que você realmente precisa.',
  },
  {
    id: 'practical',
    number: '02',
    title: 'PRÁTICO',
    description:
      'Situações reais, linguagem real. Sem enrolação — só o que te faz avançar.',
  },
  {
    id: 'conversational',
    number: '03',
    title: 'CONVERSACIONAL',
    description:
      'Falar é o centro. Você aprende fazendo, ouvindo e respondendo com confiança.',
  },
  {
    id: 'confident',
    number: '04',
    title: 'CONFIANTE',
    description:
      'Perder o medo. Encontrar a voz. Construir a certeza quieta de que você consegue dizer.',
  },
]
