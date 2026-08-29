import { colors, colorRgb } from '@/config/colors'

export const nyc = {
  lat: 40.7128,
  lng: -74.006,
  label: 'New York',
} as const

export const arcOrigins = [
  { lat: -23.5505, lng: -46.6333, city: 'São Paulo' },
  { lat: -22.9068, lng: -43.1729, city: 'Rio de Janeiro' },
] as const

export interface GlobePoint {
  lat: number
  lng: number
  size: number
  color: string
  label: string
}

export interface GlobeArc {
  startLat: number
  startLng: number
  endLat: number
  endLng: number
  color: [string, string]
}

export interface GlobeLabel {
  lat: number
  lng: number
  text: string
  color: string
  size: number
}

export const globePoints: GlobePoint[] = [
  {
    lat: nyc.lat,
    lng: nyc.lng,
    size: 0.55,
    color: colors.orange,
    label: nyc.label,
  },
  ...arcOrigins.map((origin) => ({
    lat: origin.lat,
    lng: origin.lng,
    size: 0.28,
    color: colors.blue,
    label: origin.city,
  })),
]

export const globeArcs: GlobeArc[] = arcOrigins.map((origin) => ({
  startLat: origin.lat,
  startLng: origin.lng,
  endLat: nyc.lat,
  endLng: nyc.lng,
  color: [colors.blue, colors.orange],
}))

export const globeLabels: GlobeLabel[] = [
  {
    lat: nyc.lat,
    lng: nyc.lng,
    text: 'New York · 10+ years',
    color: `rgba(${colorRgb.orange.join(',')},0.95)`,
    size: 1.35,
  },
]
