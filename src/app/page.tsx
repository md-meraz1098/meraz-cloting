import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import HeroBackground from "@/components/hero/HeroBackground";
import { products } from "@/lib/products";

export default function Home() {
  const featured = products.slice(0, 3);

  return (
    <div>
      <section className="relative flex h-[90vh] min-h-[640px] w-full items-center overflow-hidden bg-neutral-900">
        <HeroBackground />

        <div className="pointer-events-none absolute inset-0 bg-black/40" />

        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center lg:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-200">
            New Season
          </p>
          <h1 className="mt-4 text-5xl font-semibold leading-[1.1] text-white sm:text-6xl">
            Timeless Style, Tailored for You
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base text-neutral-200">
            Discover premium essentials crafted from the finest materials —
            designed to last beyond the season.
          </p>
          <Link
            href="/products"
            className="mt-10 inline-block rounded-full bg-white px-8 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200"
          >
            Explore Collection
          </Link>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-500">
                Curated
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-neutral-900">
                Featured Pieces
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden text-sm font-medium text-neutral-900 underline underline-offset-4 sm:block"
            >
              View all
            </Link>
          </div>

          <ProductGrid products={featured} />
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-20 text-center sm:grid-cols-3 lg:px-8">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">
              Premium Materials
            </h3>
            <p className="mt-2 text-sm text-neutral-500">
              Sourced from trusted mills across Europe.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">
              Considered Design
            </h3>
            <p className="mt-2 text-sm text-neutral-500">
              Every piece built to outlast passing trends.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">
              Free Returns
            </h3>
            <p className="mt-2 text-sm text-neutral-500">
              30-day returns on all full-price items.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
