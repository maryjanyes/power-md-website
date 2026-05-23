/* eslint-disable @next/next/no-img-element */
'use client';

import { useContext, useState } from 'react';
import { ShoppingCart, ArrowLeft, Zap, Shield, ThermometerSun, RefreshCw, Minus, Plus, Check } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useProducts } from '@/lib/hooks/useProducts';
import { SpecCard } from '@/lib/components/products/SpecCard';
import { chemistryColors } from '@/api/constants/colors';
import { CartContext } from '@/lib/context/CartContext';
import { useParams } from 'next/navigation';
import { Button } from "@/lib/components/ui/button";
import { Badge } from "@/lib/components/ui/badge";
import { Skeleton } from "@/lib/components/ui/skeleton";

const ButtonComponent: any = Button;

export default function ProductDetailPage() {
  const { addCartItem } = useContext(CartContext);
  const { productId } = useParams();
  const { productById } = useProducts({
    productId: Number(productId),
  });
  const [productQuantity, setProductQuantity] = useState(1);
  const [productAdded, setProductAdded] = useState(false);
  
  const handleAddProductToCart = () => {
    if (!productById) {
      return;
    }
  
    addCartItem({
      product_id: productById.id,
      product_name: productById.name,
      price: productById.price,
      weight: productById.weight_kg,
      quantity: productQuantity,
    });
  
    setProductAdded(true);
    toast.success(`${productById?.name} додано в корзину`, { description: `кількість: ${productQuantity}` });
    setTimeout(() => setProductAdded(false), 10000);
  };

  if (!productById) {
    return (
      <div className="min-h-screen pt-28 pb-20 flex items-center justify-center">
          <div className="min-h-screen pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <Skeleton className="aspect-square rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-10 w-72" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
        <div className="text-center">
          <p className="font-mono text-muted-foreground text-sm">Не знайдено</p>
          <Link href="/products" className="text-primary font-mono text-sm mt-4 inline-block hover:underline">
            ← Повернутись до каталогу
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/products" className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-3.5 h-3.5" />
          До каталогу
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square rounded-2xl overflow-hidden bg-card border border-border"
          >
            {productById.image_url ? (
              <img src={productById.image_url} alt={`акумулятор_${productById.name}`} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Zap className="w-20 h-20 text-muted-foreground/20" />
              </div>
            )}
            <div className="absolute bottom-4 left-4 right-4 flex gap-2 flex-wrap">
              <div className="px-3 py-1.5 rounded-lg bg-background/60 backdrop-blur-xl border border-border/50">
                <p className="text-[10px] font-mono text-muted-foreground">Вольтаж</p>
                <p className="text-sm font-heading font-bold text-foreground">{productById.voltage}V</p>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-background/60 backdrop-blur-xl border border-border/50">
                <p className="text-[10px] font-mono text-muted-foreground">Ємність</p>
                <p className="text-sm font-heading font-bold text-foreground">{productById.capacity_ah}Ah.</p>
              </div>
              {productById.cycle_life && (
                <div className="px-3 py-1.5 rounded-lg bg-background/60 backdrop-blur-xl border border-border/50">
                  <p className="text-[10px] font-mono text-muted-foreground">Цикл зарядки</p>
                  <p className="text-sm font-heading font-bold text-foreground">{productById.cycle_life}</p>
                </div>
              )}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Badge variant="outline" className={`text-xs font-mono mb-4 ${(chemistryColors as any)[productById.terminal_cover_type] || ''}`}>
              {productById.terminal_cover_type}
            </Badge>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight mb-4">{productById.name}</h1>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-8">
              {productById?.name || 'High-performance energy storage solution engineered for reliability.'}
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              <SpecCard icon={Zap} label="Вольтаж" value={`${productById.voltage}V`} />
              <SpecCard icon={RefreshCw} label="Цикл зарядки" value={productById.cycle_life ? `${productById.cycle_life}` : '—'} />
              <SpecCard icon={ThermometerSun} label="Вага" value={productById.weight_kg ? `${productById.weight_kg} кг.` : '—'} />
              <SpecCard icon={Shield} label="Гарантія" value={productById.warranty_years ? `${productById.warranty_years} роки` : '—'} />
            </div>
            <div className="mb-6">
              <p className="font-heading font-bold text-3xl text-primary">₴{productById.price}</p>
              {productById.in_stock !== false && (
                <p className="text-xs font-mono text-primary/60 mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />В наявності
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-xl border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="text-sm font-heading font-semibold truncate">{productById.name}</p>
            <p className="text-xs font-mono text-muted-foreground">{productById.capacity_ah} · {productById.voltage}V</p>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <p className="text-xl font-heading font-bold text-primary">₴{productById.price}</p>
            <div className="flex items-center gap-1 bg-secondary rounded-lg">
              <button
                onClick={() => setProductQuantity(q => Math.max(1, q - 1))}
                className="p-2 hover:bg-accent rounded-l-lg transition-colors haptic-btn"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center text-sm font-mono">{productQuantity}</span>
              <button
                onClick={() => setProductQuantity(q => q + 1)}
                className="p-2 hover:bg-accent rounded-r-lg transition-colors haptic-btn"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <ButtonComponent
              onClick={handleAddProductToCart}
              disabled={!productById.in_stock}
              className="bg-primary text-primary-foreground font-heading font-bold haptic-btn gap-2 h-11 px-6"
            >
              {productAdded ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
              {productAdded ? 'додано' : 'додати в кошик'}
            </ButtonComponent>
          </div>
        </div>
      </div>
    </div>
  );
}
