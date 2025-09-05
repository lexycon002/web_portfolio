import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import MymusicImg from "../assets/music-app.png";
import MealImg from "../assets/meal-app.png";
import weatherImg from "../assets/weather-app.png";
import TodolistImg from "../assets/todo-list.png";
import CurrencyImg from "../assets/currency-converter.png";
import Web4smeImg from "../assets/web4sme-app.png";
import { a } from "framer-motion/client";


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
      title: "Music App",
      desc: "A music streaming app using Deezer API.",
      img: MymusicImg,
      demo: "https://code-alpha-music-playlist.vercel.app/",
      code: "https://github.com/lexycon002/code_alpha_music_playlist",
      stack: ["React", "CSS", "Deezer API"],
    },
    {
      title: "Meal App LunchPad",
      desc: "A meal recipe app offering diverse recipes.",
      img: MealImg,
      demo: "https://meal-app-h17w.vercel.app/",
      code: "https://github.com/lexycon002/meal-app",
      stack: ["React","CSS","JavaScript","Git","axios"],
    },
    {
      title: "Weather App",
      desc: "A sleek weather app using OpenWeatherMap API.",
      img: weatherImg,
      demo: "https://staxtech-project-weather-app.vercel.app/",
      code: "https://github.com/lexycon002/staxtech-project-weather-app",
      stack: ["React", "CSS","JavaScipt","OpenWeatherMap API","Git"],
    },
    {
      title: "To-Do List App",
      desc: "A simple and intuitive to-do list app.",
      img: TodolistImg,
      demo: "https://todo-list-app-one-kappa.vercel.app/",
      code: "https://github.com/lexycon002/code_alpha_todo-list",
      stack: ["React", "CSS", "JavaScript" ,"Git"],
    },
    {
      title: "Currency Converter App",
      desc: "A real-time currency converter using ExchangeRate-API.",
      img: CurrencyImg,
      demo: "https://staxtech-project-currency-converter.vercel.app/",
      code: "https://github.com/lexycon002/staxtech_project_currency_converter",
      stack: ["React", "CSS", "ExchangeRate-API"],
    },
    {
      title: "Web for SME",
      desc: "A Small and Medium Enterprise website.",
      img: Web4smeImg,
      demo: "https://web4sme.vercel.app/",
      code: "https://github.com/lexycon002/web4sme",
      stack: ["React", "CSS", "JavaScript","Git"],
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
