import type { ApplicationStatus } from "@/lib/applications";

const styles: Record<ApplicationStatus, string> = {
  new: "bg-[#2F7D46]/10 text-[#176B3A]",
  reviewing: "bg-amber-100 text-amber-800",
  shortlisted: "bg-sky-100 text-sky-800",
  rejected: "bg-neutral-200 text-neutral-600",
  hired: "bg-[#0B4D2C] text-white",
};

export default function StatusBadge({
  status,
}: {
  status: ApplicationStatus;
}) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
}
