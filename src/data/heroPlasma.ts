import type { ComponentProps } from 'react'
import type { PlasmaWave } from '@/components/bits/PlasmaWave'
import { colors } from '@/config/colors'

/** Laranja + amarelo no azul — lightMode evita o brilho iridescente roxo do shader. */
export const heroPlasmaProps = {
  colors: [colors.orange, colors.yellow] as [string, string],
  speed1: 0.04,
  speed2: 0.03,
  lightMode: true,
} satisfies Omit<ComponentProps<typeof PlasmaWave>, 'className'>
