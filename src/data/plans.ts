export type PlanModality = 'individual' | 'duplas' | 'trios'

export type PricingMode = 'avulsa' | 'semestral'

export interface AvulsaPlan {
  id: PlanModality
  label: string
  pricePerHour: number
  note: string
  featured?: boolean
}

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

export const avulsaPlans: AvulsaPlan[] = [
  {
    id: 'individual',
    label: 'Individual',
    pricePerHour: 145,
    note: 'Por hora · aula 1:1',
    featured: true,
  },
  {
    id: 'duplas',
    label: 'Duplas',
    pricePerHour: 110,
    note: 'Por aluno · por hora',
  },
  {
    id: 'trios',
    label: 'Trios',
    pricePerHour: 95,
    note: 'Por aluno · por hora',
  },
]

export const semestralPlans: SemestralPlan[] = [
  {
    id: 'individual',
    label: 'Individual',
    installment: 435,
    installments: 6,
    total: 2610,
    hours: 20,
    discountNote: '10% off · 20h no semestre',
    featured: true,
  },
  {
    id: 'duplas',
    label: 'Duplas',
    installment: 330,
    installments: 6,
    total: 1980,
    hours: 20,
    discountNote: '10% off · por aluno',
  },
  {
    id: 'trios',
    label: 'Trios',
    installment: 285,
    installments: 6,
    total: 1710,
    hours: 20,
    discountNote: '10% off · por aluno',
  },
]

export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
  })
}
