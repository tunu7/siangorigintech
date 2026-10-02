export const APPLICATION_STATUSES = [
  "new",
  "reviewing",
  "shortlisted",
  "rejected",
  "hired",
] as const;

export type ApplicationStatus =
  (typeof APPLICATION_STATUSES)[number];

export type Application = {
  id: string;
  created_at: string;
  updated_at: string;
  job_slug: string;
  job_title: string;
  name: string;
  email: string;
  phone: string;
  linkedin: string | null;
  portfolio: string | null;
  message: string;
  resume_pathname: string;
  resume_name: string;
  status: ApplicationStatus;
  notes: string | null;
};

export const MAX_RESUME_BYTES = 10 * 1024 * 1024;

export function isApplicationStatus(
  value: unknown
): value is ApplicationStatus {
  return APPLICATION_STATUSES.includes(
    value as ApplicationStatus
  );
}

export function resumePrefix(jobSlug: string) {
  return `resumes/${jobSlug}/`;
}
