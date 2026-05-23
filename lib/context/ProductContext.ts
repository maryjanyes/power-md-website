'use client';

import { ProductFav, ProductItem } from "@/db/generated/prisma/client";
import { createContext } from "react";

export interface ProductFilters {
    brand: string[],
    capacity_ah: number[],
    voltage: number[],
    price_range?: { min?: number, max?: number },
    sort_by?: string,
    search?: string,
};

export const ProductContext = createContext<{
    rawProducts: ProductItem[],
    productDailyFavourites: number[],
    productsFeatured: number[],
    productFilters: ProductFilters,
    isRawProductsLoadingInProgress: boolean,
    setProductFilters: (name: string, value: number[] | string) => void,
    setRawProducts: (data: ProductItem[]) => void,
    setProductDailyFavourites: (data: ProductFav[]) => void,
}>({
    rawProducts: [],
    productDailyFavourites: [],
    productsFeatured: [],
    isRawProductsLoadingInProgress: false,
    productFilters: {
        price_range: undefined,
        brand: [],
        capacity_ah: [],
        voltage: [],
        sort_by: undefined,
        search: '',
    },
    setProductFilters: () => {},
    setRawProducts: () => {},
    setProductDailyFavourites: () => {},
});

export const ProductProvider = ProductContext.Provider;
