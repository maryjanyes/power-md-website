import { Search } from 'lucide-react';
import { Input } from "@/lib/components/ui/input";
import { useContext } from 'react';
import { ProductContext } from '@/lib/context/ProductContext';

const InputComponent: any = Input;

export function ProductSearch() {
    const { setProductFilters, productFilters } = useContext(ProductContext);

    return (
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <InputComponent
              placeholder="Пошук (виробник, назва)..."
              value={productFilters.search}
              onChange={(e: any) => setProductFilters('search', e.target.value)}
              className="pl-10 bg-secondary border-border font-mono text-sm"
            />
          </div>
    )
}
