/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { createContext } from "react";
import { CartOrderItem } from "../types/cart.types";

export type CartContextType = {
    cartItems: CartOrderItem[],
    addCartItem: (item: CartOrderItem) => void,
    removeCartItem: (itemId: number) => void,
    updateCardItemQuantity: (itemId: number, newQuantity: number) => void,
    clearCart: () => void,
};

export const CartContext = createContext<CartContextType>({
    cartItems: [],
    addCartItem: (_: CartOrderItem) => {},
    clearCart: () => {},
    removeCartItem: () => {},
    updateCardItemQuantity: () => {},
});

export const CartProvider = CartContext.Provider;
