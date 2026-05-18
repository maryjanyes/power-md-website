'use client';

import { ProductRow } from "@/lib/components/products/ProductRow";
import { useProducts } from "@/lib/hooks/useProducts";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
    const params = useParams();
    const productCategoryId = params['productCategoryId'];

    const { productsByCategory } = useProducts({
        productCategoryId: productCategoryId as string,
    });

    return (
        <div className="min-h-screen pt-24 sm:pt-28 pb-20">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 sm:mb-12">
                    <p className="text-xs font-mono text-primary tracking-[0.3em] mb-2">PERFORMANCE INDEX</p>
                    <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight">
                        {productCategoryId ? productCategoryId : 'ALL'} <span className="text-muted-foreground">BATTERIES</span>
                    </h1>
                </div>
                <div className="space-y-1 p-4">
                    {productsByCategory?.map((product) => (
                        <ProductRow key={product.id} product={product} index={product.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}
