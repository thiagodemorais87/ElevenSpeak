export type PlanModality = 'individual' | 'duplas' | 'trios'

export interface SemestralPlan {
  id: PlanModality
  label: string
  installment: number
  installments: number
  total: number
  hours: number
  discountNote: string
  featured?: boolean
}

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
  },
  {
    id: 'duplas',
    label: 'Duplas',
    installment: 330,
    installments: 6,
    total: 1980,
    hours: 20,
    discountNote: '10% de desconto · por aluno',
  },
  {
    id: 'trios',
    label: 'Trios',
    installment: 285,
    installments: 6,
    total: 1710,
    hours: 20,
    discountNote: '10% de desconto · por aluno',
  },
]

export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
  })
}
