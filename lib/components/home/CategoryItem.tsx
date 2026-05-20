/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ProductCategory {
    name: string,
    tagline: string,
    description: string,
    image: string,
    specs: any,
}

export const CategoryItem = (category: ProductCategory) => {
    return (
        <div key={category.name} className="group rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden cursor-pointer">
            <div className="h-40 text-primary group-hover:text-secondary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M3 7l9-4 9 4-9 4-9-4zm0 6l9 4 9-4m-18 0v6l9 4 9-4v-6" />
                </svg>
            </div>

            <div className="p-5">
                <h3 className="text-xl font-semibold text-primary group-hover:text-secondary transition">
                    {category.name}
                </h3>
                <p className="text-white mt-2 text-sm">
                    {category.description}
                </p>
                <button className="mt-4 inline-flex items-center text-primary group-hover:text-secondary font-medium hover:gap-3 gap-2 transition-all">
                    детально<span>→</span>
                </button>
            </div>
        </div>
    );
}
