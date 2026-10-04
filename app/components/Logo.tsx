import { useId } from "react";

/**
 * The Siang Origin mountain mark. The dark peak follows `currentColor`, so
 * it reads on both paper and ink backgrounds; the green peak is fixed.
 */
export default function Logo({ className = "h-7 w-auto" }: { className?: string }) {
  const gradientId = useId();

  return (
    <svg
      viewBox="0 0 100 62"
      className={className}
      role="img"
      aria-label="Siang Origin logo"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0b4d2c" />
          <stop offset="1" stopColor="#3f9a4a" />
        </linearGradient>
      </defs>
      <path d="M64 14 L100 62 L66 62 Z" fill={`url(#${gradientId})`} />
      <path
        d="M40 0 L0 62 L18 62 L40 28 L62 62 L80 62 Z M40 41 L26.5 62 L53.5 62 Z"
        fill="currentColor"
      />
    </svg>
  );
}
