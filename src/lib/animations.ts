export const easings = {
  smooth: [0.22, 1, 0.36, 1] as const,
  cinematic: [0.16, 1, 0.3, 1] as const,
  soft: [0.4, 0, 0.2, 1] as const,
}

export const durations = {
  fast: 0.35,
  base: 0.55,
  slow: 0.85,
  intro: 2.2,
}

export const revealVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.base, ease: easings.smooth },
  },
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: durations.base, ease: easings.smooth },
}
