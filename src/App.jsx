import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./sections/Navbar";
import Background from "./sections/Background";
import Projects from "./sections/Projects";
import About from "./sections/About";
import Hero from "./sections/Hero";
import Contact from "./sections/Contact";
import Skills from "./sections/Skills";
import Blog from "./sections/Blog";
import Footer from "./sections/Footer";
import ChatWidget from "./sections/ChatWidget"; 

// Animation Helper
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
  // 1. CRITICAL: Always start with "default" (Normal Profile)
  const [layout, setLayout] = useState("default");

  return (
    <div className="min-h-screen text-gray-900 dark:text-white font-sans transition-colors duration-500 relative">
      <Background />
      <Navbar layout={layout} />

      {/* ==============================================
          LAYOUT LOGIC
          if layout is "default" -> Show NORMAL Profile
          if layout is "frontend" -> Show SWITCHED Profile
      =============================================== */}
      
      {layout === "default" ? (
        // ============================================
        // VIEW 1: NORMAL PORTFOLIO (The Default)
        // ============================================
      <main>
          <section id="home">
            <Hero variant="default" />
          </section>
          <section id="about">
            <SlideUp>
              <About />
            </SlideUp>      
          </section>
          <section id="projects">
            <SlideUp>
              <Projects />
            </SlideUp>
          </section>
          <section id="blog">
            <SlideUp>
              <Blog />
            </SlideUp>
          </section>
          <section id="skills">
            <SlideUp>
              <Skills />
            </SlideUp>
          </section>
          <section id="contact">
            <SlideUp>
              <Contact />
            </SlideUp>
          </section>
    </main>
      ) : (
        // ============================================
        // VIEW 2: SWITCHED PORTFOLIO (Only via Chatbot)
        // ============================================
       // SWITCHED MODE (Matches Navbar: Home, Skills, Blog Contact)
        <main key="frontend-view" className="animate-in fade-in duration-500">
          <section id="home"> <Hero variant="frontend" /> </section>
          {/* Projects section REMOVED here to match Navbar */}
          <section id="skills"> <SlideUp><Skills /></SlideUp> </section>
          <section id="blog"> <SlideUp><Blog /></SlideUp> </section>
          <section id="contact"> <SlideUp><Contact /></SlideUp> </section>
        </main>
      )}

      <SlideUp>
        <Footer />
      </SlideUp>

      {/* CHAT WIDGET: The Only Way to Trigger the Switch */}
      <ChatWidget 
        onAction={(action) => {
          if (action?.type === "LAYOUT_SWITCH") {
            console.log(" SWITCHING PORTFOLIO MODE...");
            setLayout(action.layout); // This changes the state to "frontend"
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }} 
      />
    </div>
  );
}

export default App;