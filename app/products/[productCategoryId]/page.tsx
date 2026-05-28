import { ProductsCategoryDetailsContainer } from "@/lib/components/products/ProductsCategoryDetailsContainer";
import { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const productCategoryId = (await params)['productCategoryId'];

  return {
    title: `Акумулятори для авто, мотоциклів популярних виробників категорії ${productCategoryId}`,
    description: `Акумулятори для авто, мотоциклів популярних виробників для авто/мото (категорія: ${productCategoryId})`,
    // openGraph: {
    //   images: [],
    // },
  }
}

export default function ProductCategoryDetailPage() {
    return (
        <div className="min-h-screen pt-24 sm:pt-28 pb-20">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ProductsCategoryDetailsContainer />
            </div>
        </div>
    );
}
