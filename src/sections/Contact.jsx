import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X  } from 'lucide-react';

import "./contact.css"; 

// --- API URL Configuration ---
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Contact() {
  const form = useRef();
  const [status, setStatus] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isSending, setIsSending] = useState(false); // Fixed: consistent casing

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_name: form.current.user_name.value,
          user_email: form.current.user_email.value,
          message: form.current.message.value,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("Message sent successfully!");
        setShowPopup(true);
        form.current.reset();
        // Auto-close popup after 3s
        setTimeout(() => setShowPopup(false), 3000);
      } else {
        setStatus(data.error || "Failed to send.");
        setShowPopup(true); // Show error in the popup too
        setTimeout(() => setShowPopup(false), 3000);
      }
    } catch (err) {
      setStatus("Server is offline. Try again later.");
      setShowPopup(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="max-w-4xl mx-auto px-6 mb-5">
      <section className="py-8 max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-4xl font-bold">Let’s Connect</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Feel free to reach out for collaborations or just a friendly hello
        </p>
        <a
          href="mailto:your@email.com"
          className="inline-block px-6 py-3 rounded-full w-32 bg-indigo-600 font-semibold shadow-lg transition text-white"
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
            className="w-full p-3 text-black rounded-lg border border-gray-300 dark:border-gray-600"
          />
        </div>
        <div className="input-wrapper">
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
            className="w-full p-3 rounded-lg text-black border border-gray-300 dark:border-gray-600"
          />
        </div>
        <div className="input-wrapper">
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            required
            className="w-full h-32 p-3 resize-none pt-2 rounded-lg border border-gray-300 dark:border-gray-600"
          ></textarea>
        </div>
        <div className="input-wrapper">
          <button
            type="submit"
            disabled={isSending} // Disable while sending
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              isSending ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isSending ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>

      {/* Animated Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`fixed bottom-8 right-8 text-white px-6 py-3 rounded-xl shadow-lg flex items-center space-x-2 ${
                status.includes("successfully") ? "bg-green-600" : "bg-red-600"
            }`}
          >
            <span className="text-lg">{status.includes("successfully") ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}</span>
            <p className="font-medium">{status}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Contact;