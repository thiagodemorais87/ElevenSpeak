import { programs } from '@/data/programs'

export const heroPillars = [
  'FALE TODO DIA',
  'INGLÊS REAL',
  'FLUIDEZ EM AÇÃO',
  'SUA VOZ',
] as const

export const heroCarouselItems = [
  ...heroPillars,
  ...programs.map((p) => p.name),
  'Find your voice.',
] as const
