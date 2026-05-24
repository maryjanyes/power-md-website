'use client';

import { useContext, useMemo } from "react"
import { ProductContext } from "../context/ProductContext";

type Params = {
    productId?: number,
    productTerminalType?: string,
}

export const useProducts = (params: Params) => {
    const { rawProducts } = useContext(ProductContext);
    const productById = useMemo(() => {
        if (params.productId !== undefined) {
            return rawProducts.find((product) => product.id === params.productId);
        }

        return null;
    }, [params.productId, rawProducts]);
    const productsByCategory = useMemo(() => {
        if (params.productTerminalType) {
            return rawProducts.filter((product) => product.terminal_cover_type === params.productTerminalType);
        }
    }, [params.productTerminalType, rawProducts]);

    return {
        productById,
        productsByCategory,
    }
};
