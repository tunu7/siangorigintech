import type { Metadata } from "next";
import ContactCTA from "@/app/components/ContactCTA";
import ProjectGrid from "@/app/components/ProjectGrid";
import { Container, PageHeader } from "@/app/components/ui";
import { getContent } from "@/lib/content";
import { mediaUrl } from "@/lib/media";
import { listPublishedProjects } from "@/lib/projects";
import { JsonLd, ORGANIZATION_ID, pageMetadata, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const work = await getContent("work");
  return pageMetadata({
    title: "Work",
    description: work.metaDescription,
    path: "/work",
  });
}

export default async function WorkPage() {
  const [work, projects] = await Promise.all([
    getContent("work"),
    listPublishedProjects(),
  ]);

  const page = webPageJsonLd({
    type: "CollectionPage",
    name: work.title,
    description: work.metaDescription,
    path: "/work",
    breadcrumb: [{ name: "Work", path: "/work" }],
  });

  return (
    <>
      <JsonLd
        data={{
          "@graph": [
            ...page["@graph"],
            {
              "@type": "ItemList",
              itemListElement: projects.map((project, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "CreativeWork",
                  name: project.title,
                  description: project.description,
                  genre: project.category,
                  creator: { "@id": ORGANIZATION_ID },
                  ...(project.url && { url: project.url }),
                  ...(project.image && {
                    image: absoluteUrl(mediaUrl(project.image)),
                  }),
                },
              })),
            },
          ],
        }}
      />
      <Container>
        <PageHeader
          eyebrow={work.eyebrow}
          title={work.title}
          description={work.intro}
        />

        <div className="py-16 sm:py-24">
          <ProjectGrid projects={projects} />
        </div>
      </Container>

      <ContactCTA />
    </>
  );
}
