import type { Metadata } from "next";
import ProductGrid from "@/components/ProductGrid";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop — Meraz",
  description: "Browse our full collection of premium clothing essentials.",
};

export default function ProductsPage() {
  return (
    <div className="bg-white px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-500">
            Collection
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-neutral-900">
            Shop All
          </h1>
          <p className="mt-4 text-base text-neutral-500">
            {products.length} pieces, crafted from premium materials for
            everyday elegance.
          </p>
        </div>

        <ProductGrid
          products={products}
          className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
        />
      </div>
    </div>
  );
}
