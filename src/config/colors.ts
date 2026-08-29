export const colors = {
  obsidian: '#000000',
  ivory: '#F0F0F0',
  warmWhite: '#FFFFFF',
  lime: '#A2FF00',
  magenta: '#FF1493',
  yellow: '#FFFF00',
  pinkSoft: '#FF00FF',
  blue: '#0000FF',
  orange: '#FF6B00',
  lavender: '#E6E6FA',
} as const

export type Colors = typeof colors

/** RGB tuple for Canvas/WebGL (0–255). */
export const colorRgb = {
  orange: [255, 107, 0] as const,
  blue: [0, 0, 255] as const,
  obsidian: [0, 0, 0] as const,
} as const
