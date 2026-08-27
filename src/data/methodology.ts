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
    title: 'PERSONAL',
    description:
      'Lessons shaped around your life, your pace and the English you actually need.',
  },
  {
    id: 'practical',
    number: '02',
    title: 'PRACTICAL',
    description:
      'Real situations, real language. No filler — only what helps you move forward.',
  },
  {
    id: 'conversational',
    number: '03',
    title: 'CONVERSATIONAL',
    description:
      'Speaking is the core. You learn by doing, listening and responding with confidence.',
  },
  {
    id: 'confident',
    number: '04',
    title: 'CONFIDENT',
    description:
      'Lose the fear. Find your voice. Build the quiet certainty that you can say it.',
  },
]
