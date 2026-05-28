import { useContext, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { ProductContext } from "@/lib/context/ProductContext";
import { productCategoryFilterValues, productFilterCategories } from "@/lib/constants/categories";
import { SelectContent, SelectTrigger, SelectItem, Select, SelectValue } from "@/lib/components/ui/select";
import { Checkbox } from "@/lib/components/ui/checkbox";
import { Slider } from "@/lib/components/ui/slider";
import { renderFieldOptionValue } from "@/lib/utils/base";

const SelectTriggerComponent: any = SelectTrigger;
const SelectContentComponent: any = SelectContent;
const SelectItemComponent: any = SelectItem;
const SelectComponent: any = Select;
const SelectValueComponent: any = SelectValue;
const CheckboxComponent: any = Checkbox;

type CategoryFilterItem = {
  type: string,
  name: string,
  title: string,
  symbol?: string,
  rangeMax?: number,
}

export const ProductFilters = () => {
  const { setProductFilters, productFilters, setProductRangeFilters } = useContext(ProductContext);
  const [filtersToggleState, setFiltersToggleState] = useState({});

  const renderCategoryFilter = (categoryFilter: CategoryFilterItem) => {
    const fieldOptions = (productCategoryFilterValues as any)[categoryFilter.name];
    const fieldValue = (productFilters as any)[categoryFilter.name];
    
    if (categoryFilter.type === "ranger") {
      return (
        <Slider
          placeholder={categoryFilter.title}
          symbol={categoryFilter.symbol}
          rangeMax={categoryFilter.rangeMax}
          currentRangeValue={fieldValue}
          onChange={(val: number[]) => {
            setTimeout(() => {
              setProductRangeFilters?.(categoryFilter.name, {
                min: val[0],
                max: val[1],
              });
            }, 5000);
          }}
        />
      );
    } else if (categoryFilter.type === "checkbox") {
      if (!fieldOptions?.length) {
        return <></>;
      }

      return fieldOptions.map((value: string) => (
        <div className="flex flex-row gap-2 items-center justify-between" key={value}>
          <p className="font-semibold text-sm">
            {renderFieldOptionValue(value)}
          </p>
          <CheckboxComponent
            key={value}
            name={value}
            value={fieldValue?.includes(value)}
            onCheckedChange={(isChecked: boolean) => {
              if (isChecked) {
                setProductFilters?.(categoryFilter.name, [...fieldValue, value]);
              } else {
                setProductFilters?.(categoryFilter.name, fieldValue.filter((fltValue: string) => value !== fltValue));
              }
            }}
          />
        </div>
      ));
    } else if (categoryFilter.type === "select") {
      return (
        <SelectComponent value={fieldValue} onValueChange={(value: string) => {
          setProductFilters?.(categoryFilter.name, [...fieldValue, value]);
        }}>
          <SelectTriggerComponent className="w-24 sm:w-28 bg-secondary border-border font-mono text-sm">
            <SelectValueComponent placeholder={categoryFilter.title} />
          </SelectTriggerComponent>
          <SelectContentComponent>
            {fieldOptions.map((value: string) => (
              <SelectItemComponent key={value} value={value} className="font-mono">{value}(V)</SelectItemComponent>
            ))}
          </SelectContentComponent>
        </SelectComponent>
      );
    }
  };

  return (
    <div className="flex flex-col gap-4 w-[100%] xl:w-[20%]!">
      {productFilterCategories.map((category) => {
        const Arrow = (filtersToggleState as any)?.[category.name] ? ArrowDown : ArrowUp;

        return (
          <div className="flex flex-col gap-2" key={category.name}>
            <div className="flex flex-row gap-2 justify-between">
              <p className="font-semibold text-2sm">{category.title}</p>
              <Arrow onClick={() => setFiltersToggleState((prev) => ({
                ...prev,
                [category.name]: !(prev as any)[category.name],
              }))} width={20} height={20} className="cursor-pointer" />
            </div>
            <div className="max-h-50 overflow-y-scroll flex flex-col gap-2">
              {(filtersToggleState as any)[category.name] && renderCategoryFilter(category)}
            </div>
          </div>
        )
      })}
    </div>
  );
};
