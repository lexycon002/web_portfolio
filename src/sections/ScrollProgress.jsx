import { motion, useScroll } from "framer-motion";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 h-1 bg-indigo-500 z-50"
      style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
    />
  );
}

export default ScrollProgress;
