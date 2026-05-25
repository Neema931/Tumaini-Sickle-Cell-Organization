import bloodImg from "../assets/blood.jpg";
import loveImg from "../assets/love.jpg";
import voiceImg from "../assets/voice.jpg";
import "./TSCO.css";

function About() {
    return (
        <section className="about-section">

          {/* Left - Text */}
          <div className="about-text">
            <h2>About Us</h2>

            <p>
              We are a dedicated initiative that aims to make a significant impact in the lives 
              of individuals affected by sickle cell disease (SCD). Our organization was founded
               with a profound commitment to collaborate with esteemed medical agencies, accomplished
            medical professionals, esteemed research institutions, and other crucial stakeholders.
            </p>

            <p>
                Sickle cell disease is a complex and challenging genetic disorder that affects countless lives worldwide. Our goal is to create a lasting positive impact by championing comprehensive, multi-disciplinary, state-of-the-art treatment options and groundbreaking research for SCD. We firmly believe that through strategic partnerships and collective efforts, we can improve the quality of life for those living with this condition and eventually pave the way for innovative breakthroughs that could change the landscape of SCD management.
            </p>

            <p>
             Your contribution, no matter the size, will play a pivotal role in enabling us to carry out our initiatives effectively. It will directly aid in funding critical research, enhancing patient care, spreading awareness, and providing support to families and individuals affected by SCD. Your generosity will not only provide much-needed resources but also signify your commitment to making a tangible difference in the lives of those who often face uphill battles due to this disease.
            </p>

            <p>
               We invite you to join us in our mission to bring hope, relief, and progress to the SCD community. Your support will be deeply appreciated and acknowledged. Together, we can turn the tide against sickle cell disease and pave the way for a brighter, healthier future.
            </p>

            <p>
                    Thank you.
            </p>

            <p style={{ fontWeight: 'bold', color: 'black' }}>
                    HOW TO DONATE VIA M-PESA
            </p>

            <p style={{ fontWeight: 'bold', color: 'black' }}>
                TUMAINI SICKLE CELL ORGANIZATION
            </p>

            <p><strong> PAYBILL -</strong> 4118759 </p>
            <p><strong> ACCOUNT NUMBER -</strong>  Donation </p>
              
            </div> 

            {/* Right - Image */} 
            <div className="about-image">
                <div className="about-image-card">
                  <img src={bloodImg} alt="Blood" />
                </div>
                <div className="about-image-card">
                  <img src={loveImg} alt="Love" />
                </div>
            </div>

        </section>

    );
}

export default About;

