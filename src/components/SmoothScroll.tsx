import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      document.documentElement.classList.add('lenis-native');
      return () => document.documentElement.classList.remove('lenis-native');
    }

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.085,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.12,
      syncTouch: true,
      anchors: {
        offset: -104,
        duration: 1.15
      },
      prevent: (node) => Boolean(node.closest('[data-lenis-prevent]'))
    });

    window.commandLenis = lenis;

    return () => {
      lenis.destroy();
      if (window.commandLenis === lenis) {
        window.commandLenis = undefined;
      }
    };
  }, []);

  return null;
}
