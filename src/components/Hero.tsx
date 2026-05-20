import { ArrowDown, ArrowUpRight, Bot, Command, Github, RadioTower, Sparkles, Zap } from 'lucide-react';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { profile, projects } from '../data/portfolio';
import MagneticButton from './MagneticButton';
import type { Project } from '../data/portfolio';

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

type Props = {
  onOpenCommand: () => void;
  onOpenProject: (project: Project) => void;
};

export default function Hero({ onOpenCommand, onOpenProject }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -86]);
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 58]);
  const stageRotate = useTransform(scrollYProgress, [0, 1], [0, -2]);
  const marqueeX = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);

  return (
    <section ref={ref} id="intro" className="hero-viewport section-pad relative flex items-start overflow-hidden pb-8 pt-24 sm:pb-10 sm:pt-28 lg:pt-[7.5rem]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_28%_18%,rgba(216,168,78,.16),transparent_26rem),radial-gradient(circle_at_78%_26%,rgba(125,211,252,.12),transparent_30rem)]" />
      <div className="scanlines" />
      <div className="grid-floor" />
      <div className="command-scene-grid opacity-80" aria-hidden="true" />

      <motion.div
        style={{ x: marqueeX }}
        className="pointer-events-none absolute left-0 top-[5.7rem] z-0 flex w-max gap-8 whitespace-nowrap border-y border-bone/[0.07] py-2 font-mono text-[10px] uppercase tracking-[0.45em] text-bone/20"
        aria-hidden="true"
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <span key={index}>React systems / automation logic / product proof / cinematic UI</span>
        ))}
      </motion.div>

      <div className="mx-auto grid min-h-[calc(100svh-8.5rem)] w-full max-w-7xl min-w-0 items-center gap-6 sm:min-h-[calc(100svh-9rem)] sm:gap-8 xl:grid-cols-[1fr_1fr] xl:gap-10">
        <motion.div style={{ y: titleY }} className="relative z-10 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 inline-flex w-full max-w-full items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-3 py-1.5 text-[11px] text-gold sm:mb-5 sm:w-auto sm:gap-3 sm:px-3.5 sm:py-2 sm:text-sm"
          >
            <Sparkles className="shrink-0" size={16} />
            <span className="min-w-0 truncate">React / TypeScript / Telegram automation / Python systems</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance whitespace-pre-line text-[clamp(3.2rem,16vw,5.2rem)] font-semibold leading-[0.82] tracking-[-0.075em] text-bone sm:text-[clamp(5rem,10vw,9rem)] sm:leading-[0.76] xl:text-[clamp(4.8rem,7.6vw,8.8rem)]"
          >
            {profile.displayName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-xl text-balance text-base leading-7 text-muted sm:text-lg sm:leading-8 xl:max-w-lg"
          >
            {profile.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 grid max-w-full grid-cols-1 justify-items-start gap-2.5 sm:flex sm:flex-wrap sm:items-center sm:gap-3"
          >
            <MagneticButton onClick={() => onOpenProject(projects[0])} variant="primary" cursorType="case" cursorLabel="Open case">
              View Trendyol case <ArrowUpRight size={17} />
            </MagneticButton>
            <MagneticButton onClick={onOpenCommand} variant="ghost" cursorLabel="Command">
              <Command size={17} /> Open command
            </MagneticButton>
            <MagneticButton href={profile.github} target="_blank" rel="noreferrer" variant="panel" cursorLabel="GitHub">
              <Github size={17} /> GitHub
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.46, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 hidden max-w-xl gap-2 xl:grid xl:grid-cols-3"
            aria-label="Portfolio system status"
          >
            {[
              ['01', 'interface online'],
              ['02', 'bot pipeline armed'],
              ['03', 'case proof loaded']
            ].map(([index, label]) => (
              <div key={label} className="rounded-2xl border border-bone/10 bg-white/[0.035] px-3.5 py-3 backdrop-blur-xl">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">{index}</p>
                <p className="mt-2 text-sm font-semibold text-bone">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div style={{ y: stageY, rotate: stageRotate }} className="hero-stage relative z-10 h-[360px] min-w-0 sm:h-[470px] xl:h-[640px]">
          <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-bone/10 bg-ink/55 shadow-[0_30px_100px_rgba(0,0,0,.45)] backdrop-blur-xl">
            <p className="pointer-events-none absolute -left-6 top-0 select-none text-[7rem] font-semibold leading-none tracking-[-0.1em] text-bone/[0.035] sm:text-[12rem] xl:text-[16rem]">
              SYSTEM
            </p>
            <svg className="absolute inset-0 h-full w-full opacity-70" viewBox="0 0 820 620" preserveAspectRatio="none" aria-hidden="true">
              <path d="M64 188 C218 44 354 250 470 176 S644 84 760 178" fill="none" stroke="rgba(216,168,78,.34)" strokeWidth="2" />
              <path d="M84 474 C246 318 344 556 492 412 S648 310 770 430" fill="none" stroke="rgba(125,211,252,.32)" strokeWidth="2" />
              <path d="M180 64 C248 200 206 352 316 502" fill="none" stroke="rgba(246,239,229,.08)" strokeWidth="1.5" />
            </svg>
          </div>

          <motion.button
            type="button"
            onClick={() => onOpenProject(projects[1])}
            data-cursor="case"
            data-cursor-label="Blaster"
            whileHover={{ y: -8, rotate: -4 }}
            className="hero-media-card absolute left-3 top-5 z-20 w-[62%] overflow-hidden rounded-[1.35rem] border border-bone/[0.12] bg-black/50 text-left shadow-[0_28px_80px_rgba(0,0,0,.42)] sm:left-7 sm:top-8 sm:w-[58%] xl:w-[54%]"
          >
            <img src={publicAsset('projects/blaster/preview-battle.png')} alt="Blaster Game battle preview" className="h-44 w-full object-cover sm:h-56 xl:h-72" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-3 sm:p-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-cyan">playable build</p>
              <p className="mt-1 text-sm font-semibold text-bone sm:text-base">Blaster Game</p>
            </div>
          </motion.button>

          <motion.button
            type="button"
            onClick={() => onOpenProject(projects[0])}
            data-cursor="case"
            data-cursor-label="Trendyol"
            whileHover={{ y: -10, rotate: 3 }}
            className="hero-media-card absolute right-3 top-[6.4rem] z-30 w-[48%] rounded-[1.35rem] border border-gold/25 bg-[#0a0907]/[0.88] p-3 text-left shadow-[0_30px_90px_rgba(0,0,0,.48)] sm:right-8 sm:top-28 sm:w-[42%] sm:p-4 xl:top-36"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold/15 text-gold">
                <Bot size={18} />
              </span>
              <span className="rounded-full bg-mint/10 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.2em] text-mint">live</span>
            </div>
            <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.24em] text-gold">price intelligence</p>
            <p className="mt-1 text-3xl font-semibold leading-none tracking-[-0.08em] text-bone sm:text-4xl">-31%</p>
            <p className="mt-1 text-sm font-semibold text-bone">Telegram alert sent</p>
            <div className="mt-4 h-12 rounded-xl border border-bone/10 bg-white/[0.035] p-2">
              <svg viewBox="0 0 220 58" className="h-full w-full" aria-hidden="true">
                <path d="M0 32 C30 14 48 38 72 24 S118 4 146 26 S184 54 220 30" fill="none" stroke="rgba(216,168,78,.8)" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
          </motion.button>

          <motion.button
            type="button"
            onClick={() => onOpenProject(projects[1])}
            data-cursor="case"
            data-cursor-label="Boss"
            whileHover={{ y: -8, rotate: 2 }}
            className="hero-media-card absolute bottom-8 left-8 z-10 hidden w-[36%] overflow-hidden rounded-[1.25rem] border border-bone/10 bg-black/55 shadow-[0_24px_70px_rgba(0,0,0,.38)] sm:block xl:bottom-10"
          >
            <img src={publicAsset('projects/blaster/preview-boss.png')} alt="Blaster boss phase preview" className="h-36 w-full object-cover xl:h-44" />
          </motion.button>

          <motion.a
            href={profile.portfolioRepo}
            target="_blank"
            rel="noreferrer"
            data-cursor="link"
            data-cursor-label="Source"
            whileHover={{ y: -8, rotate: -2 }}
            className="hero-media-card absolute bottom-5 right-4 z-20 w-[58%] rounded-[1.25rem] border border-bone/10 bg-graphite/[0.85] p-3 shadow-[0_24px_70px_rgba(0,0,0,.42)] backdrop-blur-xl sm:bottom-8 sm:right-8 sm:w-[42%] sm:p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.055] text-gold">
                <Github size={18} />
              </span>
              <ArrowUpRight size={16} className="text-muted" />
            </div>
            <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.22em] text-muted">source system</p>
            <p className="mt-1 text-sm font-semibold leading-5 text-bone sm:text-base">Portfolio Command System</p>
          </motion.a>

          <div className="absolute left-[46%] top-[48%] z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-bone/10 bg-black/40 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.24em] text-bone/70 backdrop-blur-xl sm:flex">
            <Zap size={13} className="mr-2 text-gold" />
            scroll-driven
          </div>

          <div className="absolute right-[42%] top-[74%] z-10 hidden -translate-y-1/2 rounded-full border border-bone/10 bg-black/40 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.24em] text-bone/70 backdrop-blur-xl xl:flex">
            <RadioTower size={13} className="mr-2 text-cyan" />
            automation proof
          </div>
        </motion.div>
      </div>

      <a
        href="#signals"
        data-cursor="link"
        data-cursor-label="Scroll"
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-bone/10 bg-white/[0.03] px-4 py-2 font-mono text-xs uppercase tracking-[0.24em] text-muted backdrop-blur-xl transition hover:text-bone md:flex"
      >
        Scroll to explore <ArrowDown size={14} />
      </a>
    </section>
  );
}
