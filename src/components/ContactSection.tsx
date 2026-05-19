import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { profile } from '../data/portfolio';
import MagneticButton from './MagneticButton';

type Props = {
  onOpenCommand: () => void;
};

export default function ContactSection({ onOpenCommand }: Props) {
  return (
    <section id="contact" className="section-pad relative overflow-hidden pb-10 pt-12 sm:pb-12 sm:pt-28">
      <div className="absolute inset-x-0 bottom-0 -z-10 h-96 bg-[radial-gradient(circle_at_50%_100%,rgba(216,168,78,.16),transparent_30rem)]" />
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-90px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="premium-border overflow-hidden rounded-[1.6rem] p-5 sm:rounded-[2.5rem] sm:p-10 lg:p-14"
        >
          <div className="grid gap-7 sm:gap-10 lg:grid-cols-[1fr_.75fr] lg:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-gold sm:text-xs sm:tracking-[0.32em]">Contact</p>
              <h2 className="mt-4 max-w-4xl text-balance text-[2.45rem] font-semibold leading-[0.95] tracking-[-0.075em] text-bone sm:mt-5 sm:text-7xl sm:leading-none sm:tracking-[-0.08em] lg:text-8xl">
                Let’s build something that does not feel generic.
              </h2>
            </div>
            <div>
              <p className="text-sm leading-7 text-muted sm:text-lg sm:leading-8">
                Open for frontend internships, junior roles, focused freelance pages, Telegram automation and product UI experiments.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5 sm:mt-7 sm:gap-3">
                <MagneticButton href={`mailto:${profile.email}`} variant="primary" cursorLabel="Email">
                  <Mail size={17} /> Email
                </MagneticButton>
                <MagneticButton href={profile.github} target="_blank" rel="noreferrer" variant="ghost" cursorLabel="GitHub">
                  <Github size={17} /> GitHub
                </MagneticButton>
                <MagneticButton href={profile.linkedin} target="_blank" rel="noreferrer" variant="ghost" cursorLabel="LinkedIn">
                  <Linkedin size={17} /> LinkedIn
                </MagneticButton>
                <MagneticButton onClick={onOpenCommand} variant="panel" cursorLabel="Command">
                  Command <ArrowUpRight size={16} />
                </MagneticButton>
              </div>
            </div>
          </div>
        </motion.div>

        <footer className="mt-6 flex flex-col justify-between gap-2.5 border-t border-bone/10 pt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted sm:mt-8 sm:flex-row sm:gap-3 sm:pt-6 sm:text-[11px] sm:tracking-[0.22em]">
          <p>© 2026 {profile.name}</p>
          <p>React · TypeScript · Motion · GitHub Pages</p>
        </footer>
      </div>
    </section>
  );
}
