import { ProductContext } from "@/lib/context/ProductContext";
import { useContext } from "react";

export const ProductDailyFavourites = () => {
    const { productDailyFavourites, rawProducts } = useContext(ProductContext);
    
    return !!productDailyFavourites && (
        <div className="p-5">
            {productDailyFavourites.map((fav) => {
                const product = rawProducts.find((product) => product.id === fav.product_id);

                return (
                    <div className="p-2" key={product?.id}>
                        <p>{product?.name}</p>
                    </div>
                );
            })}
        </div>
    );
};
