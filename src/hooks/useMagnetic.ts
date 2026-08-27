import { useCallback, useRef, type MouseEvent } from 'react'
import { useReducedMotion } from './useReducedMotion'

export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null)
  const reduced = useReducedMotion()

  const onMove = useCallback(
    (e: MouseEvent<T>) => {
      if (reduced) return
      const node = ref.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      node.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    },
    [reduced, strength],
  )

  const onLeave = useCallback(() => {
    const node = ref.current
    if (!node) return
    node.style.transform = 'translate(0px, 0px)'
  }, [])

  return { ref, onMove, onLeave }
}
