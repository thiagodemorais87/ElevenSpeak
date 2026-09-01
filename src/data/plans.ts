export type PlanModality = 'individual' | 'duplas' | 'trios'

export interface SemestralPlan {
  id: PlanModality
  label: string
  installment: number
  installments: number
  total: number
  hours: number
  discountNote: string
  includes: string[]
  featured?: boolean
}

const elliiInclude =
  'Plataforma digital de ensino ESL (English as a Second Language, Inglês como Segunda Língua) — Ellii está incluso, acesso completo'

export const semestralPlans: SemestralPlan[] = [
  {
    id: 'individual',
    label: 'Individual',
    installment: 435,
    installments: 6,
    total: 2610,
    hours: 20,
    discountNote: '10% de desconto · 20h no semestre',
    featured: true,
    includes: [
      'Pacote de 20h — use dentro de 6 meses',
      '6x no boleto, sem juros',
      elliiInclude,
      'Acompanhamento de progresso',
    ],
  },
  {
    id: 'duplas',
    label: 'Duplas',
    installment: 330,
    installments: 6,
    total: 1980,
    hours: 20,
    discountNote: '10% de desconto · por aluno',
    includes: [
      'Pacote de 20h — use dentro de 6 meses',
      '6x no boleto, sem juros, por aluno',
      elliiInclude,
      'Acompanhamento de progresso',
      'Avaliação de nível da dupla antes de começar',
    ],
  },
  {
    id: 'trios',
    label: 'Trios',
    installment: 285,
    installments: 6,
    total: 1710,
    hours: 20,
    discountNote: '10% de desconto · por aluno',
    includes: [
      'Pacote de 20h — use dentro de 6 meses',
      '6x no boleto, sem juros, por aluno',
      elliiInclude,
      'Acompanhamento de progresso',
      'Avaliação de nível do trio antes de começar',
    ],
  },
]

export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
  })
}
