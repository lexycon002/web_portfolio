import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "emailjs-com";
import "./contact.css"; // Import custom CSS for additional styling

function Contact() {
  const form = useRef();
  const [status, setStatus] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ldgfzyk",   // service ID
        "template_bxlnv7o",  // template ID
        form.current,
        "3PX2KpDEDu4wC77oG"   // user ID
      )
      .then(
        () => {
          setStatus("✅ Message sent successfully!");
          setShowPopup(true);
          form.current.reset();

          // Auto-close popup after 3s
          setTimeout(() => setShowPopup(false), 3000);
        },
        (error) => {
          setStatus("❌ Failed to send message. Try again.");
          console.error(error.text);
        }
      );
  };

  return (
    <section id="contact" className=" max-w-4xl mx-auto px-6 mb-5">
       <section
          id="contact"
          className="py-8 max-w-3xl mx-auto text-center space-y-6"
        >
          <h2 className="text-4xl font-bold">Let’s Connect</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Feel free to reach out for collaborations or just a friendly hello 👋
          </p>
          <a
            href="mailto:your@email.com"
            className="inline-block bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-full shadow-lg transition text-white"
          >
            Say Hello
          </a>
        </section>
      <form
        ref={form}
        onSubmit={sendEmail}
        className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
      >
         <div className="input-wrapper">
        <input
          type="text"
          name="user_name"
          placeholder="Your Name"
          required
          className="input-glow w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600"
        />
        </div>
         <div className="input-wrapper">
        <input
          type="email"
          name="user_email"
          placeholder="Your Email"
          required
          className="input-glow w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600"
        />
        </div>
         <div className="input-wrapper">
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          required
          className="input-glow w-full h-32 p-3 resize-none  pt-2 rounded-lg border border-gray-300 dark:border-gray-600"
        ></textarea>
        </div>
        <div className="input-wrapper">
        <button
          type="submit"
          className="input-glow w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
        >
          Send Message
        </button>
        </div>
      </form>

      {/* ✅ Animated Success Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center space-x-2"
          >
            <span className="text-lg">✅</span>
            <p className="font-medium">{status}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Contact;
