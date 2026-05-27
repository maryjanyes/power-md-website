'use client';

import { ProductFav, ProductItem } from "@/db/generated/prisma/client";
import { createContext } from "react";

export const defaultProductFilters = {
    brand: [],
    capacity_ah: [],
    voltage: [],
    polarity: [],
    starting_current_a: [],
    terminal_category: [],
    search: '',
};

export const defaultProductRangeFilters = {
    price_range: { min: 0, max: 5000 },
    weight_kg: { min: 0, max: 20 },
};

export interface ProductFiltersQuery {
    brand: string[],
    polarity: string[],
    capacity_ah: number[],
    voltage: number[],
    starting_current_a: number[],
    terminal_category: number[],
    search?: string,
};

export interface ProductRangeFiltersQuery {
   price_range: { min?: number, max?: number },
   weight_kg: { min?: number, max?: number },
}

export const ProductContext = createContext<{
    productRangeFilters: ProductRangeFiltersQuery,
    rawProducts: ProductItem[],
    productDailyFavourites: ProductFav[],
    productsFeatured: number[],
    productFilters: ProductFiltersQuery,
    isRawProductsLoadingInProgress: boolean,
    setProductFilters?: (name: string, value: number[] | string) => void,
    setProductRangeFilters?: (name: string, value: number[] | string | any) => void,
    setRawProducts?: (data: ProductItem[]) => void,
    setProductDailyFavourites?: (data: ProductFav[]) => void,
}>({
    rawProducts: [],
    productDailyFavourites: [],
    productsFeatured: [],
    isRawProductsLoadingInProgress: false,
    productFilters: defaultProductFilters,
    productRangeFilters: defaultProductRangeFilters,
    // setProductRangeFilters: () => {},
    // setProductFilters: () => {},
    // setRawProducts: () => {},
    // setProductDailyFavourites: () => {},
});

export const ProductProvider = ProductContext.Provider;
