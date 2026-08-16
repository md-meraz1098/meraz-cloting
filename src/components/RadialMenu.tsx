"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const RADIUS = 92;

const ITEMS = [
  {
    href: "/",
    label: "Home",
    angle: 90,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12 11.204 3.045a1.125 1.125 0 0 1 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    ),
  },
  {
    href: "/products",
    label: "Collection",
    angle: 130,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192a48.424 48.424 0 0 1 3.548 0c1.131.094 1.976 1.057 1.976 2.192V7.5M8.25 7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25M8.25 7.5h7.5"
      />
    ),
  },
  {
    href: "/about",
    label: "About",
    angle: 170,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 11.25h1.5v5.25m-1.5 0h3M12 7.5h.008v.008H12V7.5ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    ),
  },
  {
    href: "/contact",
    label: "Contact",
    angle: 210,
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
      />
    ),
  },
];

export default function RadialMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-[90] sm:bottom-8 sm:right-8"
    >
      <div className="relative h-14 w-14">
        {ITEMS.map((item, index) => {
          const radians = (item.angle * Math.PI) / 180;
          const dx = Math.cos(radians) * RADIUS;
          const dy = -Math.sin(radians) * RADIUS;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              aria-label={item.label}
              tabIndex={isOpen ? 0 : -1}
              style={{
                transitionDelay: isOpen ? `${index * 40}ms` : "0ms",
                transform: isOpen
                  ? `translate(${dx}px, ${dy}px) scale(1)`
                  : "translate(0, 0) scale(0)",
              }}
              className={`group absolute inset-0 flex h-14 w-14 flex-col items-center justify-center gap-0.5 rounded-full bg-neutral-900 text-white shadow-lg transition-all duration-300 ease-out hover:bg-neutral-700 ${
                isOpen ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.7}
                className="h-5 w-5"
              >
                {item.icon}
              </svg>
              <span className="text-[9px] font-medium leading-none">
                {item.label}
              </span>
            </Link>
          );
        })}

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900 text-white shadow-xl transition-transform duration-300 ease-out hover:bg-neutral-800 active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            className={`h-6 w-6 transition-transform duration-300 ease-out ${
              isOpen ? "rotate-45" : "rotate-0"
            }`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
    </div>
  );
}
