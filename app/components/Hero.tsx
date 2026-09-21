"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-[#F7FAF7] pb-16 pt-32 lg:pb-20">

      {/* =====================================================
          SUBTLE BACKGROUND MOTION
      ====================================================== */}

      {/* Large soft green glow */}

      <motion.div
        className="pointer-events-none absolute -right-40 top-20 h-150 w-150 rounded-full bg-[#2F7D46]/8 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Smaller floating glow */}

      <motion.div
        className="pointer-events-none absolute left-[35%] top-[25%] h-48 w-48 rounded-full bg-[#176B3A]/5 blur-3xl"
        animate={{
          x: [0, 30, -10, 0],
          y: [0, -25, 20, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =====================================================
          TECH GRID
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
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
          MOVING VERTICAL LINE
      ====================================================== */}

      <motion.div
        className="pointer-events-none absolute right-[12%] top-0 hidden h-full w-px bg-linear-to-b from-transparent via-[#2F7D46]/15 to-transparent lg:block"
        animate={{
          opacity: [0.25, 0.7, 0.25],
          scaleY: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =====================================================
          FLOATING DOTS
      ====================================================== */}

      <motion.span
        className="pointer-events-none absolute right-[18%] top-[28%] h-1.5 w-1.5 rounded-full bg-[#2F7D46]"
        animate={{
          y: [0, -15, 0],
          opacity: [0.25, 0.8, 0.25],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.span
        className="pointer-events-none absolute right-[28%] top-[48%] h-1 w-1 rounded-full bg-[#176B3A]"
        animate={{
          y: [0, 12, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.span
        className="pointer-events-none absolute left-[8%] top-[30%] h-1 w-1 rounded-full bg-[#2F7D46]"
        animate={{
          x: [0, 12, 0],
          opacity: [0.15, 0.5, 0.15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">

        <div className="max-w-6xl">

          {/* CATEGORY */}

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
            className="mb-8 text-xs uppercase tracking-[0.25em] text-[#617568]"
          >
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#2F7D46] align-middle" />

            Technology · Growth · AI
          </motion.p>

          {/* =================================================
              MAIN HEADLINE
          ================================================= */}

          <h1 className="text-[15vw] font-medium leading-[0.82] tracking-[-0.07em] text-[#06351F] sm:text-8xl lg:text-[9rem]">

            {/* WE BUILD */}

            <motion.span
              className="block"
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              WE BUILD
            </motion.span>

            {/* DIGITAL */}

            <motion.span
              className="block text-[#2F7D46]"
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                delay: 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              DIGITAL
            </motion.span>

            {/* EXPERIENCES */}

            <motion.span
              className="block"
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                delay: 0.26,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              EXPERIENCES.
            </motion.span>

          </h1>

          {/* =================================================
              DESCRIPTION + CTA
          ================================================= */}

          <motion.div
            className="mt-12 flex flex-col justify-between gap-8 md:flex-row md:items-end"
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
          >

            <p className="max-w-md text-base leading-7 text-[#617568]">
              Siang Origin Technologies is a technology studio building
              digital experiences, growth systems and intelligent products.
            </p>

            {/* CTA */}

            <Link
              href="/work"
              className="group flex w-fit items-center gap-3 text-sm font-medium text-[#0B4D2C]"
            >
              <span className="relative">
                Explore our work

                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#2F7D46] transition-all duration-300 group-hover:w-full" />
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0B4D2C]/15 transition-all duration-300 group-hover:border-[#2F7D46] group-hover:bg-[#EAF3EC]">
                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </Link>

          </motion.div>

          {/* =================================================
              SCROLL INDICATOR
          ================================================= */}

          <motion.div
            className="mt-20 flex items-center gap-3 text-xs uppercase tracking-widest text-[#617568]"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.8,
            }}
          >

            <motion.span
              animate={{
                y: [0, 5, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowDown
                size={14}
                className="text-[#2F7D46]"
              />
            </motion.span>

            <span>
              Scroll to explore
            </span>

          </motion.div>

        </div>

      </div>

      {/* =====================================================
          BOTTOM BRAND ACCENT
      ====================================================== */}

      <motion.div
        className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-[#2F7D46]/20 to-transparent"
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

    </section>
  );
}