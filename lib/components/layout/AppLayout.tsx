/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { getProductDailyFavourites, getProductFeatured, getProducts, insertProduct } from '@/api/server-actions/product.actions';
import { productsBackup } from '@/api/constants/mock';

type Props = {
  children: React.ReactElement,
};

export const AppLayout = ({ children }: Props) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [isRawProductsLoadingInProgress, setIsRawProductsLoadingInProgress] = useState(false);
  const [cartItems, setCartItems] = useState<CartOrderItem[]>([]);
  const [rawProducts, setRawProducts] = useState<ProductItem[]>([]);
  const [productsFeatured, setProductsFeatured] = useState<number[]>([]);
  const [productDailyFavourites, setProductDailyFavourites] = useState<number[]>([]);
  const [productFilters, setProductFilters] = useState<ProductFilters>({
    price_range: { min: undefined, max: undefined },
    brand: [],
    capacity_ah: [],
    voltage: [],
  });

  const requestFeaturedProducts = () => {
    getProductFeatured().then((data) => {
      setProductsFeatured(data.map((item) => item.product_item_id));
    });
  };

  const requestProducts = () => {
    setIsRawProductsLoadingInProgress(true);
    
    getProducts().then((data) => {
      setRawProducts(data);
    }).finally(() => {
      setIsRawProductsLoadingInProgress(false);
    });
  };

  const requestDailyFavs = () => {
    getProductDailyFavourites().then((data) => {
      setProductDailyFavourites(data.map((item) => item.id));
    });
  };

  const _productsBackupInBatch = () => {
    productsBackup.forEach((product) => {
      insertProduct(product as any);
    });
  };

  const injectScripts = () => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }

  useEffect(() => {
    requestDailyFavs();
    requestFeaturedProducts();
    requestProducts();

    const unmount = injectScripts();

    return unmount;
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

  const handleCartOpen = () => {
    setCartOpen(true);
  }

  const handleCartClose = () => {
    setCartOpen(false);
  };

  return (
    <ProductProvider value={{
          rawProducts,
          productDailyFavourites,
          filteredProducts,
          productFilters,
          productsFeatured,
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
          <div className="min-h-screen bg-background">
            <ChargeStateIndicator />
            <Navbar onCartOpen={handleCartOpen} />
            <CartDrawer open={cartOpen} onOpenChange={handleCartOpen} onCloseChange={handleCartClose} />
              <main>
                {children}
              </main>
            <Footer />
        </div>
      </CartProvider>
    </ProductProvider>
  );
}
