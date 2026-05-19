import { useRef } from 'react';
import { ArrowUpRight, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Project } from '../data/portfolio';
import ProjectVisual from './ProjectVisual';
import MagneticButton from './MagneticButton';
import { useModalBehavior } from '../hooks/useModalBehavior';
import ProofSignalGrid from './ProofSignalGrid';

type Props = {
  project: Project;
  onClose: () => void;
};

export default function ProjectOverlay({ project, onClose }: Props) {
  const dialogRef = useRef<HTMLElement>(null);
  const titleId = `project-title-${project.id}`;

  useModalBehavior(dialogRef, onClose);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-lenis-prevent
      className="fixed inset-0 z-50 overflow-y-auto bg-ink/80 p-3 backdrop-blur-2xl sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.article
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        layoutId={`project-shell-${project.id}`}
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
        className="premium-border mx-auto my-4 max-w-6xl overflow-hidden rounded-[2rem] sm:my-8"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-bone/10 bg-ink/72 px-5 py-4 backdrop-blur-2xl sm:px-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">{project.eyebrow}</p>
            <h2 id={titleId} className="mt-1 text-xl font-semibold tracking-[-0.04em] text-bone sm:text-2xl">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            data-cursor="action"
            data-cursor-label="Close"
            className="grid h-11 w-11 place-items-center rounded-full border border-bone/10 bg-white/[0.04] text-muted transition hover:border-gold/35 hover:text-bone"
            aria-label="Close project overlay"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[1fr_.95fr]">
          <div className="space-y-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.26em] text-muted">case study</p>
              <motion.h3 layoutId={`project-title-${project.id}`} className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-bone sm:text-6xl">
                {project.title}
              </motion.h3>
              <p className="mt-5 text-lg leading-8 text-muted">{project.summary}</p>
            </div>

            <ProofSignalGrid items={project.proof} accent={project.accent} />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.4rem] border border-bone/10 bg-white/[0.035] p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">Problem</p>
                <p className="mt-4 leading-7 text-muted">{project.problem}</p>
              </div>
              <div className="rounded-[1.4rem] border border-bone/10 bg-white/[0.035] p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan">Solution</p>
                <p className="mt-4 leading-7 text-muted">{project.solution}</p>
              </div>
            </div>

            <div className="rounded-[1.4rem] border border-bone/10 bg-white/[0.035] p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">My role</p>
              <div className="mt-5 space-y-3">
                {project.role.map((item) => (
                  <div key={item} className="flex gap-3 text-muted">
                    <span className="mt-1 grid h-5 w-5 flex-none place-items-center rounded-full bg-gold/10 text-gold">
                      <Check size={12} />
                    </span>
                    <p className="leading-7">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span key={item} className="rounded-full border border-bone/10 bg-white/[0.035] px-3 py-1.5 text-xs text-muted">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <motion.div layoutId={`project-visual-${project.id}`} className="min-h-[280px]">
              <ProjectVisual project={project} />
            </motion.div>

            {project.images?.length ? (
              <div className="grid gap-3 sm:grid-cols-3">
                {project.images.map((image) => (
                  <div key={image.src} className="overflow-hidden rounded-2xl border border-bone/10 bg-white/[0.035]">
                    <img src={image.src} alt={image.alt} className="h-28 w-full object-cover" />
                    <p className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{image.label}</p>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="rounded-[1.4rem] border border-bone/10 bg-white/[0.035] p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan">Architecture</p>
              <div className="mt-5 space-y-3">
                {project.architecture.map((item) => (
                  <div key={item} className="flex gap-3 text-sm text-muted">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cyan" />
                    <p className="leading-6">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {project.links.map((link) => {
                const Icon = link.icon;
                return (
                  <MagneticButton key={link.href} href={link.href} target="_blank" rel="noreferrer" variant="primary" cursorLabel={link.label}>
                    {Icon ? <Icon size={17} /> : null}
                    {link.label}
                    <ArrowUpRight size={16} />
                  </MagneticButton>
                );
              })}
            </div>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}
