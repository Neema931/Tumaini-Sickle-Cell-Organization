import "./TSCO.css";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

function Contact() {
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
      <form className="contact-form">
        <h2>Send us a Message</h2>
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" required></textarea>

        <button type="submit" className="primary-btn">Send Message</button>

      </form>

      </div>

    </section>
  );
}

export default Contact;