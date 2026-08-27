import { faqItems } from '@/data/faq'
import { FAQList } from '@/components/FAQItem'

export function FAQ() {
  return (
    <section
      className="bg-warm-white px-5 py-24 text-obsidian md:px-8 md:py-32"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-[11px] tracking-[0.3em] text-obsidian/40">FAQ</p>
          <h2
            id="faq-heading"
            className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl"
          >
            Questions before you speak?
          </h2>
          <p className="mt-4 text-obsidian/60">
            Straight answers. If you need more, let&apos;s talk on WhatsApp.
          </p>
        </div>
        <div className="lg:col-span-7">
          <FAQList items={faqItems} />
        </div>
      </div>
    </section>
  )
}
