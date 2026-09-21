"use client";

import { motion, type Variants } from "framer-motion";

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const sectionReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const heroItem: Variants = {
  hidden: {
    opacity: 0,
    y: 45,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* =========================================================
   SERVICES
========================================================= */

const services = [
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
];

/* =========================================================
   PAGE
========================================================= */

export default function AboutPage() {
  return (
    <main className="relative overflow-hidden bg-[#F7FAF7] text-[#06351F]">

      {/* =====================================================
          AMBIENT BACKGROUND
      ====================================================== */}

      <motion.div
        className="pointer-events-none fixed -right-60 top-[15%] z-0 h-125 w-125 rounded-full bg-[#2F7D46]/5 blur-3xl"
        animate={{
          x: [0, -35, 0],
          y: [0, 30, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="pointer-events-none fixed -left-40 top-[55%] z-0 h-87.5 w-87.5 rounded-full bg-[#176B3A]/4 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -25, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =====================================================
          TECHNICAL GRID
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0B4D2C 1px, transparent 1px),
              linear-gradient(to bottom, #0B4D2C 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* =====================================================
          FLOATING DOTS
      ====================================================== */}

      <motion.span
        className="pointer-events-none absolute right-[12%] top-[24%] z-0 h-1.5 w-1.5 rounded-full bg-[#2F7D46]"
        animate={{
          y: [0, -15, 0],
          opacity: [0.2, 0.7, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.span
        className="pointer-events-none absolute left-[7%] top-[42%] z-0 h-1 w-1 rounded-full bg-[#176B3A]"
        animate={{
          x: [0, 12, 0],
          opacity: [0.15, 0.5, 0.15],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.span
        className="pointer-events-none absolute right-[30%] top-[68%] z-0 h-1 w-1 rounded-full bg-[#2F7D46]"
        animate={{
          y: [0, 10, 0],
          opacity: [0.15, 0.55, 0.15],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative z-10 pb-24 pt-40 lg:pb-32 lg:pt-48">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="max-w-6xl">

            {/* LABEL */}

            <motion.p
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#617568]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#2F7D46]" />

              About Siang Origin
            </motion.p>

            {/* HEADLINE */}

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
              className="mt-6 text-6xl font-medium leading-[0.88] tracking-[-0.065em] md:text-8xl lg:text-[9rem]"
            >

              <motion.span
                variants={heroItem}
                className="block"
              >
                WE BUILD
              </motion.span>

              <motion.span
                variants={heroItem}
                className="block text-[#2F7D46]"
              >
                WHAT
              </motion.span>

              <motion.span
                variants={heroItem}
                className="block"
              >
                MATTERS.
              </motion.span>

            </motion.h1>

            {/* DESCRIPTION */}

            <motion.p
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-10 max-w-xl text-lg leading-8 text-[#617568] md:text-xl"
            >
              A technology studio building digital products, growth systems,
              and ventures designed to solve real problems.
            </motion.p>

          </div>

        </div>
      </section>

      {/* =====================================================
          01 — WHO WE ARE
      ====================================================== */}

      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        className="relative z-10 mt-4 border-t border-[#0B4D2C]/10 pt-12 lg:mt-16"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 lg:px-8">

          {/* LABEL */}

          <div>
            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#617568]">

              <span className="text-[#2F7D46]">
                01
              </span>

              <span className="h-px w-6 bg-[#2F7D46]/30" />

              Who We Are

            </p>
          </div>

          {/* CONTENT */}

          <div className="max-w-2xl space-y-8 text-xl leading-8 text-[#52675A] md:text-2xl md:leading-9">

            <p>
              Siang Origin Technologies is an independent technology studio
              working at the intersection of technology, business and
              creativity.
            </p>

            <p>
              We partner with businesses and founders to turn ideas,
              challenges and opportunities into useful digital products,
              systems and experiences.
            </p>

            <p>
              We also build our own products and ventures — experimenting,
              learning and turning promising ideas into real businesses.
            </p>

          </div>

        </div>
      </motion.section>

      {/* =====================================================
          02 — WHAT WE DO
      ====================================================== */}

      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        className="relative z-10 mt-28 border-t border-[#0B4D2C]/10 pt-12 lg:mt-40"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 lg:px-8">

          {/* LABEL */}

          <div>
            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#617568]">

              <span className="text-[#2F7D46]">
                02
              </span>

              <span className="h-px w-6 bg-[#2F7D46]/30" />

              What We Do

            </p>
          </div>

          {/* SERVICES */}

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="grid gap-0 sm:grid-cols-2"
          >

            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={sectionReveal}
                className="group relative border-t border-[#0B4D2C]/10 py-8 sm:mr-8"
              >

                {/* HOVER LINE */}

                <span className="absolute left-0 top-0 h-px w-0 bg-[#2F7D46] transition-all duration-500 group-hover:w-16" />

                {/* NUMBER */}

                <span className="text-[10px] font-medium tracking-widest text-[#2F7D46]">
                  0{index + 1}
                </span>

                {/* TITLE */}

                <h2 className="mt-3 text-lg font-medium text-[#06351F] transition-colors duration-300 group-hover:text-[#176B3A]">
                  {service.title}
                </h2>

                {/* DESCRIPTION */}

                <p className="mt-3 text-sm leading-6 text-[#617568]">
                  {service.description}
                </p>

              </motion.div>
            ))}

          </motion.div>

        </div>
      </motion.section>

      {/* =====================================================
          03 — PHILOSOPHY
      ====================================================== */}

      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        className="relative z-10 mt-28 border-t border-[#0B4D2C]/10 pt-12 lg:mt-40"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 lg:px-8">

          {/* LABEL */}

          <div>
            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#617568]">

              <span className="text-[#2F7D46]">
                03
              </span>

              <span className="h-px w-6 bg-[#2F7D46]/30" />

              How We Think

            </p>
          </div>

          {/* CONTENT */}

          <div className="max-w-2xl">

            <h2 className="text-4xl font-medium leading-tight tracking-[-0.04em] text-[#06351F] md:text-5xl">

              Start with the problem.

              <br />

              <span className="text-[#2F7D46]">
                Build what solves it.
              </span>

            </h2>

            <p className="mt-8 text-lg leading-8 text-[#617568]">
              We believe good technology should have a purpose. Instead of
              building for the sake of building, we start with the problem,
              understand the people and business behind it, and create
              solutions that are simple, useful and capable of evolving.
            </p>

          </div>

        </div>
      </motion.section>

      {/* =====================================================
          04 — THE JOURNEY
      ====================================================== */}

      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        className="relative z-10 mt-32 border-t border-[#0B4D2C]/10 pt-12 lg:mt-48"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          {/* LABEL */}

          <p className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#617568]">

            <span className="text-[#2F7D46]">
              04
            </span>

            <span className="h-px w-6 bg-[#2F7D46]/30" />

            The Journey

          </p>

          {/* CONTENT */}

          <div className="mt-8 max-w-5xl">

            <h2 className="text-5xl font-medium leading-[0.95] tracking-[-0.06em] text-[#06351F] md:text-7xl">

              <span className="block">
                FROM IDEAS
              </span>

              <span className="block text-[#2F7D46]">
                TO SYSTEMS.
              </span>

              <span className="block">
                TO VENTURES.
              </span>

            </h2>

            <p className="mt-10 max-w-xl text-lg leading-8 text-[#617568]">
              We are still early in the journey. That is intentional.
              Siang Origin is being built to continuously experiment,
              create and launch — one meaningful problem at a time.
            </p>

          </div>

          {/* MOVING ACCENT LINE */}

          <div className="mt-16 h-px w-full overflow-hidden bg-[#0B4D2C]/10">

            <motion.div
              className="h-full w-32 bg-[#2F7D46]"
              animate={{
                x: ["-100%", "800%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />

          </div>

        </div>
      </motion.section>

      {/* =====================================================
          BOTTOM SPACE
      ====================================================== */}

      <div className="h-24 lg:h-32" />

    </main>
  );
}