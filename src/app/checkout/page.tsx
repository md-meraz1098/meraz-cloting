"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useCart } from "@/context/CartContext";

const BKASH_NUMBER = "01309432441";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          address,
          transactionId,
          items: items.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          subtotal,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      clearCart();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    }
  };

  if (status === "success") {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-32 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-8 w-8"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="mt-6 text-3xl font-semibold text-neutral-900">
          Order Placed
        </h1>
        <p className="mt-3 text-neutral-500">
          Thank you! We&apos;ve received your order and payment details.
          We&apos;ll confirm your bKash transaction and get your order out
          shortly.
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

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-32 text-center">
        <h1 className="text-3xl font-semibold text-neutral-900">
          Your Cart is Empty
        </h1>
        <p className="mt-3 text-neutral-500">
          Add something to your cart before checking out.
        </p>
        <Link
          href="/products"
          className="mt-8 rounded-full bg-neutral-900 px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <h1 className="text-3xl font-semibold text-neutral-900">Checkout</h1>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="space-y-8 lg:col-span-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">
              Delivery Details
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-neutral-700"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 w-full border border-neutral-300 px-4 py-3 text-sm text-neutral-900 outline-none focus:border-neutral-900"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-neutral-700"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1.5 w-full border border-neutral-300 px-4 py-3 text-sm text-neutral-900 outline-none focus:border-neutral-900"
                  placeholder="e.g. 01XXXXXXXXX"
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="text-sm font-medium text-neutral-700"
                >
                  Delivery Address
                </label>
                <textarea
                  id="address"
                  required
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1.5 w-full resize-none border border-neutral-300 px-4 py-3 text-sm text-neutral-900 outline-none focus:border-neutral-900"
                  placeholder="House, road, area, city, postal code"
                />
              </div>
            </div>
          </div>

          <div className="border border-neutral-200 bg-neutral-50 p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">
              Payment Instructions
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              Please send{" "}
              <span className="font-semibold text-neutral-900">
                ${subtotal.toFixed(2)}
              </span>{" "}
              via bKash to the number below, then enter the transaction ID
              you receive to confirm your order.
            </p>
            <div className="mt-4 inline-flex items-center gap-3 border border-neutral-300 bg-white px-4 py-3">
              <span className="text-xs uppercase tracking-wide text-neutral-500">
                bKash Number
              </span>
              <span className="text-lg font-semibold tracking-wide text-neutral-900">
                {BKASH_NUMBER}
              </span>
            </div>

            <div className="mt-5">
              <label
                htmlFor="transactionId"
                className="text-sm font-medium text-neutral-700"
              >
                bKash Transaction ID
              </label>
              <input
                id="transactionId"
                type="text"
                required
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="mt-1.5 w-full border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none focus:border-neutral-900"
                placeholder="e.g. 8N7A6XYZ12"
              />
            </div>
          </div>

          {status === "error" && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full rounded-full bg-neutral-900 px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-12"
          >
            {status === "submitting" ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        <div className="h-fit border border-neutral-200 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">
            Order Summary
          </h2>
          <ul className="mt-5 space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex gap-4">
                <div className="relative h-16 w-14 shrink-0 overflow-hidden bg-neutral-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      {item.name}
                    </p>
                    <p className="text-xs text-neutral-500">
                      Qty {item.quantity}
                    </p>
                  </div>
                  <p className="whitespace-nowrap text-sm font-medium text-neutral-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between border-t border-neutral-200 pt-4 text-base">
            <span className="font-medium text-neutral-900">Total</span>
            <span className="font-semibold text-neutral-900">
              ${subtotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
