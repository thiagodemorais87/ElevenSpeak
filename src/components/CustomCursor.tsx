import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { usePreferences } from '@/context/PreferencesContext'

export function CustomCursor() {
  const reduced = useReducedMotion()
  const { finePointer } = usePreferences()
  const enabled = finePointer && !reduced

  const trailRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  const posRef = useRef({ x: 0, y: 0 })
  const trailPosRef = useRef({ x: 0, y: 0 })
  const labelTextRef = useRef('')
  const visibleRef = useRef(false)
  const scaleRef = useRef(1)

  useEffect(() => {
    if (enabled) document.documentElement.classList.add('cursor-none')
    else document.documentElement.classList.remove('cursor-none')
    return () => document.documentElement.classList.remove('cursor-none')
  }, [enabled])

  useEffect(() => {
    if (!enabled) return

    const applyTransform = () => {
      const { x, y } = posRef.current
      const trail = trailPosRef.current
      const scale = scaleRef.current
      const visible = visibleRef.current
      const opacity = visible ? 1 : 0
      const trailOpacity = visible ? 0.7 : 0

      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0) scale(${scale})`
        trailRef.current.style.opacity = String(trailOpacity)
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
        dotRef.current.style.opacity = String(opacity)
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
        ringRef.current.style.opacity = String(opacity)
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${x}px, ${y - 38}px, 0) scale(${labelTextRef.current ? 1 : 0.85})`
        labelRef.current.style.opacity = visible && labelTextRef.current ? '1' : '0'
      }
    }

    const setLabel = (next: string) => {
      if (labelTextRef.current === next) return
      labelTextRef.current = next
      scaleRef.current = next ? 1.5 : 1
      if (labelRef.current) {
        labelRef.current.textContent = next
        labelRef.current.style.display = next ? 'block' : 'none'
      }
    }

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      visibleRef.current = true

      const target = (e.target as HTMLElement | null)?.closest('[data-cursor]')
      const kind = target?.getAttribute('data-cursor')
      if (kind === 'talk') setLabel("LET'S TALK")
      else if (kind === 'view') setLabel('VIEW')
      else if (kind === 'explore' || kind === 'choose') setLabel('EXPLORE')
      else setLabel('')
    }

    const onLeave = () => {
      visibleRef.current = false
      applyTransform()
    }

    let raf = 0
    const tick = () => {
      trailPosRef.current = {
        x: trailPosRef.current.x + (posRef.current.x - trailPosRef.current.x) * 0.12,
        y: trailPosRef.current.y + (posRef.current.y - trailPosRef.current.y) * 0.12,
      }
      applyTransform()
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] hidden md:block"
      aria-hidden
    >
      <div
        ref={trailRef}
        className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-lime/25 will-change-transform"
        style={{ opacity: 0 }}
      />
      <div
        ref={dotRef}
        className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime will-change-transform"
        style={{ opacity: 0 }}
      />
      <div
        ref={ringRef}
        className="absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-lime/50 will-change-transform"
        style={{ opacity: 0 }}
      />
      <span
        ref={labelRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-lime px-3 py-1 font-display text-[10px] font-semibold tracking-wider text-obsidian will-change-transform"
        style={{ display: 'none', opacity: 0 }}
      />
    </div>
  )
}
