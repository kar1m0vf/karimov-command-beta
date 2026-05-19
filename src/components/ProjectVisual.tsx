import { Bot, Database, Gauge, RadioTower, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Project } from '../data/portfolio';

const accentClass = {
  gold: 'from-gold/30 via-amber/10 to-cyan/10 text-gold border-gold/25',
  cyan: 'from-cyan/30 via-blue-400/10 to-gold/10 text-cyan border-cyan/25',
  green: 'from-mint/25 via-cyan/10 to-gold/10 text-mint border-mint/25',
  rose: 'from-rose/30 via-gold/10 to-cyan/10 text-rose border-rose/25'
};

type Props = {
  project: Project;
  compact?: boolean;
};

export default function ProjectVisual({ project, compact = false }: Props) {
  if (project.visualMode === 'gallery' && project.images?.length) {
    return (
      <div className="relative h-full min-h-[200px] overflow-hidden rounded-[1.15rem] border border-cyan/20 bg-ink sm:min-h-[280px] sm:rounded-[1.35rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_15%,rgba(125,211,252,.28),transparent_18rem)]" />
        <div className="relative h-full p-3 sm:p-4">
          <motion.img
            initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            src={project.images[1].src}
            alt={project.images[1].alt}
            className="h-full min-h-[160px] w-full rounded-xl border border-bone/10 object-cover shadow-cyan sm:min-h-[220px] sm:rounded-2xl"
          />
          <motion.img
            initial={{ opacity: 0, x: 40, y: -18, rotate: 4 }}
            whileInView={{ opacity: compact ? 0.55 : 0.9, x: 0, y: 0, rotate: 3 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            src={project.images[2].src}
            alt={project.images[2].alt}
            className="absolute right-4 top-5 hidden w-[48%] rounded-xl border border-bone/10 object-cover shadow-2xl lg:block"
          />
          <div className="absolute bottom-4 left-4 rounded-full border border-cyan/25 bg-cyan/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-cyan backdrop-blur-xl sm:bottom-6 sm:left-6 sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-[0.24em]">
            real screenshots
          </div>
        </div>
      </div>
    );
  }

  if (project.visualMode === 'system') {
    return (
      <div className="relative h-full min-h-[200px] overflow-hidden rounded-[1.15rem] border border-mint/20 bg-ink p-4 sm:min-h-[280px] sm:rounded-[1.35rem] sm:p-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_25%,rgba(143,227,136,.18),transparent_19rem)]" />
        <div className="relative flex h-full flex-col justify-between gap-5 sm:gap-8">
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {['Scroll scenes', 'Cursor aura', 'Command palette', 'Project overlays'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.55 }}
                className="rounded-xl border border-bone/10 bg-white/[0.035] p-3 sm:rounded-2xl sm:p-4"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted sm:text-[10px] sm:tracking-[0.2em]">0{index + 1}</p>
                <p className="mt-4 text-xs font-semibold text-bone sm:mt-6 sm:text-sm">{item}</p>
              </motion.div>
            ))}
          </div>
          <div className="rounded-xl border border-mint/20 bg-mint/10 p-3 sm:rounded-2xl sm:p-4">
            <div className="mb-3 flex items-center justify-between sm:mb-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-mint sm:text-[10px] sm:tracking-[0.24em]">frontend system</span>
              <ShieldCheck size={17} className="text-mint" />
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-ink/60">
              <motion.div
                initial={{ width: '18%' }}
                whileInView={{ width: '88%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-mint to-cyan"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative h-full min-h-[200px] overflow-hidden rounded-[1.15rem] border bg-gradient-to-br ${accentClass[project.accent]} p-4 sm:min-h-[280px] sm:rounded-[1.35rem] sm:p-5`}>
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
      <div className="relative flex h-full flex-col justify-between gap-5 sm:gap-8">
        <div className="rounded-[1rem] border border-bone/10 bg-ink/55 p-3 backdrop-blur-xl sm:rounded-[1.2rem] sm:p-4">
          <div className="mb-3 flex items-center justify-between gap-3 sm:mb-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold sm:h-10 sm:w-10 sm:rounded-2xl">
                <Bot size={20} />
              </span>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted sm:text-[10px] sm:tracking-[0.22em]">Telegram price flow</p>
                <p className="text-xs font-semibold text-bone sm:text-sm">drop detected and delivered</p>
              </div>
            </div>
            <span className="rounded-full bg-mint/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-mint sm:px-3 sm:text-[10px] sm:tracking-[0.22em]">sent</span>
          </div>
          <div className="rounded-xl border border-bone/10 bg-white/[0.035] p-3 sm:rounded-2xl sm:p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-muted sm:text-sm">Tracked product</p>
                <p className="mt-1.5 text-2xl font-semibold tracking-[-0.06em] text-bone sm:mt-2 sm:text-3xl">89.99 TRY</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted sm:text-[10px] sm:tracking-[0.18em]">previous</p>
                <p className="mt-1.5 text-xs text-muted line-through sm:mt-2 sm:text-sm">129.99 TRY</p>
                <p className="mt-1 text-xs font-semibold text-mint sm:text-sm">-31%</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-1.5 sm:mt-5 sm:gap-2">
              {['parse', 'diff', 'alert', 'store'].map((step, index) => (
                <div key={step} className="rounded-lg border border-bone/10 bg-ink/45 p-2 text-center sm:rounded-xl">
                  <motion.div
                    initial={{ scaleX: 0.25 }}
                    whileInView={{ scaleX: index === 2 ? 1 : 0.68 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="mx-auto h-1.5 origin-left rounded-full bg-gold"
                  />
                  <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.1em] text-muted sm:text-[9px] sm:tracking-[0.14em]">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 rounded-xl border border-bone/10 bg-graphite/60 p-3 font-mono text-[9px] uppercase tracking-[0.14em] text-muted sm:rounded-2xl sm:text-[10px] sm:tracking-[0.16em]">
            <div className="flex items-center justify-between">
              <span>payload</span>
              <span className="text-mint">ok</span>
            </div>
            <p className="mt-2 truncate text-bone">watchlist.nike_airmax.price_drop</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {[
            { icon: Database, label: 'SQLite' },
            { icon: RadioTower, label: 'Alerts' },
            { icon: Gauge, label: 'History' }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-xl border border-bone/10 bg-ink/45 p-2.5 text-center backdrop-blur-xl sm:rounded-2xl sm:p-3">
                <Icon size={18} className="mx-auto text-gold" />
                <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted sm:text-[10px] sm:tracking-[0.18em]">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
