import type { ApplicationStatus } from "@/lib/applications";

const styles: Record<ApplicationStatus, string> = {
  new: "bg-brand/10 text-brand-hover",
  reviewing: "bg-amber-100 text-amber-800",
  shortlisted: "bg-sky-100 text-sky-800",
  rejected: "bg-neutral-200 text-neutral-600",
  hired: "bg-brand text-white",
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
