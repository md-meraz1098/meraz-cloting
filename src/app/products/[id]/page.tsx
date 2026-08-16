import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import AddToCartButton from "@/components/AddToCartButton";
import { getProductById, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata(props: PageProps<"/products/[id]">) {
  const { id } = await props.params;
  const product = getProductById(id);

  if (!product) {
    return { title: "Product Not Found — Meraz" };
  }

  return {
    title: `${product.name} — Meraz`,
    description: product.description,
  };
}

export default async function ProductDetailPage(
  props: PageProps<"/products/[id]">,
) {
  const { id } = await props.params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);
  const relatedFallback = related.length
    ? related
    : products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <nav className="text-sm text-neutral-500">
        <Link href="/" className="hover:text-neutral-900">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-neutral-900">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-900">{product.name}</span>
      </nav>

      <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="lg:pt-4">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            {product.category}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-neutral-900 sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl font-medium text-neutral-900">
            ${product.price}
          </p>

          <p className="mt-8 text-base leading-relaxed text-neutral-600">
            {product.description}
          </p>

          <div className="mt-8 border-t border-neutral-200 pt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">
              Details
            </h2>
            <ul className="mt-4 space-y-2">
              {product.details.map((detail) => (
                <li
                  key={detail}
                  className="flex items-start gap-2 text-sm text-neutral-600"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          <AddToCartButton product={product} />
        </div>
      </div>

      <section className="mt-24 border-t border-neutral-200 pt-16">
        <h2 className="text-2xl font-semibold text-neutral-900">
          You May Also Like
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {relatedFallback.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
