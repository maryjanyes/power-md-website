'use client';

import { useContext, useMemo } from "react"
import { ProductContext } from "../context/ProductContext";

type Params = {
    productId?: number,
    productCategoryId?: string,
}

export const useProducts = (params: Params) => {
    const { productFilters, rawProducts } = useContext(ProductContext);
    const productById = useMemo(() => {
        if (params.productId) {
            return rawProducts.find((product) => product.id === params.productId);
        }

        return null;
    }, [params.productId, rawProducts]);
    const productsByCategory = useMemo(() => {
        if (params.productCategoryId) {
            return rawProducts.filter((product) => product.terminal_cover_type === params.productCategoryId);
        }
    }, [params.productCategoryId, rawProducts]);
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

    return {
        productById,
        productsByCategory,
        filteredProducts,
    }
};
