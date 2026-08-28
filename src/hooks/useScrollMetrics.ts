export interface ScrollMetrics {
  progress: number
  scrolled: boolean
}

type ScrollListener = (metrics: ScrollMetrics) => void

let progress = 0
let scrolled = false
let rafId = 0
let listening = false
const listeners = new Set<ScrollListener>()

function readMetrics(): ScrollMetrics {
  const doc = document.documentElement
  const max = doc.scrollHeight - doc.clientHeight
  return {
    progress: max > 0 ? doc.scrollTop / max : 0,
    scrolled: window.scrollY > 40,
  }
}

function notify() {
  const next = readMetrics()
  progress = next.progress
  scrolled = next.scrolled
  listeners.forEach((listener) => listener(next))
}

function onScroll() {
  if (rafId) return
  rafId = requestAnimationFrame(() => {
    rafId = 0
    notify()
  })
}

function ensureListening() {
  if (listening) return
  listening = true
  const initial = readMetrics()
  progress = initial.progress
  scrolled = initial.scrolled
  window.addEventListener('scroll', onScroll, { passive: true })
}

function stopListening() {
  if (!listening || listeners.size > 0) return
  listening = false
  window.removeEventListener('scroll', onScroll)
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = 0
  }
}

export function subscribeScrollMetrics(listener: ScrollListener): () => void {
  ensureListening()
  listener({ progress, scrolled })
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
    stopListening()
  }
}

export function getScrollMetrics(): ScrollMetrics {
  return { progress, scrolled }
}
