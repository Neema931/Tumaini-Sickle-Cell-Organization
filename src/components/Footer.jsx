import { Link } from "react-router-dom";
import "./TSCO.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-brand">
          <h3>Tumaini Sickle Cell Organization</h3>
          <p>
            Bringing hope and support to individuals affected by sickle cell disease.
          </p>
        </div>

        {/* LINKS */}
        <div className="footer-links">

          <h4>Quick Links</h4>

          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/programs">Programs</Link>
          <Link to="/contact">Contact</Link>
          <Link to ="/Blogs">Blogs</Link>
          <Link to="/Gallery">Gallery</Link>
          <Link to ="/Events">Events</Link>

        </div>

        {/* CONTACT */}
        <div className="footer-contact">

          <h4>Contact</h4>

          <p>Email: info@tumainisicklecell.org</p>
          <p>Phone: +254 715873713</p>

        </div>

      </div>

      <div className="footer-bottom">
        <p> {new Date().getFullYear()} Copyright © 2026 ·NGO· All rights reserved</p>
      </div>

    </footer>
  );
}

export default Footer;
