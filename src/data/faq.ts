export interface FAQItem {
  id: string
  question: string
  answer: string
}

export const faqItems: FAQItem[] = [
  {
    id: 'how',
    question: 'Como funcionam as aulas?',
    answer:
      'São sessões ao vivo e personalizadas, com foco em falar, ouvir e no inglês que você precisa no dia a dia. Definimos metas juntos e construímos a partir daí.',
  },
  {
    id: 'personalized',
    question: 'As aulas são personalizadas?',
    answer:
      'Sim. Cada caminho é moldado à sua voz, aos seus objetivos e ao seu ritmo — não a um programa fixo de livro didático.',
  },
  {
    id: 'online',
    question: 'As aulas são online?',
    answer:
      'Sim. As aulas acontecem online para você estudar de qualquer lugar com uma conexão estável.',
  },
  {
    id: 'duration',
    question: 'Quanto tempo dura cada aula?',
    answer:
      '[EDITÁVEL] Confirmar duração padrão das aulas (ex.: 50–60 minutos) e atualizar este texto.',
  },
  {
    id: 'who',
    question: 'Para quem são as aulas?',
    answer:
      'Adultos e jovens que querem se comunicar com confiança — profissionais, viajantes, criativos e qualquer pessoa pronta para encontrar a própria voz em inglês.',
  },
  {
    id: 'ellii',
    question: 'O que é a plataforma Ellii?',
    answer:
      'Ellii (ESL Library) é a plataforma de materiais inclusa nos pacotes semestrais — exercícios e conteúdos para praticar entre as aulas, além das sessões ao vivo.',
  },
  {
    id: 'start',
    question: 'Como começo?',
    answer:
      'Toque em LET\'S TALK e fale com a Seven Speak no WhatsApp. Vamos entender seus objetivos e indicar o melhor plano para você.',
  },
]
