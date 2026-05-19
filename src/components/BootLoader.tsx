import { motion } from 'framer-motion';

type Props = {
  progress: number;
  phase: string;
};

export default function BootLoader({ progress, phase }: Props) {
  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[80] grid place-items-center overflow-hidden bg-ink text-bone"
      aria-live="polite"
      aria-label={`Loading portfolio interface: ${phase}`}
    >
      <div className="boot-grid" aria-hidden="true" />
      <div className="boot-sweep" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan/45 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex w-[min(92vw,420px)] flex-col items-center px-5"
      >
        <div className="relative grid h-56 w-56 place-items-center sm:h-64 sm:w-64">
          <motion.div
            className="absolute inset-0 rounded-full border border-gold/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-5 rounded-full border border-cyan/15"
            animate={{ rotate: -360 }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          />
          <svg viewBox="0 0 128 128" className="absolute inset-0 h-full w-full rotate-[-90deg]" aria-hidden="true">
            <circle cx="64" cy="64" r="54" fill="none" stroke="rgba(246,239,229,.08)" strokeWidth="6" />
            <motion.circle
              cx="64"
              cy="64"
              r="54"
              fill="none"
              stroke="url(#boot-progress)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              animate={{ strokeDashoffset: dashOffset }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="boot-progress" x1="0" x2="1">
                <stop offset="0%" stopColor="#D8A84E" />
                <stop offset="55%" stopColor="#7DD3FC" />
                <stop offset="100%" stopColor="#8FE388" />
              </linearGradient>
            </defs>
          </svg>

          <motion.div
            className="premium-border relative grid h-32 w-32 place-items-center rounded-[2rem] sm:h-36 sm:w-36"
            animate={{ scale: [1, 1.035, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-3 rounded-[1.45rem] border border-bone/10 bg-ink/55" />
            <motion.span
              className="relative text-6xl font-semibold tracking-[-0.08em] text-bone sm:text-7xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              K
            </motion.span>
            <motion.span
              className="absolute right-7 top-7 h-2.5 w-2.5 rounded-full bg-cyan shadow-[0_0_24px_rgba(125,211,252,.8)]"
              animate={{ opacity: [0.45, 1, 0.45], scale: [0.9, 1.2, 0.9] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>

        <div className="mt-8 w-full max-w-64">
          <div className="h-1 overflow-hidden rounded-full bg-bone/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-gold via-cyan to-mint"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
          </div>
          <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
            <span>kar1m0vf</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
