"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/products";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="flex w-fit items-center border border-neutral-300">
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
          className="flex h-12 w-12 items-center justify-center text-neutral-600 transition-colors hover:bg-neutral-100 disabled:opacity-30"
        >
          −
        </button>
        <span className="w-10 text-center text-sm text-neutral-900">
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => setQuantity((q) => q + 1)}
          aria-label="Increase quantity"
          className="flex h-12 w-12 items-center justify-center text-neutral-600 transition-colors hover:bg-neutral-100"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="w-full rounded-full bg-neutral-900 px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-neutral-800 sm:w-auto sm:px-12"
      >
        {justAdded ? "Added ✓" : "Add to Cart"}
      </button>
    </div>
  );
}
