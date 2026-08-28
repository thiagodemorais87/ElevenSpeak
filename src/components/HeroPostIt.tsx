import { motion } from 'motion/react'
import { RenataPicture } from '@/components/RenataPicture'
import { aboutContent } from '@/data/about'
import { siteConfig } from '@/config/site'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function HeroPostIt() {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className="pointer-events-none absolute -right-2 top-0 z-20 w-24 rotate-[-4deg] bg-warm-white p-2 shadow-xl md:-right-4 md:top-2 md:w-28"
      animate={
        reduced
          ? undefined
          : {
              y: [0, -10, 6, 0],
            }
      }
      transition={
        reduced
          ? undefined
          : {
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }
      }
      aria-hidden
    >
      <div className="aspect-square overflow-hidden bg-obsidian/10">
        <RenataPicture
          alt={`${siteConfig.teacherName}, professora da Seven Speak`}
          className="h-full w-full scale-110 object-cover object-[center_15%]"
          priority
        />
      </div>
      <p className="mt-1.5 truncate font-script text-[11px] text-obsidian md:text-xs">
        {aboutContent.polaroidCaption}
      </p>
    </motion.div>
  )
}
