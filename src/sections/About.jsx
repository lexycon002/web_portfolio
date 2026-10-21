function About() {
  return (
    <section id="about" className="max-w-5xl mx-auto px-6 py-20">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            About me
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            I build mobile apps that feel at home in your hand.
          </h2>
          <p>
            I’m <span className="font-podkova font-semibold text-indigo-600 dark:text-indigo-400">Awowole Hammad Olamilekan</span>,
            a mobile and web application engineer focused on turning useful ideas into clear,
            polished digital experiences.
          </p>
          <p>
            Mobile development is a core part of my work. I use React Native and Expo to build
            cross-platform apps, and TypeScript and JavaScript to create reusable screens,
            intuitive user flows, and interfaces that adapt to different devices. I care about
            the details that make an app easy to use: thoughtful layouts, consistent components,
            and a smooth path from one screen to the next.
          </p>
          <p>
            My IkDrive project puts that approach into practice: a staff bus reservation app
            built with React Native, Expo, TypeScript, and Supabase. I bring the same
            product-minded care to web projects, using React and Next.js to build responsive,
            accessible experiences.
          </p>
          <a
            href="#projects"
            className="inline-flex items-center rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Explore my work
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-indigo-100 bg-white/80 p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800/80">
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Cross-platform
            </p>
            <h3 className="mt-3 text-xl font-bold text-gray-900 dark:text-white">React Native + Expo</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              Shared foundations for mobile experiences across iOS and Android.
            </p>
          </div>
          <div className="rounded-2xl border border-indigo-100 bg-white/80 p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800/80 sm:translate-y-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              App foundations
            </p>
            <h3 className="mt-3 text-xl font-bold text-gray-900 dark:text-white">TypeScript + Supabase</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              Reliable app code and connected data, put to work in IkDrive.
            </p>
          </div>
          <div className="rounded-2xl border border-indigo-100 bg-white/80 p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800/80 sm:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              How I work
            </p>
            <h3 className="mt-3 text-xl font-bold text-gray-900 dark:text-white">From user flow to finished interface</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              I turn product requirements and designs into maintainable screens, reusable
              components, and straightforward experiences people can navigate with confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
