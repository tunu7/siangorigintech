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

// Icons a service can show; mapped to components in app/components/ServiceIcon.
export const SERVICE_ICONS = [
  "megaphone",
  "clapperboard",
  "monitor",
  "code",
  "bot",
  "pen",
  "trending",
  "chart",
  "cart",
  "glasses",
  "cloud",
  "graduation",
] as const;

const defaults = {
  settings: {
    name: "Siang Origin Technologies",
    shortName: "Siang Origin",
    tagline: "Digital marketing, design & technology studio",
    location: "Itanagar, Arunachal Pradesh",
    contactEmail: "hello@siangorigin.com",
    careersEmail: "careers@siangorigin.com",
    nav: [
      { label: "Services", href: "/services" },
      { label: "Work", href: "/work" },
      { label: "Studio", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
    navCta: "Start a project",
    navCtaHref: "/contact",
    metaDescription:
      "Digital marketing, SEO, branding, video, websites, software and AI automation from Itanagar, Arunachal Pradesh — one team for local and international businesses.",
    keywords: [
      "Siang Origin Technologies",
      "digital marketing agency",
      "SEO services",
      "local SEO",
      "Google Ads",
      "Meta Ads",
      "social media management",
      "branding agency",
      "video production",
      "website development",
      "e-commerce development",
      "Shopify",
      "app development",
      "software development",
      "SaaS development",
      "AI automation",
      "AI chatbots",
      "WhatsApp automation",
      "n8n automation",
      "3D animation",
      "AR VR development",
      "digital marketing agency in Arunachal Pradesh",
      "website development in Itanagar",
      "Itanagar",
      "Arunachal Pradesh",
      "Northeast India",
    ],
    socialProfiles: [] as string[],
    googleVerification: "",
    bingVerification: "",
    ctaTitle: "Let's build what's next for your business.",
    ctaText:
      "Tell us where you are and where you want to be. You'll get honest advice, a clear plan and a reply from a real person on our team.",
    ctaButton: "Start a conversation",
  },
  home: {
    heroBadge: "Digital growth & technology studio",
    heroTitle: "Marketing, design, software and AI —",
    heroHighlight: "one team, built for growth.",
    heroText:
      "Siang Origin is a full-service digital studio from Arunachal Pradesh. We help local businesses and international brands get found, win customers and run smarter — with strategy, creative and engineering working as one.",
    heroPrimaryCta: "Start a project",
    heroSecondaryCta: "Explore services",
    heroPanelTitle: "What we do",
    marquee: [
      "SEO & local SEO",
      "Google Ads",
      "Meta Ads",
      "Social media",
      "Brand identity",
      "Video & Reels",
      "3D & CGI",
      "Websites",
      "E-commerce",
      "Mobile apps",
      "SaaS",
      "AI agents",
      "WhatsApp automation",
      "n8n workflows",
      "Analytics",
      "Cloud & DevOps",
    ],
    audienceEyebrow: "Who we work with",
    audienceTitle: "Rooted in Arunachal. Working with the world.",
    audiences: [
      {
        title: "Local businesses",
        description:
          "Shops, restaurants, hotels, clinics, schools and startups across Itanagar and Northeast India. We help you show up on Google Maps, fill your calendar with real enquiries and look as good online as you are in person.",
        items:
          "Local SEO & Google Business Profile, Social media & Reels, Websites that bring enquiries, Google & Meta Ads",
      },
      {
        title: "International clients",
        description:
          "Founders, agencies and growing brands across India and abroad. Senior-quality strategy, design, development and AI work — delivered remotely, documented properly and priced competitively.",
        items:
          "Remote-first collaboration, Clear scopes and milestones, Regular written updates, Long-term partnerships",
      },
    ],
    servicesEyebrow: "Services",
    servicesTitle: "Twelve disciplines. One accountable team.",
    servicesText:
      "From a first logo to a full ad programme, from a landing page to a SaaS platform — pick one service or let us run the whole stack.",
    servicesLink: "View all services",
    goalsEyebrow: "Where to start",
    goalsTitle: "Tell us the goal. We'll assemble the team.",
    goals: [
      {
        title: "Launch a new brand",
        description:
          "Name, logo, identity, website and launch content — everything you need to open your doors, online and off.",
        items: "Branding & Design, Website Development, Creative Production",
      },
      {
        title: "Get more leads & sales",
        description:
          "Search, paid ads, funnels and follow-up that turn attention into enquiries — and enquiries into revenue.",
        items: "Digital Marketing, Sales & Growth, Analytics & Data",
      },
      {
        title: "Sell online",
        description:
          "A fast, well-merchandised store with the ads, listings and retention marketing to keep orders coming.",
        items: "E-commerce & Online Business, Digital Marketing, Creative Production",
      },
      {
        title: "Automate & scale",
        description:
          "AI agents, WhatsApp bots, CRMs and custom software that take repetitive work off your team's plate.",
        items: "AI & Automation, Software Development, Cloud & IT",
      },
    ],
    workEyebrow: "Selected work",
    workTitle: "Recent projects",
    workLink: "All projects",
    processEyebrow: "How we work",
    processTitle: "A clear process, from first call to measurable results.",
    steps: [
      {
        title: "Discover",
        description:
          "We learn your business, customers and numbers, and audit what you already have. No templates, no guesswork.",
      },
      {
        title: "Plan",
        description:
          "You get a written plan with scope, timeline, budget and the metrics we'll be measured against.",
      },
      {
        title: "Build & launch",
        description:
          "Design, development and content in short cycles, with regular check-ins so there are no surprises.",
      },
      {
        title: "Measure & grow",
        description:
          "We track what matters, report in plain language and keep improving what's working.",
      },
    ],
    whyEyebrow: "Why Siang Origin",
    whyTitle: "A partner, not a vendor.",
    reasons: [
      {
        title: "One team, every discipline",
        description:
          "Marketers, designers, developers and AI engineers under one roof. No juggling agencies, no lost hand-offs.",
      },
      {
        title: "Strategy before spend",
        description:
          "We start with your goals and numbers, so every rupee or dollar you invest has a job to do.",
      },
      {
        title: "You own everything",
        description:
          "Domains, ad accounts, code, designs and data stay in your name — always.",
      },
      {
        title: "Local roots, global standards",
        description:
          "Based in Itanagar, held to the quality bar of the best studios anywhere — with the communication to match.",
      },
    ],
    aboutEyebrow: "The studio",
    aboutText:
      "We're a growing team from Arunachal Pradesh working where marketing, creativity and technology meet — for businesses next door and across the world.",
    aboutLink: "About the studio",
    faqEyebrow: "FAQ",
    faqTitle: "Questions, answered.",
    faqs: [
      {
        question: "Do you work with businesses outside Arunachal Pradesh?",
        answer:
          "Yes. We work with local businesses across Northeast India and with clients across India and internationally. Projects run remotely through video calls, shared workspaces and regular written updates.",
      },
      {
        question: "Can I hire you for just one service?",
        answer:
          "Absolutely. Many clients start with one thing — a website, an ad campaign, a chatbot — and add more as they see results. You only pay for what you need.",
      },
      {
        question: "How much does a project cost?",
        answer:
          "It depends on the scope. After a short discovery call we send a written proposal with either a fixed price or a monthly retainer, so you know exactly what you're paying for before anything starts.",
      },
      {
        question: "How long does it take?",
        answer:
          "A landing page can go live within days. A brand identity or business website usually takes a few weeks. Software and AI systems are planned in phases with clear milestones.",
      },
      {
        question: "Do you provide support after launch?",
        answer:
          "Yes. We offer website maintenance, hosting, marketing retainers and support plans so your site, campaigns and systems keep performing long after launch.",
      },
      {
        question: "Which industries do you work with?",
        answer:
          "Retail, hospitality, tourism, education, healthcare, real estate, e-commerce, startups and SaaS, among others. The fundamentals of growth are the same — we adapt the playbook to your market.",
      },
    ],
  },
  services: {
    metaDescription:
      "Digital marketing, creative production, websites, software, AI automation, branding, analytics, e-commerce, AR/VR, cloud and consulting from Siang Origin Technologies.",
    eyebrow: "Services",
    title: "Everything you need to grow, under one roof.",
    intro:
      "Twelve service lines spanning marketing, creative, technology and AI. Use one, combine several, or hand us the whole roadmap — for local businesses and international brands alike.",
    categories: [
      {
        icon: "megaphone",
        title: "Digital Marketing",
        summary: "Get found, get chosen, get results.",
        description:
          "Data-led campaigns across search, social and email that bring in qualified customers — not just clicks. We plan, run and optimise everything from local SEO to international paid media.",
        items:
          "Social media management, SEO, Local SEO, Google Ads, Meta Ads, Paid advertising, Email marketing, Influencer marketing, Lead generation, Content marketing, Digital strategy",
      },
      {
        icon: "clapperboard",
        title: "Creative Production",
        summary: "Content that stops the scroll.",
        description:
          "Photography, video, motion and 3D that make your brand impossible to ignore — produced for Reels, YouTube, ads, websites and commercials.",
        items:
          "Graphic design, Branding, Video editing, Photography, Videography, Reels, YouTube content, Motion graphics, 2D animation, 3D modelling, CGI, Product visualisation, Commercial production",
      },
      {
        icon: "monitor",
        title: "Website Development",
        summary: "Websites that load fast and sell.",
        description:
          "Business websites, landing pages and online stores designed around your customers and built to convert — easy for your team to update and simple to grow.",
        items:
          "Business websites, Landing pages, E-commerce, CMS, UI/UX design, Website maintenance, Conversion optimisation",
      },
      {
        icon: "code",
        title: "Software Development",
        summary: "Custom software, built to scale.",
        description:
          "Web apps, mobile apps and SaaS platforms engineered for real users and real load — from a first MVP to CRM, ERP and marketplace systems that run your business.",
        items:
          "Web apps, Mobile apps, SaaS, Custom software, CRM, ERP, Marketplaces, APIs, Dashboards",
      },
      {
        icon: "bot",
        title: "AI & Automation",
        summary: "Put repetitive work on autopilot.",
        description:
          "AI agents, chatbots and automated workflows that answer customers around the clock, qualify leads and connect your tools — so your team can focus on work that matters.",
        items:
          "AI agents, Chatbots, Voice agents, WhatsApp automation, Workflow automation, n8n integrations, CRM automation, Custom AI solutions",
      },
      {
        icon: "pen",
        title: "Branding & Design",
        summary: "A brand people remember.",
        description:
          "Strategic identities with the logo, guidelines and collateral to keep every touchpoint consistent — from business cards to packaging to pitch decks.",
        items:
          "Logo design, Brand identity, Brand guidelines, Packaging, Presentations, Marketing collateral",
      },
      {
        icon: "trending",
        title: "Sales & Growth",
        summary: "Turn interest into revenue.",
        description:
          "Funnels, CRM pipelines and follow-up campaigns that capture every lead, nurture it properly and bring past customers back.",
        items:
          "Sales funnels, CRM setup, Email campaigns, Customer acquisition, Retargeting, Conversion optimisation",
      },
      {
        icon: "chart",
        title: "Analytics & Data",
        summary: "Know exactly what's working.",
        description:
          "Clean tracking, clear dashboards and honest attribution, so every decision about your marketing and product is backed by data.",
        items:
          "Google Analytics, Tracking, Dashboards, Attribution, Reporting, A/B testing",
      },
      {
        icon: "cart",
        title: "E-commerce & Online Business",
        summary: "Sell more, on your store and beyond.",
        description:
          "Shopify and WooCommerce stores, optimised marketplace listings and retention programmes that grow order value and repeat purchases.",
        items:
          "Shopify, WooCommerce, Product listings, Marketplace optimisation, Retention marketing",
      },
      {
        icon: "glasses",
        title: "Advanced Technology",
        summary: "Immersive experiences that impress.",
        description:
          "AR/VR, interactive 3D and architectural visualisation that let customers explore products and spaces before they exist — online, in showrooms and on screens.",
        items:
          "AR/VR, Interactive 3D, Architectural visualisation, Digital signage, Immersive experiences",
      },
      {
        icon: "cloud",
        title: "Cloud & IT",
        summary: "Reliable, secure infrastructure.",
        description:
          "Hosting, deployments and the everyday IT that keeps a modern business running — set up properly, monitored and backed up.",
        items:
          "Hosting, Deployment, CI/CD, Integrations, Business email, Backups, Security hardening, Infrastructure management",
      },
      {
        icon: "graduation",
        title: "Consulting & Training",
        summary: "Expert guidance for your next move.",
        description:
          "Audits, roadmaps and hands-on training that help your team adopt digital tools and AI with confidence — and get real value from them quickly.",
        items:
          "Digital transformation, Marketing audits, Business consulting, AI implementation, Team training",
      },
    ],
    ctaTitle: "Not sure which service you need?",
    ctaText:
      "Tell us what you're trying to achieve. We'll recommend the right mix — and tell you honestly if you don't need us.",
  },
  about: {
    metaDescription:
      "Siang Origin Technologies is a full-service digital studio in Itanagar, Arunachal Pradesh, helping local and international businesses grow through marketing, design, software and AI.",
    eyebrow: "Studio",
    title: "Local roots. Global ambition.",
    intro:
      "Siang Origin Technologies is a full-service digital studio based in Itanagar, Arunachal Pradesh. We bring marketing, creative, software and AI together in one team — for businesses in our region and clients around the world.",
    whoLabel: "Who we are",
    whoParagraphs: [
      "We started Siang Origin to give businesses one partner for everything digital — instead of a different agency for every problem.",
      "Our team covers the full journey: strategy, branding, content, websites, software, automation and the marketing that brings it all to market. Because it's one team, nothing gets lost between hand-offs.",
      "We work with shop owners and startups in Northeast India and with founders and brands across India and abroad. The standard is the same for both: clear communication, honest advice and work we're proud to put our name on.",
    ],
    whatLabel: "What we do",
    thinkLabel: "Principles",
    thinkTitle: "Start with the goal. Build only what moves it.",
    thinkText:
      "Every engagement begins with your numbers — leads, sales, hours saved — not a list of deliverables. Then we design the simplest mix of marketing, creative and technology that gets you there, and measure it honestly.",
    journeyLabel: "Where we're headed",
    journeyTitle: "From Arunachal, for the world.",
    journeyText:
      "We're building a studio that proves world-class digital work can come from anywhere — creating opportunities for local talent while helping businesses everywhere grow.",
  },
  work: {
    metaDescription:
      "Selected websites, products, campaigns and creative work by Siang Origin Technologies for local and international clients.",
    eyebrow: "Work",
    title: "Selected projects.",
    intro:
      "Websites, products, campaigns and creative we have made with our partners — and a few ventures of our own.",
  },
  careers: {
    metaDescription:
      "Open roles at Siang Origin Technologies — marketing, design, video, development and AI careers in Itanagar, Arunachal Pradesh.",
    eyebrow: "Careers",
    title: "Build with us.",
    intro:
      "We're a growing team of marketers, designers, creators, developers and AI builders. If you care about craft and want real ownership over meaningful work, we'd like to hear from you.",
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
      "Contact Siang Origin Technologies about digital marketing, branding, websites, software or AI automation for your business.",
    eyebrow: "Contact",
    title: "Let's grow something together.",
    intro:
      "Tell us about your business and what you'd like to achieve — more customers, a new website, a stronger brand or a smarter way of working. We'll reply with honest advice and clear next steps.",
    messageLabel: "How can we help?",
    messagePlaceholder:
      "What do you need help with? Share your goals, timeline and budget if you have one.",
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

// A list shown as tags, stored as one comma-separated string.
const itemsField = (label: string): TextField => ({
  type: "textarea",
  key: "items",
  label,
  hint: "Comma-separated.",
  max: 2000,
});

// A repeatable title + description group, with optional extra fields.
const titled = (
  itemLabel: string,
  max: number,
  key: string,
  label: string,
  extra: SimpleField[] = []
): FieldDef => ({
  type: "group",
  key,
  label,
  itemLabel,
  max,
  fields: [
    { type: "text", key: "title", label: "Title", required: true },
    { type: "textarea", key: "description", label: "Description" },
    ...extra,
  ],
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
      {
        type: "lines",
        key: "keywords",
        label: "Keywords",
        hint: "One per line. Services, places and terms people search for.",
      },
      {
        type: "lines",
        key: "socialProfiles",
        label: "Social profiles",
        hint: "Full URLs, one per line (LinkedIn, Instagram, X, GitHub…). Helps Google connect them to the company.",
      },
      {
        type: "text",
        key: "googleVerification",
        label: "Google Search Console code",
        hint: "Only the content value of the google-site-verification meta tag.",
        max: 100,
      },
      {
        type: "text",
        key: "bingVerification",
        label: "Bing Webmaster code",
        hint: "Only the content value of the msvalidate.01 meta tag.",
        max: 100,
      },
      { type: "heading", label: "Contact banner (home, about, work)" },
      { type: "text", key: "ctaTitle", label: "Title" },
      { type: "textarea", key: "ctaText", label: "Text" },
      { type: "text", key: "ctaButton", label: "Button label", required: true },
    ],
  },
  home: {
    title: "Home",
    description: "Hero, audiences, goals, process, reasons and FAQ.",
    path: "/",
    fields: [
      { type: "heading", label: "Hero" },
      { type: "text", key: "heroBadge", label: "Eyebrow" },
      { type: "text", key: "heroTitle", label: "Headline", required: true },
      { type: "text", key: "heroHighlight", label: "Headline highlight", hint: "Shown in brand colour after the headline." },
      { type: "textarea", key: "heroText", label: "Intro" },
      { type: "text", key: "heroPrimaryCta", label: "Primary button", required: true },
      { type: "text", key: "heroSecondaryCta", label: "Secondary button", required: true, hint: "Goes to the services page." },
      { type: "text", key: "heroPanelTitle", label: "Service list heading", hint: "Above the list of services beside the headline." },
      { type: "heading", label: "Capabilities ticker" },
      { type: "lines", key: "marquee", label: "Capabilities", hint: "One per line. Scrolls under the hero." },
      { type: "heading", label: "Who we work with" },
      { type: "text", key: "audienceEyebrow", label: "Eyebrow" },
      { type: "text", key: "audienceTitle", label: "Title" },
      titled("Audience", 3, "audiences", "Audiences", [itemsField("Highlights")]),
      { type: "heading", label: "Services" },
      { type: "text", key: "servicesEyebrow", label: "Eyebrow" },
      { type: "text", key: "servicesTitle", label: "Title" },
      { type: "textarea", key: "servicesText", label: "Text", hint: "The services themselves are edited under Services." },
      { type: "text", key: "servicesLink", label: "Link label" },
      { type: "heading", label: "Goals" },
      { type: "text", key: "goalsEyebrow", label: "Eyebrow" },
      { type: "text", key: "goalsTitle", label: "Title" },
      titled("Goal", 6, "goals", "Goals", [itemsField("Services involved")]),
      { type: "heading", label: "Selected work" },
      { type: "text", key: "workEyebrow", label: "Eyebrow" },
      { type: "text", key: "workTitle", label: "Title" },
      { type: "text", key: "workLink", label: "Link label" },
      { type: "heading", label: "Process" },
      { type: "text", key: "processEyebrow", label: "Eyebrow" },
      { type: "text", key: "processTitle", label: "Title" },
      titled("Step", 6, "steps", "Steps"),
      { type: "heading", label: "Why us" },
      { type: "text", key: "whyEyebrow", label: "Eyebrow" },
      { type: "text", key: "whyTitle", label: "Title" },
      titled("Reason", 6, "reasons", "Reasons"),
      { type: "heading", label: "Studio introduction" },
      { type: "text", key: "aboutEyebrow", label: "Eyebrow" },
      { type: "textarea", key: "aboutText", label: "Text" },
      { type: "text", key: "aboutLink", label: "Link label" },
      { type: "heading", label: "FAQ" },
      { type: "text", key: "faqEyebrow", label: "Eyebrow" },
      { type: "text", key: "faqTitle", label: "Title" },
      {
        type: "group",
        key: "faqs",
        label: "Questions",
        itemLabel: "Question",
        max: 12,
        fields: [
          { type: "text", key: "question", label: "Question", required: true },
          { type: "textarea", key: "answer", label: "Answer", required: true },
        ],
      },
    ],
  },
  services: {
    title: "Services",
    description: "The service catalogue shown on the services, home and about pages.",
    path: "/services",
    fields: [
      { type: "heading", label: "Header" },
      { type: "text", key: "eyebrow", label: "Eyebrow" },
      { type: "text", key: "title", label: "Title", required: true },
      { type: "textarea", key: "intro", label: "Intro" },
      meta(),
      { type: "heading", label: "Catalogue" },
      {
        type: "group",
        key: "categories",
        label: "Services",
        itemLabel: "Service",
        max: 16,
        fields: [
          { type: "select", key: "icon", label: "Icon", options: SERVICE_ICONS },
          { type: "text", key: "title", label: "Title", required: true },
          { type: "text", key: "summary", label: "One-line pitch" },
          { type: "textarea", key: "description", label: "Description" },
          itemsField("What's included"),
        ],
      },
      { type: "heading", label: "Closing banner" },
      { type: "text", key: "ctaTitle", label: "Title" },
      { type: "textarea", key: "ctaText", label: "Text" },
    ],
  },
  about: {
    title: "About",
    description: "Story, principles and direction. Services come from the Services section.",
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

// Splits a comma-separated items field into tags.
export function splitItems(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

// Anchor id for a service on the services page ("AI & Automation" → "ai-automation").
export function serviceSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
