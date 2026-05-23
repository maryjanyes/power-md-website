/* eslint-disable @next/next/no-img-element */
import { productCardItemPlaceholders, productCardSubFields, productCardTitleFields } from '@/api/constants/product';
import { ProductItem } from '@/db/generated/prisma/client';
import { Button } from "@/lib/components/ui/button";
import { ShoppingCart } from 'lucide-react';
import { CartContext } from '@/lib/context/CartContext';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';

const ButtonComponent: any = Button;

type Props = ProductItem;

export const ProductCard = ({ ...productItem }: Props) => {
    const { addCartItem } = useContext(CartContext);
    
    const handleAddItem = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        addCartItem({
            product_id: productItem.id,
            product_name: productItem.name,
            price: productItem.price,
            quantity: 1,
            weight: productItem.weight_kg,
        });
        toast.success(`${productItem.name} доданий в корзину`, {
            description: `${productItem.capacity_ah}Ah.`,
        });
    };

    return (
        <motion.div
            key={productItem.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="p-8 rounded-xl border border-border bg-card/60 backdrop-blur-sm w-[49%]"
        >
            <div className="flex flex-row gap-1">
                <Link href={`/product-detail/${productItem.id}`} className="w-[50%]">
                    <p className="text-xl font-mono font-bold text-muted-foreground mb-2">{productItem.name}</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        {productCardTitleFields.map((field) => (
                            <p className="text-sm font-mono" key={field}>
                                <span className="font-bold">{(productCardItemPlaceholders as any)[field]} - </span>
                                <span>{(productItem as any)[field]}</span>
                            </p>
                        ))}
                        {productCardSubFields.map((field) => {
                            const fieldValue = (productItem as any)[field];
                            const [width, len, dimension] = fieldValue.split(",");

                            return (
                                field === 'warranty_years' ? (
                                    <div className="text-sm font-mono flex flex-row gap-1" key={field}>
                                        <span className="font-bold">{(productCardItemPlaceholders as any)[field]} -</span>
                                        <span>{(productItem as any)[field]} роки</span>
                                    </div>
                                ) : (
                                    <div key={field} className="flex flex-col gap-1">
                                        <p className="text-sm font-mono font-bold" key={field}>Розмір</p>
                                        <p className="text-xs font-mono">Ширина - {width.replace("(", "")}</p>
                                        <p className="text-xs font-mono">Довжина - {len}</p>
                                        <p className="text-xs font-mono">Висота - {dimension.replace(")", "")}</p>
                                    </div>
                                )
                            );
                        })}
                    </div>
                </Link>
                <div className="w-[49%] flex flex-col gap-4 items-end">
                    <img src={productItem.image_url as string} alt={`акумулятор_${productItem.name}`} />
                    {productItem.in_stock && <ButtonComponent
                        size="sm"
                        onClick={handleAddItem}
                        className="bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground h-9 w-9 p-0 haptic-btn transition-colors cursor-pointer"
                        >
                        <ShoppingCart className="w-4 h-4" />
                    </ButtonComponent>}
                </div>
            </div>
        </motion.div>
    );
};
