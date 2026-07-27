import { useState } from "react";
import "./TSCO.css";
import { MdEmail, MdPhone } from "react-icons/md";
import facebookImg from "../assets/Facebook.png";
import linkedinImg from "../assets/images.png";
import instagramImg from "../assets/instagram.png";
import locationImg from "../assets/location.png";

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
      const form = event.target;
      const formData = new FormData(form);

      // POST to FormSubmit AJAX endpoint
      const resp = await fetch('https://formsubmit.co/ajax/neemaisabel@gmail.com', {
        method: 'POST',
        body: formData,
      });

      const data = await resp.json();

      if (!resp.ok) {
        throw new Error(data.message || 'Unable to send message');
      }

      setStatus('Message sent — thank you');
      // popup as requested
      alert('Message sent — thank you');

      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setError(err.message || 'Server error. Please try again later.');
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
          <img src={locationImg} alt="Location" className="contact-icon contact-icon-img" />
          <p><strong>Location:</strong> Opposite Jaramogi Oginga Odinga Teaching and Referral Hospital, Red Cross Compound</p>
        </div>

        <div className="social-links">
          <div className="social-item">
            <a href="https://www.facebook.com/TumainiSickleCellOrganization" target="_blank" rel="noreferrer">
              <img src={facebookImg} alt="Facebook" className="social-icon social-icon-img" />
            </a>
            <p>Tumaini Sickle Cell Organization</p>
          </div>
          <div className="social-item">
            <a href="https://www.linkedin.com/company/tumainisicklecellorganization" target="_blank" rel="noreferrer">
              <img src={linkedinImg} alt="LinkedIn" className="social-icon social-icon-img" />
            </a>
            <p>Tumaini Sickle Cell Organization</p>
          </div>
          <div className="social-item">
            <a href="https://www.instagram.com/tumainisicklecellorganization?igsh=NXEweHZvOXNiY3Jp&utm_source=qr" target="_blank" rel="noreferrer">
              <img src={instagramImg} alt="Instagram" className="social-icon social-icon-img" />
            </a>
            <p>tumainisicklecellorganization</p>
          </div>
        </div>
      </div>

      {/*bottom form*/}
      <form className="contact-form" action="https://formsubmit.co/neemaisabel@gmail.com" method="POST" onSubmit={handleSubmit}>
        <h2>Send us a Message</h2>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>

        {/* disable formsubmit's captcha and set email subject */}
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_subject" value="New contact message from TSCO website" />
        <input type="hidden" name="_template" value="table" />

        <button type="submit" className="primary-btn">Send Message</button>

        {status && <p className="success-message">{status}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>

      </div>

    </section>
  );
}

export default Contact;