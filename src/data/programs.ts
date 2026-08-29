export interface Program {
  id: string
  name: string
  forWhom: string
  objective: string
  format: string
  benefits: string[]
  accent: 'orange' | 'blue' | 'ivory'
}

export const programs: Program[] = [
  {
    id: 'one-to-one',
    name: '1:1 Private Lessons',
    forWhom: 'Professionals, travelers and lifelong learners who want full focus.',
    objective: 'Accelerate fluency with sessions built entirely around your voice.',
    format: 'Online · flexible schedule',
    benefits: [
      'Personalized curriculum',
      'Pronunciation & fluency focus',
      'WhatsApp support between classes',
    ],
    accent: 'orange',
  },
  {
    id: 'small-groups',
    name: 'Pairs & Trios',
    forWhom: 'Friends, colleagues or partners who grow faster together.',
    objective: 'Practice real conversation with shared goals and accountable energy.',
    format: 'Online · small groups',
    benefits: [
      'Interactive speaking practice',
      'Lower per-student rate',
      'Community without losing personalization',
    ],
    accent: 'blue',
  },
  {
    id: 'speaking-club',
    name: 'Speaking Club',
    forWhom: 'Anyone ready to speak more, connect more and belong more.',
    objective: 'Build fluency in a warm community space beyond the classroom.',
    format: 'Live sessions · community',
    benefits: [
      'Guided conversation themes',
      'Low-pressure speaking reps',
      'Meet people on the same journey',
    ],
    accent: 'ivory',
  },
]
