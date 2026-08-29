import { faqItems } from '@/data/faq'
import { FAQList } from '@/components/FAQItem'
import { Reveal } from '@/components/Reveal'

export function FAQ() {
  return (
    <section
      className="bg-blue px-5 py-24 text-yellow md:px-8 md:py-32"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="text-[11px] tracking-[0.3em] text-orange">FAQ</p>
          <h2
            id="faq-heading"
            className="mt-3 font-display text-4xl font-bold tracking-tight text-yellow md:text-5xl"
          >
            Questions before you speak?
          </h2>
          <p className="mt-4 text-ivory/80">
            Straight answers. If you need more, let&apos;s talk on WhatsApp.
          </p>
        </Reveal>
        <div className="lg:col-span-7">
          <FAQList items={faqItems} onBlue />
        </div>
      </div>
    </section>
  )
}
