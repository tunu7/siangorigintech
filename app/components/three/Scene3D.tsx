"use client";

import { useEffect, useRef } from "react";
import type { SceneVariant } from "./engine";

type IdleWindow = Window & {
  requestIdleCallback?: (
    callback: () => void,
    options?: { timeout: number }
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

// Decorative WebGL scene. three.js is only fetched once the panel is near
// the viewport and the browser is idle, so it never competes with the
// page's own content; until then (or without WebGL) the panel's gradient
// shows. Visitors with Data Saver on keep the gradient.
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

    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (connection?.saveData) return;

    const win = window as IdleWindow;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let cleanup = () => {};
    let cancelled = false;
    let idle = 0;

    const load = () =>
      import("./engine")
        .then(({ mount }) => {
          if (!cancelled) cleanup = mount(host, variant, { reduceMotion });
        })
        .catch((error) => console.error("3D SCENE ERROR:", error));

    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        near.disconnect();
        idle = win.requestIdleCallback
          ? win.requestIdleCallback(load, { timeout: 1500 })
          : window.setTimeout(load, 200);
      },
      { rootMargin: "400px 0px" }
    );
    near.observe(host);

    return () => {
      cancelled = true;
      near.disconnect();
      if (win.cancelIdleCallback) win.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
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
