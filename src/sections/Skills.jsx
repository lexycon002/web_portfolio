
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const skills = [
  { name: "Nextjs", level: 80 },
  { name: "Reactjs", level: 90 },
  { name: "JavaScript", level: 90 },
  { name: "TailwindCSS", level: 85 },
  { name: "Git & GitHub", level: 80 },
  { name: "HTML & CSS", level: 95 },
  { name: "Adobe Illustrator", level: 80 },
  { name: "Figma", level: 80 },
];

function Skills() {
  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.2, 
  });

  const [progress, setProgress] = useState(skills.map(() => 0));

  useEffect(() => {
    if (inView) {
      setProgress(skills.map((s) => s.level));
    }
  }, [inView]);

  return (
    <section ref={ref} id="skills" className="py-20 max-w-4xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-10">Skills</h2>
      <div className="space-y-6">
        {skills.map((skill, i) => (
          <div key={i}>
            <div className="flex justify-between mb-1">
              <span className="font-medium">{skill.name}</span>
              <span className="text-sm text-gray-500">{progress[i]}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
              <div
                className="bg-indigo-500 h-4 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progress[i]}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Skills;