'use client';

import { Minus, Plus, Trash2, ShoppingCart, Weight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContext } from "react";
import Link from "next/link";
import { CartContext } from "@/lib/context/CartContext";
import { ProductContext } from "@/lib/context/ProductContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/lib/components/ui/sheet";
import { Button } from "@/lib/components/ui/button";
import Image from 'next/image';

type Props = {
  onOpenChange: () => void,
  onCloseChange: () => void,
  open: boolean,
}

const ButtonComponent: any = Button;
const SheetContentComponent: any = SheetContent;
const SheetTitleComponent: any = SheetTitle;
const SheetHeaderComponent: any = SheetHeader;
const SheetComponent: any = Sheet;

export default function CartDrawer({ open, onOpenChange, onCloseChange }: Props) {
  const { rawProducts } = useContext(ProductContext);
  const { cartItems, updateCardItemQuantity, removeCartItem } = useContext(CartContext);

  const getProduct = (productId: number) => {
    return rawProducts.find((p) => p.id === productId);
  };

  return (
    <SheetComponent open={open}>
      <SheetContentComponent className="w-full sm:max-w-lg bg-background border-l border-border p-0 flex flex-col" onClose={onCloseChange}>
        <SheetHeaderComponent className="px-6 pt-6 pb-4 border-b border-border">
          <SheetTitleComponent className="font-heading text-xl flex items-center gap-3 text-foreground">
            <ShoppingCart className="w-5 h-5 text-primary" />Кошик
            <span className="text-xs font-mono text-muted-foreground ml-auto mt-5">
              {cartItems.length} шт.
            </span>
          </SheetTitleComponent>
        </SheetHeaderComponent>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <ShoppingCart className="w-12 h-12 mb-4 opacity-30" />
              <p className="font-mono text-sm">корзина пуста</p>
            </div>
          ) : (
            <AnimatePresence>
              {cartItems?.map(item => {
                const product = getProduct(item.product_id);
                  
                return !!product && (
                  <motion.div
                    key={item.product_name}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-4 py-4 border-b border-border/50 last:border-0"
                  >
                    <div className="w-16 h-16 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
                      {product?.image_url && (
                        <Image
                          src={product?.image_url}
                          alt={item.product_name}
                          width={100}
                          height={100}
                          title={item.product_name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-heading font-semibold truncate text-foreground">{item.product_name}</p>
                      <p className="text-xs font-mono text-muted-foreground mt-0.5">
                        {product?.capacity_ah} · {product.voltage}V · {product.capacity_ah}Ah.
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateCardItemQuantity(item.product_id, item.quantity - 1)}
                            className="cursor-pointer w-7 h-7 flex items-center justify-center bg-secondary rounded hover:bg-accent transition-colors haptic-btn"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-mono">{item.quantity}</span>
                          <button
                            onClick={() => updateCardItemQuantity(item.product_id, item.quantity + 1)}
                            className="cursor-pointer w-7 h-7 flex items-center justify-center bg-secondary rounded hover:bg-accent transition-colors haptic-btn"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-mono text-primary font-semibold">
                            ₴{(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeCartItem(item.product_id)}
                            className="p-1 hover:text-destructive transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="px-6 py-4 border-t border-border bg-card/50 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                Загальна вага
                <Weight className="w-4 h-4" />
              </span>
              <span>{cartItems.reduce((total, item) => total += (Number(item.weight) * item.quantity), 0)} кг.</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Фінальна ціна</span>
              <span className="text-primary font-bold">₴{cartItems.reduce((total, item) => total += (item.price * item.quantity), 0)}</span>
            </div>
            <Link href="/checkout" onClick={onOpenChange}>
              <ButtonComponent className="w-full h-12 bg-primary text-primary-foreground font-heading font-bold text-sm haptic-btn hover:bg-primary/90 gap-2 mt-2">
                Фіналізувати замовлення
                <ArrowRight className="w-4 h-4" />
              </ButtonComponent>
            </Link>
          </div>
        )}
      </SheetContentComponent>
    </SheetComponent>
  );
}