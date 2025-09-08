// sections/Experience.js
import { useInView } from "react-intersection-observer";

const experiences = [
  {
    date: "June 2025 - Till Date",
    role: "Frontend Developer Intern",
    company: "CodeAlpha",
    details: [
      "Developed a fully functional To-Do List app using React.js: users can enter their name,upload a profile image, and manage tasks",
      "Implemented state management via React Hooks and data persistence with localStorage.",
      "Implemented an advanced interactive dashboard with custom data visualization components.",
    ],
  },
  {
    date: "June 2025 - August 2025",
    role: "Frontend Developer Intern",
    company: "StaxTech",
    details: [
      "Built a Weather App that fetches live data for Nigerian states from a public API, displaying current conditions beautifully.",
      "Created a Currency Converter using real-time exchange rates and intuitive UI/UX for easy conversions.",
      "Collaborated with the team using GitHub and followed Agile processes."
    ],
  },
];

function Experience() {
  return (
    <section id="experience" className="py-20 max-w-4xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-10">Experience</h2>
      <div className="space-y-8">
        {experiences.map((exp, i) => (
          <ExperienceCard key={i} exp={exp} index={i} />
        ))}
      </div>
    </section>
  );
}

function ExperienceCard({ exp, index }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className={`p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800 transition-all duration-1000 ease-out transform
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <h3 className="flex items-center text-lg font-semibold mb-2">
        <span className="text-indigo-500 mr-2">📅</span>
        {exp.date}
      </h3>
      <h4 className="font-bold">
        {exp.company} <span className="text-indigo-500">({exp.role})</span>
      </h4>
      <ul className="mt-3 list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
        {exp.details.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Experience;