import { motion } from 'motion/react'
import type { SemestralPlan } from '@/data/plans'
import { formatBRL } from '@/data/plans'
import { colors } from '@/config/colors'
import { WhatsAppButton } from './WhatsAppButton'
import { TiltCard3D, TiltCardLayer } from './TiltCard3D'
import { FastPrice } from './FastPrice'
import { ElectricBorder } from '@/components/bits/ElectricBorder'

interface PlanCardProps {
  plan: SemestralPlan
  index?: number
  animationKey?: string
}

export function PlanCard({ plan, index = 0, animationKey }: PlanCardProps) {
  const featured = Boolean(plan.featured)
  const planName = `Semestral 20h — ${plan.label}`

  const priceFrom = Math.max(0, Math.round(plan.installment * 0.15))
  const priceDelayMs = index * 150
  const priceKey = `${animationKey ?? plan.id}-price`

  const card = (
    <TiltCard3D
      featured={featured}
      className={`relative flex flex-col border p-6 md:p-8 ${
        featured
          ? 'min-h-[340px] border-orange bg-orange/15 text-ivory md:z-10 md:scale-[1.04]'
          : 'border-ivory/20 bg-obsidian text-ivory'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <TiltCardLayer depth={8}>
            <p className="text-[10px] uppercase tracking-[0.25em] text-ivory/50">Semestral</p>
          </TiltCardLayer>
          <TiltCardLayer depth={20}>
            <h3 className="mt-2 font-display text-2xl font-bold md:text-3xl">{plan.label}</h3>
          </TiltCardLayer>
        </div>
        {featured && (
          <span className="rounded-full bg-orange px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-obsidian">
            Destaque
          </span>
        )}
      </div>

      <TiltCardLayer depth={12} className="mt-8 flex-1">
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
        <p className="mt-2 text-sm text-ivory/60">
          Total {formatBRL(plan.total)} · {plan.hours}h · {plan.discountNote}
        </p>
        <p className="mt-3 text-xs text-orange/90">+ Ellii incluso</p>
      </TiltCardLayer>

      <motion.div className="mt-8" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <WhatsAppButton
          planName={planName}
          label="CHOOSE PLAN →"
          variant={featured ? 'orange' : 'dark'}
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
