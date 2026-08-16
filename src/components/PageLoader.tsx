"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "meraz-loaded";
const MIN_VISIBLE_MS = 500;
const FADE_MS = 400;

export default function PageLoader() {
  const [visible, setVisible] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // sessionStorage unavailable — just show it once, no persistence
    }

    if (alreadyShown) return;

    setVisible(true);

    const start = Date.now();
    const finish = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
      window.setTimeout(() => {
        setFadingOut(true);
        window.setTimeout(() => setVisible(false), FADE_MS);
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          // ignore
        }
      }, remaining);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => window.removeEventListener("load", finish);
  }, []);

  if (!mounted || !visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-neutral-900 transition-opacity duration-[400ms] ease-out ${
        fadingOut ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <span className="text-2xl font-semibold tracking-[0.4em] text-white sm:text-3xl">
          MERAZ
        </span>
        <span className="h-px w-12 animate-loader-line bg-white" />
      </div>
    </div>
  );
}
