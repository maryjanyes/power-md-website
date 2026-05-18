/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useContext } from 'react';
import { useParams } from 'next/navigation';
import { useProducts } from '@/lib/hooks/useProducts';
import { Search } from 'lucide-react';
import { Input } from "@/lib/components/ui/input";
import { Skeleton } from "@/lib/components/ui/skeleton";
import { ProductRow } from '@/lib/components/products/ProductRow';
import { ProductContext } from '@/lib/context/ProductContext';
import { ProductFilters } from '@/lib/components/products/ProductFilters';

const InputComponent: any = Input;

export default function ProductsPage() {
  const { category } = useParams();
  const { filteredProducts } = useProducts({});
  const { setProductFilters, productFilters, isRawProductsLoadingInProgress } = useContext(ProductContext);

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-12">
          <p className="text-xs font-mono text-primary tracking-[0.3em] mb-2">PERFORMANCE INDEX</p>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight">
            {category ? category : 'ALL'} <span className="text-muted-foreground">BATTERIES</span>
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-8 p-4 rounded-xl border border-border bg-card/40 backdrop-blur-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <InputComponent
              placeholder="Search batteries..."
              value={productFilters.search}
              onChange={(e: any) => setProductFilters('search', e.target.value)}
              className="pl-10 bg-secondary border-border font-mono text-sm"
            />
          </div>
          <ProductFilters />
        </div>

        <p className="text-xs font-mono text-muted-foreground mb-4 tracking-wider">
          {isRawProductsLoadingInProgress ? '—' : filteredProducts.length} RESULTS
        </p>

        <div className="rounded-xl border border-border overflow-hidden bg-card/20">
          {isRawProductsLoadingInProgress ? (
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
          ) : filteredProducts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-mono text-muted-foreground text-sm">NO BATTERIES FOUND</p>
              <p className="font-mono text-muted-foreground/60 text-xs mt-2">Try adjusting your filters</p>
            </div>
          ) : (
            filteredProducts.map((product, index) => (
              <ProductRow key={product.name} product={product} index={index} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
