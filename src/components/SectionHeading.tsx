import { motion } from 'framer-motion';

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
};

export default function SectionHeading({ eyebrow, title, description, align = 'left' }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}
    >
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-gold sm:mb-4 sm:text-xs sm:tracking-[0.35em]">{eyebrow}</p>
      <h2 className="text-balance text-[2rem] font-semibold leading-[0.98] tracking-[-0.055em] text-bone sm:text-5xl lg:text-7xl">{title}</h2>
      {description ? <p className="mt-4 max-w-2xl text-sm leading-7 text-muted sm:mt-5 sm:text-lg sm:leading-8">{description}</p> : null}
    </motion.div>
  );
}
