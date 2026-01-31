import React from "react";
import authorImg from "../assets/myImage03.jpg";
import postImg1 from "../assets/post1.png";
import postImg2 from "../assets/post2.png";
import postImg3 from "../assets/post3.jpg";
import postImg4 from "../assets/meal-app.png";

const posts = [
    {
      id: 1,
      title: "How Nextjs is changing the game for web development",
      excerpt:
        "I finally understand why developers call Next.js a game changer.",
      image: postImg2,
      url: "https://www.linkedin.com/posts/awowole-hammad-olamilekan_nextjs-react-webdevelopment-activity-7387011010663985152-F2yq?",
      platform: "LinkedIn",
    },
  {
    id: 2,
    title: "Buildiing an electronic store with Next.js & TailwindCSS",
    excerpt:
      "“It’s starting to feel real now, my Next.js project is finally coming to life!”",
    image: postImg1,
    url: "https://www.linkedin.com/posts/awowole-hammad-olamilekan_nextjs-reactjs-frontenddevelopment-activity-7390764343644164097-dcjY",
    platform: "LinkedIn",
  },
  {
    id: 3,
    title: "Fitness a form of exercise; an important aspect of life",
    excerpt:
      "“Is Gyming Really Worth the Hype?”",
    image: postImg3,
    url: "https://www.linkedin.com/posts/awowole-hammad-olamilekan_fitnesslifestyle-worklifebalance-sterlingbank-activity-7333415315835355138-xoDQ",
    platform: "LinkedIn",
  },
  {
    id: 4,
    title: "Buildiing a meal app with Reactjs & CSS",
    excerpt:
      "“Hello LinkedIn Community, I'm excited to share my latest project built with React and CSS!”",
    image: postImg4,
    url: "https://www.linkedin.com/posts/awowole-hammad-olamilekan_reactjs-webdevelopment-100daysofcode-activity-7182455909678211072-eLMT",
    platform: "LinkedIn",
  },
];

function Blog() {
  return (
    <section id="blog" className="py-20 max-w-5xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-10">Latest Posts</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {posts.map((post) => (
          <article key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={authorImg} alt="author" className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <div className="text-sm font-medium">Awowole Hammad</div>
                    <div className="text-xs text-gray-500">Frontend Developer</div>
                  </div>
                </div>

                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium px-2 py-2 rounded"
                >
                  View on {post.platform}
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Blog;
