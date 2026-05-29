import { motion } from 'framer-motion';
import { useProductReviews } from "@/lib/hooks/useProductReviews";

type Props = { productId: number };

export default function ProductReviews({ productId }: Props) {
    const reviewsByProductId = useProductReviews({ productId });

    return (
        <div className="flex flex-col gap-2 mt-12 max-w-[50%]">
            <p className="text-xl font-semibold mb-4">Відгуки</p>
            {reviewsByProductId.map((review) => (
                <motion.div
                    key={review.content}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 p-3 rounded-full border border-primary/30 bg-primary/5 my-2"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                    <span className="text-xs font-mono text-primary tracking-widest">{review.content}</span>
                </motion.div>
            ))}
        </div>
    );
}
