import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import type { FAQItem as FAQData } from '@/data/faq'
import { StaggerReveal, StaggerItem } from '@/components/StaggerReveal'

interface FAQItemProps {
  item: FAQData
  open: boolean
  onToggle: () => void
  onBlue?: boolean
}

export function FAQItem({ item, open, onToggle, onBlue = false }: FAQItemProps) {
  return (
    <div
      className={`border-b transition-colors ${
        open
          ? onBlue
            ? 'border-orange/60'
            : 'border-orange/50'
          : onBlue
            ? 'border-yellow/25'
            : 'border-obsidian/15'
      }`}
    >
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
        onClick={onToggle}
      >
        <span
          className={`font-display text-base font-semibold md:text-lg ${
            onBlue ? 'text-yellow' : 'text-obsidian'
          }`}
        >
          {item.question}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
            onBlue ? 'text-ivory/70' : 'text-obsidian/60'
          } ${open ? 'rotate-180 text-orange' : ''}`}
          aria-hidden
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p
              className={`pb-5 pr-8 text-sm leading-relaxed md:text-base ${
                onBlue ? 'text-ivory/85' : 'text-obsidian/70'
              }`}
            >
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQList({ items, onBlue = false }: { items: FAQData[]; onBlue?: boolean }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)

  return (
    <StaggerReveal>
      {items.map((item) => (
        <StaggerItem key={item.id}>
          <FAQItem
            item={item}
            open={openId === item.id}
            onToggle={() => setOpenId(openId === item.id ? null : item.id)}
            onBlue={onBlue}
          />
        </StaggerItem>
      ))}
    </StaggerReveal>
  )
}
