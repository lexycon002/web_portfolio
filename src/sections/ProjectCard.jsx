import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";

function ProjectCard({ title, desc, img, demo, code, stack }) {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      whileHover={{
        scale: 1.03,
        rotateX: 5,
        rotateY: -5,
        boxShadow: "0px 8px 30px rgba(99, 102, 241, 0.4)",
      }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
      className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group"
    >
      {/* Cursor-follow Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(99,102,241,0.35), transparent 60%)`,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ filter: "blur(40px)", opacity: 0 }}
        whileHover={{ opacity: 1, scale: 1.1 }}
      />

      {/* Project Image */}
      {img && (
        <img
          src={img}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
      )}

      {/* Content */}
      <div className="p-6 relative z-10">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mt-2">{desc}</p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-3">
          {stack?.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-600 dark:text-white"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 mt-4">
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <ExternalLink size={18} /> Demo
            </a>
          )}
          {code && (
            <a
              href={code}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:underline"
            >
              <Github size={18} /> Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
