/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from 'framer-motion';
import { Badge } from "@/lib/components/ui/badge";
import { Button } from "@/lib/components/ui/button";
import { ShoppingCart, ArrowRight, Zap, Link } from 'lucide-react';
import { toast } from 'sonner';
import { useContext } from 'react';
import { CartContext } from '@/lib/context/CartContext';
import { ProductItem } from '@/db/generated/prisma/client';

const chemistryColors = {
  AGM: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  GEL: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  'Li-ion': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  LiFePO4: 'bg-primary/10 text-primary border-primary/20',
};

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
    toast.success(`${product.name} added to cart`, {
      description: `${product.voltage}V · ${product.capacity_ah}Ah`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link
        to={`/product/${product.id}`}
        className="group block border-b border-border/40 hover:bg-card/60 transition-all duration-200"
      >
        <div className="flex items-center gap-4 sm:gap-6 py-4 sm:py-5 px-4 sm:px-6">
          {/* Image */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-secondary flex-shrink-0 group-hover:ring-1 group-hover:ring-primary/30 transition-all">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-muted-foreground/30" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="text-sm sm:text-base font-heading font-semibold group-hover:text-primary transition-colors truncate">{product.name}</h3>
              <Badge variant="outline" className={`text-[10px] px-1.5 py-0 font-mono ${(chemistryColors as any)[product.brand] || ''}`}>
                {product.brand}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
              <span>{product.voltage}V</span>
              <span>{product.capacity_ah}Ah</span>
              {product.cycle_life && <span className="hidden sm:inline">{product.cycle_life} cycles</span>}
              {product.weight_kg && <span className="hidden sm:inline">{product.weight_kg}kg</span>}
            </div>
          </div>

          {/* Price & Actions */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            <div className="text-right">
              <p className="text-base sm:text-lg font-heading font-bold text-primary">${product.price?.toFixed(2)}</p>
              {!product.in_stock && product.in_stock !== undefined && (
                <p className="text-[10px] font-mono text-destructive">OUT OF STOCK</p>
              )}
            </div>
            <ButtonComponent
              size="sm"
              onClick={handleAddItem}
              disabled={!product.in_stock}
              className="bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground h-9 w-9 p-0 haptic-btn transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
            </ButtonComponent>
            <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors hidden sm:block" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
