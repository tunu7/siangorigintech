export const metadata = {
  title: "Contact | Siang Origin Technologies",
  description: "Start a project with Siang Origin Technologies.",
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F7FAF7] text-[#06351F]">

      {/* =====================================================
          AMBIENT GREEN GLOW
      ====================================================== */}

      <div className="pointer-events-none absolute -right-45 top-[15%] h-125 w-125 rounded-full bg-[#2F7D46]/5 blur-3xl animate-[contactFloat_12s_ease-in-out_infinite]" />

      <div className="pointer-events-none absolute bottom-[10%] -left-45 h-105 w-105 rounded-full bg-[#176B3A]/4 blur-3xl animate-[contactFloatReverse_15s_ease-in-out_infinite]" />

      {/* =====================================================
          SUBTLE TECH GRID
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 opacity-[0.025]">
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
          FLOATING ACCENTS
      ====================================================== */}

      <div className="pointer-events-none absolute right-[15%] top-[30%] h-1.5 w-1.5 rounded-full bg-[#2F7D46] opacity-50 animate-[contactPulse_4s_ease-in-out_infinite]" />

      <div className="pointer-events-none absolute bottom-[30%] left-[12%] h-1 w-1 rounded-full bg-[#176B3A] opacity-40 animate-[contactPulse_5s_ease-in-out_infinite]" />

      {/* =====================================================
          CONTACT CONTENT
      ====================================================== */}

      <section className="relative z-10 min-h-screen pb-24 pt-40 lg:pb-32 lg:pt-48">

        <div className="mx-auto max-w-5xl px-6 lg:px-8">

          {/* =================================================
              HEADER
          ================================================== */}

          <div className="animate-[contactFadeUp_700ms_ease-out_both]">

            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#617568]">

              <span className="h-1.5 w-1.5 rounded-full bg-[#2F7D46]" />

              Start a project

            </p>

            <h1 className="mt-6 text-6xl font-medium leading-[0.88] tracking-[-0.065em] text-[#06351F] md:text-8xl">

              LET&apos;S
              <br />

              <span className="text-[#2F7D46]">
                TALK.
              </span>

            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-[#617568]">
              Tell us what you&apos;re building, what you&apos;re trying to
              solve, or simply where you want to go next.
            </p>

          </div>

          {/* =================================================
              FORM
          ================================================== */}

          <form
            className="mt-20 space-y-10 animate-[contactFadeUp_700ms_ease-out_200ms_both]"
          >

            {/* NAME */}

            <div>
              <label
                htmlFor="name"
                className="text-sm text-[#617568]"
              >
                Your name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                placeholder="John Doe"
                className="mt-3 w-full border-b border-[#0B4D2C]/15 bg-transparent py-4 text-xl text-[#06351F] outline-none placeholder:text-[#AAB8AF] transition-colors duration-300 focus:border-[#2F7D46]"
              />
            </div>

            {/* EMAIL */}

            <div>
              <label
                htmlFor="email"
                className="text-sm text-[#617568]"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                className="mt-3 w-full border-b border-[#0B4D2C]/15 bg-transparent py-4 text-xl text-[#06351F] outline-none placeholder:text-[#AAB8AF] transition-colors duration-300 focus:border-[#2F7D46]"
              />
            </div>

            {/* MESSAGE */}

            <div>
              <label
                htmlFor="message"
                className="text-sm text-[#617568]"
              >
                What do you want to build?
              </label>

              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell us a little about your project..."
                className="mt-3 w-full resize-none border-b border-[#0B4D2C]/15 bg-transparent py-4 text-xl text-[#06351F] outline-none placeholder:text-[#AAB8AF] transition-colors duration-300 focus:border-[#2F7D46]"
              />
            </div>

            {/* SUBMIT */}

            <button
              type="submit"
              className="group inline-flex items-center gap-4 rounded-full bg-[#0B4D2C] px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#176B3A]"
            >
              <span>
                Send enquiry
              </span>

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>

          </form>

          {/* =================================================
              BOTTOM ACCENT
          ================================================== */}

          <div className="mt-20 h-px w-full overflow-hidden bg-[#0B4D2C]/10">

            <div className="h-full w-24 bg-[#2F7D46] animate-[contactLineMove_5s_linear_infinite]" />

          </div>

        </div>

      </section>

      {/* =====================================================
          ANIMATIONS
          No styled-jsx / no client component required
      ====================================================== */}

      <style>
        {`
          @keyframes contactFadeUp {
            from {
              opacity: 0;
              transform: translateY(25px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes contactFloat {
            0%,
            100% {
              transform: translate3d(0, 0, 0);
            }

            50% {
              transform: translate3d(-30px, 25px, 0);
            }
          }

          @keyframes contactFloatReverse {
            0%,
            100% {
              transform: translate3d(0, 0, 0);
            }

            50% {
              transform: translate3d(30px, -25px, 0);
            }
          }

          @keyframes contactPulse {
            0%,
            100% {
              opacity: 0.15;
              transform: translateY(0);
            }

            50% {
              opacity: 0.65;
              transform: translateY(-8px);
            }
          }

          @keyframes contactLineMove {
            0% {
              transform: translateX(-150%);
            }

            100% {
              transform: translateX(1100%);
            }
          }
        `}
      </style>

    </main>
  );
}