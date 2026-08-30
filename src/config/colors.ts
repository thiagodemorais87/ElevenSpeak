export const colors = {
  obsidian: '#101010',
  ivory: '#F4F0E8',
  warmWhite: '#FFFDF8',
  lime: '#A2FF00',
  magenta: '#FF1493',
  yellow: '#E8C96A',
  pinkSoft: '#FF00FF',
  blue: '#3D5AFE',
  orange: '#E8893A',
  lavender: '#E6E6FA',
} as const

export type Colors = typeof colors

/** RGB tuple for Canvas/WebGL (0–255). */
export const colorRgb = {
  orange: [232, 137, 58] as const,
  blue: [61, 90, 254] as const,
  obsidian: [16, 16, 16] as const,
} as const
