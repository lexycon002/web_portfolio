import { motion } from "framer-motion";
import Navbar from "./sections/Navbar";
import ScrollProgress from "./sections/ScrollProgress";
import Background from "./sections/Background";
import Projects from "./sections/Projects";
import About from "./sections/About";
import Hero from "./sections/Hero";
import Contact from "./sections/Contact";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Footer from "./sections/Footer";
import ChatWidget from "./sections/ChatWidget";

const SlideUp = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

function App() {
 // min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-sans transition-colors duration-500

  return (
    <div className="min-h-screen text-gray-900 dark:text-white font-sans transition-colors duration-500">
      {/* Parallax Background */}
      <Background />
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Navbar */}
      <Navbar />
      {/* Hero Section */}
      <Hero />
      {/* About Section */}
      <SlideUp>
        <About />
      </SlideUp>

      {/* Projects Section */}
      <SlideUp>
       <Projects />
      </SlideUp>
      {/* Skills Section */}
      <SlideUp>
       <Skills />
      </SlideUp>
      <SlideUp>
        {/* Experience Section */}
       <Experience />
      </SlideUp>
      {/* Contact Section */}
      <SlideUp>
       <Contact />
      </SlideUp>

      {/* Footer */}
      <SlideUp>
        <Footer />
      </SlideUp>

      {/* Chat Widget */}

      <ChatWidget />
    </div>
  );
}

export default App;