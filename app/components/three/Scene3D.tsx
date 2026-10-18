"use client";

import { useEffect, useRef } from "react";
import type { SceneVariant } from "./engine";

// Decorative WebGL scene. three.js loads after the page, so it never
// blocks the first paint; without WebGL the panel's own background shows.
export default function Scene3D({
  variant,
  className = "",
}: {
  variant: SceneVariant;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;

    let cleanup = () => {};
    let cancelled = false;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    import("./engine")
      .then(({ mount }) => {
        if (!cancelled) cleanup = mount(host, variant, { reduceMotion });
      })
      .catch((error) => console.error("3D SCENE ERROR:", error));

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [variant]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none ${className}`}
    />
  );
}
