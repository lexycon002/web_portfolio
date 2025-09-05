import React from 'react'
  import { FaGithub, FaLinkedin, FaTwitter, FaArrowUp } from "react-icons/fa";

function Footer() {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer className="py-10 text-center border-t border-gray-200 dark:border-gray-700">
      <div className="flex flex-col items-center space-y-6">
        {/* Social Links */}
        <div className="flex space-x-6">
          <a
            href="https://github.com/lexycon002"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/awowole-hammad-olamilekan/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://x.com/_Lekshigh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:text-gray-400 hover:text-blue-400 transition-colors"
          >
            <FaTwitter size={24} />
          </a>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-medium shadow-md hover:bg-blue-600 transition-colors"
        >
          <FaArrowUp />
          {/* <span>Back to Top</span> */}
        </button>

        {/* Footer Text */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Hammad Awowole. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer