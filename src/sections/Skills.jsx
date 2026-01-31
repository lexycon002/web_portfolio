
import { useInView } from "react-intersection-observer";
import ReactImg from "../assets/reactImg.png"
import NextImg from "../assets/nextjsImg.png"
import TailwindImg from "../assets/tailwindcssImg.png"
import JsImg from "../assets/javaScriptImg.png"
import GitImg from "../assets/gitImg.png"
import Html5Img from "../assets/html5.png"
import FigmaImg from "../assets/figmaImg.png"
import CssImg from "../assets/cssImg.png"
import TsImg from "../assets/TypeScript.png"

const skills = [
  { name: "Nextjs", icon: NextImg },
  { name: "Reactjs", icon: ReactImg },
  { name: "JavaScript", icon: JsImg },
  { name: "TypeScript", icon: TsImg },
  { name: "TailwindCSS", icon: TailwindImg },
  { name: "Git & GitHub", icon: GitImg },
  { name: "HTML", icon: Html5Img },
  { name: "CSS", icon: CssImg },
  { name: "Figma", icon: FigmaImg },
];

function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section ref={ref} id="skills" className="py-20 max-w-4xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-10">Skills</h2>

      <div
        className={`grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center justify-items-center transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {skills.map((skill, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-20 h-20 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-3">
              <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
            </div>
            <span className="mt-3 text-sm font-medium text-center">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Skills;