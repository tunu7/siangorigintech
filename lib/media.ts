// Project images live in the private Blob store under `projects/` and are
// served publicly through /media/[...path]. Nothing outside this prefix is
// ever exposed (resumes live under `resumes/`).

export const PROJECT_IMAGE_PREFIX = "projects/";
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export const IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

const PROJECT_IMAGE_PATTERN =
  /^projects\/[A-Za-z0-9_-]+(?:-[A-Za-z0-9]+)?\.(?:jpe?g|png|webp|avif)$/;

export function isProjectImagePath(value: unknown): value is string {
  return typeof value === "string" && PROJECT_IMAGE_PATTERN.test(value);
}

export function mediaUrl(pathname: string) {
  return `/media/${pathname}`;
}
