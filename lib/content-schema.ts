// Editable site content. Each section is one row in `site_content`;
// the schema drives both the admin editor and server-side validation,
// and `defaults` is what the site shows until a section is edited.

type TextField = {
  type: "text" | "textarea" | "email" | "link";
  key: string;
  label: string;
  hint?: string;
  required?: boolean;
  max?: number;
};

type SelectField = {
  type: "select";
  key: string;
  label: string;
  options: readonly string[];
};

export type SimpleField = TextField | SelectField;

export type FieldDef =
  | SimpleField
  | { type: "lines"; key: string; label: string; hint?: string }
  | {
      type: "group";
      key: string;
      label: string;
      itemLabel: string;
      fields: SimpleField[];
      max?: number;
    }
  | { type: "heading"; label: string };

export type ContentValue = string | string[] | Record<string, string>[];

const defaults = {
  settings: {
    name: "Siang Origin Technologies",
    shortName: "Siang Origin",
    tagline: "Independent technology studio",
    location: "Itanagar, Arunachal Pradesh",
    contactEmail: "hello@siangorigin.com",
    careersEmail: "careers@siangorigin.com",
    nav: [
      { label: "Work", href: "/work" },
      { label: "Studio", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
    navCta: "Start a project",
    navCtaHref: "/contact",
    metaDescription:
      "Siang Origin is an independent technology studio from Arunachal Pradesh, designing digital products, growth systems and intelligent tools for ambitious businesses.",
    ctaTitle: "Have something in mind?",
    ctaText:
      "Tell us where you are and where you want to go. Every message is read and answered by a person.",
    ctaButton: "Start a conversation",
  },
  home: {
    heroBadge: "Independent technology studio",
    heroTitle: "We build the digital side of",
    heroHighlight: "ambitious businesses.",
    heroText:
      "Siang Origin designs and builds products, growth systems and intelligent tools — from the first conversation to launch, and long after.",
    heroPrimaryCta: "Start a project",
    heroSecondaryCta: "See our work",
    marquee: [
      "Product design",
      "Web & app development",
      "Brand & content",
      "Search & performance",
      "AI & automation",
      "New ventures",
    ],
    workEyebrow: "Selected work",
    workTitle: "Recent projects",
    workLink: "All projects",
    servicesEyebrow: "What we do",
    servicesTitle: "Three disciplines, one team.",
    services: [
      {
        title: "Products & platforms",
        description:
          "Websites, applications and platforms designed around real users and the outcomes that matter to the business.",
      },
      {
        title: "Growth systems",
        description:
          "Strategy, content and performance marketing, built as systems that compound rather than campaigns that fade.",
      },
      {
        title: "AI & automation",
        description:
          "Practical automation and AI that remove repetitive work and give teams their time back.",
      },
    ],
    aboutEyebrow: "The studio",
    aboutText:
      "We are a focused team working where technology, business and craft meet. We would rather do fewer things, and do them properly.",
    aboutLink: "About the studio",
  },
  about: {
    metaDescription:
      "Siang Origin is an independent technology studio in Itanagar, Arunachal Pradesh, building digital products, growth systems and ventures of its own.",
    eyebrow: "Studio",
    title: "A studio built on intent.",
    intro:
      "Siang Origin is an independent technology studio based in Itanagar, Arunachal Pradesh. We design and build digital products, growth systems — and ventures of our own.",
    whoLabel: "Who we are",
    whoParagraphs: [
      "We started Siang Origin to bring thoughtful, well-made technology to the businesses and founders around us, and to the ideas we believe deserve to exist.",
      "We work closely with a small number of partners at a time, moving from strategy to design to engineering without hand-offs between agencies.",
      "Alongside client work, we build and run our own products. It keeps us honest about what it takes to launch, grow and maintain something real.",
    ],
    whatLabel: "What we do",
    services: [
      {
        title: "Products & platforms",
        description:
          "Websites, applications and platforms shaped around real users and clear business goals.",
      },
      {
        title: "Growth systems",
        description:
          "Content, search and performance marketing designed to compound over time.",
      },
      {
        title: "AI & automation",
        description:
          "Intelligent workflows that take repetitive work off people's plates.",
      },
      {
        title: "Ventures",
        description:
          "Products we conceive, build and operate ourselves — from first idea to independent business.",
      },
    ],
    thinkLabel: "Principles",
    thinkTitle: "Start with the problem. Build only what solves it.",
    thinkText:
      "Good technology is quiet. We begin by understanding the people and the business behind a problem, then design the simplest thing that works — and make it easy to evolve.",
    journeyLabel: "Where we're headed",
    journeyTitle: "From ideas, to systems, to ventures.",
    journeyText:
      "We are early, and intentionally so. Siang Origin is being built to keep experimenting, shipping and learning — one meaningful problem at a time.",
  },
  work: {
    metaDescription:
      "Selected products, platforms and experiences designed and built by Siang Origin.",
    eyebrow: "Work",
    title: "Selected projects.",
    intro:
      "Products, platforms and experiences we have designed and built with our partners — and a few of our own.",
  },
  careers: {
    metaDescription:
      "Open roles at Siang Origin, an independent technology studio in Arunachal Pradesh.",
    eyebrow: "Careers",
    title: "Build with us.",
    intro:
      "We are a small team building products, growth systems and new ventures. If you care about craft and want real ownership, we would like to hear from you.",
    listTitle: "Open roles",
    emptyText:
      "There are no open roles right now — but we are always glad to hear from exceptional people.",
    openEyebrow: "Open application",
    openTitle: "Don't see the right role?",
    openText:
      "Send a short note about yourself and the work you would like to do, with your CV attached.",
  },
  contact: {
    metaDescription:
      "Start a conversation with Siang Origin about your product, platform or growth plans.",
    eyebrow: "Contact",
    title: "Let's talk.",
    intro:
      "Tell us about your business, the problem you are solving, or simply where you would like to go next.",
    messageLabel: "How can we help?",
    messagePlaceholder:
      "A few lines about your project, goals and timeline.",
    successTitle: "Thank you — message received.",
    successText: "We read every message personally and will be in touch shortly.",
  },
};

export type Sections = typeof defaults;
export type SectionKey = keyof Sections;

const meta = (label = "SEO description"): TextField => ({
  type: "textarea",
  key: "metaDescription",
  label,
  hint: "Shown in search results and link previews.",
  max: 300,
});

export const SECTIONS: Record<
  SectionKey,
  { title: string; description: string; path: string; fields: FieldDef[] }
> = {
  settings: {
    title: "Site settings",
    description: "Company details, contact info, SEO and the contact banner.",
    path: "/",
    fields: [
      { type: "heading", label: "Company" },
      { type: "text", key: "name", label: "Company name", required: true },
      { type: "text", key: "shortName", label: "Short name", hint: "Shown in the navbar.", required: true },
      { type: "text", key: "tagline", label: "Tagline" },
      { type: "text", key: "location", label: "Location" },
      { type: "email", key: "contactEmail", label: "Contact email", required: true },
      { type: "email", key: "careersEmail", label: "Careers email", required: true },
      { type: "heading", label: "Navigation" },
      {
        type: "group",
        key: "nav",
        label: "Menu links",
        itemLabel: "Link",
        max: 8,
        fields: [
          { type: "text", key: "label", label: "Label", required: true, max: 40 },
          {
            type: "link",
            key: "href",
            label: "Goes to",
            required: true,
            hint: "A page on this site like /about, or a full URL like https://…",
          },
        ],
      },
      { type: "text", key: "navCta", label: "Button label", required: true, max: 40 },
      {
        type: "link",
        key: "navCtaHref",
        label: "Button goes to",
        required: true,
        hint: "Menu links pointing to the same place are hidden on desktop next to the button.",
      },
      { type: "heading", label: "SEO" },
      meta("Default SEO description"),
      { type: "heading", label: "Contact banner (home, about, work)" },
      { type: "text", key: "ctaTitle", label: "Title" },
      { type: "textarea", key: "ctaText", label: "Text" },
      { type: "text", key: "ctaButton", label: "Button label", required: true },
    ],
  },
  home: {
    title: "Home",
    description: "Hero, capabilities, services and studio introduction.",
    path: "/",
    fields: [
      { type: "heading", label: "Hero" },
      { type: "text", key: "heroBadge", label: "Eyebrow" },
      { type: "text", key: "heroTitle", label: "Headline", required: true },
      { type: "text", key: "heroHighlight", label: "Headline highlight", hint: "Shown in brand colour after the headline." },
      { type: "textarea", key: "heroText", label: "Intro" },
      { type: "text", key: "heroPrimaryCta", label: "Primary button", required: true },
      { type: "text", key: "heroSecondaryCta", label: "Secondary button", required: true },
      { type: "heading", label: "Capabilities" },
      { type: "lines", key: "marquee", label: "Capabilities", hint: "One per line. Listed under the hero." },
      { type: "heading", label: "Selected work" },
      { type: "text", key: "workEyebrow", label: "Eyebrow" },
      { type: "text", key: "workTitle", label: "Title" },
      { type: "text", key: "workLink", label: "Link label" },
      { type: "heading", label: "Services" },
      { type: "text", key: "servicesEyebrow", label: "Eyebrow" },
      { type: "text", key: "servicesTitle", label: "Title" },
      {
        type: "group",
        key: "services",
        label: "Services",
        itemLabel: "Service",
        max: 9,
        fields: [
          { type: "text", key: "title", label: "Title", required: true },
          { type: "textarea", key: "description", label: "Description" },
        ],
      },
      { type: "heading", label: "Studio introduction" },
      { type: "text", key: "aboutEyebrow", label: "Eyebrow" },
      { type: "textarea", key: "aboutText", label: "Text" },
      { type: "text", key: "aboutLink", label: "Link label" },
    ],
  },
  about: {
    title: "About",
    description: "Story, services, principles and direction.",
    path: "/about",
    fields: [
      { type: "heading", label: "Header" },
      { type: "text", key: "eyebrow", label: "Eyebrow" },
      { type: "text", key: "title", label: "Title", required: true },
      { type: "textarea", key: "intro", label: "Intro" },
      meta(),
      { type: "heading", label: "Who we are" },
      { type: "text", key: "whoLabel", label: "Section label" },
      { type: "lines", key: "whoParagraphs", label: "Paragraphs", hint: "One paragraph per line." },
      { type: "heading", label: "What we do" },
      { type: "text", key: "whatLabel", label: "Section label" },
      {
        type: "group",
        key: "services",
        label: "Services",
        itemLabel: "Service",
        max: 12,
        fields: [
          { type: "text", key: "title", label: "Title", required: true },
          { type: "textarea", key: "description", label: "Description" },
        ],
      },
      { type: "heading", label: "How we think" },
      { type: "text", key: "thinkLabel", label: "Section label" },
      { type: "text", key: "thinkTitle", label: "Title" },
      { type: "textarea", key: "thinkText", label: "Text" },
      { type: "heading", label: "The journey" },
      { type: "text", key: "journeyLabel", label: "Section label" },
      { type: "text", key: "journeyTitle", label: "Title" },
      { type: "textarea", key: "journeyText", label: "Text" },
    ],
  },
  work: {
    title: "Work",
    description: "Header of the work page. Projects are edited under Projects.",
    path: "/work",
    fields: [
      { type: "text", key: "eyebrow", label: "Eyebrow" },
      { type: "text", key: "title", label: "Title", required: true },
      { type: "textarea", key: "intro", label: "Intro" },
      meta(),
    ],
  },
  careers: {
    title: "Careers",
    description: "Careers page text. Roles are edited under Jobs.",
    path: "/careers",
    fields: [
      { type: "heading", label: "Header" },
      { type: "text", key: "eyebrow", label: "Eyebrow" },
      { type: "text", key: "title", label: "Title", required: true },
      { type: "textarea", key: "intro", label: "Intro" },
      meta(),
      { type: "heading", label: "Positions" },
      { type: "text", key: "listTitle", label: "List heading" },
      { type: "text", key: "emptyText", label: "Text when no roles are open" },
      { type: "heading", label: "Open application box" },
      { type: "text", key: "openEyebrow", label: "Eyebrow" },
      { type: "text", key: "openTitle", label: "Title" },
      { type: "textarea", key: "openText", label: "Text" },
    ],
  },
  contact: {
    title: "Contact",
    description: "Contact page text and form messages.",
    path: "/contact",
    fields: [
      { type: "heading", label: "Header" },
      { type: "text", key: "eyebrow", label: "Eyebrow" },
      { type: "text", key: "title", label: "Title", required: true },
      { type: "textarea", key: "intro", label: "Intro" },
      meta(),
      { type: "heading", label: "Form" },
      { type: "text", key: "messageLabel", label: "Message field label", required: true },
      { type: "text", key: "messagePlaceholder", label: "Message placeholder" },
      { type: "text", key: "successTitle", label: "Success title", required: true },
      { type: "textarea", key: "successText", label: "Success text" },
    ],
  },
};

export function isSectionKey(value: unknown): value is SectionKey {
  return typeof value === "string" && Object.hasOwn(SECTIONS, value);
}

export function sectionDefaults<K extends SectionKey>(key: K): Sections[K] {
  return structuredClone(defaults[key]);
}

const limit = (field: SimpleField) =>
  field.type === "select"
    ? 50
    : field.max ?? (field.type === "textarea" ? 5000 : 300);

function cleanSimple(field: SimpleField, value: unknown, fallback: unknown) {
  if (typeof value !== "string") return fallback;

  if (field.type === "select") {
    return field.options.includes(value) ? value : fallback;
  }

  return value.trim().slice(0, limit(field));
}

// Coerces stored or submitted data into the section's shape. Missing or
// malformed values fall back to the defaults, so old rows keep working
// when fields are added.
export function normalizeSection<K extends SectionKey>(
  key: K,
  raw: unknown
): Sections[K] {
  const base = sectionDefaults(key) as Record<string, unknown>;
  const input =
    raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};

  for (const field of SECTIONS[key].fields) {
    if (field.type === "heading") continue;

    const value = input[field.key];
    const fallback = base[field.key];

    if (field.type === "lines") {
      base[field.key] = Array.isArray(value)
        ? value
            .filter((line): line is string => typeof line === "string")
            .map((line) => line.trim().slice(0, 2000))
            .filter(Boolean)
            .slice(0, 100)
        : fallback;
    } else if (field.type === "group") {
      base[field.key] = Array.isArray(value)
        ? value
            .filter((item) => item && typeof item === "object")
            .slice(0, field.max ?? 20)
            .map((item) =>
              Object.fromEntries(
                field.fields.map((sub) => [
                  sub.key,
                  cleanSimple(
                    sub,
                    (item as Record<string, unknown>)[sub.key],
                    sub.type === "select" ? sub.options[0] : ""
                  ),
                ])
              )
            )
        : fallback;
    } else {
      base[field.key] = cleanSimple(field, value, fallback);
    }
  }

  return base as Sections[K];
}

const LINK_PATTERN = /^(?:\/(?!\/)[^\s]*|https?:\/\/[^\s]+|mailto:[^\s]+)$/i;

export function isExternalLink(href: string) {
  return /^(?:https?:|mailto:)/i.test(href);
}

function fieldError(field: SimpleField, value: string, prefix = "") {
  if (field.type === "select") return null;

  if (field.required && !value) {
    return `${prefix}${field.label} is required.`;
  }

  if (
    field.type === "email" &&
    value &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  ) {
    return `${prefix}${field.label} must be a valid email address.`;
  }

  if (field.type === "link" && value && !LINK_PATTERN.test(value)) {
    return `${prefix}${field.label} must start with "/" (a page on this site), "https://" or "mailto:".`;
  }

  return null;
}

// Returns an error message for missing required fields or bad emails.
export function validateSection(key: SectionKey, data: unknown) {
  const values = data as Record<string, ContentValue>;

  for (const field of SECTIONS[key].fields) {
    if (field.type === "heading" || field.type === "lines") continue;

    if (field.type === "group") {
      const items = values[field.key] as Record<string, string>[];

      for (const [index, item] of items.entries()) {
        for (const sub of field.fields) {
          const error = fieldError(
            sub,
            item[sub.key] ?? "",
            `${field.itemLabel} ${index + 1}: `
          );
          if (error) return error;
        }
      }
      continue;
    }

    const error = fieldError(field, values[field.key] as string);
    if (error) return error;
  }

  return null;
}
