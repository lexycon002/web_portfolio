import myImage from "../assets/myImage03.png";
function About() {
  return (
    <>
      <h2 className="text-4xl font-bold text-center mb-10">About Me</h2>
    <section id="about" className=" max-w-5xl mx-auto px-6 lg:flex items-center gap-12">
       <div className="flex items-center justify-center mb-6 lg:mb-0">
        <img src={myImage} alt="" />
      </div> 
      <div className="">
      <p className="text-sm  max-w-3xl mx-auto leading-relaxed">
      👋 Hi, I’m Awowole Hammad Olamilekan, a passionate frontend web developer who loves building immersive and user-friendly online experiences.

      I bring ideas to life with HTML, CSS/SCSS, and JavaScript, and I often use React to create dynamic, responsive, and engaging interfaces. 
      I also enjoy working with APIs to add powerful features and improve user interactions.
      <br />
      For collaboration and code management, I rely on Git & GitHub, while deployment platforms like GitHub Pages, Netlify, and Vercel help me share my projects with the world.
      <br />
      🚀 My goal is simple: to craft websites that are not only functional but also visually appealing and seamless to use.
    </p>
      </div>
     
    </section>
    </>
  );
}

export default About;
