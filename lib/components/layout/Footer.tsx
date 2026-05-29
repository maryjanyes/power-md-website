'use client';

import { productTypeCategories } from '@/lib/constants/categories';
import { Zap } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-primary" />
            </Link>
            <p className="text-sm text-muted-foreground font-mono leading-relaxed">
              Рішення для накопичення енергії нового покоління. Точно розроблені акумулятори для будь-якого застосування.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-px">
            <div>
              <h4 className="font-heading font-semibold text-sm tracking-wider mb-4 text-foreground">ТИП АКУМУЛЯТОРА</h4>
              <div className="space-y-2">
                {productTypeCategories.map((category) => (
                  <Link
                    key={category.name}
                    href={`/products/${category.name}`}
                    className="block text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
                  >{category.name}</Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-sm tracking-wider mb-4 text-foreground">ПІДТРИМКА</h4>
              <div className="space-y-2">
                <Link href="/products" className="block text-sm font-mono text-muted-foreground hover:text-primary transition-colors">УСІ ПРОДУКТИ</Link>
                <span className="block text-sm font-mono text-muted-foreground">Технічна специфікація</span>
                <span className="block text-sm font-mono text-muted-foreground">Гарантійна інформація</span>
              </div>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-sm tracking-wider mb-4 text-foreground">КОНТАКТИ</h4>
              <div className="space-y-2 text-sm font-mono text-muted-foreground">
                <p>Power.MD100@gmail.com</p>
                <p>+380633002011</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-muted-foreground">
            © 2026 Power.MD. УСІ ПРАВА ЗАХИЩЕНІ.
          </p>
          <p className="text-xs font-mono text-muted-foreground/50">
            ВЕРСІЯ v2.4.0
          </p>
        </div>
      </div>
    </footer>
  );
}