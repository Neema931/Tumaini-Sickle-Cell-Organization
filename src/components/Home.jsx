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
import gloryImg from "../assets/glory.png";
import donateImg from "../assets/donate.png";
import noel from "../assets/no.jpeg";
import hardwoodImg from "../assets/Hardwood.jpg";
import hh1 from "../assets/asss.jpg";
import genotypeImg from "../assets/genotype.png";

import { getHomeContent, fetchHomeContent } from "../content/homeContent";

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
    let mounted = true;
    const handleUpdate = async () => {
      try {
        const c = await fetchHomeContent();
        if (mounted) setContent(c);
      } catch (e) {
        // ignore fetch errors
      }
    };

    window.addEventListener("homeContentUpdated", handleUpdate);
    // initial fetch
    handleUpdate();

    return () => {
      mounted = false;
      window.removeEventListener("homeContentUpdated", handleUpdate);
    };
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

      <section className="home-genotype-card">
        <div className="genotype-card-wrapper">
          <img src={genotypeImg} alt="Know your genotype" className="genotype-card-image" />
          <div className="genotype-card-copy">
            <h2>Know Your Genotype. Build a Healthier Future.</h2>
            <p>
              The <strong>Genotype Smart Initiative (GSI)</strong> by Tumaini Sickle Cell Organization empowers young people with knowledge about sickle cell disease, genotype awareness, and informed health choices.
            </p>
            <p>
              We are working to reach <strong>100 schools in Kisumu and surrounding counties within two years</strong>, using School Health Clubs to provide education, reduce stigma, promote voluntary genotype awareness, and encourage healthier communities.
            </p>
            <p>
              <strong>Support the initiative today.</strong> Your donation will help us provide educational materials, train student leaders and teachers, conduct awareness activities, and connect young people to genotype testing and counselling.
            </p>
            <p>
              <strong>Donate. Share. Partner with us. Help us empower a healthier generation.</strong>
            </p>
            <p>
              <strong>Learn today. Lead tomorrow. Leave a legacy of healthy generations.</strong>
            </p>
            <div className="genotype-card-actions">
              <button
                className="primary-button"
                color = "#b71c1c"
                type="button"
                onClick={() => window.location.href = 'https://tinyurl.com/yjy7hhve'}
              >
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="home-donation-promo">
        <div className="home-donation-grid">
          <div className="home-donation-card">
            <img src={noel} alt="Noel" className="home-donation-image" />
            <h2>SPONSOR HEALTH INSURANCE FOR FAMILIES LIVING WITH SICKLE CELL DISEASE</h2>
            <p>Many children and adults living with sickle cell disease are unable to access lifesaving treatment because they cannot afford Social Health Insurance Fund 
              (SHIF) registration and contributions. Your support helps provide Social Health Insurance Fund (SHIF) coverage, improve access to quality healthcare, reduce preventable complications, and give vulnerable families hope for a healthier future.
insure hope save lives
Sponsor Health Insurance For Families
 Living with Sickle Cell Disease
Together we can replace fear with hope and barrires with opportunity</p>
            <div className="home-donation-footer">
              <div
                className="donation-widget-inline"
                data-aidos-widget-type="donation_button"
                data-aidos-campaign="camp_01KYMNZKH73WEJ36Q8X90HQZ0C"
                data-aidos-widget-id="widget_01KYMPGY06B899653A5AQCN9SG"
              />
            </div>
          </div>

          <div className="home-donation-card">
            <img src={h4} alt="Donate" className="home-donation-image" />
            <h2>BLOOD DONATION DRIVE CAMPAIGN</h2>
            <p>Support our Blood Donation Drive Campaign to help fund community blood drives, media awareness campaigns, transportation, and essential logistics that ensure lifesaving blood reaches those who need it most. Your contribution helps build a reliable blood supply for people living with sickle cell disease while creating awareness that inspires more voluntary blood donors.
</p>
            <div className="home-donation-footer">
              <button className="donate-action-button" type="button" onClick={() => window.location.href = 'https://tinyurl.com/yjy7hhve'}>
                Donate Now
              </button>
            </div>
          </div>

          <div className="home-donation-card">
            <img src={hardwoodImg} alt="Hardwood" className="home-donation-image" />
           <h2>BRIQUETTES FOR BETTER LIVING CONDITIONS</h2>
           <p>Support our Briquettes Initiative to provide an affordable, eco-friendly source of clean cooking fuel while creating sustainable livelihoods for vulnerable families affected by sickle cell disease. Your contribution helps fund briquette production, equipment, training, and distribution, empowering communities and improving their quality of life.
</p>
            <div className="home-donation-footer">
              <button className="donate-action-button" type="button" onClick={() => window.location.href = 'https://tinyurl.com/yjy7hhve'}>
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </section>

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
