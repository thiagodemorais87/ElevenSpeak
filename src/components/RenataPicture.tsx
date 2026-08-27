interface RenataPictureProps {
  alt: string
  className?: string
  priority?: boolean
  decorative?: boolean
}

export function RenataPicture({
  alt,
  className = '',
  priority = false,
  decorative = false,
}: RenataPictureProps) {
  return (
    <picture>
      <source srcSet="/images/renata-hero.webp" type="image/webp" />
      <img
        src="/images/renata-hero.jpg"
        alt={decorative ? '' : alt}
        className={className}
        fetchPriority={priority ? 'high' : undefined}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        aria-hidden={decorative || undefined}
      />
    </picture>
  )
}
