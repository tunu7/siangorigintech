// A thin progress line keeps navigation feeling immediate without
// replacing the page with a spinner.
export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="fixed inset-x-0 top-0 z-[60] h-px overflow-hidden"
    >
      <div className="h-full w-1/3 animate-[loading-bar_1s_ease-in-out_infinite] bg-ink" />
    </div>
  );
}
