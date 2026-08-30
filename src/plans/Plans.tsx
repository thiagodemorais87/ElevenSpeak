import { motion } from 'motion/react'
import { semestralPlans } from '@/data/plans'
import { PlanCard } from '@/components/PlanCard'
import { SectionHeading } from '@/components/SectionHeading'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { BookOpen } from 'lucide-react'

function planEnterVariant(index: number, reduced: boolean) {
  if (reduced) {
    return {
      hidden: { opacity: 1, x: 0, y: 0 },
      visible: { opacity: 1, x: 0, y: 0 },
    }
  }

  if (index === 0) {
    return {
      hidden: { opacity: 0, x: -48, y: 0 },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          type: 'spring' as const,
          stiffness: 220,
          damping: 24,
          delay: 0,
        },
      },
    }
  }

  if (index === 1) {
    return {
      hidden: { opacity: 0, x: 0, y: 40 },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          type: 'spring' as const,
          stiffness: 220,
          damping: 24,
          delay: 0.15,
        },
      },
    }
  }

  return {
    hidden: { opacity: 0, x: 48, y: 0 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 220,
        damping: 24,
        delay: 0.3,
      },
    },
  }
}

export function Plans() {
  const reduced = useReducedMotion()

  return (
    <section
      id="plans"
      className="relative overflow-hidden bg-obsidian px-5 py-24 text-ivory md:px-8 md:py-32"
      aria-labelledby="plans-heading"
    >
      <div
        className="pointer-events-none absolute -right-10 top-20 font-script text-[12rem] leading-none text-orange/10"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          index="PLANOS"
          title="Invista na sua voz."
          subtitle="Pacotes semestrais de 20h com 10% de desconto. Inclui acesso à plataforma Ellii."
          theme="dark"
        />
        <h2 id="plans-heading" className="sr-only">
          Planos
        </h2>

        <div className="mt-12 grid gap-4 md:grid-cols-3 md:items-stretch">
          {semestralPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={planEnterVariant(index, reduced)}
            >
              <PlanCard plan={plan} index={index} animationKey={plan.id} />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:gap-4">
          <BookOpen className="h-5 w-5 shrink-0 text-orange" aria-hidden />
          <p className="max-w-xl text-sm text-ivory/75 md:text-base">
            Inclui acesso à plataforma <span className="font-semibold text-ivory">Ellii</span>{' '}
            — ESL Library, com materiais para estudar entre as aulas.
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-ivory/40">
          Valores por aluno. Aulas 1:1 ou em grupo conforme a modalidade.
        </p>
      </div>
    </section>
  )
}
