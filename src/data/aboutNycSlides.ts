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
    caption: 'Mais de 10 anos vivendo o inglês em Nova York',
    objectPosition: 'center',
  },
  {
    id: 'brooklyn-bridge',
    image: '/images/nyc/brooklyn-bridge.webp',
    fallback: '/images/nyc/brooklyn-bridge.jpg',
    title: 'Brooklyn Bridge',
    caption: 'Cruzando idiomas, uma conversa de cada vez',
    objectPosition: 'center',
  },
  {
    id: 'central-park',
    image: '/images/nyc/central-park.webp',
    fallback: '/images/nyc/central-park.jpg',
    title: 'Central Park',
    caption: 'Espaço para respirar, falar e crescer',
    objectPosition: 'center top',
  },
  {
    id: 'manhattan-night',
    image: '/images/nyc/manhattan-night.webp',
    fallback: '/images/nyc/manhattan-night.jpg',
    title: 'Manhattan',
    caption: 'Uma cidade que nunca para de te ensinar',
    objectPosition: 'center',
  },
  {
    id: 'nyc-street',
    image: '/images/nyc/nyc-street.webp',
    fallback: '/images/nyc/nyc-street.jpg',
    title: 'Ruas de NYC',
    caption: 'Inglês real em momentos reais',
    objectPosition: 'center',
  },
  {
    id: 'dumbo-skyline',
    image: '/images/nyc/dumbo-skyline.webp',
    fallback: '/images/nyc/dumbo-skyline.jpg',
    title: 'DUMBO',
    caption: 'Vistas que ampliam a perspectiva',
    objectPosition: 'center',
  },
  {
    id: 'high-line',
    image: '/images/nyc/high-line.webp',
    fallback: '/images/nyc/high-line.jpg',
    title: 'The High Line',
    caption: 'Conversas a pé acima da cidade',
    objectPosition: 'center',
  },
  {
    id: 'subway',
    image: '/images/nyc/subway.webp',
    fallback: '/images/nyc/subway.jpg',
    title: 'Metrô de NYC',
    caption: 'Cada viagem é uma aula de escuta',
    objectPosition: 'center',
  },
]
