"use client";

import { motion, type Variants } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const MAX_STAGGER_DELAY = 0.3;
const STAGGER_STEP = 0.06;

export default function ProductGrid({
  products,
  className = "mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3",
}: {
  products: Product[];
  className?: string;
}) {
  return (
    <div className={className}>
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0, margin: "0px 0px -10% 0px" }}
          transition={{
            duration: 0.35,
            ease: "easeOut",
            delay: Math.min(index * STAGGER_STEP, MAX_STAGGER_DELAY),
          }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
}
