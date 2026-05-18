/* eslint-disable @typescript-eslint/no-unused-vars */
import { mockedProducts } from "@/api/constants/mock";

export const useProductFeatures = (productId: number) => {
    return {
        productFeatureItems: [],
        isProductFeaturesLoading: false,
    };
};
