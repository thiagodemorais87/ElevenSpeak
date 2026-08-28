import type { ComponentProps } from 'react'
import type { PlasmaWave } from '@/components/bits/PlasmaWave'

export const heroPlasmaProps = {
  colors: ['#d8ff3e', '#ff2d95'] as [string, string],
  speed1: 0.04,
  speed2: 0.03,
  lightMode: false,
} satisfies Omit<ComponentProps<typeof PlasmaWave>, 'className'>
