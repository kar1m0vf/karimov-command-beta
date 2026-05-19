import { motion, useScroll, useSpring } from 'framer-motion';
import { sceneLabels } from '../data/portfolio';
import { useActiveSection } from '../hooks/useActiveSection';

const sceneIds = ['intro', 'signals', 'work', 'experiments', 'system', 'about', 'contact'];
const sceneHrefs = sceneIds.map((id) => `#${id}`);

export default function SceneRail() {
  const activeHash = useActiveSection(sceneHrefs);
  const active = Math.max(0, sceneHrefs.indexOf(activeHash));
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.2 });

  return (
    <aside className="fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 2xl:block" aria-label="Scene navigation">
      <div className="relative flex items-center gap-3">
        <div className="relative h-80 w-px overflow-hidden rounded-full bg-bone/10">
          <motion.div style={{ scaleY }} className="absolute inset-x-0 top-0 h-full origin-top rounded-full bg-gradient-to-b from-gold via-cyan to-rose" />
        </div>
        <div className="flex h-80 flex-col justify-between py-0.5">
          {sceneLabels.map((label, index) => (
            <a
              key={label}
              href={`#${sceneIds[index]}`}
              data-cursor="link"
              data-cursor-label={label}
              className="group relative flex h-7 items-center gap-3"
              aria-label={`Go to ${label}`}
            >
              <span
                className={`grid h-7 w-7 place-items-center rounded-full border font-mono text-[9px] uppercase tracking-[0.08em] transition ${
                  active === index
                    ? 'border-gold/35 bg-gold/10 text-bone shadow-[0_0_22px_rgba(216,168,78,.18)]'
                    : 'border-bone/10 bg-ink/25 text-muted/55 group-hover:border-bone/20 group-hover:text-muted'
                }`}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <span
                className={`pointer-events-none absolute left-10 whitespace-nowrap rounded-full border border-bone/10 bg-ink/70 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] backdrop-blur-xl transition ${
                  active === index
                    ? 'translate-x-0 text-bone opacity-100'
                    : '-translate-x-2 text-muted opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                }`}
              >
                {label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
