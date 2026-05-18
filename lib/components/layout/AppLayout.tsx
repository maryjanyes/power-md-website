/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Navbar } from './Navbar';
import CartDrawer from './CartDrawer';
import ChargeStateIndicator from './ChargeStateIndicator';
import Footer from './Footer';
import { CartProvider } from '@/lib/context/CartContext';
import { CartOrderItem } from '@/lib/types/cart.types';
import { ProductFilters, ProductProvider } from '@/lib/context/ProductContext';
import { ProductItem } from '@/db/generated/prisma/client';
import { getProductDailyFavourites, getProducts } from '@/api/server-actions/product.actions';

type Props = {
  children: React.ReactElement,
};

export const AppLayout = ({ children }: Props) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [isRawProductsLoadingInProgress, setIsRawProductsLoadingInProgress] = useState(false);
  const [cartItems, setCartItems] = useState<CartOrderItem[]>([]);
  const [rawProducts, setRawProducts] = useState<ProductItem[]>([]);
  const [productDailyFavourites, setProductDailyFavourites] = useState<number[]>([]);
  const [productFilters, setProductFilters] = useState<ProductFilters>({
    price_range: { min: undefined, max: undefined },
    brand: [],
    capacity_ah: [],
    voltage: [],
  });

  useEffect(() => {
    setIsRawProductsLoadingInProgress(true);
    getProductDailyFavourites().then((data) => {
      setProductDailyFavourites(data.map((item) => item.id));
    });
    getProducts().then((data) => {
      setRawProducts(data);
    }).finally(() => {
      setIsRawProductsLoadingInProgress(false);
    });
  }, []);

  const filteredProducts = useMemo(() => {
    let items = [...rawProducts];

    if (productFilters.brand) {
      items = items.filter((item) => productFilters.brand.includes(item.brand));
    }

    if (productFilters.capacity_ah) {
      items = items.filter((item) => productFilters.capacity_ah.includes(item.capacity_ah));
    }

    if (productFilters.price_range) {
      items = items.filter((item) =>
        item.price > (productFilters.price_range?.min || 0) && item.price < (productFilters.price_range?.max || 1000)
      );
    }

    return items;
  }, [productFilters, rawProducts]);

  const handleCartOpen = () => setCartOpen(true);

  return (
    <div className="min-h-screen bg-background">
      <ChargeStateIndicator />
      <Navbar onCartOpen={handleCartOpen} />
      <CartDrawer open={cartOpen} onOpenChange={handleCartOpen} />
      <main>
        <ProductProvider value={{
          rawProducts,
          productDailyFavourites,
          filteredProducts,
          productFilters,
          isRawProductsLoadingInProgress,
          setProductFilters: (name, value) => {
            setProductFilters((prev) => ({
              ...prev,
              [name]: value,
            }));
          },
          setFilteredProducts: () => {},
          setProductDailyFavourites: () => {},
          setRawProducts: () => {}
        }}>
          <CartProvider value={{
            cartItems,
            addCartItem: (orderItem) => {
              setCartItems((prev) => [...prev, orderItem]);
            },
            clearCart: () => setCartItems([]),
            removeCartItem: (productId) => {
              setCartItems((prev) => prev.filter((i) => i.product_id !== productId))
            },
            updateCardItemQuantity: (productId, newQuantity) => {
              setCartItems((prev) => prev.map((item) => {
                if (item.product_id === productId) {
                  return {
                    ...item,
                    quantity: newQuantity,
                  };
                }
          
                return item;
              }))
            },
          }}>
          {children}
          </CartProvider>
        </ProductProvider>
      </main>
      <Footer />
    </div>
  );
}
