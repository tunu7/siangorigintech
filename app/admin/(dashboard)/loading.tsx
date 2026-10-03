// Shown instantly under the persistent header while a page's data loads.
export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading"
      className="animate-pulse px-6 py-10 lg:px-12"
    >
      <div className="h-3 w-20 rounded bg-paper-deep" />
      <div className="mt-3 h-8 w-56 rounded bg-paper-deep" />

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="h-20 rounded-lg border border-line bg-white"
          />
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-lg border border-line bg-white">
        {Array.from({ length: 8 }, (_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 border-b border-line px-4 py-4 last:border-0"
          >
            <div className="h-4 w-40 rounded bg-paper-deep" />
            <div className="h-4 flex-1 rounded bg-paper-deep" />
            <div className="h-4 w-24 rounded bg-paper-deep" />
          </div>
        ))}
      </div>
    </main>
  );
}
