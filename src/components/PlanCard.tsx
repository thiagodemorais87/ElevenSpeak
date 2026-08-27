import { motion } from 'motion/react'
import type { AvulsaPlan, SemestralPlan, PricingMode } from '@/data/plans'
import { formatBRL } from '@/data/plans'
import { WhatsAppButton } from './WhatsAppButton'
import { AnimatedCard } from './AnimatedCard'
import { FastPrice } from './FastPrice'

interface PlanCardProps {
  mode: PricingMode
  plan: AvulsaPlan | SemestralPlan
}

function isSemestral(plan: AvulsaPlan | SemestralPlan): plan is SemestralPlan {
  return 'installment' in plan
}

export function PlanCard({ mode, plan }: PlanCardProps) {
  const featured = Boolean(plan.featured)
  const planName =
    mode === 'avulsa'
      ? `Mensalidade avulsa — ${plan.label}`
      : `Semestral 20h — ${plan.label}`

  return (
    <AnimatedCard
      featured={featured}
      className={`relative flex flex-col border p-6 md:p-8 ${
        featured
          ? 'min-h-[340px] border-lime bg-lime text-obsidian md:scale-[1.04] md:z-10'
          : 'border-ivory/20 bg-obsidian text-ivory'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p
            className={`text-[10px] uppercase tracking-[0.25em] ${
              featured ? 'text-obsidian/60' : 'text-ivory/50'
            }`}
          >
            {mode === 'avulsa' ? 'Avulsa' : 'Semestral'}
          </p>
          <h3 className="mt-2 font-display text-2xl font-bold md:text-3xl">
            {plan.label}
          </h3>
        </div>
        {featured && (
          <span className="rounded-full bg-obsidian px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-lime">
            Popular
          </span>
        )}
      </div>

      <div className="mt-8 flex-1">
        {isSemestral(plan) ? (
          <>
            <p className="font-display text-4xl font-bold md:text-5xl">
              {plan.installments}x{' '}
              <FastPrice key={`s-${plan.id}-${plan.installment}`} amount={plan.installment} />
            </p>
            <p
              className={`mt-2 text-sm ${featured ? 'text-obsidian/70' : 'text-ivory/60'}`}
            >
              Total {formatBRL(plan.total)} · {plan.hours}h · {plan.discountNote}
            </p>
          </>
        ) : (
          <>
            <p className="font-display text-4xl font-bold md:text-5xl">
              <FastPrice key={`a-${plan.id}-${plan.pricePerHour}`} amount={plan.pricePerHour} />
              <span className="text-lg font-medium opacity-70"> /h</span>
            </p>
            <p
              className={`mt-2 text-sm ${featured ? 'text-obsidian/70' : 'text-ivory/60'}`}
            >
              {plan.note}
            </p>
          </>
        )}
      </div>

      <motion.div className="mt-8" whileHover={{ scale: 1.02 }}>
        <WhatsAppButton
          planName={planName}
          label="CHOOSE PLAN →"
          variant={featured ? 'dark' : 'lime'}
          className="w-full"
        />
      </motion.div>
    </AnimatedCard>
  )
}
