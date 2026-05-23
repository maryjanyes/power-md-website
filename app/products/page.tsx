'use client';

import { useContext, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useProducts } from '@/lib/hooks/useProducts';
import { Search } from 'lucide-react';
import { Input } from "@/lib/components/ui/input";
import { Skeleton } from "@/lib/components/ui/skeleton";
import { ProductContext } from '@/lib/context/ProductContext';
import { ProductFilters } from '@/lib/components/products/ProductFilters';
import { ProductRow } from '@/lib/components/products/ProductRow';

const InputComponent: any = Input;

export default function ProductsPage() {
  const { category } = useParams();
  const { setProductFilters, productFilters, isRawProductsLoadingInProgress } = useContext(ProductContext);
  const { filteredProducts } = useProducts({});

  const renderLoadingView = useMemo(() => {
    return (
      <div className="space-y-1 p-4">
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
    );
  }, []);

  const renderProductsWithFilters = useMemo(() => {
    const noFilteredProducts = filteredProducts.length === 0;

    if (noFilteredProducts) {
      return (
        <div className="py-20 text-center">
          <p className="font-mono text-muted-foreground text-sm">Товарів не знайдено</p>
        </div>
      );
    }

    return (
      <div className="flex flex-row gap-2 justify-between p-5">
        <ProductFilters />
        <div className="flex flex-row flex-wrap pl-5">
          {filteredProducts.map((product, index) => (
            <ProductRow product={product} key={index} index={index} />
          ))}
        </div>
      </div>
    );
  }, [filteredProducts]);

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20 pl-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-12">
          <h1 className="font-heading font-bold text-1xl sm:text-4xl md:text-5xl tracking-tight">
            {category ? `категорія: ${category}` : ''} <span className="text-muted-foreground">Усі товари</span>
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-8 p-4 rounded-xl border border-border bg-card/40 backdrop-blur-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <InputComponent
              placeholder="Пошук (виробник, вольтаж, пусковий ток)..."
              value={productFilters.search}
              onChange={(e: any) => setProductFilters('search', e.target.value)}
              className="pl-10 bg-secondary border-border font-mono text-sm"
            />
          </div>
        </div>

        <p className="text-xs font-mono text-muted-foreground mb-4 tracking-wider">
          {isRawProductsLoadingInProgress ? 'завантаження...' : filteredProducts.length} Результати
        </p>

        <div className="rounded-xl border border-border overflow-hidden bg-card/20">
          {isRawProductsLoadingInProgress ? renderLoadingView : renderProductsWithFilters}
        </div>
      </div>
    </div>
  );
}
