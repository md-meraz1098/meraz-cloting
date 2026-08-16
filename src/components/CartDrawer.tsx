"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { items, subtotal, isOpen, closeCart, removeItem, updateQuantity } =
    useCart();

  return (
    <>
      <div
        onClick={closeCart}
        aria-hidden="true"
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-neutral-900">
            Your Cart ({items.reduce((sum, item) => sum + item.quantity, 0)})
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
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
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-neutral-500">Your cart is empty.</p>
            <Link
              href="/products"
              onClick={closeCart}
              className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <ul className="space-y-6">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4">
                    <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-neutral-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-neutral-900">
                          {item.name}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="text-xs text-neutral-400 transition-colors hover:text-neutral-900"
                        >
                          Remove
                        </button>
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
                            className="flex h-7 w-7 items-center justify-center text-neutral-600 transition-colors hover:bg-neutral-100 disabled:opacity-30"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-sm text-neutral-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            aria-label="Increase quantity"
                            className="flex h-7 w-7 items-center justify-center text-neutral-600 transition-colors hover:bg-neutral-100"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-sm font-medium text-neutral-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-neutral-200 px-6 py-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-500">Subtotal</span>
                <span className="text-base font-medium text-neutral-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <p className="mt-1 text-xs text-neutral-400">
                Shipping and taxes calculated at checkout.
              </p>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="mt-5 block w-full rounded-full bg-neutral-900 px-6 py-3.5 text-center text-sm font-medium text-white transition-colors hover:bg-neutral-800"
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="mt-3 block w-full text-center text-sm font-medium text-neutral-600 underline underline-offset-4 hover:text-neutral-900"
              >
                View Cart
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
