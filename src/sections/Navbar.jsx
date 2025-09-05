import { Link } from "react-scroll";
import { useTheme } from "./useTheme";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react"; 

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 
      bg-white/70 dark:bg-gray-800/80 backdrop-blur-md px-6 py-3 
      rounded-full shadow-lg flex items-center space-x-6 z-50">
      
      {["home", "about", "projects", "contact"].map((section) => (
        <Link
          key={section}
          to={section}
          smooth={true}
          duration={600}
          offset={-80}
          className="cursor-pointer text-gray-700 dark:text-gray-300 
          hover:text-indigo-500 dark:hover:text-white transition"
          activeClass="text-indigo-500 dark:text-indigo-400 font-semibold"
          spy={true}
        >
          {section.charAt(0).toUpperCase() + section.slice(1)}
        </Link>
      ))}

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="ml-4 w-10 h-10 flex items-center justify-center 
        rounded-full bg-gray-200 dark:bg-gray-700 shadow-md"
      >
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-indigo-600" />
          )}
        </motion.div>
      </button>
    </nav>
  );
}

export default Navbar;