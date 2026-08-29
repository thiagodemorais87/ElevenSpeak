import type { ComponentProps } from 'react'
import type { PlasmaWave } from '@/components/bits/PlasmaWave'

import { colors } from '@/config/colors'

export const heroPlasmaProps = {
  colors: [colors.blue, colors.orange] as [string, string],
  speed1: 0.04,
  speed2: 0.03,
  lightMode: false,
} satisfies Omit<ComponentProps<typeof PlasmaWave>, 'className'>
