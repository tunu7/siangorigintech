import type { ApplicationStatus } from "@/lib/applications";
import { Badge } from "./ui";

const tones = {
  new: "brand",
  reviewing: "amber",
  shortlisted: "sky",
  rejected: "muted",
  hired: "solid",
} as const satisfies Record<ApplicationStatus, string>;

export default function StatusBadge({
  status,
}: {
  status: ApplicationStatus;
}) {
  return <Badge tone={tones[status]}>{status}</Badge>;
}
