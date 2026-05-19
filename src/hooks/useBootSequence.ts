import { useEffect, useState } from 'react';
import { projects } from '../data/portfolio';

export const bootPhases = [
  'initializing interface',
  'loading case visuals',
  'priming motion layer',
  'syncing command surface',
  'system ready'
];

const imageUrls = Array.from(new Set(projects.flatMap((project) => project.images?.map((image) => image.src) ?? [])));

const wait = (duration: number) => new Promise((resolve) => window.setTimeout(resolve, duration));

const nextPaint = () =>
  new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => resolve()));
  });

const idle = () =>
  new Promise<void>((resolve) => {
    const requestIdle = (window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
    }).requestIdleCallback;

    if (requestIdle) {
      requestIdle(() => resolve(), { timeout: 450 });
      return;
    }

    window.setTimeout(resolve, 80);
  });

const prepareMotionLayer = async () => {
  await import('framer-motion');
  await nextPaint();
  document.documentElement.classList.add('motion-primed');
  await idle();
};

const preloadImage = (src: string, priority: 'high' | 'low' = 'low') =>
  new Promise<void>((resolve) => {
    const image = new Image();
    const prioritizedImage = image as HTMLImageElement & { fetchPriority?: 'high' | 'low' | 'auto' };
    image.decoding = 'async';
    image.loading = 'eager';
    prioritizedImage.fetchPriority = priority;
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = src;

    image.decode?.().then(() => resolve()).catch(() => undefined);
  });

const shouldSkipBoot = () => typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('skipBoot');

export function useBootSequence() {
  const [complete, setComplete] = useState(() => shouldSkipBoot());
  const [progress, setProgress] = useState(() => (shouldSkipBoot() ? 100 : 0));
  const [phaseIndex, setPhaseIndex] = useState(() => (shouldSkipBoot() ? bootPhases.length - 1 : 0));

  useEffect(() => {
    let cancelled = false;
    const skipBoot = shouldSkipBoot();

    if (skipBoot) {
      document.documentElement.classList.add('motion-primed');
      setProgress(100);
      setPhaseIndex(bootPhases.length - 1);
      setComplete(true);
      return () => {
        cancelled = true;
      };
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const lightBoot = reducedMotion || Boolean(connection?.saveData);
    const minDuration = lightBoot ? 320 : 1700;
    const maxDuration = lightBoot ? 750 : 3100;
    const startedAt = performance.now();

    const fontPromise = document.fonts?.ready.then(() => undefined).catch(() => undefined) ?? Promise.resolve();
    const motionPromise = prepareMotionLayer().catch(() => undefined);
    const imagePromises = imageUrls.map((src, index) => preloadImage(src, index < 2 ? 'high' : 'low'));
    const assetPromise = Promise.all([fontPromise, motionPromise, ...imagePromises]).then(() => undefined);
    let assetsReady = false;

    assetPromise.then(() => {
      assetsReady = true;
    });

    const progressTimer = window.setInterval(() => {
      if (cancelled) return;

      const elapsed = performance.now() - startedAt;
      const naturalTarget = assetsReady ? 100 : Math.min(88, Math.round((elapsed / maxDuration) * 88));

      setProgress((current) => {
        const next = Math.max(current, naturalTarget);
        return Math.min(100, next + (assetsReady ? 8 : 2));
      });
    }, lightBoot ? 80 : 120);

    const finish = async () => {
      await Promise.race([assetPromise, wait(maxDuration)]);
      const elapsed = performance.now() - startedAt;
      if (elapsed < minDuration) {
        await wait(minDuration - elapsed);
      }

      if (cancelled) return;
      window.clearInterval(progressTimer);
      setProgress(100);
      setPhaseIndex(bootPhases.length - 1);
      await wait(lightBoot ? 120 : 420);
      if (!cancelled) setComplete(true);
    };

    finish();

    return () => {
      cancelled = true;
      window.clearInterval(progressTimer);
    };
  }, []);

  useEffect(() => {
    const nextPhase = Math.min(bootPhases.length - 1, Math.floor(progress / 24));
    setPhaseIndex(nextPhase);
  }, [progress]);

  return {
    complete,
    progress,
    phase: bootPhases[phaseIndex]
  };
}
