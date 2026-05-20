/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from 'framer-motion';
import { useFeaturedProducts } from '@/lib/hooks/useFeaturedProducts';
import { ProductCard } from '../products/ProductCard';
import { useContext, useMemo } from 'react';
import { ProductContext } from '@/lib/context/ProductContext';

export default function HeroSection() {
  const { rawProducts } = useContext(ProductContext);
  const { productsFeatured: productsFeaturedIds } = useFeaturedProducts();
  const products = useMemo(() => rawProducts.filter((product) => !!productsFeaturedIds.includes(product.id)), [rawProducts, productsFeaturedIds]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pl-60">
      <div className="absolute inset-0">
        <img
          src="https://media.base44.com/images/public/6a088c4792d18435606e7c42/634cbf6d7_generated_80e52798.png"
          alt="Banner BG"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
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
            className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-foreground"
          >
            PRECISION<br/><span className="text-primary">ENGINEERED</span><br/>POWER
          </motion.h1>
          
          <div className="flex flex-row flex-wrap w-full gap-3">
            {products.map((product, productId) => (
              <ProductCard {...product} key={productId} />
            ))}
          </div>
      </div>
    </section>
  );
};
