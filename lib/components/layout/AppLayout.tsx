/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import CartDrawer from "./CartDrawer";
import ChargeStateIndicator from "./ChargeStateIndicator";
import Footer from "./Footer";
import { CartProvider } from "@/lib/context/CartContext";
import { CartOrderItem } from "@/lib/types/cart.types";
import { defaultProductFilters, defaultProductRangeFilters, ProductFiltersQuery, ProductProvider, ProductRangeFiltersQuery } from "@/lib/context/ProductContext";
import { ProductItem } from "@/db/generated/prisma/client";
import { getProductFeatured, getProducts } from "@/api/server-actions/product.actions";

type Props = {
  children: React.ReactElement,
};

export const AppLayout = ({ children }: Props) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [isRawProductsLoadingInProgress, setIsRawProductsLoadingInProgress] = useState(false);
  const [cartItems, setCartItems] = useState<CartOrderItem[]>([]);
  const [rawProducts, setRawProducts] = useState<ProductItem[]>([]);
  const [productsFeatured, setProductsFeatured] = useState<number[]>([]);
  const [productFilters, setProductFilters] = useState<ProductFiltersQuery>(defaultProductFilters);
  const [productRangeFilters, setProductRangeFilters] = useState<ProductRangeFiltersQuery>(defaultProductRangeFilters);

  const requestFeaturedProducts = () => {
    getProductFeatured().then((data) => {
      setProductsFeatured(data.map((item) => item.product_item_id));
    });
  };

  useEffect(() => {
    setIsRawProductsLoadingInProgress(true);
    getProducts({ ...productRangeFilters, ...productFilters }).then((data) => {
      setRawProducts(data);
    }).finally(() => {
      setIsRawProductsLoadingInProgress(false);
    });
  }, [productRangeFilters, productFilters]);

  const injectScripts = () => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }

  useEffect(() => {
    requestFeaturedProducts();

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
      productFilters,
      productRangeFilters,
      productsFeatured,
      isRawProductsLoadingInProgress,
      setProductRangeFilters: (name: string, value: number[] | string | any) => {
        setProductRangeFilters((prev: any) => ({
          ...prev,
          [name]: value,
        }));
      },
      setProductFilters: (name: string, value: number[] | string) => {
        setProductFilters((prev: any) => ({
          ...prev,
          [name]: value,
        }));
      },
    }}>
      <CartProvider value={{
        cartItems,
        addCartItem: (newOrderItem: any) => {
          setCartItems((prev: any) => {
            if (prev.some((item: any) => item.product_id === newOrderItem.product_id)) {
              return prev.map((item: any) => item.product_id === newOrderItem.product_id ? ({
                ...item,
                quantity: item.quantity + 1,
              }) : item)
            } else {
              return [...prev, newOrderItem];
            }
          });
        },
        clearCart: () => setCartItems([]),
        removeCartItem: (productId: number) => {
          setCartItems((prev: any) => prev.filter((item: any) => item.product_id !== productId))
        },
        updateCardItemQuantity: (productId: number, newProductQuantity: number) => {
          setCartItems((prev: any) => prev.map((item: any) => {
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
          <div className="flex flex-col sm:flex-row!">
            <Navbar onCartOpen={handleCartOpen} />
            <CartDrawer open={cartOpen} onOpenChange={handleCartOpen} onCloseChange={handleCartClose} />
            <main className="w-[100%]">
              {children}
            </main>
          </div>
          <Footer />
        </div>
      </CartProvider>
    </ProductProvider>
  );
}
