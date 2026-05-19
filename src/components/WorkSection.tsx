import type { CSSProperties } from 'react';
import { ArrowUpRight, Bot, Code2, Database, RadioTower } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { projects, type Project } from '../data/portfolio';
import SectionHeading from './SectionHeading';

type Props = {
  onOpenProject: (project: Project) => void;
};

const accentRgb = {
  gold: '216, 168, 78',
  cyan: '125, 211, 252',
  green: '143, 227, 136',
  rose: '201, 138, 122'
};

function CaseReelVisual({ project, index }: { project: Project; index: number }) {
  if (project.visualMode === 'gallery' && project.images?.length) {
    return (
      <div className="case-reel-media relative h-[24rem] overflow-hidden sm:h-[34rem] lg:h-[min(68svh,44rem)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_42%_30%,rgba(var(--accent-rgb),.24),transparent_22rem)]" />
        <motion.img
          initial={{ opacity: 0, y: 80, rotate: -3, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, rotate: -2, scale: 1 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          src={project.images[1].src}
          alt={project.images[1].alt}
          className="absolute left-[7%] top-[8%] h-[58%] w-[76%] rounded-[1.2rem] border border-bone/10 object-cover shadow-cyan"
        />
        <motion.img
          initial={{ opacity: 0, x: 80, y: 60, rotate: 7 }}
          whileInView={{ opacity: 0.95, x: 0, y: 0, rotate: 5 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ delay: 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          src={project.images[2].src}
          alt={project.images[2].alt}
          className="absolute right-[4%] top-[34%] h-[42%] w-[48%] rounded-[1rem] border border-bone/10 object-cover shadow-2xl"
        />
        <motion.img
          initial={{ opacity: 0, x: -80, y: 40, rotate: -8 }}
          whileInView={{ opacity: 0.78, x: 0, y: 0, rotate: -6 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ delay: 0.18, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          src={project.images[0].src}
          alt={project.images[0].alt}
          className="absolute bottom-[8%] left-[3%] h-[34%] w-[42%] rounded-[1rem] border border-bone/10 object-cover opacity-80 shadow-2xl"
        />
        <div className="absolute bottom-4 left-4 rounded-full border border-cyan/25 bg-cyan/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-cyan backdrop-blur-xl">
          real screenshots / playable proof
        </div>
      </div>
    );
  }

  if (project.visualMode === 'system') {
    return (
      <div className="case-reel-media relative h-[24rem] overflow-hidden sm:h-[34rem] lg:h-[min(68svh,44rem)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_30%,rgba(143,227,136,.16),transparent_23rem)]" />
        <div className="absolute left-[9%] top-[10%] w-[74%] border-y border-bone/10 py-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.38em] text-mint">source route</p>
          <p className="mt-4 text-[clamp(2.8rem,8vw,7rem)] font-semibold leading-[0.78] tracking-[-0.08em] text-bone">
            Portfolio
            <br />
            System
          </p>
        </div>
        <div className="absolute bottom-[10%] left-[9%] right-[9%] grid gap-3 sm:grid-cols-4">
          {['Lenis', 'Three.js', 'React', 'GitHub'].map((item, itemIndex) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: itemIndex * 0.06, duration: 0.55 }}
              className="border-t border-bone/10 pt-3"
            >
              <p className="font-mono text-[9px] text-mint">0{itemIndex + 1}</p>
              <p className="mt-2 text-sm font-semibold text-bone">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="case-reel-media relative h-[24rem] overflow-hidden sm:h-[34rem] lg:h-[min(68svh,44rem)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(var(--accent-rgb),.22),transparent_24rem)]" />
      <div className="absolute left-[8%] top-[10%] w-[58%] rounded-[1.35rem] border border-gold/20 bg-black/50 p-4 backdrop-blur-xl sm:p-5">
        <div className="mb-6 flex items-center justify-between">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gold/15 text-gold">
            <Bot size={20} />
          </span>
          <span className="rounded-full bg-mint/10 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-mint">
            sent
          </span>
        </div>
        <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-gold">telegram price flow</p>
        <p className="mt-4 text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-none tracking-[-0.08em] text-bone">-31%</p>
        <p className="mt-2 text-sm font-semibold text-bone sm:text-base">drop detected and delivered</p>
      </div>

      <div className="absolute bottom-[12%] right-[7%] w-[52%] rounded-[1.35rem] border border-bone/10 bg-ink/70 p-4 backdrop-blur-xl sm:w-[44%] sm:p-5">
        <svg viewBox="0 0 320 130" className="h-28 w-full" aria-hidden="true">
          <path d="M0 72 C48 34 78 94 118 56 S196 16 240 62 S288 112 320 72" fill="none" stroke="rgba(246,239,229,.14)" strokeWidth="4" />
          <path d="M0 72 C48 34 78 94 118 56 S196 16 240 62 S288 112 320 72" fill="none" stroke="rgba(216,168,78,.82)" strokeWidth="5" strokeLinecap="round" />
        </svg>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { icon: Database, label: 'store' },
            { icon: RadioTower, label: 'alert' },
            { icon: Code2, label: 'logic' }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="border-t border-bone/10 pt-3">
                <Icon size={16} className="text-gold" />
                <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function WorkSection({ onOpenProject }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const railScale = useTransform(scrollYProgress, [0.08, 0.92], [0, 1]);

  return (
    <section ref={ref} id="work" className="section-pad relative overflow-hidden py-12 sm:py-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bone/15 to-transparent" />
      <div className="command-scene-grid opacity-60" aria-hidden="true" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:mb-12 sm:gap-8 lg:mb-14 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Live systems"
            title="Projects as rooms, not cards."
            description="Each case is treated as a scene in the command world: evidence first, media large, details available on demand."
          />
          <p className="max-w-sm font-mono text-[10px] uppercase leading-5 tracking-[0.18em] text-muted sm:text-xs sm:leading-6 sm:tracking-[0.22em]">
            scroll through shipped systems / open any case for the full breakdown
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 hidden h-full w-px overflow-hidden rounded-full bg-bone/10 lg:block">
            <motion.div style={{ scaleY: railScale }} className="h-full origin-top bg-gradient-to-b from-gold via-cyan to-mint" />
          </div>

          <div className="space-y-4 lg:space-y-0 lg:pl-10">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-120px' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ '--accent-rgb': accentRgb[project.accent] } as CSSProperties}
                className="case-reel-panel group relative isolate grid min-h-[auto] gap-5 overflow-hidden border-t border-bone/10 py-8 last:border-b sm:py-10 lg:min-h-[88svh] lg:grid-cols-[.38fr_.62fr] lg:items-center lg:gap-8 lg:py-12"
              >
                <p className="pointer-events-none absolute -left-2 top-8 -z-10 select-none text-[8rem] font-semibold leading-none tracking-[-0.1em] text-bone/[0.025] sm:text-[13rem] lg:text-[18rem]">
                  0{index + 1}
                </p>

                <div className="relative z-10">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold sm:text-xs">
                    0{index + 1} / {project.eyebrow}
                  </p>
                  <motion.h3
                    layoutId={`project-title-${project.id}`}
                    className="mt-4 text-[clamp(2.4rem,8vw,4.8rem)] font-semibold leading-[0.86] tracking-[-0.075em] text-bone"
                  >
                    {project.title}
                  </motion.h3>
                  <p className="mt-5 max-w-xl text-sm leading-7 text-muted sm:text-base sm:leading-8">{project.summary}</p>

                  <div className="mt-6 border-y border-bone/10 py-4">
                    <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                      {project.proof.map((item) => (
                        <div key={item.label} className="min-w-0">
                          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">{item.label}</p>
                          <p className="mt-2 text-sm font-semibold text-bone">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.slice(0, 5).map((item) => (
                      <span key={item} className="rounded-full border border-bone/10 bg-white/[0.03] px-3 py-1 text-xs text-muted">
                        {item}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenProject(project)}
                    data-cursor="case"
                    data-cursor-label="Open case"
                    className="mt-7 inline-flex items-center gap-2 rounded-full border border-bone/10 bg-bone px-5 py-3 text-sm font-semibold text-ink transition hover:border-gold/45 hover:bg-gold"
                    aria-label={`Open ${project.title} case study`}
                  >
                    Open case <ArrowUpRight size={16} />
                  </button>
                </div>

                <motion.div layoutId={`project-visual-${project.id}`} className="relative z-10">
                  <CaseReelVisual project={project} index={index} />
                </motion.div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
