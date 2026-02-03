import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import MealImg from "../assets/meal-app.png";
import FlowvaHubImg from "../assets/flowvahub.png";
import SchoolImg from "../assets/school-management.png";
import ElectroImg from "../assets/electronic-store.png";
import LendSqrImg from "../assets/lend-sqr.png";
import flowdashImg from "../assets/flowdash.png";


const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function Projects() {
  const projects = [
    {
      title: "Lendsqr Frontend Test",
      desc: "A user-friendly dashboard for managing financial data.",
      img: LendSqrImg,
      code: "https://github.com/lexycon002/lendsqr-fe-test",
      stack: ["React", "CSS", "JavaScript","Git","axios"],
    },
    {
      title: "Meal App LunchPad",
      desc: "A meal recipe app offering diverse recipes.",
      img: MealImg,
      code: "https://github.com/lexycon002/meal-app",
      // demo:"https://meal-app-h17w.vercel.app/",
      stack: ["React","CSS","JavaScript","Git","axios"],
    },
    {
      title: "Flowdash",
      desc: "A dashboard for managing and visualizing data.",
      img: flowdashImg,
      code: "https://github.com/lexycon002/flowdash",
      // demo:"https://flowdash-coral.vercel.app/",
      stack: ["React","CSS","JavaScript","Git"],
    },
    {
      title: "Electronic Store",
      desc: "An e-commerce platform for electronic products.",
      img: ElectroImg,
      code: "https://github.com/lexycon002/electronic-store",
      stack: ["Next.js", "Tailwind CSS","TypeScript","Git"],
    },
    {
      title: "School Management System",
      desc: "A school management system for efficient administration.",
      img: SchoolImg,
      code: "https://github.com/lexycon002/school-management",
      stack: ["Next.js", "Tailwind CSS", "TypeScript" ,"Git"],
    },
    {
      title: "FlowvaHub",
      desc: "A platform for sharing and discovering Work Tools",
      img: FlowvaHubImg,
      code: "https://github.com/lexycon002/flowvahub-assessment",
      stack: ["React", "Tailwind CSS", "JavaScript","Git"],
    },
  ];

  return (
    <section id="projects" className="py-32 max-w-6xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-12">Projects</h2>

      <motion.div
        className="grid md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {projects.map((p, i) => (
          <motion.div key={i} variants={cardVariants}>
            <ProjectCard {...p} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Projects;
