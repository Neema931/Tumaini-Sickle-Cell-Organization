import { useState } from "react";
import "./TSCO.css";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Unable to send message.");
      }

      setStatus(data.message || "Your message was sent successfully.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setError(err.message || "Server error. Please try again later.");
    }
  };

  return (
    <section className="contact">
      <h1 className="contact-title">Contact Us</h1>

      <div className="contact-container">
        
      {/*top info*/}
      <div className="contact-info">
        <h2>Get in Touch</h2>
        <p>Have questions or want to learn more about our organization? Reach out to us!</p>

        <div className="contact-item">
          <MdEmail className="contact-icon" />
          <p><strong>Email:</strong> info@tumainisicklecell.org</p>
        </div>

        <div className="contact-item">
          <MdPhone className="contact-icon" />
          <p><strong>Phone:</strong> +254715873713</p>
        </div>

        <div className="contact-item">
          <MdLocationOn className="contact-icon" />
          <p><strong>Location:</strong> Opposite Jaramogi Oginga Odinga Teachind and Referral Hospital, Red Cross Compound</p>
        </div>

        <div className="social-links">
          <div className="social-item">
            <FaFacebook className="social-icon" />
            <p>Tumaini Sickle Cell Organization</p>
          </div>
          <div className="social-item">
            <FaLinkedin className="social-icon" />
            <p>Tumaini Sickle Cell Organization</p>
          </div>
        </div>
      </div>

      {/*bottom form*/}
      <form className="contact-form" onSubmit={handleSubmit}>
        <h2>Send us a Message</h2>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>

        <button type="submit" className="primary-btn">Send Message</button>

        {status && <p className="success-message">{status}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>

      </div>

    </section>
  );
}

export default Contact;