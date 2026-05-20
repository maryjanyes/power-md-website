import { ProductItem } from '@/db/generated/prisma/client';
import { Button } from "@/lib/components/ui/button";
import { CartContext } from '@/lib/context/CartContext';
import { motion } from 'framer-motion';
import { useContext } from 'react';

const productCardTitleFields = ['polarity', 'capacity_ah', 'starting_current_a', 'voltage'];
const productCardSubFields = ['warranty_years', 'dimensions'];
const productCardItemPlaceholders = {
    polarity: "Полярність",
    capacity_ah: "Ємкість (Ah)",
    starting_current_a: "Пусковий струм",
    voltage: "Вольтаж",
    warranty_years: "Гарантійний термін (роки)",
    dimensions: "Розмір (висота, ширина, глибина)",
};

const ButtonComponent = Button;

export const ProductCard = ({ ...props }: ProductItem) => {
    const { addCartItem } = useContext(CartContext);
    
    const handleAddToCart = () => {
    addCartItem({
            product_id: props.id,
            product_name: props.name,
            price: props.price,
            quantity: 1,
            weight: props.weight_kg,
        });
    };

    return (
        <motion.div
            key={props.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 p-4 rounded-xl border border-border bg-card/60 backdrop-blur-sm w-[49%]"
        >
            <div className="flex flex-row gap-1">
                <div className="w-[50%]">
                    <p className="text-xl font-mono text-muted-foreground mb-3">{props.name}</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        {productCardTitleFields.map((field) => (
                            <p className="text-md font-mono" key={field}>
                                {productCardItemPlaceholders[field]} ({props[field]})
                            </p>
                        ))}
                        {productCardSubFields.map((field) => (
                            <p className="text-xs font-mono" key={field}>
                                {productCardItemPlaceholders[field]} ({props[field]})
                            </p>
                        ))}
                    </div>
                </div>
                <div className="w-[49%] flex flex-col gap-4">
                    <img src={props.image_url} alt={props.name} />
                    <ButtonComponent className="w-[50%] cursor-pointer" onClick={handleAddToCart}>В корзину</ButtonComponent>
                </div>
            </div>
        </motion.div>
    );
};
