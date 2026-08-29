import { motion } from 'motion/react'
import type { AvulsaPlan, SemestralPlan, PricingMode } from '@/data/plans'
import { formatBRL } from '@/data/plans'
import { colors } from '@/config/colors'
import { WhatsAppButton } from './WhatsAppButton'
import { TiltCard3D, TiltCardLayer } from './TiltCard3D'
import { FastPrice } from './FastPrice'
import { ElectricBorder } from '@/components/bits/ElectricBorder'

interface PlanCardProps {
  mode: PricingMode
  plan: AvulsaPlan | SemestralPlan
  index?: number
  animationKey?: string
}

function isSemestral(plan: AvulsaPlan | SemestralPlan): plan is SemestralPlan {
  return 'installment' in plan
}

export function PlanCard({ mode, plan, index = 0, animationKey }: PlanCardProps) {
  const featured = Boolean(plan.featured)
  const planName =
    mode === 'avulsa'
      ? `Mensalidade avulsa — ${plan.label}`
      : `Semestral 20h — ${plan.label}`

  const priceAmount = isSemestral(plan) ? plan.installment : plan.pricePerHour
  const priceFrom = Math.max(0, Math.round(priceAmount * 0.15))
  const priceDelayMs = index * 150
  const priceKey = `${animationKey ?? mode}-${plan.id}-price`

  const card = (
    <TiltCard3D
      featured={featured}
      className={`relative flex flex-col border p-6 md:p-8 ${
        featured
          ? 'min-h-[340px] border-orange bg-orange text-obsidian md:z-10 md:scale-[1.04]'
          : 'border-ivory/20 bg-obsidian text-ivory'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <TiltCardLayer depth={8}>
            <p
              className={`text-[10px] uppercase tracking-[0.25em] ${
                featured ? 'text-obsidian/60' : 'text-ivory/50'
              }`}
            >
              {mode === 'avulsa' ? 'Avulsa' : 'Semestral'}
            </p>
          </TiltCardLayer>
          <TiltCardLayer depth={20}>
            <h3 className="mt-2 font-display text-2xl font-bold md:text-3xl">{plan.label}</h3>
          </TiltCardLayer>
        </div>
        {featured && (
          <span className="rounded-full bg-obsidian px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-orange">
            Popular
          </span>
        )}
      </div>

      <TiltCardLayer depth={12} className="mt-8 flex-1">
        {isSemestral(plan) ? (
          <>
            <p className="font-display text-4xl font-bold md:text-5xl">
              {plan.installments}x{' '}
              <FastPrice
                key={priceKey}
                amount={plan.installment}
                from={priceFrom}
                durationMs={1000}
                delayMs={priceDelayMs}
              />
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
              <FastPrice
                key={priceKey}
                amount={plan.pricePerHour}
                from={priceFrom}
                durationMs={1000}
                delayMs={priceDelayMs}
              />
              <span className="text-lg font-medium opacity-70"> /h</span>
            </p>
            <p
              className={`mt-2 text-sm ${featured ? 'text-obsidian/70' : 'text-ivory/60'}`}
            >
              {plan.note}
            </p>
          </>
        )}
      </TiltCardLayer>

      <motion.div className="mt-8" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <WhatsAppButton
          planName={planName}
          label="CHOOSE PLAN →"
          variant={featured ? 'dark' : 'orange'}
          className="w-full"
        />
      </motion.div>
    </TiltCard3D>
  )

  if (featured) {
    return (
      <ElectricBorder color={colors.orange} speed={0.8} chaos={0.4} borderRadius={0}>
        {card}
      </ElectricBorder>
    )
  }

  return card
}
