import { useEffect, useRef } from 'react';

type CursorKind = 'default' | 'action' | 'link' | 'case';

const cursorKinds = new Set<CursorKind>(['default', 'action', 'link', 'case']);

const getCursorKind = (target: EventTarget | null): CursorKind => {
  if (!(target instanceof Element)) return 'default';

  const interactive = target.closest<HTMLElement>('[data-cursor], a, button');
  if (!interactive) return 'default';

  const cursor = interactive.dataset.cursor;
  if (cursor && cursorKinds.has(cursor as CursorKind)) return cursor as CursorKind;

  return interactive.tagName === 'A' ? 'link' : 'action';
};

export default function CursorAura() {
  const auraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return undefined;

    let frame = 0;
    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let lastTime = performance.now();

    const commit = (x: number, y: number, target: EventTarget | null, energy = 0) => {
      const aura = auraRef.current;
      if (!aura) return;

      aura.style.setProperty('--cursor-x', `${x}px`);
      aura.style.setProperty('--cursor-y', `${y}px`);
      aura.style.setProperty('--cursor-energy', reducedMotion ? '0' : energy.toFixed(3));
      document.documentElement.dataset.cursorKind = getCursorKind(target);
    };

    const update = (event: PointerEvent) => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const now = performance.now();
        const distance = Math.hypot(event.clientX - lastX, event.clientY - lastY);
        const elapsed = Math.max(16, now - lastTime);
        const energy = Math.min(1, distance / elapsed / 1.2);

        commit(event.clientX, event.clientY, event.target, energy);

        lastX = event.clientX;
        lastY = event.clientY;
        lastTime = now;
      });
    };

    const resync = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        commit(lastX, lastY, document.elementFromPoint(lastX, lastY));
      });
    };

    const reset = () => {
      document.documentElement.dataset.cursorKind = 'default';
      auraRef.current?.style.setProperty('--cursor-energy', '0');
    };

    window.addEventListener('pointermove', update, { passive: true });
    window.addEventListener('scroll', resync, { passive: true });
    window.addEventListener('resize', resync);
    window.addEventListener('pointerleave', reset);
    window.addEventListener('blur', reset);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', update);
      window.removeEventListener('scroll', resync);
      window.removeEventListener('resize', resync);
      window.removeEventListener('pointerleave', reset);
      window.removeEventListener('blur', reset);
      delete document.documentElement.dataset.cursorKind;
    };
  }, []);

  return (
    <div ref={auraRef} className="cursor-aurora" aria-hidden="true">
      <span className="cursor-blob cursor-blob-primary" />
      <span className="cursor-blob cursor-blob-secondary" />
      <span className="cursor-blob cursor-blob-tertiary" />
    </div>
  );
}
