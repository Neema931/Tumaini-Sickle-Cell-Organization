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
              Our mission is to bring hope to SCD warriors and their families
               by advancing awareness, education, treatment, and research, while expanding access to health, education, 
              agriculture, and livelihoods through empowering, participatory initiatives.
            </p>

            <blockquote>
              “Together we can create a future where every sickle cell
              warrior receives the care, dignity, and opportunity they deserve.”
            </blockquote>
          </div>

        </article>
      </section>

      <section className="about-content">
        <div className="about-card has-media">
          <div className="about-text">
            <h2>About Us</h2>
            <p>Tumaini Sickle Cell Organization (TSCO) is a Kenyan-led, community-centered non-profit organization Established under Public Benefits Organization (PBO) Act of 2013, (No. OP.218/051/19-157/11878) TSCO is dedicated to improving the survival, health, dignity, and socio-economic wellbeing of children and families affected by sickle cell disease (SCD) across the Lake Endemic Region of Western Kenya. the Public Benefits Organizations (PBO) Act, TSCO was founded by Veronica Bitta following her lived experience as a caregiver to a child diagnosed with SCD, an experience that opened her eyes to the systemic inequities faced by vulnerable families in accessing specialized healthcare, psychosocial support, and life-saving interventions.
</p>

            <p>Guided by a rights-based, equity-driven approach, TSCO integrates chronic disease management, malaria prevention, child health, nutrition, and socio-economic empowerment to build resilient communities.
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
        </div>
      </section>


      <section className="about-content">
        <div className="about-card">
          <div className="about-text">
            <h2>Our Vision</h2>
            <p>Promoting Children’s Health, Education, and Potential.</p>

            <h2>Our Mission</h2>
            <p>To bring hope to SCD warriors and their families by advancing awareness, education, treatment, and research, while expanding access to health, education, agriculture, and livelihoods through empowering, participatory initiatives.</p>

            
          </div>
        </div>
      </section>

      <section className="about-content">
        <div className="about-card">
          <div className="about-text">
            <h2>Our Core Values</h2>
            <ul>
              <li><strong>Responsiveness:</strong> – timely, accessible services.</li>
              <li><strong>Empathy:</strong> – understanding lived experiences.</li>
              <li><strong>Innovation:</strong> – creative, evidence-based solutions.</li>
              <li><strong>Teamwork:</strong> – collaboration and partnerships.</li>
              <li><strong>Transparency & Accountability:</strong> – openness and responsibility.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="about-content">
        <div className="about-card">
          <div className="about-text">
            <h2>Strategic Pillars</h2>
              <ol className="single-column">
              <li><strong>Community Outreach & Awareness:</strong> School sensitization, workshops, sporting events, peer mentorship, and creative platforms like WarriorSpeaks! and Teen Talent Festival.</li>
              <li><strong>Advocacy & Policy Engagement:</strong> Legislative initiatives to secure SCD inclusion in health budgets and strengthen public healthcare delivery.
</li>
<li><strong>Patient & Caregiver Support:</strong> Counseling, psychosocial support, medical camps, access to essential medication, nutrition education, referral networks, and caregiver training.</li>
<li><strong>Socio-Economic Empowerment:</strong> Vocational training and income-generating projects to strengthen household resilience.</li>
<li><strong>Research & Innovation:</strong> Evidence generation through partnerships with universities and health experts to improve SCD outcomes.
</li>
<li><strong>Integrated Disease Prevention:</strong> Holistic care addressing malaria, HIV, TB, malnutrition, and mental health.</li>           
            </ol>
          </div>
        </div>
        </section>

        <section className="about-content">
        <div className="about-card">
          <div className="text">
            <h2>Patnerships</h2>
              <p>TSCO collaborates with county governments, healthcare institutions, research bodies, and global agencies including PfiWHO, UNICEF, The Global Fund, CDC, Amref Health Africa, and Kenya Medical Research Institute. Through these alliances, we scale evidence-based interventions and strengthen health systems for underserved communities</p>
          </div>
        </div>
      </section>


      <section className="about-content">
        <div className="about-card">
          <div className="about-text">
            <h2>Contribution to SDGs</h2>

            <ul>
              <li><strong>SDG 3 (Health & Wellbeing):</strong>Integrated healthcare and malaria prevention</li>
              <li><strong>SDG 1 (No Poverty):</strong> Economic empowerment for caregivers</li>
              <li><strong>SDG 4 (Quality Education): </strong>School-based awareness and child support</li>
              <li><strong>SDG 5 (Gender Equality):</strong>Empowering mothers and female caregivers</li>
              <li><strong>SDG 10 (Reduced Inequalities):</strong>Equitable healthcare advocacy</li>
              <li><strong>SDG 17 (Partnerships):</strong> Strategic collaborations for impact</li>
            </ul>
          </div>
        </div>
      </section>

         

      <BoardMembers />
    </main>
  );
}

export default About;