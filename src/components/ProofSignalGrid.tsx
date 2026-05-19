import type { CSSProperties } from 'react';
import { Activity, Database, RadioTower } from 'lucide-react';
import type { Project } from '../data/portfolio';
import { cn } from '../utils/cn';

const accentRgb = {
  gold: '216, 168, 78',
  cyan: '125, 211, 252',
  green: '143, 227, 136',
  rose: '201, 138, 122'
};

const proofIcons = [Activity, RadioTower, Database];

type Props = {
  items: Project['proof'];
  accent: Project['accent'];
  compact?: boolean;
};

export default function ProofSignalGrid({ items, accent, compact = false }: Props) {
  return (
    <div
      style={{ '--accent-rgb': accentRgb[accent] } as CSSProperties}
      className={cn('grid gap-2 sm:gap-3', compact ? 'sm:grid-cols-3' : 'sm:grid-cols-3')}
    >
      {items.map((item, index) => {
        const Icon = proofIcons[index % proofIcons.length];
        return (
          <div
            key={item.label}
            className={cn(
              'relative overflow-hidden rounded-[1rem] border border-bone/10 bg-white/[0.035] p-2.5 sm:rounded-2xl sm:p-3',
              !compact && 'p-3 sm:p-4'
            )}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(var(--accent-rgb),.58)] to-transparent" />
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-muted sm:text-[9px] sm:tracking-[0.2em]">{item.label}</p>
              <span className="grid h-6 w-6 place-items-center rounded-full border border-[rgba(var(--accent-rgb),.24)] bg-[rgba(var(--accent-rgb),.1)] text-[rgb(var(--accent-rgb))] sm:h-7 sm:w-7">
                <Icon size={13} />
              </span>
            </div>
            <p className={cn('mt-2 font-semibold tracking-[-0.04em] text-bone sm:mt-3', compact ? 'text-xs sm:text-sm' : 'text-lg sm:text-xl')}>
              {item.value}
            </p>
            {!compact ? <p className="mt-2 text-sm leading-6 text-muted sm:mt-3">{item.detail}</p> : null}
            <div className={cn('mt-3 grid grid-cols-4 gap-1.5 sm:mt-4', compact && 'hidden sm:grid')} aria-hidden="true">
              {[0, 1, 2, 3].map((bar) => (
                <span
                  key={bar}
                  className="h-1.5 rounded-full bg-[rgba(var(--accent-rgb),.18)]"
                  style={{ opacity: 0.35 + (bar + index) * 0.13 }}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
