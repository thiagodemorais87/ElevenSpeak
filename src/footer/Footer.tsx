import { siteConfig } from '@/config/site'
import { createWhatsAppLink, defaultWhatsAppMessage } from '@/lib/whatsapp'
import { scrollToId } from '@/hooks/useSmoothScroll'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

const FOOTER_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'method', label: 'Method' },
  { id: 'programs', label: 'Programs' },
  { id: 'speaking-club', label: 'Speaking Club' },
  { id: 'resources', label: 'Resources' },
  { id: 'contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="bg-yellow px-5 py-16 text-obsidian md:px-8 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-3xl font-bold tracking-tight">
            SEVEN SPEAK
            <span className="text-obsidian">.</span>
          </p>
          <p className="mt-3 font-script text-2xl">{siteConfig.slogan}</p>
          <div className="mt-6 flex gap-4">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-obsidian/30 transition hover:bg-obsidian hover:text-yellow"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={createWhatsAppLink(defaultWhatsAppMessage())}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 items-center rounded-full border border-obsidian/30 px-4 text-xs font-semibold tracking-wide transition hover:bg-obsidian hover:text-yellow"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <nav className="md:col-span-4" aria-label="Footer">
          <ul className="grid grid-cols-2 gap-3">
            {FOOTER_LINKS.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => scrollToId(link.id)}
                  className="text-sm font-medium text-obsidian/80 transition hover:text-obsidian"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3 md:text-right">
          <p className="font-display text-lg font-bold">Learn. Speak. Become.</p>
          <p className="mt-4 text-xs text-obsidian/50">
            © {new Date().getFullYear()} {siteConfig.brandName}
          </p>
          <p className="mt-1 text-[10px] text-obsidian/40">
            {/* EDITÁVEL */} Privacy Policy placeholder
          </p>
        </div>
      </div>
    </footer>
  )
}
