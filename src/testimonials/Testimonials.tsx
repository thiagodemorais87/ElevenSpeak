import { testimonials } from '@/data/testimonials'
import { TestimonialSlider } from '@/components/TestimonialSlider'

export function Testimonials() {
  return (
    <section
      className="bg-ivory px-5 py-24 text-obsidian md:px-8 md:py-32"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] tracking-[0.3em] text-obsidian/40">TESTIMONIALS</p>
        <h2
          id="testimonials-heading"
          className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl"
        >
          Words from our students.
        </h2>
        <div className="mt-14">
          <TestimonialSlider items={testimonials} />
        </div>
      </div>
    </section>
  )
}
