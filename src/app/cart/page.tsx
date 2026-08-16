"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, subtotal, removeItem, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center">
        <h1 className="text-3xl font-semibold text-neutral-900">
          Your Cart is Empty
        </h1>
        <p className="mt-3 text-neutral-500">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link
          href="/products"
          className="mt-8 rounded-full bg-neutral-900 px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <h1 className="text-3xl font-semibold text-neutral-900">Your Cart</h1>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-3">
        <ul className="divide-y divide-neutral-200 lg:col-span-2">
          {items.map((item) => (
            <li key={item.id} className="flex gap-5 py-6 first:pt-0">
              <div className="relative h-32 w-24 shrink-0 overflow-hidden bg-neutral-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-base font-medium text-neutral-900">
                      {item.name}
                    </p>
                    <p className="mt-1 text-sm text-neutral-500">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>
                  <p className="whitespace-nowrap text-base font-medium text-neutral-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-neutral-300">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                      className="flex h-9 w-9 items-center justify-center text-neutral-600 transition-colors hover:bg-neutral-100 disabled:opacity-30"
                    >
                      −
                    </button>
                    <span className="w-10 text-center text-sm text-neutral-900">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      aria-label="Increase quantity"
                      className="flex h-9 w-9 items-center justify-center text-neutral-600 transition-colors hover:bg-neutral-100"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-sm text-neutral-400 transition-colors hover:text-neutral-900"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="h-fit border border-neutral-200 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">
            Order Summary
          </h2>
          <div className="mt-5 flex items-center justify-between text-sm">
            <span className="text-neutral-500">Subtotal</span>
            <span className="font-medium text-neutral-900">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-neutral-500">Shipping</span>
            <span className="font-medium text-neutral-900">
              Calculated at checkout
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-neutral-200 pt-4 text-base">
            <span className="font-medium text-neutral-900">Total</span>
            <span className="font-semibold text-neutral-900">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <Link
            href="/checkout"
            className="mt-6 block w-full rounded-full bg-neutral-900 px-6 py-3.5 text-center text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            Proceed to Checkout
          </Link>
          <Link
            href="/products"
            className="mt-4 block text-center text-sm font-medium text-neutral-600 underline underline-offset-4 hover:text-neutral-900"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
