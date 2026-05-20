'use server';

import { prisma } from '@/lib/prisma';
import { ProductItemCategoryCreateInput, ProductItemCreateInput } from '@/db/generated/prisma/models';

export async function getProducts() {
  const data = await prisma.productItem.findMany();

  return data;
}

export async function getProductCategories() {
  const data = await prisma.productItemCategory.findMany();

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

export async function insertProductCategory(productCategoryData: ProductItemCategoryCreateInput) {
  const response = await prisma.productItemCategory.create({
    data: productCategoryData,
  });

  return response;
}
