import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Link } from "react-router-dom";

import hero1 from "../assets/h1.jpg";
import hero2 from "../assets/h5.jpg";
import noela from "../assets/t2.jpg";
import h4 from "../assets/h4.jpg";
import hero3 from "../assets/hero3.jpg";


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
            </div>
          </div>
        </section>
      </SwiperSlide>


      </Swiper>
      <HomeAbout />
      <HomePrograms />
      <HomeStatistics />
    </>
  );
}

function HomeAbout() {
    return (
        <section className="home-about">

            {/* CARD 1 */}
            <div className="home-card">
                <div
                  className="card-image"
                  style={{
                    backgroundImage: `url(${noela})`,
                  }}
                ></div>

                <h2>Who we are</h2>
                <p>Tumaini Sickle Cell Organization in an NGO based in western kenya.....</p>
                <Link to="/about" className="card-link">
                Learn More →
                </Link>
              </div>

              {/* CARD 2 */}
              <div className="home-card">
                <div
                  className="card-image"
                  style={{
                    backgroundImage: `url(${hero3})`,
                  }}
                ></div>
                

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
              <li><Link to="/programs">Healthcare Support →</Link></li>
              <li><Link to="/programs">Educational Workshops →</Link></li>
              <li><Link to="/programs">Community Outreach →</Link></li>
              <li><Link to="/programs">Advocacy →</Link></li>
              <li><Link to="/programs">Research Initiatives →</Link></li>
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

export default Home;
