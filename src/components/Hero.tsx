'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import GithubIcon from './GithubIcon';
import { useLanguage } from '@/lib/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const [currentTitle, setCurrentTitle] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 50, damping: 20, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const portraitX = useTransform(smoothX, [-0.5, 0.5], [8, -8]);
  const portraitY = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const orb1X = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const orb1Y = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);
  const orb2X = useTransform(smoothX, [-0.5, 0.5], [10, -10]);
  const orb2Y = useTransform(smoothY, [-0.5, 0.5], [10, -10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % t.hero.titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [t.hero.titles.length]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="section-padding flex items-center min-h-screen relative overflow-hidden"
    >
      <motion.div
        style={{ x: orb1X, y: orb1Y }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/[0.04] rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ x: orb2X, y: orb2Y }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/[0.03] rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
        >
          <div className="flex-1 max-w-3xl">
            <motion.p
              variants={itemVariants}
              className="text-accent text-sm font-medium tracking-wide uppercase mb-6"
            >
              {t.hero.greeting}
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-[1.1] mb-6"
            >
              {t.hero.name}
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="h-12 sm:h-14 md:h-16 flex items-center mb-8 overflow-hidden"
            >
              <motion.span
                key={currentTitle}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const }}
                className="text-xl sm:text-2xl md:text-3xl font-medium gradient-text"
              >
                {t.hero.titles[currentTitle]}
              </motion.span>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-text-secondary max-w-xl mb-10 leading-relaxed"
            >
              {t.hero.tagline}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="btn-premium inline-flex items-center gap-2 px-7 py-3.5 bg-accent hover:bg-accent-hover text-bg-primary font-semibold rounded-xl hover:shadow-lg hover:shadow-accent/20 active:scale-[0.98] transition-all duration-250"
              >
                {t.hero.primaryCta}
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://github.com/ThiagoIbrahimVieira"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium inline-flex items-center gap-2 px-7 py-3.5 bg-bg-card hover:bg-bg-card-hover text-text-primary font-semibold rounded-xl border border-border hover:border-accent/30 hover:shadow-lg hover:shadow-black/20 active:scale-[0.98] transition-all duration-250"
              >
                <GithubIcon className="w-4 h-4" />
                {t.hero.secondaryCta}
              </a>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="flex-shrink-0"
          >
            <motion.div
              style={{ x: portraitX, y: portraitY }}
              className="relative"
            >
              <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-border-subtle shadow-2xl shadow-accent/10">
                <div className="w-full h-full bg-gradient-to-br from-bg-card to-bg-secondary flex items-center justify-center">
                  <span className="text-5xl sm:text-6xl font-bold text-accent/30">TI</span>
                </div>
              </div>
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-accent/20 to-transparent blur-sm -z-10" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-text-tertiary"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
