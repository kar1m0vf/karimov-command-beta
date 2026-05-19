import { useMemo, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight, Github, Mail, Search, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { commandLinks, navItems, profile, projects, type Project } from '../data/portfolio';
import { useModalBehavior } from '../hooks/useModalBehavior';

type Props = {
  onClose: () => void;
  onOpenProject: (project: Project) => void;
};

type CommandItem = {
  label: string;
  eyebrow: string;
  action: () => void;
  icon?: LucideIcon;
};

export default function CommandPalette({ onClose, onOpenProject }: Props) {
  const [query, setQuery] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = 'command-palette-title';

  useModalBehavior(dialogRef, onClose);

  const items = useMemo<CommandItem[]>(() => {
    const projectItems = projects.map((project) => ({
      label: project.title,
      eyebrow: `open ${project.eyebrow}`,
      action: () => onOpenProject(project),
      icon: ArrowUpRight
    }));

    const nav = navItems.map((item) => ({
      label: item.label,
      eyebrow: 'scroll to section',
      action: () => {
        window.commandLenis?.scrollTo(item.href, { offset: -104 }) ?? document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
      icon: ArrowUpRight
    }));

    const links = commandLinks.map((link) => ({
      label: link.label,
      eyebrow: 'external link',
      action: () => {
        window.open(link.href, link.href.startsWith('mailto:') ? '_self' : '_blank', 'noreferrer');
        onClose();
      },
      icon: link.icon
    }));

    return [
      ...projectItems,
      ...nav,
      ...links,
      {
        label: 'Copy email',
        eyebrow: profile.email,
        action: async () => {
          await navigator.clipboard?.writeText(profile.email);
          onClose();
        },
        icon: Mail
      },
      {
        label: 'Open GitHub profile',
        eyebrow: profile.github,
        action: () => {
          window.open(profile.github, '_blank', 'noreferrer');
          onClose();
        },
        icon: Github
      }
    ];
  }, [onClose, onOpenProject]);

  const filtered = items.filter((item) => `${item.label} ${item.eyebrow}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-lenis-prevent
      className="fixed inset-0 z-[60] bg-ink/72 p-3 backdrop-blur-2xl sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, y: 36, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="premium-border mx-auto mt-20 max-w-2xl overflow-hidden rounded-[2rem]"
      >
        <div className="flex items-center gap-3 border-b border-bone/10 px-4 py-4 sm:px-5">
          <h2 id={titleId} className="sr-only">Command palette</h2>
          <Search className="text-gold" size={19} />
          <input
            autoFocus
            aria-label="Search commands"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects, sections or actions..."
            className="w-full bg-transparent text-base text-bone outline-none placeholder:text-muted"
          />
          <button
            onClick={onClose}
            data-cursor="action"
            data-cursor-label="Close"
            className="grid h-9 w-9 place-items-center rounded-full border border-bone/10 text-muted hover:text-bone"
            aria-label="Close command palette"
          >
            <X size={16} />
          </button>
        </div>

        <div className="max-h-[62vh] overflow-y-auto p-2">
          {filtered.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={`${item.label}-${index}`}
                onClick={item.action}
                data-cursor="action"
                data-cursor-label={item.label}
                className="group flex w-full items-center gap-4 rounded-2xl px-3 py-3 text-left transition hover:bg-gold/10"
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-bone/10 bg-white/[0.035] text-gold group-hover:border-gold/35">
                  {Icon ? <Icon size={18} /> : <ArrowUpRight size={18} />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-bone">{item.label}</span>
                  <span className="block truncate font-mono text-[10px] uppercase tracking-[0.22em] text-muted">{item.eyebrow}</span>
                </span>
                <ArrowUpRight className="text-muted transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-bone" size={16} />
              </button>
            );
          })}

          {filtered.length === 0 ? <div className="px-4 py-10 text-center text-muted">No command found.</div> : null}
        </div>
      </motion.div>
    </motion.div>
  );
}
