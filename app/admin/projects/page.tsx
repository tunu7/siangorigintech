import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import Image from "next/image";
import { mediaUrl } from "@/lib/media";
import { listAllProjects } from "@/lib/projects";
import AdminHeader from "../components/AdminHeader";
import { SubmitButton } from "../components/controls";
import { moveProject, setProjectPublished } from "./actions";

const arrowButton =
  "rounded-md border border-zinc-300 px-2 py-0.5 text-xs hover:border-brand hover:text-brand";

export default async function AdminProjectsPage() {
  await requireAdmin();
  const projects = await listAllProjects();

  return (
    <>
      <AdminHeader />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Website
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Projects
            </h1>
            <p className="mt-2 text-sm text-zinc-500">
              Shown on the work page in this order. Featured projects also
              appear on the home page.
            </p>
          </div>

          <Link
            href="/admin/projects/new"
            className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-hover"
          >
            New project
          </Link>
        </div>

        <div className="mt-8 overflow-x-auto rounded-xl border border-zinc-200 bg-white">
          <table className="w-full min-w-180 text-left text-sm">
            <thead className="border-b border-zinc-200 text-xs uppercase tracking-wider text-zinc-500">
              <tr>
                <th className="w-24 px-4 py-3 font-medium">Order</th>
                <th className="px-4 py-3 font-medium">Project</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-100">
              {projects.map((project, index) => (
                <tr key={project.id} className="hover:bg-zinc-50">
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {index > 0 && (
                        <form action={moveProject}>
                          <input type="hidden" name="id" value={project.id} />
                          <input type="hidden" name="direction" value="up" />
                          <SubmitButton
                            className={arrowButton}
                            aria-label={`Move ${project.title} up`}
                          >
                            ↑
                          </SubmitButton>
                        </form>
                      )}
                      {index < projects.length - 1 && (
                        <form action={moveProject}>
                          <input type="hidden" name="id" value={project.id} />
                          <input type="hidden" name="direction" value="down" />
                          <SubmitButton
                            className={arrowButton}
                            aria-label={`Move ${project.title} down`}
                          >
                            ↓
                          </SubmitButton>
                        </form>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="relative flex h-9 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-brand text-xs font-semibold text-white">
                        {project.image ? (
                          <Image
                            src={mediaUrl(project.image)}
                            alt=""
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        ) : (
                          project.mark
                        )}
                      </span>
                      <div>
                        <Link
                          href={`/admin/projects/${project.id}`}
                          className="font-medium hover:text-brand"
                        >
                          {project.title}
                        </Link>
                        <div className="text-xs text-zinc-500">
                          {project.category}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          project.published
                            ? "bg-brand/10 text-brand-hover"
                            : "bg-neutral-200 text-neutral-600"
                        }`}
                      >
                        {project.published ? "Published" : "Hidden"}
                      </span>
                      {project.published && project.featured && (
                        <span className="inline-block rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-800">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="text-zinc-500 hover:text-zinc-900"
                      >
                        Edit
                      </Link>
                      <form action={setProjectPublished}>
                        <input type="hidden" name="id" value={project.id} />
                        <input
                          type="hidden"
                          name="published"
                          value={String(!project.published)}
                        />
                        <SubmitButton className="rounded-md border border-zinc-300 px-3 py-1 hover:border-brand hover:text-brand">
                          {project.published ? "Hide" : "Publish"}
                        </SubmitButton>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}

              {projects.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-16 text-center text-zinc-500"
                  >
                    No projects yet.{" "}
                    <Link
                      href="/admin/projects/new"
                      className="text-brand hover:underline"
                    >
                      Add the first one
                    </Link>
                    .
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
