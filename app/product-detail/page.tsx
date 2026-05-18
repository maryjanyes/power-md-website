/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from 'react';
import { Button } from "@/lib/components/ui/button";
import { Badge } from "@/lib/components/ui/badge";
import { Skeleton } from "@/lib/components/ui/skeleton";
import { ShoppingCart, ArrowLeft, Zap, Shield, ThermometerSun, RefreshCw, Minus, Plus, Check } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useProducts } from '@/lib/hooks/useProducts';
import { SpecCard } from '@/lib/components/products/SpecCard';
import { chemistryColors } from '@/api/constants/colors';
import { useProductFeatures } from '@/lib/hooks/useProductFeatures';
import { CartContext } from '@/lib/context/CartContext';

const ButtonComponent: any = Button;

export default function ProductDetailPage() {
  const { addCartItem } = useContext(CartContext);
  const productId = Number(window.location.pathname.split('/product/')[1]);
  const { isRawProductsLoading, productById } = useProducts(productId);
  const { productFeatureItems } = useProductFeatures(productId);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddProductToCart = () => {
    if (!productById) {
      return;
    }
  
    addCartItem({
      product_id: productById.id,
      product_name: productById.name,
      price: productById.price,
      quantity,
    });
  
    setAdded(true);
    toast.success(`${productById?.name} added to cart`, { description: `Qty: ${quantity}` });
    setTimeout(() => setAdded(false), 10000);
  };

  if (isRawProductsLoading) {
    return (
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
    );
  }

  if (!productById) {
    return (
      <div className="min-h-screen pt-28 pb-20 flex items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-muted-foreground text-sm">PRODUCT NOT FOUND</p>
          <Link href="/products" className="text-primary font-mono text-sm mt-4 inline-block hover:underline">
            ← Back to products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Link href="/products" className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-3.5 h-3.5" />
          BACK TO PRODUCTS
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square rounded-2xl overflow-hidden bg-card border border-border"
          >
            {productById.image_url ? (
              <img src={productById.image_url} alt={productById.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Zap className="w-20 h-20 text-muted-foreground/20" />
              </div>
            )}
            {/* Glassmorphic spec overlays */}
            <div className="absolute bottom-4 left-4 right-4 flex gap-2 flex-wrap">
              <div className="px-3 py-1.5 rounded-lg bg-background/60 backdrop-blur-xl border border-border/50">
                <p className="text-[10px] font-mono text-muted-foreground">VOLTAGE</p>
                <p className="text-sm font-heading font-bold text-foreground">{productById.voltage}V</p>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-background/60 backdrop-blur-xl border border-border/50">
                <p className="text-[10px] font-mono text-muted-foreground">CAPACITY</p>
                <p className="text-sm font-heading font-bold text-foreground">{productById.capacity_ah}Ah</p>
              </div>
              {productById.cycle_life && (
                <div className="px-3 py-1.5 rounded-lg bg-background/60 backdrop-blur-xl border border-border/50">
                  <p className="text-[10px] font-mono text-muted-foreground">CYCLES</p>
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
            <Badge variant="outline" className={`text-xs font-mono mb-4 ${(chemistryColors as any)[productById.terminal_akb_type] || ''}`}>
              {productById.terminal_akb_type}
            </Badge>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight mb-4">{productById.name}</h1>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-8">
              {productById?.name || 'High-performance energy storage solution engineered for reliability.'}
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              <SpecCard icon={Zap} label="Voltage" value={`${productById.voltage}V`} />
              <SpecCard icon={RefreshCw} label="Cycle Life" value={productById.cycle_life ? `${productById.cycle_life}` : '—'} />
              <SpecCard icon={ThermometerSun} label="Weight" value={productById.weight_kg ? `${productById.weight_kg} kg` : '—'} />
              <SpecCard icon={Shield} label="Warranty" value={productById.warranty_years ? `${productById.warranty_years} yr` : '—'} />
            </div>

            {productById.dimensions && (
              <p className="text-xs font-mono text-muted-foreground mb-4">
                DIMENSIONS: {productById.dimensions}
              </p>
            )}

            {/* Features */}
            {productFeatureItems?.length > 0 && (
              <div className="mb-8">
                <p className="text-xs font-mono text-muted-foreground/60 tracking-wider mb-3">KEY FEATURES</p>
                <div className="space-y-2">
                  {productFeatureItems.map((f, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm font-mono text-muted-foreground">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Applications */}
            {/* {productById.applications?.length > 0 && (
              <div className="mb-8">
                <p className="text-xs font-mono text-muted-foreground/60 tracking-wider mb-3">APPLICATIONS</p>
                <div className="flex flex-wrap gap-2">
                  {productById.applications.map((a, i) => (
                    <Badge key={i} variant="secondary" className="font-mono text-xs">{a}</Badge>
                  ))}
                </div>
              </div>
            )} */}

            {/* Price */}
            <div className="mb-6">
              <p className="font-heading font-bold text-3xl text-primary">${productById.price}</p>
              {productById.in_stock !== false && (
                <p className="text-xs font-mono text-primary/60 mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> IN STOCK
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-xl border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="text-sm font-heading font-semibold truncate">{productById.name}</p>
            <p className="text-xs font-mono text-muted-foreground">{productById.capacity_ah} · {productById.voltage}V</p>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <p className="text-xl font-heading font-bold text-primary">${productById.price}</p>
            <div className="flex items-center gap-1 bg-secondary rounded-lg">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="p-2 hover:bg-accent rounded-l-lg transition-colors haptic-btn"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center text-sm font-mono">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="p-2 hover:bg-accent rounded-r-lg transition-colors haptic-btn"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <ButtonComponent
              onClick={handleAddProductToCart}
              disabled={productById.in_stock === false}
              className="bg-primary text-primary-foreground font-heading font-bold tracking-wider haptic-btn gap-2 h-11 px-6"
            >
              {added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
              {added ? 'ADDED' : 'ADD TO CART'}
            </ButtonComponent>
          </div>
        </div>
      </div>
    </div>
  );
}
