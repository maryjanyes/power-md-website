'use client';

import { productTypeCategories } from "@/api/constants/categories";
import { CategoryItem } from "./CategoryItem";

export default function CategoryShowcase() {
  return (
    <section className="py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 sm:mb-24">
          <p className="text-xs font-mono text-primary tracking-[0.3em] mb-3">БАТАРЕЇ</p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-foreground">
            ОБЕРИ СВІЙ<br />АКУМУЛЯТОР
          </h2>
        </div>

        <div className="space-y-px">
          <div className="grid grid-cols-3 gap-px">
            {productTypeCategories.map((category) => (
              <CategoryItem {...category} key={category.name} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}