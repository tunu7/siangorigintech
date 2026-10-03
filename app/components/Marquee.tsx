import { getContent } from "@/lib/content";

export default async function Marquee() {
  const { marquee: items } = await getContent("home");

  if (!items.length) return null;

  return (
    <div className="relative overflow-hidden border-y border-zinc-200 bg-zinc-50 py-5 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-marquee gap-12 hover:[animation-play-state:paused]">
        {[...items, ...items].map((item, index) => (
          <span
            key={index}
            aria-hidden={index >= items.length}
            className="flex items-center gap-12 whitespace-nowrap text-sm font-medium text-zinc-500"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-brand-light" />
          </span>
        ))}
      </div>
    </div>
  );
}
