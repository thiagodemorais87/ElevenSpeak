export interface FAQItem {
  id: string
  question: string
  answer: string
}

export const faqItems: FAQItem[] = [
  {
    id: 'how',
    question: 'How do the lessons work?',
    answer:
      'Lessons are live, personalized sessions focused on speaking, listening and the English you need in real life. We set goals together and build from there.',
  },
  {
    id: 'personalized',
    question: 'Are lessons personalized?',
    answer:
      'Yes. Every path is shaped around your voice, your goals and your rhythm — not a fixed textbook syllabus.',
  },
  {
    id: 'online',
    question: 'Are classes online?',
    answer:
      'Yes. Classes happen online so you can learn from anywhere with a stable connection.',
  },
  {
    id: 'duration',
    question: 'How long is each lesson?',
    answer:
      '[EDITÁVEL] Confirmar duração padrão das aulas (ex.: 50–60 minutos) e atualizar este texto.',
  },
  {
    id: 'who',
    question: 'Who are the lessons for?',
    answer:
      'Adults and young adults who want to communicate with confidence — professionals, travelers, creatives and anyone ready to find their voice in English.',
  },
  {
    id: 'start',
    question: 'How do I get started?',
    answer:
      'Tap LET\'S TALK and message Seven Speak on WhatsApp. We\'ll understand your goals and suggest the best plan for you.',
  },
]
