// Editable site content. Each section is one row in `site_content`;
// the schema drives both the admin editor and server-side validation,
// and `defaults` is what the site shows until a section is edited.

export const SERVICE_ICONS = [
  "layout",
  "growth",
  "brain",
  "sparkles",
  "rocket",
  "code",
  "megaphone",
  "search",
  "bot",
  "palette",
  "cart",
  "chart",
] as const;

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
    logoMark: "SO",
    tagline: "Technology · Growth · AI",
    location: "Itanagar, Arunachal Pradesh",
    contactEmail: "hello@siangorigin.com",
    careersEmail: "careers@siangorigin.com",
    nav: [
      { label: "Work", href: "/work" },
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
    navCta: "Contact us",
    navCtaHref: "/contact",
    metaDescription:
      "Siang Origin Technologies is a technology studio building digital experiences, growth systems and intelligent products.",
    ctaTitle: "Have a project in mind?",
    ctaText: "Tell us what you're building. We'd love to hear about it.",
    ctaButton: "Start a conversation",
  },
  home: {
    heroBadge: "Technology · Growth · AI",
    heroTitle: "We build digital products that",
    heroHighlight: "move businesses forward.",
    heroText:
      "Siang Origin Technologies is a technology studio building digital experiences, growth systems and intelligent products.",
    heroPrimaryCta: "Start a project",
    heroSecondaryCta: "View our work",
    marquee: [
      "Websites",
      "Digital Platforms",
      "Social Media",
      "SEO",
      "Paid Advertising",
      "Content Strategy",
      "AI & Automation",
      "New Ventures",
    ],
    workEyebrow: "Selected work",
    workTitle: "Things we've built",
    workLink: "All work",
    servicesEyebrow: "What we do",
    servicesTitle: "Technology with a reason behind it",
    services: [
      {
        icon: "layout",
        title: "Digital",
        description:
          "Websites, digital products and experiences built around real business objectives.",
      },
      {
        icon: "growth",
        title: "Growth",
        description:
          "Strategy, content and performance systems designed to help businesses grow.",
      },
      {
        icon: "brain",
        title: "Intelligence",
        description:
          "AI and automation systems that make businesses faster and more scalable.",
      },
    ],
    aboutEyebrow: "About us",
    aboutText:
      "We are building a technology company around useful digital products, ambitious businesses and ideas worth exploring.",
    aboutLink: "More about us",
  },
  about: {
    metaDescription:
      "Siang Origin Technologies is an independent technology studio building digital products, growth systems and ventures.",
    eyebrow: "About",
    title: "We build what matters",
    intro:
      "A technology studio building digital products, growth systems and ventures designed to solve real problems.",
    whoLabel: "Who we are",
    whoParagraphs: [
      "Siang Origin Technologies is an independent technology studio working at the intersection of technology, business and creativity.",
      "We partner with businesses and founders to turn ideas, challenges and opportunities into useful digital products, systems and experiences.",
      "We also build our own products and ventures — experimenting, learning and turning promising ideas into real businesses.",
    ],
    whatLabel: "What we do",
    services: [
      {
        title: "Digital Products",
        description:
          "Websites, platforms and digital experiences built around real users and business needs.",
      },
      {
        title: "Growth Systems",
        description:
          "Marketing, automation and technology systems that help businesses operate and grow more effectively.",
      },
      {
        title: "AI & Automation",
        description:
          "Intelligent workflows and AI-powered systems that reduce repetitive work and create new possibilities.",
      },
      {
        title: "New Ventures",
        description:
          "Our own products and ideas — built from the ground up and developed into independent ventures.",
      },
    ],
    thinkLabel: "How we think",
    thinkTitle: "Start with the problem. Build what solves it.",
    thinkText:
      "We believe good technology should have a purpose. Instead of building for the sake of building, we start with the problem, understand the people and business behind it, and create solutions that are simple, useful and capable of evolving.",
    journeyLabel: "The journey",
    journeyTitle: "From ideas, to systems, to ventures.",
    journeyText:
      "We are still early in the journey. That is intentional. Siang Origin is being built to continuously experiment, create and launch — one meaningful problem at a time.",
  },
  work: {
    metaDescription: "Selected work by Siang Origin Technologies.",
    eyebrow: "Our work",
    title: "Built for the real world",
    intro:
      "Digital products, platforms and experiences designed to solve real problems and create meaningful business outcomes.",
  },
  careers: {
    metaDescription:
      "Explore career opportunities at Siang Origin Technologies.",
    eyebrow: "Careers",
    title: "Build with us",
    intro:
      "We are building digital products, growth systems and new ventures. Join us if you want to work on meaningful problems and help turn ideas into reality.",
    listTitle: "Open positions",
    emptyText: "There are no open positions at the moment.",
    openEyebrow: "Don't see your role?",
    openTitle: "Good people don't always fit into job descriptions.",
    openText:
      "If you think you can contribute to what we are building, send us a short introduction and your resume.",
  },
  contact: {
    metaDescription: "Start a project with Siang Origin Technologies.",
    eyebrow: "Contact",
    title: "Let's talk",
    intro:
      "Tell us what you're building, what you're trying to solve, or simply where you want to go next.",
    messageLabel: "What would you like to build?",
    messagePlaceholder:
      "A few lines about your project, goals and timeline.",
    successTitle: "Message sent",
    successText: "Thanks for reaching out. We'll get back to you soon.",
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
      { type: "text", key: "logoMark", label: "Logo letters", max: 3, required: true },
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
    description: "Hero, scrolling ticker, services and about preview.",
    path: "/",
    fields: [
      { type: "heading", label: "Hero" },
      { type: "text", key: "heroBadge", label: "Badge" },
      { type: "text", key: "heroTitle", label: "Headline", required: true },
      { type: "text", key: "heroHighlight", label: "Headline highlight", hint: "Shown in brand colour after the headline." },
      { type: "textarea", key: "heroText", label: "Intro" },
      { type: "text", key: "heroPrimaryCta", label: "Primary button", required: true },
      { type: "text", key: "heroSecondaryCta", label: "Secondary button", required: true },
      { type: "heading", label: "Scrolling ticker" },
      { type: "lines", key: "marquee", label: "Items", hint: "One per line." },
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
          { type: "select", key: "icon", label: "Icon", options: SERVICE_ICONS },
          { type: "text", key: "title", label: "Title", required: true },
          { type: "textarea", key: "description", label: "Description" },
        ],
      },
      { type: "heading", label: "About preview" },
      { type: "text", key: "aboutEyebrow", label: "Eyebrow" },
      { type: "textarea", key: "aboutText", label: "Text" },
      { type: "text", key: "aboutLink", label: "Link label" },
    ],
  },
  about: {
    title: "About",
    description: "Story, services, philosophy and journey.",
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
