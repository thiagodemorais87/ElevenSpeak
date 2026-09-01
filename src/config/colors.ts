export const colors = {
  obsidian: '#101010',
  ivory: '#F4F0E8',
  warmWhite: '#FFFDF8',
  lime: '#A2FF00',
  magenta: '#FF1493',
  yellow: '#E8C96A',
  pinkSoft: '#FF00FF',
  blue: '#6B8FBF',
  orange: '#E6A06A',
  lavender: '#E6E6FA',
} as const

export type Colors = typeof colors

/** RGB tuple for Canvas/WebGL (0–255). */
export const colorRgb = {
  orange: [230, 160, 106] as const,
  blue: [107, 143, 191] as const,
  obsidian: [16, 16, 16] as const,
} as const
