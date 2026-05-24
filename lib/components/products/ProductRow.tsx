'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, ArrowRight, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CartContext } from '@/lib/context/CartContext';
import { ProductItem } from '@/db/generated/prisma/client';
import { getChemistryColor } from '@/lib/utils/base';
import { Badge } from "@/lib/components/ui/badge";
import { Button } from "@/lib/components/ui/button";

type Props = {
  product: ProductItem,
  index: number,
}

const ButtonComponent: any = Button;

export const ProductRow = ({ product, index }: Props) => {
  const { addCartItem } = useContext(CartContext);

  const handleAddItem = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    addCartItem({
      product_id: product.id,
      product_name: product.name,
      price: product.price,
      quantity: 1,
      weight: product.weight_kg,
    });
    toast.success(`${product.name} доданий в корзину`, {
      description: `${product.capacity_ah}Ah.`,
    });
  };

  return (
    <motion.div
      className="w-[50%]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div className="flex-row group flex justify-between border-b border-border/40 hover:bg-card/60 transition-all duration-200 px-5 w-[100%]">
        <Link href={`/product-detail/${product.id}`} className="flex items-center gap-4 sm:gap-6 py-4 sm:py-5">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-secondary flex-shrink-0 group-hover:ring-1 group-hover:ring-primary/30 transition-all">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                title={product.name}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-muted-foreground/30" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="text-sm sm:text-base font-heading font-semibold group-hover:text-primary transition-colors truncate">{product.name}</h3>
              <Badge variant="outline" className={`text-[10px] px-1.5 py-0 font-mono ${getChemistryColor(product.brand) || ''}`}>
                {product.brand}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
              <span>{product.voltage}V</span>
              <span>{product.capacity_ah}Ah</span>
              {product.cycle_life && <span className="hidden sm:inline">{product.cycle_life} циклів</span>}
              {product.weight_kg && <span className="hidden sm:inline">{product.weight_kg} кг.</span>}
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            <div className="text-right">
              <p className="text-base sm:text-lg font-heading font-bold text-primary">₴{product.price?.toFixed(2)}</p>
              {!product.in_stock ? (
                <p className="text-[10px] font-mono text-red-400">не в наявності</p>
              ) : (
                <p className="text-[10px] font-mono text-green-300">в наявності</p>
              )}
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors hidden sm:block" />
          </div>
        </Link>

        {product.in_stock && (
          <ButtonComponent
            size="sm"
            onClick={handleAddItem}
            className="bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground h-9 w-9 p-0 haptic-btn transition-colors cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
          </ButtonComponent>
        )}
      </div>
    </motion.div>
  );
};
