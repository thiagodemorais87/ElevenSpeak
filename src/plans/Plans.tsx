import { useState } from 'react'
import { motion } from 'motion/react'
import { avulsaPlans, semestralPlans, type PricingMode } from '@/data/plans'
import { PlanCard } from '@/components/PlanCard'
import { SectionHeading } from '@/components/SectionHeading'
import { useReducedMotion } from '@/hooks/useReducedMotion'

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
  const [mode, setMode] = useState<PricingMode>('avulsa')
  const reduced = useReducedMotion()
  const plans = mode === 'avulsa' ? avulsaPlans : semestralPlans

  return (
    <section
      id="plans"
      className="relative overflow-hidden bg-orange px-5 py-24 text-obsidian md:px-8 md:py-32"
      aria-labelledby="plans-heading"
    >
      <div
        className="pointer-events-none absolute -right-10 top-20 font-script text-[12rem] leading-none text-yellow/20"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          index="PLANS"
          title="Invest in your voice."
          subtitle="Mensalidade avulsa ou pacote semestral com 10% off. Escolha o formato que cabe na sua jornada."
          theme="orange"
        />
        <h2 id="plans-heading" className="sr-only">
          Plans
        </h2>

        <div
          className="mt-10 inline-flex rounded-full border border-obsidian/25 p-1"
          role="tablist"
          aria-label="Pricing mode"
        >
          {(
            [
              { id: 'avulsa', label: 'Mensalidade avulsa' },
              { id: 'semestral', label: 'Semestral — 20h' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={mode === tab.id}
              onClick={() => setMode(tab.id)}
              className={`relative rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide transition ${
                mode === tab.id ? 'text-yellow' : 'text-obsidian/60 hover:text-obsidian'
              }`}
            >
              {mode === tab.id && (
                <motion.span
                  layoutId="plan-tab"
                  className="absolute inset-0 rounded-full bg-blue"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        <div key={mode} className="mt-12 grid gap-4 md:grid-cols-3 md:items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={`${mode}-${plan.id}`}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={planEnterVariant(index, reduced)}
            >
              <PlanCard
                mode={mode}
                plan={plan}
                index={index}
                animationKey={`${mode}-${plan.id}`}
              />
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-obsidian/55">
          Valores por aluno. Aulas 1:1 ou em grupo conforme a modalidade.
        </p>
      </div>
    </section>
  )
}
