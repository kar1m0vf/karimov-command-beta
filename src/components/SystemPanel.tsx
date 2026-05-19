import { useEffect, useState } from 'react';
import { ArrowUpRight, Bot, Github, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { profile, projects, type Project } from '../data/portfolio';
import { cn } from '../utils/cn';

type Props = {
  onOpenProject: (project: Project) => void;
};

const pipelineSteps = [
  { label: 'track', title: 'Product added', meta: 'watchlist #024' },
  { label: 'compare', title: 'Price changed', meta: '-31% delta' },
  { label: 'notify', title: 'Telegram alert', meta: 'message sent' },
  { label: 'store', title: 'History saved', meta: 'SQLite row' }
];

const chartPoints = [
  { cx: 64, cy: 20 },
  { cx: 130, cy: 32 },
  { cx: 204, cy: 28 },
  { cx: 244, cy: 55 }
];

export default function SystemPanel({ onOpenProject }: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const activeEvent = pipelineSteps[activeStep];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveStep((step) => (step + 1) % pipelineSteps.length);
    }, 1800);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, rotateX: 8 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ delay: 0.18, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="premium-border relative mx-auto w-[calc(100vw-2rem)] max-w-xl min-w-0 overflow-hidden rounded-[1.5rem] p-2.5 sm:w-full sm:rounded-[2rem] sm:p-4"
    >
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative min-w-0 rounded-[1.25rem] border border-bone/10 bg-ink/60 p-3 sm:rounded-[1.55rem] sm:p-4">
        <div className="mb-3 flex items-center justify-between gap-3 border-b border-bone/10 pb-3 sm:mb-4 sm:gap-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-gold sm:text-[10px] sm:tracking-[0.3em]">Live surface</p>
            <h2 className="mt-1.5 text-lg font-semibold tracking-[-0.04em] text-bone sm:mt-2 sm:text-2xl">Product command center</h2>
          </div>
          <div className="rounded-full border border-mint/25 bg-mint/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-mint sm:px-3 sm:text-[10px] sm:tracking-[0.2em]">
            online
          </div>
        </div>

        <div className="space-y-2.5 sm:space-y-3">
          <div className="min-w-0 rounded-[1.15rem] border border-gold/20 bg-gradient-to-br from-gold/10 via-white/[0.03] to-cyan/5 p-3 sm:rounded-[1.35rem]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold sm:h-10 sm:w-10 sm:rounded-2xl">
                  <Bot size={20} />
                </span>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted sm:text-[10px] sm:tracking-[0.25em]">Trendyol pipeline</p>
                  <motion.p
                    key={activeEvent.title}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs font-semibold text-bone sm:text-sm"
                    aria-live="polite"
                  >
                    {activeEvent.title}
                  </motion.p>
                </div>
              </div>
              <Zap className="text-gold" size={18} />
            </div>

            <div className="mt-3 grid min-w-0 gap-2.5 sm:mt-4 sm:gap-3 lg:grid-cols-[1.05fr_.72fr]">
              <div className="min-w-0 rounded-2xl border border-bone/10 bg-ink/55 p-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-muted sm:text-sm">Nike product watch</p>
                    <p className="mt-1 text-2xl font-semibold tracking-[-0.06em] text-bone sm:text-3xl">-31% alert</p>
                  </div>
                  <span className="rounded-full bg-mint/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-mint sm:px-3 sm:text-[10px] sm:tracking-[0.22em]" aria-live="polite">
                    {activeEvent.label}
                  </span>
                </div>

                <div className="mt-3 h-12 overflow-hidden rounded-xl border border-bone/10 bg-graphite/70 p-2.5 sm:mt-4 sm:h-16 sm:p-3">
                  <svg viewBox="0 0 280 70" className="h-full w-full" aria-hidden="true">
                    <defs>
                      <linearGradient id="line" x1="0" x2="1">
                        <stop offset="0%" stopColor="#D8A84E" />
                        <stop offset="100%" stopColor="#7DD3FC" />
                      </linearGradient>
                    </defs>
                    <path d="M0 20 C30 26 38 10 64 20 S105 44 130 32 S176 12 204 28 S244 60 280 38" fill="none" stroke="rgba(246,239,229,.11)" strokeWidth="2" />
                    <path d="M0 20 C30 26 38 10 64 20 S105 44 130 32 S176 12 204 28 S244 60 280 38" fill="none" stroke="url(#line)" strokeWidth="3" strokeLinecap="round" strokeDasharray="420" strokeDashoffset="0" />
                    <motion.circle
                      animate={chartPoints[activeStep]}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      r="4"
                      fill="#8FE388"
                    />
                  </svg>
                </div>

                <button
                  onClick={() => onOpenProject(projects[0])}
                  data-cursor="case"
                  data-cursor-label="Open case"
                  className="mt-3 flex w-full items-center justify-between rounded-xl border border-gold/20 bg-gold/10 px-3 py-2.5 text-left text-sm text-bone transition hover:bg-gold/15 sm:mt-4 sm:rounded-2xl sm:px-4 sm:py-3"
                >
                  Open flagship case <ArrowUpRight size={16} />
                </button>
              </div>

              <div className="hidden min-w-0 rounded-xl border border-bone/10 bg-white/[0.025] p-3 sm:block sm:rounded-2xl">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted sm:text-[10px] sm:tracking-[0.24em]">system trace</p>
                <div className="mt-2.5 space-y-1.5 sm:mt-3 sm:space-y-2">
                  {pipelineSteps.map((step, index) => (
                    <div
                      key={step.label}
                      className={cn(
                        'relative rounded-lg border px-3 py-1.5 pl-7 transition sm:rounded-xl sm:py-2 sm:pl-8',
                        index === activeStep ? 'border-gold/35 bg-gold/10' : 'border-bone/10 bg-white/[0.025]'
                      )}
                    >
                      <span className={cn('absolute left-3 top-2.5 h-1.5 w-1.5 rounded-full sm:top-3 sm:h-2 sm:w-2', index === activeStep ? 'bg-gold' : 'bg-bone/25')} />
                      <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted sm:text-[9px] sm:tracking-[0.18em]">0{index + 1} / {step.label}</p>
                      <p className="mt-0.5 text-[11px] font-semibold text-bone sm:mt-1 sm:text-xs">{step.meta}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <a
              href={profile.portfolioRepo}
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
              data-cursor-label="Source"
              className="group grid min-w-0 gap-3 overflow-hidden rounded-xl border border-bone/10 bg-white/[0.035] p-3 transition hover:border-gold/35 hover:bg-gold/[0.06] sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-4 sm:rounded-2xl sm:p-4"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.04] text-gold transition group-hover:scale-105 sm:h-11 sm:w-11">
                <Github size={19} />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted sm:text-[10px] sm:tracking-[0.24em]">Portfolio source</p>
                <p className="mt-1.5 truncate text-sm font-semibold text-bone sm:mt-2 sm:text-base">kar1m0vf.github.io</p>
                <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-ink/70 sm:mt-3">
                  <span className="block h-full w-[72%] rounded-full bg-gradient-to-r from-gold via-cyan to-mint transition-all group-hover:w-full" />
                </div>
              </div>
              <ArrowUpRight className="text-muted transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-bone" size={17} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
