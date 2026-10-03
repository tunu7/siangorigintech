// 3D cube loader in brand colours. Pure CSS, so it renders instantly.
const faces = [
  "rotateY(0deg)",
  "rotateY(90deg)",
  "rotateY(180deg)",
  "rotateY(-90deg)",
  "rotateX(90deg)",
  "rotateX(-90deg)",
];

export default function Loader({ label = "Loading" }: { label?: string }) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center gap-6"
    >
      <div className="perspective-[600px]">
        <div className="relative h-10 w-10 transform-3d animate-cube">
          {faces.map((face, index) => (
            <span
              key={face}
              className={`absolute inset-0 rounded-sm border border-brand/40 ${
                index % 2 ? "bg-brand/85" : "bg-brand-light/70"
              }`}
              style={{ transform: `${face} translateZ(20px)` }}
            />
          ))}
        </div>
      </div>
      <span className="text-sm text-zinc-500">{label}…</span>
    </div>
  );
}
