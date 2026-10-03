// Shown instantly under the persistent header while a page's data loads.
export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading"
      className="mx-auto max-w-7xl animate-pulse px-4 py-10 sm:px-6"
    >
      <div className="h-3 w-20 rounded bg-zinc-200" />
      <div className="mt-3 h-8 w-56 rounded bg-zinc-200" />

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="h-20 rounded-xl border border-zinc-200 bg-white"
          />
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-zinc-200 bg-white">
        {Array.from({ length: 8 }, (_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 border-b border-zinc-100 px-4 py-4 last:border-0"
          >
            <div className="h-4 w-40 rounded bg-zinc-100" />
            <div className="h-4 flex-1 rounded bg-zinc-100" />
            <div className="h-4 w-24 rounded bg-zinc-100" />
          </div>
        ))}
      </div>
    </main>
  );
}
