import { useContext, useState } from "react";
import { motion } from 'framer-motion';
import { getProductsByVehicleModel } from "@/api/server-actions/product.actions";
import { ProductItem } from "@/db/generated/prisma/client";
import { Button } from "@/lib/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/components/ui/select';
import { ProductContext } from "@/lib/context/ProductContext";

const ButtonComponent: any = Button;
const SelectComponent: any = Select;
const SelectItemComponent: any = SelectItem;
const SelectContentComponent: any = SelectContent;
const SelectTriggerComponent: any = SelectTrigger;

// todo: Get list and values from API
const vehicleModels = [{
    name: "BMW",
    id: 0,
}, {
    name: "Toyota",
    id: 1,
}];

export function SelectByAutoManifacturer() {
    const [products, setProducts] = useState<ProductItem[]>();
    const [vehicleModel, setVehicleModel] = useState<string>();
    const [isSearchInProgress, setIsSearchInProgress] = useState(false);
    const { rawProducts } = useContext(ProductContext);
    
    const handleVehicleSelection = async () => {
        setIsSearchInProgress(true);
    
        try {
            const products = await getProductsByVehicleModel(vehicleModel!);
            setProducts(products.map((productByModel) => rawProducts.find((product) => product.id === productByModel.id)!));
        } finally {
            setIsSearchInProgress(false);
        }
    };
    
    return (
        <div className="flex flex-col gap-4 p-5 mt-5 mb-5">
            <h3 className="text-xl font-mono">Пошук по моделі авто</h3>
            <div className="flex flex-row gap-4 max-w-[40%]">
                <SelectComponent value={vehicleModel} onValueChange={(modelId: string) => {
                    setVehicleModel(modelId);
                }}>
                    <SelectTriggerComponent className="flex-1 bg-secondary border-border font-mono text-sm">
                        <SelectValue placeholder="Модель авто" />
                    </SelectTriggerComponent>
                    <SelectContentComponent>
                        {vehicleModels.map((model) => (
                            <SelectItemComponent key={model.id} value={model.name} className="font-mono">
                                {model.name}
                            </SelectItemComponent>
                        ))}
                    </SelectContentComponent>
                </SelectComponent>
                <ButtonComponent variant="outline" onClick={handleVehicleSelection} className="flex-1 h-9 max-w-[25%] font-heading font-bold tracking-wider haptic-btn">
                    Пошук
                </ButtonComponent>
            </div>
            {isSearchInProgress ? (
                <p className="text-xs font-mono text-muted-foreground mb-4 tracking-wider">завантаження...</p>
            ) : (
                !!products ? (
                    <div className="p-5 mt-2">
                        {products.map((product: ProductItem) => (
                            <motion.div
                                key={product.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative aspect-square rounded-2xl overflow-hidden bg-card border border-border"
                            >
                                <p>{product.name} ({product.brand})</p>
                            </motion.div>
                        ))}
                    </div>
                ) : vehicleModel !== undefined ? (
                    <p className="text-sm mt-2">Товарів не знайдено.</p>      
                ) : <></> 
            )}
        </div>
    )
}
