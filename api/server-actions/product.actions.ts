'use server';

import { prisma } from '@/lib/prisma';
import { ProductItemCreateInput } from '@/db/generated/prisma/models';
import { ProductFiltersQuery, ProductRangeFiltersQuery } from '@/lib/context/ProductContext';

interface FiltersQuery extends ProductFiltersQuery, ProductRangeFiltersQuery { };

export async function getProducts(query?: FiltersQuery) {
  let prismaQuery: any = {};
  const prismaOtherFilters = [query?.capacity_ah, query?.voltage, query?.starting_current_a, query?.terminal_category];

  if (!!query) {
    if (query.search) {
      prismaQuery.OR = [{
        name: {
          contains: query.search,
          mode: "insensitive",
        },
        brand: {
          contains: query.search,
          mode: "insensitive",
        }
      }];
    }

    else if (prismaOtherFilters.some((flt) => !!flt)) {
      if (query.search) {
        prismaQuery.AND = [];

        if (query.capacity_ah) {
          prismaQuery.AND.push({
            capacity_ah: {
              in: query.capacity_ah,
            }
          });
        }
        if (query.starting_current_a) {
          prismaQuery.AND.push({
            starting_current_a: {
              in: query.starting_current_a,
            },
          });
        }
        if (query.terminal_category) {
          prismaQuery.AND.push({
            terminal_category: {
              in: query.terminal_category,
            },
          });
        }
        if (query.voltage) {
          prismaQuery.AND.push({
            voltage: {
              in: query.voltage,
            },
          });
        }
        if (query.brand) {
          prismaQuery.AND.push({
            brand: {
              in: query.brand,
            },
          });
        }
      } else {
        prismaQuery = {
          ...(query.voltage?.length > 0 && {
            voltage: {
              in: query.voltage,
            },
          }),
          ...(query.capacity_ah?.length > 0 && {
            capacity_ah: {
              in: query.capacity_ah,
            },
          }),
          ...(query.starting_current_a?.length > 0 && {
            starting_current_a: {
              in: query.starting_current_a,
            },
          }),
          ...(query.terminal_category?.length > 0 && {
            terminal_category: {
              in: query.terminal_category,
            },
          }),
          ...(query.brand?.length > 0 && {
            brand: {
              in: query.brand,
            },
          }),
          ...(Object.values(query.price_range).length > 0 && {
            price: {
              gte: query.price_range.min,
              lte: query.price_range.max,
            }
          }),
        };
      }
    }
  };
  
  const data = await prisma.productItem.findMany({
    where: prismaQuery,
  });

  return data;
}

export async function getProductDailyFavourites() {
  const data = await prisma.productFav.findMany({
    where: {
      date: new Date(),
    },
  });

  return data;
}

export async function getProductFeatured() {
  const data = await prisma.productItemFeatured.findMany();

  return data;
}

export async function getProductById(productId: number) {
  const data = await prisma.productItem.findMany({
    where: {
      id: productId,
    },
  });

  return data;
}

export async function insertProduct(productData: ProductItemCreateInput) {
  const response = await prisma.productItem.create({
    data: productData,
  });

  return response;
}

