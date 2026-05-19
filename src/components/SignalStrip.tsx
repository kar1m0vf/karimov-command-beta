import { motion } from 'framer-motion';
import { systemSignals } from '../data/portfolio';

export default function SignalStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" aria-label="System signals">
      <div className="grid gap-3 rounded-[2rem] border border-white/8 bg-white/[0.025] p-3 backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">
        {systemSignals.map((signal, index) => (
          <motion.div
            key={signal.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            className="rounded-[1.35rem] border border-white/8 bg-black/25 p-4"
          >
            <signal.icon className="h-5 w-5 text-amberline" />
            <p className="mt-5 text-xs uppercase tracking-[0.22em] text-smoke">{signal.label}</p>
            <p className="mt-1 text-sm font-medium text-bone">{signal.value}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
