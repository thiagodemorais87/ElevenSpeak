import { createWhatsAppLink, defaultWhatsAppMessage, planWhatsAppMessage } from '@/lib/whatsapp'
import { cn } from '@/lib/cn'
import { MagneticButton } from './MagneticButton'

type WhatsAppVariant = 'lime' | 'dark'

interface WhatsAppButtonProps {
  label?: string
  planName?: string
  className?: string
  message?: string
  /** lime = fundo neon; dark = fundo obsidian com texto lime legível */
  variant?: WhatsAppVariant
}

const variantClasses: Record<WhatsAppVariant, string> = {
  lime: 'bg-lime text-obsidian hover:brightness-105',
  dark: 'bg-obsidian text-lime hover:bg-obsidian/90',
}

export function WhatsAppButton({
  label = "LET'S TALK →",
  planName,
  className = '',
  message,
  variant = 'lime',
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
