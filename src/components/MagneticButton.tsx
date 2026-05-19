import type { ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '../utils/cn';

type Props = {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'ghost' | 'panel';
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  cursorLabel?: string;
  cursorType?: 'action' | 'link' | 'case';
};

const base =
  'group relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full px-4 py-2.5 text-[13px] font-semibold tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-gold/40 disabled:pointer-events-none disabled:opacity-50 sm:px-5 sm:py-3 sm:text-sm';

const variants = {
  primary:
    'bg-bone text-ink shadow-glow hover:bg-white before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-gold/40 before:to-transparent hover:before:translate-x-full before:transition-transform before:duration-700',
  ghost: 'border border-bone/15 bg-white/[0.03] text-bone hover:border-gold/40 hover:bg-gold/10',
  panel: 'border border-bone/10 bg-graphite/70 text-bone hover:border-cyan/30 hover:bg-cyan/10'
};

export default function MagneticButton({
  children,
  className,
  variant = 'ghost',
  href,
  target,
  rel,
  onClick,
  type = 'button',
  disabled,
  cursorLabel,
  cursorType
}: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18, mass: 0.25 });
  const sy = useSpring(y, { stiffness: 180, damping: 18, mass: 0.25 });
  const rotate = useTransform(sx, [-18, 18], [-2, 2]);

  const handleMove = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.22);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.22);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <motion.a
        style={{ x: sx, y: sy, rotate }}
        onPointerMove={handleMove}
        onPointerLeave={reset}
        className={classes}
        href={href}
        target={target}
        rel={rel}
        data-cursor={cursorType ?? 'link'}
        data-cursor-label={cursorLabel ?? 'Open'}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.a>
    );
  }

  return (
    <motion.button
      style={{ x: sx, y: sy, rotate }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={classes}
      onClick={onClick}
      type={type}
      disabled={disabled}
      data-cursor={cursorType ?? 'action'}
      data-cursor-label={cursorLabel ?? 'Action'}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
