/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Link, Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/components/ui/select';
import { Button } from '@/lib/components/ui/button';
import { useRouter } from 'next/navigation';
import { productTypeCategories } from '@/api/constants/categories';

const ButtonComponent: any = Button;
const SelectItemComponent: any = SelectItem;
const SelectContentComponent: any = SelectContent;
const SelectTriggerComponent: any = SelectTrigger;

export default function HeroSection() {
  const { push } = useRouter();
  const [voltage, setVoltage] = useState<string | undefined>(undefined);
  const [capacityAh, setCapacityAh] = useState<string | undefined>(undefined);

  const handleQuickFind = () => {
    const params = new URLSearchParams();
  
    if (voltage) params.set('voltage', voltage);
    if (capacityAh) params.set('capacity_ah', capacityAh);
  
    push(`/products?${params.toString()}`);
  };

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
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono text-primary tracking-widest">ENERGY STORAGE SYSTEMS</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-foreground"
          >
            PRECISION<br/><span className="text-primary">ENGINEERED</span><br/>POWER
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-base sm:text-lg font-mono text-muted-foreground leading-relaxed max-w-lg"
          >
            AGM · GEL — Передові рішення для електрохімічного зберігання енергії для будь-якого застосування.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 p-4 sm:p-5 rounded-xl border border-border bg-card/60 backdrop-blur-sm max-w-lg"
          >
            <p className="text-xs font-mono text-muted-foreground mb-3 tracking-widest">ШВИДКИЙ ПОШУК</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={capacityAh} onValueChange={setCapacityAh}>
                <SelectTriggerComponent className="flex-1 bg-secondary border-border font-mono text-sm">
                  <SelectValue placeholder="Ємність (Ah)" />
                </SelectTriggerComponent>
                <SelectContentComponent>
                  {productTypeCategories.map(category => (
                    <SelectItemComponent key={category.name} value={category.name} className="font-mono">
                      {category.name}
                    </SelectItemComponent>
                  ))}
                </SelectContentComponent>
              </Select>
              <Select value={voltage} onValueChange={setVoltage}>
                <SelectTriggerComponent className="flex-1 bg-secondary border-border font-mono text-sm">
                  <SelectValue placeholder="Вольтаж (V)" />
                </SelectTriggerComponent>
                <SelectContentComponent>
                  {[6, 12, 24, 36, 48].map(v => (
                    <SelectItemComponent key={v} value={String(v)} className="font-mono">{v}V</SelectItemComponent>
                  ))}
                </SelectContentComponent>
              </Select>
              <ButtonComponent
                onClick={handleQuickFind}
                className="bg-primary text-primary-foreground font-heading font-bold tracking-wider haptic-btn gap-2"
              >
                <Search className="w-4 h-4" />пошук
              </ButtonComponent>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8"
          >
            <Link to="/products">
              <ButtonComponent variant="ghost" className="text-muted-foreground hover:text-primary font-mono text-sm gap-2 group">
                УСІ ПРОДУКТИ
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </ButtonComponent>
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="space-y-4 opacity-10">
          {['AGM', 'GEL', 'Li-ion', 'LiFePO4', 'AGM', 'GEL'].map((chem, i) => (
            <p key={i} className="font-heading font-bold text-6xl tracking-tighter text-foreground writing-vertical" style={{ writingMode: 'vertical-rl' }}>
              {chem}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};
