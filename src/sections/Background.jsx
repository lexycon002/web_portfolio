import React, { useCallback, useMemo } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function Background() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // Detect dark mode from <html class="dark"> (set by Tailwind)
  const isDarkMode = useMemo(
    () => document.documentElement.classList.contains("dark"),
    []
  );

  return (
    <div className="fixed inset-0 -z-10 w-full h-full">
      {/* Light & Dark Background */}
      <div
        className="absolute inset-0 transition-colors duration-700
        bg-gradient-to-b from-gray-100 via-gray-50 to-gray-200
        dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 opacity-95"
      />

      {/* Bubble Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: "transparent" },
          particles: {
            number: { value: 50 },
            shape: { type: "circle" },
            size: { value: 6, random: true },
            color: { value: isDarkMode ? "#a78bfa" : "#3b82f6" }, // 💡 purple in dark, blue in light
            opacity: { value: { min: 0.3, max: 0.7 } },
            move: {
              enable: true,
              direction: "top",
              outModes: { default: "out" },
              speed: 1,
            },
          },
        }}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
