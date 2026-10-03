"use client";

import dynamic from "next/dynamic";

function Placeholder() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-40 w-40 animate-float rounded-full bg-brand/10 blur-2xl" />
    </div>
  );
}

// three.js is only downloaded in the browser, after the page is interactive.
const OriginScene = dynamic(() => import("./OriginScene"), {
  ssr: false,
  loading: Placeholder,
});

export default function HeroVisual() {
  return <OriginScene />;
}
