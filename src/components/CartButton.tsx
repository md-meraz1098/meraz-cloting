"use client";

import { useCart } from "@/context/CartContext";

export default function CartButton() {
  const { itemCount, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label="Open cart"
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-neutral-900 transition-colors hover:bg-neutral-100"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.94-4.687 2.436-7.152.083-.415-.238-.798-.662-.798H5.106M7.5 14.25 5.106 5.121M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
        />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-neutral-900 px-1 text-[11px] font-medium text-white">
          {itemCount}
        </span>
      )}
    </button>
  );
}
