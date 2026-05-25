import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Link } from "react-router-dom";

import hero1 from "../assets/h1.jpg";
import hero2 from "../assets/h5.jpg";

import h4 from "../assets/h4.jpg";


import "./TSCO.css";

function Home() {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop={true}
        className="hero-swiper"
      >

      {/* SLIDE 1 */}
      <SwiperSlide>
        <section
          className="hero"
          style={{
            backgroundImage: `url(${hero1})`,
          }}
        >
          <div className="hero-overlay">
            <div className="hero-content">
              <div className="hero-tag">Community Health & Support</div>
              <h1>
                Bringing Hope to Sickle Cell Warriors
              </h1>
              <p className="hero-subtitle">
                Comprehensive care, advocacy, and life-changing support for families living with sickle cell disease.
              </p>
              <div className="hero-buttons">
                <Link to="/donate">
                  <button className="primary-button">
                    Donate Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </SwiperSlide>

      {/* SLIDE 2 */}
      <SwiperSlide>
        <section
          className="hero"
          style={{
            backgroundImage: `url(${hero2})`,
          }}
        >
          <div className="hero-overlay">
            <div className="hero-content">
              <div className="hero-tag">Care, Awareness, Action</div>
              <h1>
                Together We Can Save Lives
              </h1>
              <p className="hero-subtitle">
                Join our mission to improve health outcomes, educate communities, and support every patient.
              </p>
              <div className="hero-buttons">
                <Link to="/learnMore">
                  <button className="primary-button">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </SwiperSlide>


      </Swiper>
      <HomeAbout />
      <HomePrograms />
      <HomeStatistics />
      <CTA />
      <Footer />
    </>
  );
}

function HomeAbout() {
    return (
        <section className="home-about">

            {/* CARD 1 */}
            <div className="home-card">
                <p className="card-tag">About us</p>

                <h2>Who we are</h2>
                <p>Tumaini Sickle Cell Organization in an NGO based in western kenya.....</p>
                <Link to="/about" className="card-link">
                Learn More →
                </Link>
              </div>

              {/* CARD 2 */}
              <div className="home-card">
                <p className="card-tag">About</p>

                <h2>What We Do</h2>
                <p>We are a dedicated initiative that aims to make significant in the lives of individuals affected by sickle cell disease.</p>
                <Link to="/about" className="card-link">
                  Learn More →
                </Link>

                </div>
                </section>
              
    );

}


function HomePrograms() {
  return (
    <section className="home-programs">

      <div className="programs-container">

        {/* BACKGROUND IMAGE BOX */}
        <div
          className="programs-image"
          style={{
            backgroundImage: `url(${h4})`,
          }}
        ></div>

        {/* TEXT CONTENT */}
        <div className="programs-content">

          <h2>Our Programs</h2>

          <p>
            Discover our impactful programs designed to support those affected
            by sickle cell disease.
          </p>

          <p>
            We offer:
          </p>
            <ul>
              <li>Healthcare Support →</li>
              <li>Educational Workshops → </li>
              <li>Community Outreach →</li>
                <li>Advocacy →</li>
                <li>Research Initiatives →</li>
            </ul>

          <Link to="/programs" className="card-link">
            Programs →
          </Link>

        </div>

      </div>

    </section>
  );
}

function HomeStatistics() {
    return (
        <section className="home-stats">
            <h2>Our Impact</h2>
            <div className="stats-container">
                <div className="stat-item">
                    <h3>500+</h3>
                    <p>Individuals Supported</p>
                </div>
                <div className="stat-item"> 
                    <h3>20+</h3>
                    <p>Community Events</p>
                </div>
                <div className="stat-item">
                    <h3>10+</h3>
                    <p>Educational Workshops</p>
                </div>
            </div>
        </section>
    );
}

function CTA() {
  return (
    <section className="cta-section">

      <div className="cta-content">

        <h2>Make a Difference Today</h2>

        <p>
          Your support helps us provide care, awareness, and hope
          to individuals living with sickle cell disease.
        </p>


        <div className="cta-buttons">

          <Link to="/donate">
            <button className="cta-primary">
              Donate Now
            </button>
          </Link>

          <Link to="/contact">
            <button className="cta-secondary">
              Contact Us
            </button>
          </Link>

        </div>

      </div>

    </section>
  );
}
 
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

export default Home;