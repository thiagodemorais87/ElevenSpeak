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
    name: 'Aulas particulares 1:1',
    forWhom: 'Profissionais, viajantes e quem quer total atenção na jornada.',
    objective: 'Acelerar a fluidez com sessões construídas inteiramente em torno da sua voz.',
    format: 'Online · horários flexíveis',
    benefits: [
      'Currículo personalizado',
      'Foco em pronúncia e fluidez',
      'Suporte no WhatsApp entre as aulas',
    ],
    accent: 'orange',
  },
  {
    id: 'small-groups',
    name: 'Duplas e trios',
    forWhom: 'Amigos, colegas ou parceiros que evoluem mais rápido juntos.',
    objective: 'Praticar conversa real com metas compartilhadas e energia de responsabilidade.',
    format: 'Online · grupos pequenos',
    benefits: [
      'Prática interativa de conversação',
      'Valor menor por aluno',
      'Comunidade sem perder a personalização',
    ],
    accent: 'blue',
  },
  {
    id: 'speaking-club',
    name: 'Speaking Club',
    forWhom: 'Quem quer falar mais, conectar mais e pertencer mais.',
    objective: 'Construir fluidez em um espaço acolhedor além da sala de aula.',
    format: 'Sessões ao vivo · comunidade',
    benefits: [
      'Temas guiados de conversa',
      'Repetições de fala sem pressão',
      'Encontro com pessoas na mesma jornada',
    ],
    accent: 'ivory',
  },
]
