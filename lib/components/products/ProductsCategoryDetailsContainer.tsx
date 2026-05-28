'use client';

import { productivityIndex } from "@/lib/constants/categories";
import { useProducts } from "@/lib/hooks/useProducts";
import { useParams } from "next/navigation";
import { ProductRow } from "./ProductRow";

export function ProductsCategoryDetailsContainer() {
    const params = useParams();
    const productCategoryId = params['productCategoryId'];
    const { productsByCategory } = useProducts({
        productTerminalType: String(productCategoryId),
    });
    
    return (
        <>
            <div className="mb-8 sm:mb-12">
                <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight">
                    {productCategoryId ? productCategoryId : 'УСІ'} <span className="text-muted-foreground">батареї</span>
                </h1>
                <p className="text-md font-mono text-primary my-3">індекс продуктивності ({(productivityIndex as any)[productCategoryId as string]})</p>
            </div>
            <div className="space-y-1 py-4">
                {(productsByCategory as [])?.length > 0 ? (
                    productsByCategory!.map((product: any) => (
                         <ProductRow key={product.id} product={product} index={product.id} />
                    ))
                ) : (
                    <div className="py-20">
                        <p className="font-mono text-muted-foreground text-xl">Товарів не знайдено</p>
                    </div> 
                )}
            </div>
        </>
    );
}
