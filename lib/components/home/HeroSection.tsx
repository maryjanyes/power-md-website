'use client';

import Image from 'next/image';
// @ts-expect-error Framer package exists.
import { motion } from 'framer-motion';
import FeaturedProducts from './FeaturedProducts';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          width={100}
          height={100}
          src="https://media.base44.com/images/public/6a088c4792d18435606e7c42/634cbf6d7_generated_80e52798.png"
          alt="Power.UKR - акумулятори для будь-яких задач"
          title="Power.UKR - акумулятори для будь-яких задач"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-mono text-primary tracking-widest">АКУМУЛЯТОРИ ДЛЯ БУДЬ-ЯКИХ ЗАДАЧ</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground"
        >
          PRECISION<br/><span className="text-primary">ENGINEERED</span><br/>POWER
        </motion.h1>

        <FeaturedProducts />
      </div>
    </section>
  );
};
