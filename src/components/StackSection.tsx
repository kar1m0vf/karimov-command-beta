import { motion } from 'framer-motion';
import { systemSignals, stackGroups } from '../data/portfolio';
import SectionHeading from './SectionHeading';

export default function StackSection() {
  return (
    <section id="system" className="section-pad relative overflow-hidden py-12 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_22%,rgba(125,211,252,.1),transparent_28rem),radial-gradient(circle_at_80%_64%,rgba(216,168,78,.12),transparent_30rem)]" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 grid gap-6 sm:mb-14 sm:gap-8 lg:grid-cols-[.95fr_1.05fr] lg:items-end">
          <SectionHeading
            eyebrow="System stack"
            title="A frontend surface with automation logic behind it."
            description="The portfolio is structured to communicate a specific builder profile: product UI, Telegram systems, Python workflows, data persistence and deployment discipline."
          />
          <div className="border-y border-bone/10 py-3">
            <div className="grid gap-2 md:grid-cols-2">
              {systemSignals.map((signal) => {
                const Icon = signal.icon;
                return (
                  <div
                    key={signal.label}
                    className="flex min-w-0 items-center gap-2 px-1 py-2 sm:gap-3"
                  >
                    <Icon size={15} className="shrink-0 text-gold" />
                    <span className="min-w-0 truncate font-mono text-[9px] uppercase tracking-[0.16em] text-muted sm:text-[10px] sm:tracking-[0.18em]">{signal.label}</span>
                    <span className="shrink-0 text-xs text-bone sm:text-sm">{signal.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden border-y border-bone/10">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(246,239,229,.04)_1px,transparent_1px),linear-gradient(rgba(246,239,229,.035)_1px,transparent_1px)] bg-[length:5rem_5rem]" />
          <div className="relative grid divide-y divide-bone/10 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {stackGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-90px' }}
                transition={{ delay: index * 0.08, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                className="group min-h-[25rem] p-5 transition hover:bg-white/[0.03] sm:p-7 lg:min-h-[32rem]"
              >
                <div className="mb-8 flex items-start justify-between sm:mb-12">
                  <div>
                    <span className="grid h-11 w-11 place-items-center rounded-2xl border border-gold/25 bg-gold/10 text-gold">
                      <Icon size={22} />
                    </span>
                    <span className="mt-8 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted sm:text-xs">0{index + 1}</span>
                  </div>
                  <span className="h-px w-20 translate-y-5 bg-gradient-to-r from-gold/60 to-transparent transition group-hover:w-28" />
                </div>
                <h3 className="max-w-xs text-[clamp(2rem,5vw,4rem)] font-semibold leading-[0.9] tracking-[-0.08em] text-bone">{group.title}</h3>
                <div className="mt-8 grid gap-0 border-y border-bone/10 sm:mt-10">
                  {group.items.map((item) => (
                    <div key={item} className="flex items-center justify-between border-b border-bone/10 px-0 py-3 text-sm text-muted last:border-b-0 sm:text-base">
                      <span>{item}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-gold/70" />
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
