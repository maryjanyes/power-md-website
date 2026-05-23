'use client';

import { ProductCard } from "@/lib/components/products/ProductCard";
import { ProductContext } from "@/lib/context/ProductContext";
import { useParams } from "next/navigation";
import { useContext, useMemo } from "react";

export default function ProductDetailPage() {
    const params = useParams();
    const productId = params['productId'];
    const { rawProducts } = useContext(ProductContext);
    const productById = useMemo(() => {
        if (productId) {
            return rawProducts.find((product) => product.id === Number(productId));
        }
    }, [productId, rawProducts]);

    return !productById ? (
        <p>No product found.</p>
    ) : (
        <ProductCard {...productById!} />
    );
}
