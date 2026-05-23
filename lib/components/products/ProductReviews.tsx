import { motion } from 'framer-motion';
import { useProductReviews } from "@/lib/hooks/useProductReviews";

type Props = { productId: number };

export default function ProductReviews({ productId }: Props) {
    const reviewsByProductId = useProductReviews({ productId });

    return (
        <div className="flex flex-col gap-2">
            {reviewsByProductId.map((review) => (
                <motion.div
                    key={review.content}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-8"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                        <span className="text-xs font-mono text-primary tracking-widest">АКУМУЛЯТОРИ ДЛЯ БУДЬ-ЯКИХ ЗАДАЧ</span>
                    </motion.div>
            ))}
        </div>
    );
}
