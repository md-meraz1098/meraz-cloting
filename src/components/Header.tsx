import Link from "next/link";
import CartButton from "@/components/CartButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <Link
          href="/"
          className="text-xl font-semibold tracking-[0.2em] text-neutral-900"
        >
          MERAZ
        </Link>
        <nav className="hidden items-center gap-10 text-sm font-medium text-neutral-700 md:flex">
          <Link href="/" className="transition-colors hover:text-neutral-900">
            Home
          </Link>
          <Link
            href="/products"
            className="transition-colors hover:text-neutral-900"
          >
            Shop
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/products"
            className="hidden rounded-full border border-neutral-900 px-5 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white sm:block"
          >
            Shop Now
          </Link>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
