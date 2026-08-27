import { WhatsAppButton } from '@/components/WhatsAppButton'
import { VoiceWave } from '@/components/VoiceWave'
import { Users, MessageCircle, Sparkles } from 'lucide-react'

export function SpeakingClub() {
  return (
    <section
      id="speaking-club"
      className="relative overflow-hidden bg-obsidian px-5 py-24 text-ivory md:px-8 md:py-32"
      aria-labelledby="club-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-[11px] tracking-[0.3em] text-lime">SPEAKING CLUB</p>
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
          <div className="mt-5">
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

        <div className="space-y-4">
          {[
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
          ].map((item) => (
            <div
              key={item.t}
              className="flex gap-4 border border-ivory/15 bg-ivory/[0.03] p-5 transition hover:border-lime/35"
            >
              <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-lime" aria-hidden />
              <div>
                <h3 className="font-display text-lg font-semibold">{item.t}</h3>
                <p className="mt-1 text-sm text-ivory/60">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
