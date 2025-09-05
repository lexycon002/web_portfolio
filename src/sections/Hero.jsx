import { useTypewriter, Cursor } from "react-simple-typewriter";

function Hero() {
  const [text] = useTypewriter({
    words: [
      "Frontend Developer 💻",
      "React Enthusiast ⚛️",
      "UI/UX Designer 🎨",
      "Problem Solver 🚀",
    ],
    loop: true,
    delaySpeed: 2000,
  });
  return (
         <section
        id="home"
        className="py-24 flex flex-col justify-center items-center text-center space-y-6"
      >
        <h1 className="text-3xl md:text-5xl font-bold">
          Hi,👋 <br /> I’m{" "}
          <span className="text-indigo-500 dark:text-indigo-400">Hammad Awowole</span>
        </h1>

        {/* Typewriter Text */}
        <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-400">
          <span>{text}</span>
          <Cursor cursorStyle="|" />
        </h2>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl">
          I create sleek and modern web experiences with React & TailwindCSS 🚀
        </p>

        <a
          href="#projects"
          className="mt-6 bg-indigo-500 hover:bg-indigo-600 px-6 py-3 
          rounded-full shadow-lg transition text-white"
        >
          View My Work
        </a>
      </section>
  )
}

export default Hero