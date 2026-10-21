import { motion as Motion } from "framer-motion";
import Navbar from "./sections/Navbar";
import Background from "./sections/Background";
import Projects from "./sections/Projects";
import About from "./sections/About";
import Hero from "./sections/Hero";
import Contact from "./sections/Contact";
import Skills from "./sections/Skills";
import Blog from "./sections/Blog";
import Footer from "./sections/Footer";

// Animation Helper
const SlideUp = ({ children }) => {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full"
    >
      {children}
    </Motion.div>
  );
};

function App() {
  return (
    <div className="min-h-screen text-gray-900 dark:text-white font-sans transition-colors duration-500 relative">
      <Background />
      <Navbar />

      <main>
        <Hero />
        <section id="about">
          <SlideUp><About /></SlideUp>
        </section>
        <section id="projects">
          <SlideUp><Projects /></SlideUp>
        </section>
        <section id="blog">
          <SlideUp><Blog /></SlideUp>
        </section>
        <section id="skills">
          <SlideUp><Skills /></SlideUp>
        </section>
        <section id="contact">
          <SlideUp><Contact /></SlideUp>
        </section>
      </main>

      <SlideUp>
        <Footer />
      </SlideUp>
    </div>
  );
}

export default App;