import { siteConfig } from '@/config/site'

export function createWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${siteConfig.whatsapp}?text=${encoded}`
}

export function planWhatsAppMessage(planName: string): string {
  return `Olá! Vi o plano ${planName} da Seven Speak e gostaria de saber mais sobre as aulas.`
}

export function defaultWhatsAppMessage(): string {
  return 'Olá! Vim pelo site da Seven Speak e gostaria de saber mais sobre as aulas.'
}
