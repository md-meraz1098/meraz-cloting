import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-500">
            {product.category}
          </p>
          <h3 className="mt-1 text-sm font-medium text-neutral-900">
            {product.name}
          </h3>
        </div>
        <p className="whitespace-nowrap text-sm font-medium text-neutral-900">
          ${product.price}
        </p>
      </div>
    </Link>
  );
}
