import { useEffect, useState } from "react";
import "./TSCO.css";
import { MdEmail, MdPhone } from "react-icons/md";
import { SiTiktok } from "react-icons/si";
import facebookImg from "../assets/Facebook.png";
import linkedinImg from "../assets/images.png";
import instagramImg from "../assets/instagram.png";
import locationImg from "../assets/location.png";
import { getContactContent, fetchContactContent } from "../content/contactContent";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [contactInfo, setContactInfo] = useState(getContactContent());

  useEffect(() => {
    const updateContactInfo = () => {
      fetchContactContent().then(setContactInfo).catch(() => {
        setContactInfo(getContactContent());
      });
    };

    updateContactInfo();
    window.addEventListener("contactContentUpdated", updateContactInfo);
    return () => window.removeEventListener("contactContentUpdated", updateContactInfo);
  }, []);

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
        {contactInfo.image && (
          <div className="contact-image-panel">
            <img src={contactInfo.image} alt="Contact" className="contact-page-image" />
          </div>
        )}

        <h2>{contactInfo.heading}</h2>
        <p>{contactInfo.intro}</p>

        <div className="contact-item">
          <MdEmail className="contact-icon" />
          <p><strong>Email:</strong> {contactInfo.email}</p>
        </div>

        <div className="contact-item">
          <MdPhone className="contact-icon" />
          <p><strong>Phone:</strong> {contactInfo.phone}</p>
        </div>

        <div className="contact-item">
          <img src={locationImg} alt="Location" className="contact-icon contact-icon-img" />
          <p><strong>Location:</strong> {contactInfo.location}</p>
        </div>

        <div className="social-links">
          <div className="social-item">
            <a href={contactInfo.socialLinks.facebook} target="_blank" rel="noreferrer">
              <img src={facebookImg} alt="Facebook" className="social-icon social-icon-img" />
            </a>
            <p>{contactInfo.socialLabels.facebook}</p>
          </div>
          <div className="social-item">
            <a href={contactInfo.socialLinks.linkedin} target="_blank" rel="noreferrer">
              <img src={linkedinImg} alt="LinkedIn" className="social-icon social-icon-img" />
            </a>
            <p>{contactInfo.socialLabels.linkedin}</p>
          </div>
          <div className="social-item">
            <a
              href={contactInfo.socialLinks.instagram}
              target="_blank"
              rel="noreferrer"
              className="social-link-icon popup-social-link"
            >
              <img src={instagramImg} alt="Instagram" className="social-icon social-icon-img" />
            </a>
            <p>{contactInfo.socialLabels.instagram}</p>
          </div>
          <div className="social-item">
            <a
              href={contactInfo.socialLinks.tiktok}
              target="_blank"
              rel="noreferrer"
              className="social-link-icon popup-social-link"
            >
              <SiTiktok className="social-icon" />
            </a>
            <p>{contactInfo.socialLabels.tiktok}</p>
          </div>
          {(contactInfo.additionalLinks || []).map((link, index) => (
            <div key={`${link.label}-${index}`} className="social-item">
              <a href={link.url} target="_blank" rel="noreferrer">
                <span className="social-link-text">{link.label || "Social Link"}</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/*bottom form*/}
      <form className="contact-form" action="https://formsubmit.co/neemaisabel@gmail.com" method="POST" onSubmit={handleSubmit}>
        <h2>{contactInfo.formTitle}</h2>
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