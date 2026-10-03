"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { upload } from "@vercel/blob/client";
import {
  IMAGE_TYPES,
  MAX_IMAGE_BYTES,
  mediaUrl,
  PROJECT_IMAGE_PREFIX,
} from "@/lib/media";

const smallButton =
  "rounded-md border border-line-strong bg-white px-3 py-1.5 text-sm hover:border-ink disabled:opacity-50";

// Uploads the image straight to Blob and stores its pathname in a hidden
// `image` input submitted with the project form.
export default function ImageField({
  initial,
  onUploadingChange,
}: {
  initial: string | null;
  onUploadingChange: (uploading: boolean) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pathname, setPathname] = useState(initial ?? "");
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setError("");

    if (!IMAGE_TYPES.includes(file.type)) {
      setError("Please choose a JPG, PNG, WebP or AVIF image.");
      return;
    }

    if (file.size > MAX_IMAGE_BYTES) {
      setError("Images must be 5MB or smaller.");
      return;
    }

    const extension = file.type === "image/jpeg" ? "jpg" : file.type.split("/")[1];
    const base =
      file.name
        .replace(/\.[^.]+$/, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 40) || "image";

    setProgress(0);
    onUploadingChange(true);

    try {
      const blob = await upload(
        `${PROJECT_IMAGE_PREFIX}${base}.${extension}`,
        file,
        {
          access: "private",
          handleUploadUrl: "/admin/projects/upload",
          contentType: file.type,
          onUploadProgress: ({ percentage }) => setProgress(percentage),
        }
      );

      setPathname(blob.pathname);
    } catch (uploadError) {
      console.error(uploadError);
      setError("Upload failed. Please try again.");
    } finally {
      setProgress(null);
      onUploadingChange(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
        Cover image
      </p>

      <input type="hidden" name="image" value={pathname} />

      <div
        className="mt-2 flex flex-wrap items-center gap-4"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          const file = event.dataTransfer.files[0];
          if (file) void handleFile(file);
        }}
      >
        <div className="relative flex aspect-[4/3] w-48 items-center justify-center overflow-hidden rounded-lg border border-dashed border-line-strong bg-paper text-xs text-muted">
          {pathname ? (
            <Image
              src={mediaUrl(pathname)}
              alt="Project cover preview"
              fill
              sizes="192px"
              className="object-cover"
            />
          ) : progress !== null ? (
            <span className="tabular-nums">{Math.round(progress)}%</span>
          ) : (
            <span>Drop an image here</span>
          )}
        </div>

        <div className="flex flex-col items-start gap-2">
          <input
            ref={inputRef}
            type="file"
            accept={IMAGE_TYPES.join(",")}
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void handleFile(file);
            }}
          />
          <button
            type="button"
            disabled={progress !== null}
            onClick={() => inputRef.current?.click()}
            className={smallButton}
          >
            {progress !== null
              ? `Uploading ${Math.round(progress)}%`
              : pathname
                ? "Replace image"
                : "Upload image"}
          </button>
          {pathname && progress === null && (
            <button
              type="button"
              onClick={() => setPathname("")}
              className="text-sm text-muted hover:text-red-700"
            >
              Remove image
            </button>
          )}
          <p className="text-xs text-muted">
            JPG, PNG, WebP or AVIF, up to 5MB. Landscape (4:3) works best.
          </p>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
