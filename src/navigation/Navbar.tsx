import { memo, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { createWhatsAppLink, defaultWhatsAppMessage } from '@/lib/whatsapp'
import { useActiveSection } from '@/hooks/useScrollProgress'
import { subscribeScrollMetrics } from '@/hooks/useScrollMetrics'
import { scrollToId } from '@/hooks/useSmoothScroll'

const NAV_LINKS = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'programs', label: 'PROGRAMS' },
  { id: 'speaking-club', label: 'SPEAKING CLUB' },
  { id: 'resources', label: 'RESOURCES' },
  { id: 'contact', label: 'CONTACT' },
] as const

const NAV_SECTION_IDS = NAV_LINKS.map((link) => link.id)

export const Navbar = memo(function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(NAV_SECTION_IDS)
  const scrolledRef = useRef(false)

  useEffect(() => {
    return subscribeScrollMetrics(({ scrolled: nextScrolled }) => {
      if (nextScrolled !== scrolledRef.current) {
        scrolledRef.current = nextScrolled
        setScrolled(nextScrolled)
      }
    })
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    scrollToId(id)
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-ivory/10 bg-obsidian/80 py-3 backdrop-blur-md'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
          <button
            type="button"
            onClick={() => go('home')}
            className={`font-display font-bold tracking-tight text-yellow transition-all ${
              scrolled ? 'text-lg' : 'text-xl'
            }`}
            aria-label="Seven Speak home"
          >
            SEVEN SPEAK
            <span className="text-orange">.</span>
          </button>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => go(link.id)}
                className={`relative text-[11px] tracking-[0.18em] transition ${
                  active === link.id
                    ? 'text-orange'
                    : scrolled
                      ? 'text-ivory/70 hover:text-ivory'
                      : 'text-yellow/80 hover:text-yellow'
                }`}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-orange"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={createWhatsAppLink(defaultWhatsAppMessage())}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="talk"
              className={`hidden rounded-full bg-orange font-display text-xs font-semibold tracking-wide text-obsidian transition hover:brightness-105 sm:inline-flex ${
                scrolled ? 'px-4 py-2' : 'px-5 py-2.5'
              }`}
            >
              LET&apos;S TALK
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center text-yellow lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-obsidian px-6 pb-10 pt-24 lg:hidden"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex flex-1 flex-col gap-6" aria-label="Mobile">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.id}
                  type="button"
                  onClick={() => go(link.id)}
                  className="text-left font-display text-3xl font-bold text-ivory"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ delay: 0.05 * i, duration: 0.35 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
            <a
              href={createWhatsAppLink(defaultWhatsAppMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto rounded-full bg-orange px-6 py-4 text-center font-display text-sm font-semibold text-obsidian"
            >
              LET&apos;S TALK →
            </a>
            <p className="mt-4 font-script text-xl text-blue">
              {siteConfig.slogan}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
})
