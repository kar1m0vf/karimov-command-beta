import type Lenis from 'lenis';

declare global {
  interface Window {
    commandLenis?: Lenis;
  }
}

export {};
