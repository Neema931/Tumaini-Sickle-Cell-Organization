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
    fetchAboutContent().then(setContent).catch(() => {});
    const handleUpdate = () => fetchAboutContent().then(setContent).catch(() => {});
    window.addEventListener("aboutContentUpdated", handleUpdate);
    return () => window.removeEventListener("aboutContentUpdated", handleUpdate);
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

      <section className="about-content">
        <div className="about-card has-media">
          <div className="about-text">
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


      <section className="about-content">
        <div className="about-card">
          <div className="about-text">
            <h2>{content.visionMission.visionHeading}</h2>
            <p>{content.visionMission.visionText}</p>
            <h2>{content.visionMission.missionHeading}</h2>
            <p>{content.visionMission.missionText}</p>
          </div>
        </div>
      </section>

      <section className="about-content">
        <div className="about-card">
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

      <section className="about-content">
        <div className="about-card">
          <div className="about-text">
            <h2>Strategic Pillars</h2>
            <ol className="single-column">
              {content.strategicPillars.map((pillar, index) => (
                <li key={index}>{pillar}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="about-content">
        <div className="about-card">
          <div className="about-text">
            <h2>{content.partnerships.heading}</h2>
            <p>{content.partnerships.text}</p>
          </div>
        </div>
      </section>

      <section className="about-content">
        <div className="about-card">
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

      <BoardMembers members={content.boardMembers} />
    </main>
  );
}

export default About;