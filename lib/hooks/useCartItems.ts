import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export const useCartItems = () => {
    const { cartItems } = useContext(CartContext);

    return { cartItems };
};
