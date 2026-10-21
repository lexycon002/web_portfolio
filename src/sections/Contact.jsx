const CONTACT_EMAIL = "your@email.com";

function Contact() {
  const prepareEmail = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("user_name");
    const email = formData.get("user_email");
    const message = formData.get("message");
    const subject = `Portfolio message from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="max-w-4xl mx-auto px-6 mb-5">
      <section className="py-8 max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-4xl font-bold">Let’s Connect</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Feel free to reach out for collaborations or just a friendly hello.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Submitting this form opens a draft in your email app. Nothing is sent from this site.
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="inline-block px-6 py-3 rounded-full w-32 bg-indigo-600 font-semibold shadow-lg transition text-white"
        >
          Say Hello
        </a>
      </section>

      <form
        onSubmit={prepareEmail}
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
            className="w-full h-32 p-3 resize-none pt-2 rounded-lg border text-black border-gray-300 dark:border-gray-600"
          />
        </div>
        <div className="input-wrapper">
          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold transition bg-indigo-600 hover:bg-indigo-700"
          >
            Send Message
          </button>
        </div>
      </form>
    </section>
  );
}

export default Contact;
