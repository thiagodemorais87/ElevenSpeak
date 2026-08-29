import { lazy, Suspense } from 'react'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { VoiceWave } from '@/components/VoiceWave'
import { LottieAccent } from '@/components/LottieAccent'
import { Users, MessageCircle, Sparkles } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/useIsMobile'
import type { BentoCardProps } from '@/components/bits/MagicBento'

const MagicBento = lazy(() =>
  import('@/components/bits/MagicBento').then((m) => ({ default: m.MagicBento })),
)

const clubCards = [
  {
    icon: MessageCircle,
    t: 'What it is',
    d: 'Live conversation sessions focused on fluency, connection and real topics.',
  },
  {
    icon: Users,
    t: 'Who it’s for',
    d: 'Learners who want more speaking reps and a sense of belonging beyond 1:1 lessons.',
  },
  {
    icon: Sparkles,
    t: 'How it works',
    d: '[EDITÁVEL] Frequência, duração e formato do clube — atualizar quando confirmado.',
  },
] as const

const bentoItems: BentoCardProps[] = clubCards.map((item) => ({
  label: item.t,
  title: item.t,
  description: item.d,
}))

export function SpeakingClub() {
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()
  const disableFx = reduced || isMobile

  return (
    <section
      id="speaking-club"
      className="relative overflow-hidden bg-blue px-5 py-24 text-yellow md:px-8 md:py-32"
      aria-labelledby="club-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-[11px] tracking-[0.3em] text-orange">SPEAKING CLUB</p>
          <h2
            id="club-heading"
            className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl"
          >
            Speak more.
            <br />
            Connect more.
            <br />
            Belong more.
          </h2>
          <div className="mt-5 flex items-center gap-4">
            <LottieAccent
              src="/lottie/community-accent.json"
              className="h-12 w-12 shrink-0"
            />
            <VoiceWave />
          </div>
          <p className="mt-6 max-w-md text-ivory/65">
            A community space to practice English out loud — guided themes, warm energy,
            and the courage that grows when you&apos;re not alone.
          </p>
          <div className="mt-8">
            <WhatsAppButton
              planName="Speaking Club"
              label="JOIN THE CLUB →"
              message="Olá! Vi o Speaking Club da Seven Speak e gostaria de saber mais."
            />
          </div>
        </div>

        <Suspense
          fallback={
            <div className="space-y-4">
              {clubCards.map((item) => (
                <div
                  key={item.t}
                  className="flex gap-4 border border-yellow/20 bg-yellow/10 p-5"
                >
                  <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-orange" aria-hidden />
                  <div>
                    <h3 className="font-display text-lg font-semibold">{item.t}</h3>
                    <p className="mt-1 text-sm text-ivory/60">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          }
        >
          <MagicBento
            embedded
            gridVariant="stack"
            items={bentoItems}
            enableStars={!disableFx}
            enableSpotlight={!disableFx}
            enableBorderGlow={!disableFx}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect={!disableFx}
            disableAnimations={disableFx}
            spotlightRadius={320}
            glowColor="255, 107, 0"
            getCardClassName={() =>
              'flex gap-4 border-yellow/20 bg-yellow/10 p-5 transition hover:border-orange/50'
            }
            renderCardContent={(_, index) => {
              const item = clubCards[index]!
              const Icon = item.icon
              return (
                <>
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-orange" aria-hidden />
                  <div>
                    <h3 className="font-display text-lg font-semibold">{item.t}</h3>
                    <p className="mt-1 text-sm text-yellow/75">{item.d}</p>
                  </div>
                </>
              )
            }}
          />
        </Suspense>
      </div>
    </section>
  )
}
