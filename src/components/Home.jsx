import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Link } from "react-router-dom";

import hero1 from "../assets/aaa.jpg";
import hero2 from "../assets/h5.jpg";
import noela from "../assets/t2.jpg";
import h4 from "../assets/h4.jpg";
import hero3 from "../assets/hero3.jpg";
import glory from "../assets/glory.png";

import { getHomeContent } from "../content/homeContent";

import "./TSCO.css";

const imageMap = {
  hero1,
  hero2,
  hero3,
  noela,
};

function Home() {
  const [content, setContent] = useState(getHomeContent());

  useEffect(() => {
    const handleUpdate = () => setContent(getHomeContent());
    window.addEventListener("homeContentUpdated", handleUpdate);
    return () => window.removeEventListener("homeContentUpdated", handleUpdate);
  }, []);

  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://cdn.aseelapp.com/widget-v1.js";
    script1.defer = true;
    script1.setAttribute(
      "data-organization",
      "organization_01KY57KH4GXHV0RA8E0QVW36F5"
    );

    const script2 = document.createElement("script");
    script2.src = "https://cdn.aseelapp.com/elements-v1.js";
    script2.defer = true;
    script2.setAttribute(
      "data-organization",
      "organization_01KY57KH4GXHV0RA8E0QVW36F5"
    );

    document.body.appendChild(script1);
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <>
      <section className="glory-card">
        <img
          src={glory}
          alt="Support Tumaini Sickle Cell Organization"
          className="glory-card__image"
        />

        <div className="glory-card__footer">
          <div
            data-aidos-widget-type="donation_button"
            data-aidos-campaign="camp_01KYMNZKH73WEJ36Q8X90HQZ0C"
            data-aidos-widget-id="widget_01KYMPGY06B899653A5AQCN9SG"
          ></div>
        </div>
      </section>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop={true}
        className="hero-swiper"
      >
        {content.heroSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <section
              className="hero"
              style={{
                backgroundImage: `url(${imageMap[slide.image] || slide.image || hero1})`,
              }}
            >
              <div className="hero-overlay">
                <div className="hero-content">
                  <div className="hero-tag">{slide.tag}</div>
                  <h1>{slide.title}</h1>
                  <p className="hero-subtitle">{slide.subtitle}</p>
                  {slide.buttonText ? (
                    <div className="hero-buttons">
                      <Link to={slide.buttonLink || "/"}>
                        <button className="primary-button">
                          {slide.buttonText}
                        </button>
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>

      <HomeAbout content={content} />
      <HomePrograms content={content} />
      <HomeStatistics content={content} />
    </>
  );
}

function HomeAbout({ content }) {
  return (
    <section className="home-about">
      {content.aboutCards.map((card, index) => (
        <div key={index} className="home-card">
          <div
            className="card-image"
            style={{
              backgroundImage: `url(${imageMap[card.image] || card.image || hero3})`,
            }}
          ></div>

          <h2>{card.title}</h2>
          <p>{card.text}</p>
          <Link to={card.linkUrl} className="card-link">
            {card.linkText}
          </Link>
        </div>
      ))}
    </section>
  );
}

function HomePrograms({ content }) {
  return (
    <section className="home-programs">
      <div className="programs-container">
        <div
          className="programs-image"
          style={{
            backgroundImage: `url(${h4})`,
          }}
        ></div>

        <div className="programs-content">
          <h2>{content.programs.title}</h2>
          <p>{content.programs.description}</p>
          <p>We offer:</p>
          <ul>
            {content.programs.items.map((item, index) => (
              <li key={index}>
                <Link to={content.programs.linkUrl}>{item}</Link>
              </li>
            ))}
          </ul>

          <Link to={content.programs.linkUrl} className="card-link">
            {content.programs.linkText}
          </Link>
        </div>
      </div>
    </section>
  );
}

function HomeStatistics({ content }) {
  return (
    <section className="home-stats">
      <h2>Our Impact</h2>
      <div className="stats-container">
        {content.stats.map((stat, index) => (
          <div key={index} className="stat-item">
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Home;
