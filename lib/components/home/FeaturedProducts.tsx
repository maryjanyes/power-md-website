import { ProductContext } from "@/lib/context/ProductContext";
import { useFeaturedProducts } from "@/lib/hooks/useFeaturedProducts";
import { useContext, useMemo } from "react";
import { ProductCard } from "../products/ProductCard";

export default function FeaturedProducts() {
    const { rawProducts } = useContext(ProductContext);
    const { productsFeatured: productsFeaturedIds } = useFeaturedProducts();
    const featuredProducts = useMemo(() => rawProducts.filter((product) => !!productsFeaturedIds.includes(product.id)), [rawProducts, productsFeaturedIds]);

    return (
        <div className="mt-10 w-full">
            <p className="text-xl font-mono text-primary">Знижки і ТОП продажів 🔥</p>
            <div className="flex flex-row flex-wrap w-full gap-5 mt-5">
                {featuredProducts.map((product, productId) => (
                    <ProductCard {...product} key={productId} />
                ))}
            </div>
        </div>
    );
}
