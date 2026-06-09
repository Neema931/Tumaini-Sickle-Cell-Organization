import bloodImg from "../assets/blood.jpg";
import loveImg from "../assets/love.jpg";
import directorImg from "../assets/director.jpg";

import CTA from "./CTA";
import Footer from "./Footer";

import "./TSCO.css";

function About() {
  return (
    <main className="about-page">

      {/* Director Section */}
      <section className="director-section">
        <article className="director-card">

          <div className="director-image">
            <img
              src={directorImg}
              alt="Director of Tumaini Sickle Cell Organization"
            />
          </div>

          <div className="director-content">
            <span className="director-role">
              Executive Director
            </span>

            <h2>Message from the Director</h2>

            <p>
              Welcome to Tumaini Sickle Cell Organization (TSCO).
              Our mission is to improve the quality of life for
              individuals and families affected by sickle cell disease
              through advocacy, education, research partnerships,
              and community support.
            </p>

            <blockquote>
              “Together we can create a future where every sickle cell
              warrior receives the care, dignity, and opportunity they deserve.”
            </blockquote>
          </div>

        </article>
      </section>

      {/* About Section */}
      <section className="about-content">

        <div className="about-text">

          <h2>About TSCO</h2>

          <p>
            Tumaini Sickle Cell Organization is a non-profit organization
            dedicated to improving the lives of individuals affected by
            sickle cell disease through awareness, advocacy, education,
            support programs, and strategic partnerships.
          </p>

          <p>
            We work closely with healthcare providers, researchers,
            government agencies, and community stakeholders to promote
            comprehensive care and improve access to services for
            individuals living with sickle cell disease.
          </p>

          <p>
            Through awareness campaigns, educational workshops,
            support groups, and advocacy initiatives, we empower
            warriors and caregivers with knowledge, resources,
            and hope.
          </p>

        </div>

        <div className="about-gallery">

          <div className="gallery-card">
            <img src={bloodImg} alt="Blood donation awareness" />
          </div>

          <div className="gallery-card">
            <img src={loveImg} alt="Community support" />
          </div>

        </div>

      </section>

      {/* Donation Section */}
      <section className="donation-section">

        <div className="donation-card">

          <h2>Support Our Mission</h2>

          <p>
            Your contribution helps fund awareness programs,
            patient support initiatives, advocacy campaigns,
            and community outreach activities.
          </p>

          <div className="donation-details">

            <div className="detail">
              <span>Paybill</span>
              <strong>4118759</strong>
            </div>

            <div className="detail">
              <span>Account Number</span>
              <strong>Donation</strong>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default About;