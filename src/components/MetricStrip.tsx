import { useRef, useState } from 'react';
import { Activity, ArrowRight, Braces, Cpu, Database, Github, RadioTower, Sparkles, Workflow } from 'lucide-react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { metrics, projects } from '../data/portfolio';
import { cn } from '../utils/cn';

const phases = [
  {
    eyebrow: '01 / identity',
    title: 'Identity becomes a product surface.',
    description: 'The first read is not a resume block. It is a clear command interface around a builder identity.',
    route: ['name', 'positioning', 'signal'],
    activeNodes: ['interface', 'proof'],
    stat: metrics[0],
    icon: Sparkles
  },
  {
    eyebrow: '02 / automation',
    title: 'Frontend and automation connect.',
    description: 'React, Python, Telegram and SQLite are presented as one route instead of disconnected skills.',
    route: ['React UI', 'Python logic', 'Telegram alert'],
    activeNodes: ['interface', 'automation', 'alerts'],
    stat: metrics[1],
    icon: Workflow
  },
  {
    eyebrow: '03 / proof',
    title: 'Projects carry evidence.',
    description: 'Each case is judged by problem, system behavior, proof and delivery rather than a generic preview card.',
    route: ['case', 'proof', 'repo'],
    activeNodes: ['proof', 'storage', 'interface'],
    stat: metrics[2],
    icon: Activity
  },
  {
    eyebrow: '04 / delivery',
    title: 'The portfolio ships as a system.',
    description: 'Command palette, overlays, responsive behavior and GitHub Pages delivery become part of the case study.',
    route: ['motion', 'source', 'deploy'],
    activeNodes: ['interface', 'storage', 'proof'],
    stat: metrics[3],
    icon: Github
  }
];

const mapNodes = [
  { key: 'interface', label: 'interface', value: 'React / TS', icon: Braces, position: 'left-4 top-4 sm:left-6 sm:top-6' },
  { key: 'automation', label: 'automation', value: 'Python flow', icon: Cpu, position: 'right-4 top-4 sm:right-6 sm:top-6' },
  { key: 'alerts', label: 'alerts', value: 'Telegram', icon: RadioTower, position: 'left-4 bottom-4 sm:left-6 sm:bottom-6' },
  { key: 'storage', label: 'storage', value: 'SQLite', icon: Database, position: 'right-4 bottom-4 sm:right-6 sm:bottom-6' }
];

const proofMap = [
  { label: 'flagship', value: projects[0].title },
  { label: 'playable', value: projects[1].title },
  { label: 'source', value: projects[2].title }
];

export default function MetricStrip() {
  const ref = useRef<HTMLElement>(null);
  const [activePhase, setActivePhase] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 72%', 'end 34%']
  });

  const coreScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1.04, 0.98]);
  const coreRotate = useTransform(scrollYProgress, [0, 1], [-2.5, 2.5]);
  const lineProgress = useTransform(scrollYProgress, [0.05, 0.85], [0.1, 1]);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = Math.min(phases.length - 1, Math.max(0, Math.floor(value * phases.length)));
    setActivePhase(next);
  });

  const active = phases[activePhase];
  const ActiveIcon = active.icon;

  return (
    <section ref={ref} id="signals" className="section-pad relative overflow-hidden py-10 sm:py-14 lg:min-h-[126vh] lg:py-0">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(216,168,78,.15),transparent_24rem),radial-gradient(circle_at_80%_56%,rgba(125,211,252,.12),transparent_26rem)]" />
      <div className="command-scene-grid" aria-hidden="true" />

      <div className="mx-auto max-w-7xl lg:sticky lg:top-[6.5rem]">
        <div data-signal-shell className="grid gap-3 lg:h-[min(760px,calc(100svh-7rem))] lg:grid-cols-[.42fr_1.58fr]">
          <aside className="relative z-10 flex min-h-0 flex-col rounded-[1.75rem] border border-bone/10 bg-ink/55 p-4 backdrop-blur-xl sm:p-5 lg:overflow-hidden lg:p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold sm:text-xs sm:tracking-[0.34em]">
              Signal architecture
            </p>
            <h2 className="mt-3 text-balance text-[2.1rem] font-semibold leading-[0.96] tracking-[-0.06em] text-bone sm:text-5xl lg:text-[2.24rem] xl:text-[2.55rem]">
              One route for interface, automation and proof.
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted lg:text-[13px] lg:leading-5">
              Scroll changes the active blueprint while the visual map stays readable and wide.
            </p>

            <div className="mt-4 grid min-h-0 flex-1 gap-2">
              {phases.map((phase, index) => (
                <button
                  key={phase.eyebrow}
                  type="button"
                  onClick={() => setActivePhase(index)}
                  className={cn(
                    'grid min-h-0 grid-cols-[30px_1fr] gap-3 rounded-2xl border p-3 text-left transition lg:p-2',
                    index === activePhase
                      ? 'border-gold/35 bg-gold/[0.08] text-bone shadow-[0_18px_45px_rgba(216,168,78,.08)]'
                      : 'border-bone/10 bg-white/[0.025] text-muted hover:border-bone/20 hover:bg-white/[0.04]'
                  )}
                >
                  <span
                    className={cn(
                      'mt-0.5 grid h-7 w-7 place-items-center rounded-full border font-mono text-[9px]',
                      index === activePhase ? 'border-gold/40 bg-gold/15 text-bone' : 'border-bone/10 bg-ink text-muted'
                    )}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-mono text-[9px] uppercase tracking-[0.2em] text-gold">{phase.eyebrow.split('/')[1]}</span>
                    <span className="mt-1 block text-sm font-semibold leading-5 text-bone lg:text-[12px] lg:leading-[1.2] xl:text-[13px]">{phase.title}</span>
                  </span>
                </button>
              ))}
            </div>
          </aside>

          <div className="grid min-h-0 min-w-0 gap-2.5 lg:grid-rows-[auto_1fr_auto]">
            <div className="premium-border rounded-[1.75rem] p-3 sm:rounded-[2rem] sm:p-4 lg:p-3">
              <div className="grid gap-3 lg:grid-cols-[1fr_.34fr] lg:items-stretch">
                <div className="flex h-[240px] flex-col rounded-[1.25rem] border border-bone/10 bg-ink/55 p-4 sm:h-[210px] lg:h-[126px] lg:p-3 xl:h-[132px]">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/10 text-gold">
                      <ActiveIcon size={18} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-gold">{active.eyebrow}</p>
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={active.title}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.22 }}
                          className="min-h-[3.25rem] text-xl font-semibold leading-[1.12] tracking-[-0.04em] text-bone sm:min-h-[2rem] lg:min-h-[1.55rem] lg:text-base"
                        >
                          {active.title}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={active.description}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22 }}
                      className="mt-2 min-h-[5.25rem] text-sm leading-7 text-muted sm:min-h-[4.5rem] lg:min-h-[2.45rem] lg:text-[13px] lg:leading-5"
                    >
                      {active.description}
                    </motion.p>
                  </AnimatePresence>
                  <div className="mt-auto flex min-h-[4.75rem] flex-wrap items-end gap-2 pt-4 sm:min-h-[2.5rem] lg:min-h-[1.75rem] lg:pt-1">
                    {active.route.map((item, index) => (
                      <div key={item} className="flex items-center gap-2">
                        <span className="rounded-full border border-bone/10 bg-white/[0.035] px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-bone">
                          {item}
                        </span>
                        {index < active.route.length - 1 ? <ArrowRight size={13} className="text-gold/70" /> : null}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex h-[150px] flex-col justify-center rounded-[1.25rem] border border-bone/10 bg-white/[0.035] p-4 sm:h-[150px] lg:h-[126px] lg:p-3 xl:h-[132px]">
                  <p className="text-4xl font-semibold tracking-[-0.08em] text-bone lg:text-[2rem]">{active.stat.value}</p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-gold">{active.stat.label}</p>
                  <p className="mt-2 min-h-[2.5rem] text-sm text-muted lg:min-h-[2rem] lg:text-xs lg:leading-4">{active.stat.detail}</p>
                </div>
              </div>
            </div>

            <div className="signal-map-grid relative min-h-[390px] overflow-hidden rounded-[1.75rem] border border-bone/10 bg-ink/65 sm:min-h-[440px] lg:min-h-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(216,168,78,.14),transparent_18rem),radial-gradient(circle_at_76%_72%,rgba(125,211,252,.11),transparent_20rem)]" />
              <p className="pointer-events-none absolute -left-4 top-3 select-none text-[4rem] font-semibold leading-none tracking-[-0.08em] text-bone/[0.035] sm:text-[7rem]">
                KAMIL
              </p>

              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 900 520" preserveAspectRatio="none" aria-hidden="true">
                <path d="M136 104 C276 70 370 176 450 230 S642 172 764 118" fill="none" stroke="rgba(246,239,229,.1)" strokeWidth="1.5" />
                <path d="M136 402 C284 314 370 424 450 330 S642 300 764 398" fill="none" stroke="rgba(246,239,229,.1)" strokeWidth="1.5" />
                <motion.path
                  style={{ pathLength: lineProgress }}
                  d={activePhase % 2 === 0 ? 'M136 104 C276 70 370 176 450 230 S642 172 764 118' : 'M136 402 C284 314 370 424 450 330 S642 300 764 398'}
                  fill="none"
                  stroke={activePhase % 2 === 0 ? 'rgba(216,168,78,.72)' : 'rgba(125,211,252,.66)'}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>

              {mapNodes.map((node) => {
                const Icon = node.icon;
                const enabled = active.activeNodes.includes(node.key);
                return (
                  <div
                    key={node.key}
                    className={cn(
                      'absolute z-10 w-[8.5rem] rounded-2xl border p-2.5 transition sm:w-44 sm:p-4',
                      node.position,
                      enabled
                        ? 'border-gold/35 bg-gold/[0.08] text-bone shadow-[0_18px_60px_rgba(216,168,78,.1)]'
                        : 'border-bone/10 bg-black/30 text-muted opacity-65'
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-xl', enabled ? 'bg-gold/15 text-gold' : 'bg-white/[0.04] text-muted')}>
                        <Icon size={16} />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-mono text-[8px] uppercase tracking-[0.2em]">{node.label}</p>
                        <p className="mt-0.5 truncate text-xs font-semibold sm:text-sm">{node.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="absolute left-1/2 top-1/2 z-20 flex h-[12rem] w-[14rem] -translate-x-1/2 -translate-y-1/2 flex-col justify-center rounded-[1.5rem] border border-bone/10 bg-black/55 p-4 text-center shadow-glow sm:h-[13rem] sm:w-[17rem] sm:p-5 lg:h-[10rem] lg:w-[14rem] lg:p-4">
                <motion.div style={{ scale: coreScale, rotate: coreRotate }} className="mx-auto grid h-14 w-14 place-items-center rounded-[1.1rem] border border-bone/10 bg-white/[0.045] text-3xl font-semibold tracking-[-0.08em] text-bone lg:h-12 lg:w-12 lg:text-2xl">
                  K
                </motion.div>
                <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.24em] text-gold">command core</p>
                <p className="mx-auto mt-2 flex min-h-[3.25rem] max-w-[14rem] items-center justify-center text-sm font-semibold leading-5 text-bone sm:text-base sm:leading-6 lg:min-h-[2.75rem] lg:text-sm lg:leading-5">
                  {active.title}
                </p>
              </div>
            </div>

            <div className="grid gap-2.5 sm:grid-cols-3">
              {proofMap.map((item, index) => (
                <div key={item.label} className="min-w-0 rounded-2xl border border-bone/10 bg-white/[0.035] p-3 lg:p-2.5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold lg:text-[8px]">0{index + 1} / {item.label}</p>
                  <p className="mt-2 text-sm font-semibold leading-5 text-bone lg:text-xs lg:leading-4">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
