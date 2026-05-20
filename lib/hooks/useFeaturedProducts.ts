import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

export const useFeaturedProducts = () => {
    const { productsFeatured } = useContext(ProductContext);

    return {
        productsFeatured,
    };
};
