"use client";

import dynamic from "next/dynamic";

const CapScene = dynamic(() => import("./CapScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white" />
    </div>
  ),
});

export default function HeroModel() {
  return (
    <div className="h-full w-full">
      <CapScene />
    </div>
  );
}
