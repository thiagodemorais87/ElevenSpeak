import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function useFinePointer(): boolean {
  const [fine, setFine] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(pointer: fine)').matches
      : false,
  )

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const update = () => setFine(mq.matches)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return fine
}

export function CustomCursor() {
  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const enabled = fine && !reduced
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState({ x: 0, y: 0 })
  const [label, setLabel] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (enabled) document.documentElement.classList.add('cursor-none')
    else document.documentElement.classList.remove('cursor-none')
    return () => document.documentElement.classList.remove('cursor-none')
  }, [enabled])

  useEffect(() => {
    if (!enabled) return

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
      const target = (e.target as HTMLElement | null)?.closest('[data-cursor]')
      const kind = target?.getAttribute('data-cursor')
      if (kind === 'talk') setLabel("LET'S TALK")
      else if (kind === 'view') setLabel('VIEW')
      else if (kind === 'explore' || kind === 'choose') setLabel('EXPLORE')
      else setLabel('')
    }

    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled])

  // Soft trail follow
  useEffect(() => {
    if (!enabled) return
    let raf = 0
    const tick = () => {
      setTrail((t) => ({
        x: t.x + (pos.x - t.x) * 0.12,
        y: t.y + (pos.y - t.y) * 0.12,
      }))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [enabled, pos.x, pos.y])

  if (!enabled) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] hidden md:block"
      aria-hidden
    >
      <motion.div
        className={`absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-lime/25 ${
          visible ? 'will-change-transform' : ''
        }`}
        animate={{
          x: trail.x,
          y: trail.y,
          scale: label ? 1.5 : 1,
          opacity: visible ? 0.7 : 0,
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 22, mass: 0.5 }}
      />
      <motion.div
        className={`absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime ${
          visible ? 'will-change-transform' : ''
        }`}
        animate={{ x: pos.x, y: pos.y, opacity: visible ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 40, mass: 0.2 }}
      />
      <motion.div
        className={`absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-lime/50 ${
          visible ? 'will-change-transform' : ''
        }`}
        animate={{
          x: pos.x,
          y: pos.y,
          scale: label ? 1.55 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 28, mass: 0.4 }}
      />
      <AnimatePresence>
        {label && (
          <motion.span
            key={label}
            className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-lime px-3 py-1 font-display text-[10px] font-semibold tracking-wider text-obsidian"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1, x: pos.x, y: pos.y - 38 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}
