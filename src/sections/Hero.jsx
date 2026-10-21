import { ArrowUpRight, BriefcaseBusiness, Globe2, Smartphone } from "lucide-react";
import myImage from "../assets/myImage03.png";
import ikDriveImage from "../assets/ikdrive.png";

function Hero() {
  return (
    <section
      id="home"
      className="mx-auto grid min-h-[90vh] max-w-7xl items-center gap-12 px-6 pb-20 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
    >
      <div className="max-w-2xl text-center lg:text-left">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm dark:border-emerald-400/30 dark:bg-gray-800/70 dark:text-emerald-300">
          <BriefcaseBusiness size={16} aria-hidden="true" />
          Available for freelance and project work
        </p>

        <h1 className="font-podkova text-5xl font-bold leading-[1.08] tracking-tight text-gray-950 dark:text-white sm:text-6xl lg:text-7xl">
          I build mobile &amp; web apps
          <span className="mt-2 block text-indigo-600 dark:text-indigo-400">
            made for real life.
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-300 lg:mx-0 lg:text-xl">
          I’m Hammad, a developer creating useful cross-platform mobile apps and
          responsive web applications. I work with React Native, Expo, React,
          and Next.js to turn ideas into polished products.
        </p>

        <div className="mx-auto mt-7 grid max-w-xl grid-cols-2 gap-3 text-left lg:mx-0">
          <div className="rounded-2xl border border-indigo-100 bg-white/70 p-4 dark:border-gray-700 dark:bg-gray-800/70">
            <Smartphone className="mb-3 text-indigo-600 dark:text-indigo-400" size={22} aria-hidden="true" />
            <h2 className="font-bold text-gray-900 dark:text-white">Mobile apps</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">React Native · Expo</p>
          </div>
          <div className="rounded-2xl border border-indigo-100 bg-white/70 p-4 dark:border-gray-700 dark:bg-gray-800/70">
            <Globe2 className="mb-3 text-indigo-600 dark:text-indigo-400" size={22} aria-hidden="true" />
            <h2 className="font-bold text-gray-900 dark:text-white">Web apps</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">React · Next.js</p>
          </div>
        </div>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700"
          >
            Hire me for a project
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white/70 px-7 py-3.5 font-semibold text-gray-800 transition hover:border-indigo-400 hover:text-indigo-700 dark:border-gray-600 dark:bg-gray-800/70 dark:text-gray-100 dark:hover:text-indigo-300"
          >
            View my work
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 lg:justify-start">
          {["React Native", "Expo", "React", "Next.js"].map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-indigo-50 px-3.5 py-1.5 dark:bg-indigo-400/10"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-lg">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[82%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-300/40 blur-3xl dark:bg-indigo-700/30"
        />
        <div className="relative mx-auto flex aspect-square max-w-[26rem] items-end justify-center overflow-hidden rounded-[2.5rem] border border-white/70 bg-gradient-to-br from-indigo-100 via-white to-violet-200 shadow-2xl shadow-indigo-900/10 dark:border-gray-700 dark:from-indigo-950 dark:via-gray-800 dark:to-violet-950">
          <div className="absolute left-7 top-7 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-indigo-700 backdrop-blur dark:border-gray-600 dark:bg-gray-900/60 dark:text-indigo-300">
            Design. Build. Refine.
          </div>
          <img
            src={myImage}
            alt="Portrait of Hammad Awowole"
            className="relative z-10 max-h-[94%] w-[82%] object-contain object-bottom"
          />
        </div>

        <a
          href="#projects"
          className="relative mx-auto mt-5 flex max-w-md items-center gap-4 rounded-2xl border border-white/80 bg-white/90 p-3 shadow-xl shadow-gray-900/10 transition hover:-translate-y-1 dark:border-gray-700 dark:bg-gray-800/95 sm:absolute sm:-bottom-6 sm:-left-8 sm:mt-0 sm:mx-0"
          aria-label="Explore the IkDrive project"
        >
          <img
            src={ikDriveImage}
            alt=""
            className="h-16 w-24 shrink-0 rounded-xl object-cover object-center"
          />
          <span className="min-w-0">
            <span className="block text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Featured mobile project
            </span>
            <span className="mt-1 block text-lg font-bold text-gray-900 dark:text-white">
              IkDrive
            </span>
          </span>
          <ArrowUpRight className="ml-auto shrink-0 text-gray-500 dark:text-gray-300" size={20} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

export default Hero;
