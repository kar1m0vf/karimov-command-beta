import type { CSSProperties } from 'react';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { Project } from '../data/portfolio';
import ProjectVisual from './ProjectVisual';
import ProofSignalGrid from './ProofSignalGrid';
import ProjectMachineLayer from './ProjectMachineLayer';

const accentRgb = {
  gold: '216, 168, 78',
  cyan: '125, 211, 252',
  green: '143, 227, 136',
  rose: '201, 138, 122'
};

type Props = {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
};

export default function ProjectCard({ project, index, onOpen }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smoothX = useSpring(mx, { stiffness: 140, damping: 18 });
  const smoothY = useSpring(my, { stiffness: 140, damping: 18 });
  const rotateY = useTransform(smoothX, [0, 1], [4, -4]);
  const rotateX = useTransform(smoothY, [0, 1], [-4, 4]);

  const onMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const localX = event.clientX - rect.left;
    const localY = event.clientY - rect.top;
    const x = localX / rect.width;
    const y = localY / rect.height;
    mx.set(x);
    my.set(y);
    event.currentTarget.style.setProperty('--spot-x', `${localX}px`);
    event.currentTarget.style.setProperty('--spot-y', `${localY}px`);
  };

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.08, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      layoutId={`project-shell-${project.id}`}
      style={{ rotateX, rotateY, '--accent-rgb': accentRgb[project.accent] } as CSSProperties}
      onPointerMove={onMove}
      onPointerLeave={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mx.set(0.5);
        my.set(0.5);
        event.currentTarget.style.setProperty('--spot-x', `${rect.width / 2}px`);
        event.currentTarget.style.setProperty('--spot-y', `${rect.height / 2}px`);
      }}
      onClick={() => onOpen(project)}
      aria-label={`Open ${project.title} case study`}
      data-cursor="case"
      data-cursor-label="Open case"
      className="glow-card group relative grid w-full gap-3 overflow-hidden rounded-[1.5rem] border border-bone/10 p-3 text-left backdrop-blur-2xl transition hover:border-gold/35 sm:gap-5 sm:rounded-[2rem] sm:p-4 lg:grid-cols-[1fr_1.05fr] lg:p-5"
    >
      <ProjectMachineLayer project={project} index={index} />

      <div className="relative z-10 flex min-h-0 flex-col justify-between rounded-[1.25rem] border border-bone/10 bg-ink/45 p-4 sm:min-h-[300px] sm:rounded-[1.5rem] sm:p-6">
        <div>
          <div className="mb-5 flex flex-col items-start justify-between gap-2.5 sm:mb-8 sm:flex-row sm:items-center sm:gap-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold sm:text-xs sm:tracking-[0.28em]">0{index + 1} / {project.eyebrow}</p>
            <span className="whitespace-nowrap rounded-full border border-bone/10 bg-white/[0.035] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted sm:px-3 sm:text-[10px] sm:tracking-[0.2em]">
              {project.status}
            </span>
          </div>
          <motion.h3 layoutId={`project-title-${project.id}`} className="text-[2rem] font-semibold leading-[0.98] tracking-[-0.06em] text-bone sm:text-5xl sm:leading-none">
            {project.title}
          </motion.h3>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted sm:mt-5 sm:text-base sm:leading-8">{project.summary}</p>
          <div className="mt-4 sm:mt-6">
            <ProofSignalGrid items={project.proof} accent={project.accent} compact />
          </div>

          <div className="mt-4 hidden gap-2 rounded-2xl border border-bone/10 bg-white/[0.025] p-3 sm:grid sm:grid-cols-3 sm:mt-6">
            {['input', 'logic', 'output'].map((step, stepIndex) => (
              <div key={step} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent-rgb))]" />
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">{step}</span>
                <span className="h-px flex-1 bg-bone/10" />
                <span className="font-mono text-[9px] text-bone/70">0{stepIndex + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mt-5 flex flex-wrap gap-2 sm:mt-8">
            {project.stack.slice(0, 5).map((item) => (
              <span key={item} className="rounded-full border border-bone/10 bg-white/[0.035] px-2.5 py-1 text-[11px] text-muted sm:px-3 sm:text-xs">
                {item}
              </span>
            ))}
          </div>
          <div className="mt-5 flex items-center text-sm font-semibold text-bone sm:mt-8">
            Open case study <ArrowUpRight className="ml-2 transition group-hover:translate-x-1 group-hover:-translate-y-1" size={18} />
          </div>
        </div>
      </div>

      <motion.div layoutId={`project-visual-${project.id}`} className="relative z-10 h-full min-h-[200px] sm:min-h-[280px]">
        <ProjectVisual project={project} compact />
      </motion.div>
    </motion.button>
  );
}
