function About() {
  return (
    <>
      <h2 className="text-4xl font-bold text-center mb-10">About Me</h2>
      <section id="about" className="max-w-5xl mx-auto px-6 lg:flex items-center gap-12">
        <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p className="">
            Hi I’m <span className="font-podkova text-indigo-600">Awowole Hammad Olamilekan</span>.
            I am a Frontend Engineer dedicated to crafting digital experiences that are as
            performant as they are visually striking. 
          </p>

          <p>
            My approach to development sits at the intersection of design and engineering. 
            I don’t just translate mockups into code; I architect scalable systems using 
            React, Next.js,JavaScript, TypeScript and Tailwind CSS that prioritize user experience and 
            business growth. I believe a website should be more than a digital business card, it 
            should be a fast, accessible, and intuitive tool that solves real-world problems.
          </p>

          <p>
            With a deep focus on the modern web ecosystem, I handle the entire lifecycle of a 
            frontend project. From transforming complex Figma wireframes into interactive 
            prototypes to managing seamless API integrations and deploying optimized builds 
            on Vercel, I ensure every milestone is met with precision. I thrive in 
            collaborative environments, leveraging Git for version control and maintaining 
            clean, documented code that teams love to work with.
          </p>

          <p>
            Currently, I’m focused on building production-ready MVPs and helping brands 
            establish a dominant online presence. Whether it’s optimizing a landing page for 
            maximum conversion or engineering a complex web application from scratch, I bring 
            a commitment to quality, accessibility, and high-speed performance to every 
            line of code I write.
          </p>

          <div className="pt-4">
             <p className="font-semibold text-indigo-500">
               Let’s transform your vision into a high-performance reality.
             </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;