'use client';

import { ProductFav, ProductItem } from "@/db/generated/prisma/client";
import { createContext } from "react";

export interface ProductFilters {
    brand: string[],
    capacity_ah: number[],
    voltage: number[],
    price_range: { min?: number, max?: number },
    sort_by?: string,
    search?: string,
};

export const ProductContext = createContext<{
    rawProducts: ProductItem[],
    productDailyFavourites: number[],
    filteredProducts: ProductItem[],
    productsFeatured: number[],
    productFilters: ProductFilters,
    isRawProductsLoadingInProgress: boolean,
    setProductFilters: (name: string, value: number[] | string) => void,
    setRawProducts: (data: ProductItem[]) => void,
    setProductDailyFavourites: (data: ProductFav[]) => void,
    setFilteredProducts: (data: ProductItem[]) => void,
}>({
    rawProducts: [],
    productDailyFavourites: [],
    filteredProducts: [],
    productsFeatured: [],
    isRawProductsLoadingInProgress: false,
    productFilters: {
        price_range: { min: undefined, max: undefined },
        brand: [],
        capacity_ah: [],
        voltage: [],
        sort_by: undefined,
        search: '',
    },
    setProductFilters: () => {},
    setRawProducts: () => {},
    setFilteredProducts: () => {},
    setProductDailyFavourites: () => {},
});

export const ProductProvider = ProductContext.Provider;
