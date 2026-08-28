import { programs } from '@/data/programs'

export const heroPillars = [
  'SPEAK EVERY DAY',
  'REAL ENGLISH',
  'FLUENCY IN ACTION',
  'YOUR VOICE',
] as const

export const heroCarouselItems = [
  ...heroPillars,
  ...programs.map((p) => p.name),
  'Find your voice.',
] as const
