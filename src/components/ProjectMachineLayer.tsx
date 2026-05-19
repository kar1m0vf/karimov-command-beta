import { ArrowRight, CircuitBoard, RadioTower } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Project } from '../data/portfolio';

type Props = {
  project: Project;
  index: number;
};

export default function ProjectMachineLayer({ project, index }: Props) {
  const route = [
    project.proof[0]?.label ?? 'input',
    project.proof[1]?.label ?? 'logic',
    project.proof[2]?.label ?? 'output'
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]" aria-hidden="true">
      <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="project-reactive-light absolute inset-0" />
        <div className="machine-scan absolute inset-x-0 top-0 h-32" />
      </div>

      <div className="absolute right-4 top-4 hidden w-64 overflow-hidden rounded-2xl border border-bone/10 bg-ink/50 p-3 opacity-0 backdrop-blur-xl transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 lg:block">
        <div className="mb-3 flex items-center justify-between">
          <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
            <CircuitBoard size={13} className="text-[rgb(var(--accent-rgb))]" />
            system route
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[rgb(var(--accent-rgb))]">0{index + 1}</span>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
          {route.map((item, routeIndex) => (
            <motion.div
              key={`${item}-${routeIndex}`}
              initial={{ opacity: 0.45 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: routeIndex * 0.08, duration: 0.45 }}
              className="min-w-0 rounded-xl border border-bone/10 bg-white/[0.035] px-2.5 py-2"
            >
              <p className="truncate font-mono text-[8px] uppercase tracking-[0.16em] text-muted">{item}</p>
            </motion.div>
          )).flatMap((node, routeIndex) =>
            routeIndex < route.length - 1
              ? [
                  node,
                  <ArrowRight
                    key={`arrow-${routeIndex}`}
                    size={13}
                    className="text-[rgb(var(--accent-rgb))] opacity-70"
                  />
                ]
              : [node]
          )}
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.04]">
          <span className="machine-route-pulse block h-full w-2/3 rounded-full bg-gradient-to-r from-[rgba(var(--accent-rgb),.95)] to-cyan" />
        </div>
      </div>

      <div className="absolute bottom-4 right-4 hidden items-center gap-2 rounded-full border border-bone/10 bg-ink/45 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-muted opacity-0 backdrop-blur-xl transition duration-500 group-hover:opacity-100 md:flex">
        <RadioTower size={13} className="text-[rgb(var(--accent-rgb))]" />
        pointer linked surface
      </div>
    </div>
  );
}
