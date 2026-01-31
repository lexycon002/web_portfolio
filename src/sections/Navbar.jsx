import { Link } from "react-scroll";
import { useTheme } from "./useTheme";
import { Moon, Sun } from "lucide-react"; 
import { motion } from "framer-motion";

function Navbar({ layout }) {
  const { theme, toggleTheme } = useTheme();

  // 1. DEFAULT PORTFOLIO MENUS (The initial 5)
  const defaultLinks = ["home", "about", "projects", "skills", "blog", "contact"];
  
  // 2. SWITCHED PORTFOLIO MENUS (Updated to match Chatbot exactly)
  const switchedLinks = ["home", "skills", "blog", "contact"];

  // 3. LOGIC: If layout is 'default', show 5. If 'frontend', show 3.
  const navLinks = layout === "default" ? defaultLinks : switchedLinks;

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 
      bg-white/70 dark:bg-gray-800/80 backdrop-blur-md px-6 py-3 
      rounded-full shadow-lg flex items-center space-x-3 z-50 transition-all duration-500">
      
      {navLinks.map((section) => (
        <Link
          key={section}
          to={section}
          smooth={true}
          duration={600}
          offset={-80}
          className="cursor-pointer text-gray-700 dark:text-gray-300 
          hover:text-indigo-500 dark:hover:text-white transition uppercase text-[10px] font-bold tracking-wider"
          activeClass="text-indigo-500 dark:text-indigo-400"
          spy={true}
        >
          {section}
        </Link>
      ))}

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="ml-4 w-8 h-8 flex items-center justify-center 
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