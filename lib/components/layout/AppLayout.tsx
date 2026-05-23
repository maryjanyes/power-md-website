/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import CartDrawer from './CartDrawer';
import ChargeStateIndicator from './ChargeStateIndicator';
import Footer from './Footer';
import { CartProvider } from '@/lib/context/CartContext';
import { CartOrderItem } from '@/lib/types/cart.types';
import { ProductFilters, ProductProvider } from '@/lib/context/ProductContext';
import { ProductItem } from '@/db/generated/prisma/client';
import { getProductDailyFavourites, getProductFeatured, getProducts } from '@/api/server-actions/product.actions';

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
    price_range: undefined,
    brand: [],
    capacity_ah: [],
    voltage: [],
    sort_by: undefined,
    search: '',
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
      productFilters,
      productsFeatured,
      isRawProductsLoadingInProgress,
      setProductFilters: (name, value) => {
        setProductFilters((prev) => ({
          ...prev,
          [name]: value,
        }));
      },
      setProductDailyFavourites: () => {},
      setRawProducts: () => {}
    }}>
      <CartProvider value={{
        cartItems,
        addCartItem: (orderItem) => {
          setCartItems((prev) => {
            if (prev.some((item) => item.product_id === orderItem.product_id)) {
              return prev.map((item) => item.product_id === orderItem.product_id ? ({
                ...item,
                quantity: item.quantity + 1,
              }) : item)
            } else {
              return [...prev, orderItem];
            }
          });
        },
        clearCart: () => setCartItems([]),
        removeCartItem: (productId) => {
          setCartItems((prev) => prev.filter((i) => i.product_id !== productId))
        },
        updateCardItemQuantity: (productId, newProductQuantity) => {
          setCartItems((prev) => prev.map((item) => {
            if (item.product_id === productId) {
              return {
                ...item,
                quantity: newProductQuantity,
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
