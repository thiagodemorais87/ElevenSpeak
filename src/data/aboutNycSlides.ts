export interface AboutNycSlide {
  id: string
  image: string
  fallback: string
  title: string
  caption: string
  objectPosition?: string
}

export const aboutNycSlides: AboutNycSlide[] = [
  {
    id: 'times-square',
    image: '/images/times-square-nyc.webp',
    fallback: '/images/times-square-nyc.jpg',
    title: 'Times Square',
    caption: '10+ years living English in New York',
    objectPosition: 'center',
  },
  {
    id: 'brooklyn-bridge',
    image: '/images/nyc/brooklyn-bridge.webp',
    fallback: '/images/nyc/brooklyn-bridge.jpg',
    title: 'Brooklyn Bridge',
    caption: 'Crossing languages, one conversation at a time',
    objectPosition: 'center',
  },
  {
    id: 'central-park',
    image: '/images/nyc/central-park.webp',
    fallback: '/images/nyc/central-park.jpg',
    title: 'Central Park',
    caption: 'Space to breathe, speak and grow',
    objectPosition: 'center top',
  },
  {
    id: 'manhattan-night',
    image: '/images/nyc/manhattan-night.webp',
    fallback: '/images/nyc/manhattan-night.jpg',
    title: 'Manhattan',
    caption: 'A city that never stops teaching you',
    objectPosition: 'center',
  },
  {
    id: 'nyc-street',
    image: '/images/nyc/nyc-street.webp',
    fallback: '/images/nyc/nyc-street.jpg',
    title: 'NYC Streets',
    caption: 'Real English in real moments',
    objectPosition: 'center',
  },
  {
    id: 'dumbo-skyline',
    image: '/images/nyc/dumbo-skyline.webp',
    fallback: '/images/nyc/dumbo-skyline.jpg',
    title: 'DUMBO',
    caption: 'Views that expand your perspective',
    objectPosition: 'center',
  },
  {
    id: 'high-line',
    image: '/images/nyc/high-line.webp',
    fallback: '/images/nyc/high-line.jpg',
    title: 'The High Line',
    caption: 'Walking conversations above the city',
    objectPosition: 'center',
  },
  {
    id: 'subway',
    image: '/images/nyc/subway.webp',
    fallback: '/images/nyc/subway.jpg',
    title: 'NYC Subway',
    caption: 'Every ride is a lesson in listening',
    objectPosition: 'center',
  },
]
