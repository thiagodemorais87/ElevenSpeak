import { motion } from 'motion/react'
import { testimonials } from '@/data/testimonials'
import { TestimonialSlider } from '@/components/TestimonialSlider'
import { SectionHeading } from '@/components/SectionHeading'
import { Reveal } from '@/components/Reveal'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function Testimonials() {
  const reduced = useReducedMotion()

  return (
    <section
      className="relative overflow-hidden bg-ivory px-5 py-24 text-obsidian md:px-8 md:py-32"
      aria-labelledby="testimonials-heading"
    >
      <motion.span
        className="pointer-events-none absolute left-4 top-16 font-display text-[12rem] leading-none text-blue/[0.06] md:left-8 md:text-[16rem]"
        aria-hidden
        initial={reduced ? false : { opacity: 0, scale: 0.9 }}
        whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        “
      </motion.span>

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          index="TESTIMONIALS"
          title="Words from our students."
          light
        />
        <h2 id="testimonials-heading" className="sr-only">
          Testimonials
        </h2>
        <Reveal className="mt-14">
          <TestimonialSlider items={testimonials} />
        </Reveal>
      </div>
    </section>
  )
}
