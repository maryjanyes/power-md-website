'use client';

import { useContext, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Skeleton } from "@/lib/components/ui/skeleton";
import { ProductContext } from '@/lib/context/ProductContext';
import { ProductFilters } from '@/lib/components/products/ProductFilters';
import { ProductRow } from '@/lib/components/products/ProductRow';
import { ProductSearch } from '@/lib/components/products/ProductSearch';

export default function ProductsPage() {
  const { category } = useParams();
  const { rawProducts, isRawProductsLoadingInProgress } = useContext(ProductContext);

  const renderProductsWithFilters = useMemo(() => {
    if (isRawProductsLoadingInProgress) {
      return (
        <div className="space-y-1 p-4 w-[100%]">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="flex items-center gap-6 py-4">
                <Skeleton className="w-16 h-16 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
        </div>
      )
    };
  
    return rawProducts.length === 0 ? (
      <div className="pt-40 text-center items-center justify-center w-[100%]">
        <p className="font-mono text-muted-foreground text-xl">Товарів не знайдено</p>
      </div>
    ) : (
        <div className="flex flex-row flex-wrap gap-4 w-[100%] pl-4">
          {rawProducts.map((product, index) => (
            <ProductRow product={product} key={index} index={index} />
          ))}
      </div>
    );
  }, [rawProducts, isRawProductsLoadingInProgress]);

  return (
    <div className="min-h-screen pt-50 sm:pt-28 pb-20 w-full">
      <div className="mb-8 sm:mb-12 pl-4">
        <h1 className="font-heading font-bold text-1xl sm:text-4xl md:text-5xl tracking-tight">
          {category ? `категорія: ${category}` : ''} <span className="text-muted-foreground">Усі товари</span>
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8 p-4 rounded-xl border border-border bg-card/40 backdrop-blur-sm">
        <ProductSearch />
      </div>

      <p className="text-xs font-mono text-muted-foreground mb-4 tracking-wider">
        {isRawProductsLoadingInProgress ? 'завантаження...' : rawProducts.length} результати
      </p>

      {!isRawProductsLoadingInProgress && <div className="rounded-xl border border-border overflow-hidden bg-card/20">
        <div className="flex flex-col xl:flex-row! justify-between p-3">
          <ProductFilters />
          {renderProductsWithFilters}
        </div>
      </div>}
    </div>
  );
}
