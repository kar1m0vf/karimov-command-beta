import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { experiments } from '../data/portfolio';
import SectionHeading from './SectionHeading';
import { cn } from '../utils/cn';

const accentClasses = {
  gold: 'text-gold bg-gold/10 border-gold/25',
  cyan: 'text-cyan bg-cyan/10 border-cyan/25',
  green: 'text-mint bg-mint/10 border-mint/25',
  rose: 'text-rose bg-rose/10 border-rose/25'
};

const accentBars = {
  gold: 'from-gold/75 to-gold/5',
  cyan: 'from-cyan/75 to-cyan/5',
  green: 'from-mint/75 to-mint/5',
  rose: 'from-rose/75 to-rose/5'
};

export default function ExperimentsSection() {
  return (
    <section id="experiments" className="section-pad relative overflow-hidden py-12 sm:py-24">
      <div className="absolute inset-y-0 right-0 -z-10 w-1/2 bg-[radial-gradient(circle_at_80%_40%,rgba(201,138,122,.12),transparent_26rem)]" />
      <div className="command-scene-grid opacity-50" aria-hidden="true" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 grid gap-5 sm:mb-12 sm:gap-6 lg:grid-cols-[1fr_.72fr] lg:items-end">
          <SectionHeading
            eyebrow="Build backlog"
            title="Small experiments with measurable proof."
            description="This section is an evolving lab for focused builds: admin panels, commerce interfaces and automation consoles with clear scope and delivery targets."
          />
          <div className="border-l border-gold/25 pl-5 text-sm leading-7 text-muted sm:text-base">
            The lab is now treated like a production queue: every future piece needs a reason, a visible interaction and proof that it can ship.
          </div>
        </div>

        <div className="relative overflow-hidden border-y border-bone/10">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(246,239,229,.04)_1px,transparent_1px),radial-gradient(circle_at_24%_28%,rgba(216,168,78,.12),transparent_24rem),radial-gradient(circle_at_84%_70%,rgba(125,211,252,.1),transparent_26rem)] bg-[length:4rem_100%,100%_100%,100%_100%]" />

          <div className="relative grid gap-0 lg:grid-cols-[.36fr_.64fr]">
            <div className="border-b border-bone/10 p-5 sm:p-8 lg:border-b-0 lg:border-r lg:border-bone/10">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold">queue state</p>
              <p className="mt-5 text-[clamp(3.8rem,14vw,9rem)] font-semibold leading-[0.78] tracking-[-0.1em] text-bone">
                Lab
                <br />
                Route
              </p>
              <div className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-[1rem] border border-bone/10 bg-bone/10 sm:max-w-md">
                {['problem', 'motion', 'proof'].map((item, index) => (
                  <div key={item} className="bg-ink/80 p-3">
                    <p className="font-mono text-[9px] text-gold">0{index + 1}</p>
                    <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="divide-y divide-bone/10">
              {experiments.map((experiment, index) => {
                const Icon = experiment.icon;
                return (
                  <motion.article
                    key={experiment.title}
                    initial={{ opacity: 0, x: 48 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-90px' }}
                    transition={{ delay: index * 0.08, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative grid gap-5 p-5 transition hover:bg-white/[0.035] sm:p-7 lg:grid-cols-[5.5rem_1fr_auto] lg:items-center"
                  >
                    <div className={cn('absolute inset-y-0 left-0 w-px bg-gradient-to-b opacity-70', accentBars[experiment.accent])} />
                    <div className="flex items-center gap-3 lg:block">
                      <span className={cn('grid h-12 w-12 place-items-center rounded-2xl border', accentClasses[experiment.accent])}>
                        <Icon size={22} />
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted lg:mt-8 lg:block">0{index + 1}</span>
                    </div>

                    <div className="min-w-0">
                      <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-gold sm:text-[10px]">{experiment.label}</p>
                      <h3 className="mt-2 text-[clamp(1.7rem,4vw,3.2rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-bone">
                        {experiment.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base sm:leading-7">{experiment.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 lg:max-w-[13rem] lg:justify-end">
                      {experiment.stack.map((item) => (
                        <span key={item} className="rounded-full border border-bone/10 bg-black/20 px-3 py-1 text-xs text-muted">
                          {item}
                        </span>
                      ))}
                      <span className="inline-flex items-center gap-2 rounded-full border border-bone/10 bg-bone px-3 py-1 text-xs font-semibold text-ink">
                        planned <ArrowUpRight size={13} />
                      </span>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
