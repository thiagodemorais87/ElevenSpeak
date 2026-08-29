import { createWhatsAppLink, defaultWhatsAppMessage, planWhatsAppMessage } from '@/lib/whatsapp'
import { cn } from '@/lib/cn'
import { MagneticButton } from './MagneticButton'

type WhatsAppVariant = 'orange' | 'dark'

interface WhatsAppButtonProps {
  label?: string
  planName?: string
  className?: string
  message?: string
  /** orange = fundo neon; dark = fundo obsidian com texto orange legível */
  variant?: WhatsAppVariant
}

const variantClasses: Record<WhatsAppVariant, string> = {
  orange: 'bg-orange text-obsidian hover:brightness-105',
  dark: 'bg-obsidian text-orange hover:bg-obsidian/90',
}

export function WhatsAppButton({
  label = "LET'S TALK →",
  planName,
  className = '',
  message,
  variant = 'orange',
}: WhatsAppButtonProps) {
  const text =
    message ??
    (planName ? planWhatsAppMessage(planName) : defaultWhatsAppMessage())
  const href = createWhatsAppLink(text)

  return (
    <MagneticButton
      href={href}
      className={cn(
        'rounded-full px-6 py-3 font-display text-sm font-semibold tracking-wide',
        variantClasses[variant],
        className,
      )}
    >
      {label}
    </MagneticButton>
  )
}
