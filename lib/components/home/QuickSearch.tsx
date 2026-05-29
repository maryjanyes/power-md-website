import { ProductItem } from "@/db/generated/prisma/client";
import { Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/components/ui/select';
import { Button } from '@/lib/components/ui/button';
import { productTypeCategories } from "@/lib/constants/categories";
import { useRouter } from "next/navigation";
import { useState } from "react";
// @ts-expect-error Framer package exists.
import { motion } from 'framer-motion';

const ButtonComponent: any = Button;
const SelectItemComponent: any = SelectItem;
const SelectContentComponent: any = SelectContent;
const SelectTriggerComponent: any = SelectTrigger;

export const QuickSearch = (product: ProductItem) => {
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
      <motion.div
              key={product.name}
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
    );
}
