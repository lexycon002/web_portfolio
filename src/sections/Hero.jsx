import { useTypewriter, Cursor } from "react-simple-typewriter";
import myImage from "../assets/myImage03.png";

function Hero({ variant = "default" }) {
  
  // 1. Define the content for each layout mode
  const content = {
    default: {
      words: [
        "Frontend Developer",
        "React Enthusiast ",
        "Next.js Savvy ",
        "UI/UX Designer",
        "AI Enthusiast",
        "Tech Blogger",
        "Open Source Contributor",
        "Fitness Advocate"
      ],
      description: "I create sleek and modern web experiences with React, Nextjs & TailwindCSS that captivate users and drive engagement.",
      buttonText: "View My Work"
    },
    frontend: {
      words: [
        "Frontend Architecture",
        "Performance Optimization",
        "Complex State Management",
        "Pixel-Perfect Engineering",
        "Scalable Component Libraries",
        "API Integration Specialist",
        "Progressive Web Apps",
        "Responsive Design Expert"
      ],
      description: "Specialized in building scalable, high-performance applications for the modern web.",
    }
  };

  // 2. Select the active content based on the prop
  const activeContent = content[variant] || content.default;

  const [text] = useTypewriter({
    words: activeContent.words,
    loop: true,
    delaySpeed: 2000,
    typeSpeed: 70,
    deleteSpeed: 50,
  });

  return (
    <section id="home" className="py-24 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 text-center space-y-6 transition-all duration-500">
      
      {/* TEXT CONTAINER */}
      <div className="flex flex-col justify-center items-center font-podkova md:w-1/2">
          <h1 className="text-center text-3xl md:text-7xl font-bold mb-6 animate-in fade-in slide-in-from-left-8 duration-700">
             Hi I’m{" "} Hammad
             <span className="block text-indigo-500 dark:text-indigo-400">Awowole</span>
          </h1>

          {/* Typewriter Text */}
          <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-400 min-h-[3rem]">
            <span key={variant} className="font-semibold text-gray-800 dark:text-gray-200 font-edu">
              {text}
            </span>
            <Cursor cursorStyle="|" />
          </h2>

          {/* Description */}
          <p className="text-[22px] md:text-xl text-gray-600 dark:text-gray-400 max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-700 mt-4" key={variant + "desc"}>
            {activeContent.description}
          </p>
      </div>

      {/* IMAGE CONTAINER */}
      <div className="w-[300px] md:w-[350px] lg:w-[400px] flex justify-center mx-auto animate-in fade-in slide-in-from-right-8 duration-700">
         <img src={myImage} alt="Hammad Awowole" className="object-contain" />
      </div>
    </section>
  );
}

export default Hero;