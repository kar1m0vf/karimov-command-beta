import { Command, Github, Mail } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useMemo } from 'react';
import { navItems, profile } from '../data/portfolio';
import MagneticButton from './MagneticButton';
import { useActiveSection } from '../hooks/useActiveSection';
import { cn } from '../utils/cn';

type Props = {
  onOpenCommand: () => void;
};

export default function Navbar({ onOpenCommand }: Props) {
  const sectionHrefs = useMemo(() => navItems.map((item) => item.href), []);
  const activeHash = useActiveSection(sectionHrefs);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-40 px-4 py-4 sm:px-6"
    >
      <nav className="relative mx-auto flex w-[calc(100vw-2rem)] max-w-7xl items-center justify-between overflow-hidden rounded-full border border-bone/10 bg-ink/45 px-3 py-2 backdrop-blur-2xl sm:w-full">
        <motion.span
          aria-hidden="true"
          className="absolute inset-x-5 bottom-0 h-px origin-left bg-gradient-to-r from-gold via-cyan to-mint"
          style={{ scaleX: progress }}
        />
        <a href="#intro" data-cursor="link" data-cursor-label="Intro" className="group min-w-0 rounded-full px-3 py-2" aria-label={`${profile.name} portfolio home`}>
          <span className="block leading-none">
            <span className="relative block text-[15px] font-semibold tracking-[-0.03em] text-bone sm:text-base">
              {profile.name}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-gold via-cyan to-transparent transition-transform duration-500 group-hover:scale-x-100" />
            </span>
            <span className="mt-2 hidden font-mono text-[9px] uppercase tracking-[0.28em] text-muted sm:block">
              react / automation
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-cursor="link"
              data-cursor-label={item.label}
              className={cn(
                'relative rounded-full px-4 py-2 text-sm transition hover:text-bone',
                activeHash === item.href ? 'text-bone' : 'text-muted hover:bg-white/[0.04]'
              )}
              aria-current={activeHash === item.href ? 'page' : undefined}
            >
              {activeHash === item.href ? (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full border border-gold/20 bg-white/[0.055]"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              ) : null}
              <span className="relative z-10">{item.label}</span>
            </a>
          ))}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            data-cursor="link"
            data-cursor-label="GitHub"
            className="hidden rounded-full border border-bone/10 p-3 text-muted transition hover:border-gold/35 hover:text-bone sm:inline-flex"
            aria-label="Open GitHub"
          >
            <Github size={17} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            data-cursor="link"
            data-cursor-label="Email"
            className="hidden rounded-full border border-bone/10 p-3 text-muted transition hover:border-gold/35 hover:text-bone sm:inline-flex"
            aria-label="Send email"
          >
            <Mail size={17} />
          </a>
          <MagneticButton onClick={onOpenCommand} variant="primary" className="px-3 py-2.5 sm:px-4" cursorLabel="Command">
            <Command size={16} />
            <span className="hidden sm:inline">Command</span>
            <kbd className="hidden whitespace-nowrap rounded-full bg-ink/10 px-2 py-0.5 font-mono text-[10px] md:inline">Ctrl K</kbd>
          </MagneticButton>
        </div>
      </nav>
    </motion.header>
  );
}
