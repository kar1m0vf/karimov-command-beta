import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MetricStrip from './components/MetricStrip';
import WorkSection from './components/WorkSection';
import ExperimentsSection from './components/ExperimentsSection';
import StackSection from './components/StackSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import CommandPalette from './components/CommandPalette';
import ProjectOverlay from './components/ProjectOverlay';
import CursorAura from './components/CursorAura';
import SceneRail from './components/SceneRail';
import BootLoader from './components/BootLoader';
import SmoothScroll from './components/SmoothScroll';
import CommandWorld from './components/CommandWorld';
import { projects, type Project } from './data/portfolio';
import { useBootSequence } from './hooks/useBootSequence';

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const boot = useBootSequence();

  useEffect(() => {
    if (!boot.complete) return;

    const scrollToHash = (behavior: ScrollBehavior = 'auto') => {
      const hash = window.location.hash;
      if (!hash) return;

      if (hash === '#intro') {
        window.commandLenis?.scrollTo(0, { immediate: behavior === 'auto' }) ?? window.scrollTo({ top: 0, behavior });
        return;
      }

      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target && window.commandLenis) {
        window.commandLenis.scrollTo(target, { offset: -104, immediate: behavior === 'auto' });
        return;
      }

      target?.scrollIntoView({ behavior, block: 'start' });
    };

    const frame = window.requestAnimationFrame(() => scrollToHash());
    const onHashChange = () => scrollToHash('smooth');

    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, [boot.complete]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isCommand = event.metaKey || event.ctrlKey;
      if (isCommand && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((value) => !value);
      }
      if (event.key === 'Escape') {
        setPaletteOpen(false);
        setActiveProject(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden text-bone">
      <SmoothScroll />
      <CommandWorld />
      <CursorAura />
      <div className="noise" aria-hidden="true" />
      <div className="site-shell">
        <Navbar onOpenCommand={() => setPaletteOpen(true)} />
        <SceneRail />
        <Hero onOpenCommand={() => setPaletteOpen(true)} onOpenProject={setActiveProject} />
        <MetricStrip />
        <WorkSection onOpenProject={setActiveProject} />
        <ExperimentsSection />
        <StackSection />
        <AboutSection />
        <ContactSection onOpenCommand={() => setPaletteOpen(true)} />
      </div>

      <AnimatePresence>
        {paletteOpen && (
          <CommandPalette
            onClose={() => setPaletteOpen(false)}
            onOpenProject={(project) => {
              setActiveProject(project);
              setPaletteOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>{activeProject && <ProjectOverlay project={activeProject} onClose={() => setActiveProject(null)} />}</AnimatePresence>

      <AnimatePresence>{!boot.complete && <BootLoader progress={boot.progress} phase={boot.phase} />}</AnimatePresence>
    </main>
  );
}
