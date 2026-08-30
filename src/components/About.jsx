import { useEffect, useState } from "react";
import bloodImg from "../assets/t1.jpg";
import loveImg from "../assets/t3.jpg";
import directorImg from "../assets/director.jpg";
import val from "../assets/val.jpeg";
import george from "../assets/george.jpg";
import emma from "../assets/emma.jpg";
import brenda from "../assets/brenda.jpg";
import ayugu from "../assets/ayugu.jpg";
import alex from "../assets/alex.jpg";
import amref from "../assets/amref.png";
import cdc from "../assets/cdc.png";
import globalImg from "../assets/global.png";
import unicef from "../assets/Unicef.png";
import kemri from "../assets/Kemri.png";

import "./TSCO.css";
import BoardMembers from "./BoardMembers";
import { getAboutContent, fetchAboutContent } from "../content/aboutContent";

const imageMap = {
  bloodImg,
  loveImg,
  directorImg,
  val,
  george,
  emma,
  brenda,
  ayugu,
  alex,
};

function About() {
  const [content, setContent] = useState(getAboutContent());

  useEffect(() => {
    let mounted = true;
    const handleUpdate = async () => {
      try {
        const c = await fetchAboutContent();
        if (mounted) setContent(c);
      } catch (e) {
        // ignore
      }
    };

    window.addEventListener("aboutContentUpdated", handleUpdate);
    handleUpdate();
    return () => {
      mounted = false;
      window.removeEventListener("aboutContentUpdated", handleUpdate);
    };
  }, []);

  return (
    <main className="about-page">
      <section className="director-section">
        <article className="director-card">
          <div className="director-image">
            <img
              src={imageMap[content.director.image] || directorImg}
              alt="Director of Tumaini Sickle Cell Organization"
            />
          </div>

          <div className="director-content">
            <span className="director-role">{content.director.role}</span>
            <h2>{content.director.heading}</h2>
            <p>{content.director.message}</p>
            <blockquote>{content.director.quote}</blockquote>
          </div>
        </article>
      </section>

      <section className="about-content about-us-section">
        <div className="about-us-container">
          <div className="about-us-text">
            <h2>{content.aboutSection.heading}</h2>
            {content.aboutSection.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="about-gallery">
            {content.aboutSection.galleryImages.map((imageKey, index) => (
              <div key={index} className="gallery-card">
                <img
                  src={imageMap[imageKey] || bloodImg}
                  alt={`About gallery ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="about-content about-two-column">
        <div className="about-card about-split-card about-split-blue">
          <div className="about-text">
            <h2>{content.visionMission.visionHeading}</h2>
            <p>{content.visionMission.visionText}</p>
            <h2>{content.visionMission.missionHeading}</h2>
            <p>{content.visionMission.missionText}</p>
          </div>
        </div>

        <div className="about-card about-split-card">
          <div className="about-text">
            <h2>Our Core Values</h2>
            <ul>
              {content.coreValues.map((value, index) => (
                <li key={index}>
                  <strong>{value.label}:</strong> {value.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="about-content about-two-column">
        <div className="about-card about-split-card about-split-blue">
          <div className="about-text">
            <h2>Strategic Pillars</h2>
            <ol className="single-column">
              {content.strategicPillars.map((pillar, index) => (
                <li key={index}>{pillar}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className="about-card about-split-card">
          <div className="about-text">
            <h2>Contribution to SDGs</h2>
            <ul>
              {content.sdgs.map((sdg, index) => (
                <li key={index}>
                  <strong>{sdg.goal}:</strong> {sdg.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="about-content">
        <div className="about-card">
          <div className="about-text">
            <h2>{content.partnerships.heading}</h2>
            <p>{content.partnerships.text}</p>
          </div>
          <div className="partner-logo-row">
            <img src={amref} alt="Amref Health Africa" className="partner-logo" />
            <img src={cdc} alt="CDC" className="partner-logo" />
            <img src={globalImg} alt="Global Fund" className="partner-logo" />
            <img src={unicef} alt="UNICEF" className="partner-logo" />
            <img src={kemri} alt="KEMRI" className="partner-logo" />
          </div>
        </div>
      </section>

      <BoardMembers members={content.boardMembers} />
    </main>
  );
}

export default About;