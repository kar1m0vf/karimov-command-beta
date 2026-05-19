import { motion } from 'framer-motion';
import { Bot, Code2, Globe2, Sparkles } from 'lucide-react';
import { profile } from '../data/portfolio';
import SectionHeading from './SectionHeading';

export default function AboutSection() {
  return (
    <section id="about" className="section-pad relative py-12 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 sm:gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-stretch">
          <div className="premium-border rounded-[1.5rem] p-5 sm:rounded-[2rem] sm:p-7">
            <SectionHeading eyebrow="Builder profile" title="Young, technical, product-minded." />
            <p className="mt-5 text-sm leading-7 text-muted sm:mt-7 sm:text-lg sm:leading-9">{profile.compactBio}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {[
              {
                icon: Code2,
                title: 'Frontend identity',
                text: 'React, TypeScript, responsive UI, motion and clean information hierarchy.'
              },
              {
                icon: Bot,
                title: 'Automation edge',
                text: 'Telegram bots, Python tooling, scraping flows, SQLite persistence and alerts.'
              },
              {
                icon: Sparkles,
                title: 'AI-assisted workflow',
                text: 'Uses AI as acceleration, but keeps taste, direction and final review human-led.'
              },
              {
                icon: Globe2,
                title: 'Public proof',
                text: 'GitHub projects, live deploys, real screenshots and portfolio as its own case study.'
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-90px' }}
                  transition={{ delay: index * 0.06, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[1.35rem] border border-bone/10 bg-white/[0.035] p-4 backdrop-blur-xl transition hover:border-gold/25 hover:bg-gold/[0.045] sm:rounded-[2rem] sm:p-6"
                >
                  <Icon className="text-gold" size={25} />
                  <h3 className="mt-5 text-xl font-semibold tracking-[-0.05em] text-bone sm:mt-8 sm:text-2xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted sm:mt-4 sm:text-base sm:leading-7">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
