export const metadata = {
  title: "Contact",
  description: "Start a project with Siang Origin Technologies.",
};

export default function ContactPage() {
  return (
    <section className="min-h-screen pt-40 pb-24 lg:pt-48">

      <div className="mx-auto max-w-5xl px-6 lg:px-8">

        <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
          Start a project
        </p>

        <h1 className="mt-6 text-6xl font-medium tracking-tighter md:text-8xl">
          LETS
          <br />
          TALK.
        </h1>

        <form className="mt-20 space-y-10">

          <div>
            <label className="text-sm text-neutral-500">
              Your name
            </label>

            <input
              type="text"
              name="name"
              placeholder="John Doe"
              className="mt-3 w-full border-b border-neutral-300 bg-transparent py-4 text-xl outline-none placeholder:text-neutral-300 focus:border-black"
            />
          </div>

          <div>
            <label className="text-sm text-neutral-500">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="mt-3 w-full border-b border-neutral-300 bg-transparent py-4 text-xl outline-none placeholder:text-neutral-300 focus:border-black"
            />
          </div>

          <div>
            <label className="text-sm text-neutral-500">
              What do you want to build?
            </label>

            <textarea
              name="message"
              rows={4}
              placeholder="Tell us a little about your project..."
              className="mt-3 w-full resize-none border-b border-neutral-300 bg-transparent py-4 text-xl outline-none placeholder:text-neutral-300 focus:border-black"
            />
          </div>

          <button
            type="submit"
            className="rounded-full bg-black px-8 py-4 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            Send enquiry →
          </button>

        </form>

      </div>

    </section>
  );
}