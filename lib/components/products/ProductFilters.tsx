/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { SlidersHorizontal } from "lucide-react";
import { ProductContext } from "@/lib/context/ProductContext";
import { productCategoryFilterValues, productFilterCategories } from "@/api/constants/categories";
import { SelectContent, SelectTrigger, SelectItem, Select, SelectValue } from "@/lib/components/ui/select";
import { Checkbox } from "@/lib/components/ui/checkbox";

const SelectTriggerComponent: any = SelectTrigger;
const SelectContentComponent: any = SelectContent;
const SelectItemComponent: any = SelectItem;
const SelectComponent: any = Select;
const SelectValueComponent: any = SelectValue;

type CategoryFilterItem = {
  type: string,
  name: string,
  title: string,
};

const CheckboxComponent: any = Checkbox;

export const ProductFilters = () => {
  const { setProductFilters, productFilters } = useContext(ProductContext);
    
  const renderCategoryFilter = (categoryFilter: CategoryFilterItem) => {
    if (categoryFilter.type === 'ranger') {
      return (
        <SlidersHorizontal />
      )
    } else if (categoryFilter.type === 'checkbox') {
      return (
        <CheckboxComponent
          name={categoryFilter.name}
          value={(productFilters as any)[categoryFilter.name]}
        />
      )
    } else if (categoryFilter.type === 'select') {
      const currentValue = (productFilters as any)[categoryFilter.name];

      return (
        <SelectComponent value={currentValue} onValueChange={(value: string) => {
          setProductFilters(categoryFilter.name, [...currentValue, value]);
        }}>
          <SelectTriggerComponent className="w-24 sm:w-28 bg-secondary border-border font-mono text-sm">
            <SelectValueComponent placeholder={categoryFilter.title} />
          </SelectTriggerComponent>
          <SelectContentComponent>
            {(productCategoryFilterValues as any)[categoryFilter.name].map((value: string) => (
              <SelectItemComponent key={value} value={value} className="font-mono">{value}(V)</SelectItemComponent>
            ))}
          </SelectContentComponent>
        </SelectComponent>
      );
    }
  };

  return (
    <div className="flex gap-3">
      {productFilterCategories.map((category) => renderCategoryFilter(category))}
    </div>
  );
};
