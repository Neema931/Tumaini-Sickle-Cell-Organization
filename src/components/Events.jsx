import React from 'react';
import { Link } from 'react-router-dom';
import "./TSCO.css";

import img1 from "../assets/A (1).jpg";
import img2 from "../assets/A (2).jpg";
import img3 from "../assets/A (9).jpg";
import img4 from "../assets/A (4).jpg";

import img5 from "../assets/B (13).jpg";
import img6 from "../assets/B (5).jpg";
import img7 from "../assets/B (7).jpg";
import img8 from "../assets/B (11).jpg";

import img9 from "../assets/C (1).jpg";
import img10 from "../assets/C (2).jpg";
import img11 from "../assets/C (7).jpg";
import img12 from "../assets/C (4).jpg";

import img13 from "../assets/D (1).jpg";
import img14 from "../assets/D (2).jpg";
import img15 from "../assets/D (5).jpg";
import img16 from "../assets/D (6).jpg";

import img17 from "../assets/E (1).jpg";
import img18 from "../assets/E (2).jpg";
import img19 from "../assets/E (7).jpg";
import img20 from "../assets/E (15).jpg";

import img21 from "../assets/F (7).jpg";
import img22 from "../assets/F (10).jpg";
import img23 from "../assets/F (15).jpg";
import img24 from "../assets/F (1).jpg";

import img25 from "../assets/G (4).jpg";
import img26 from "../assets/G (5).jpg";
import img27 from "../assets/G (9).jpg";
import img28 from "../assets/G (14).jpg";

import img29 from "../assets/H (8).jpg";
import img30 from "../assets/H (10).jpg";
import img31 from "../assets/H (14).jpg";
import img32 from "../assets/H (18).jpg";

import img33 from "../assets/I (1).jpg";
import img34 from "../assets/I (2).jpg";
import img35 from "../assets/I (9).jpg";
import img36 from "../assets/I (8).jpg";

import img37 from "../assets/J (13).jpg";
import img38 from "../assets/J (20).jpg";
import img39 from "../assets/J (6).jpg";
import img40 from "../assets/J (14).jpg";

import img41 from "../assets/K (1).jpg";
import img42 from "../assets/K (11).jpg";
import img43 from "../assets/K (10).jpg";
import img44 from "../assets/K (4).jpg";

import veronica from "../assets/VeronicaBitta.png";

function Events() {
  return (
    <div className="gallery-page">
      <div className="gallery-grid">

        <section className="upcoming-events">
          <div className="image-card">
              <div className="upcoming-events-header">
                <h2>Upcoming Events</h2>
              </div>
              <div className="upcoming-events-content">
                <img src={veronica} alt="Veronica Bitta" />
              </div>
              </div>
        </section>

        <h2>PAST EVENTS</h2>
        <section className="gallery-card">
          <div className="card-images">
            <img src={img1} alt="Gallery Image 1" />
            <img src={img2} alt="Gallery Image 2" />
            <img src={img3} alt="Gallery Image 3" />
            <img src={img4} alt="Gallery Image 4" />
          </div>

          <div className="card-content">
            <h2>THE KENYA SICKLE CELL SYMPOSIUM</h2>
            <p>We joined MOH and Sickle Cell Federation of Kenya during the
             𝐊𝐞𝐧𝐲𝐚 𝐒𝐢𝐜𝐤𝐥𝐞 𝐂𝐞𝐥𝐥 𝐒𝐲𝐦𝐩𝐨𝐬𝐢𝐮𝐦 held on 16 July 2026 at Gertrude’s 
             Children’s Hospital, Muthaiga, Nairobi. The symposium brought
              together policymakers, clinicians, researchers, healthcare workers,
               patient advocates, caregivers, and people living with sickle cell disease to discuss practical 
            solutions for improving the lives of those affected by the condition.</p>

            <div className="card-link">
              <Link to="/A">View More</Link>
            </div>    
          </div>
        </section>

        <section className="gallery-card">
          <div className="card-images">
            <img src={img5} alt="Gallery Image 5" />
            <img src={img6} alt="Gallery Image 6" />
            <img src={img7} alt="Gallery Image 7" />
            <img src={img8} alt="Gallery Image 8" />
          </div>

          <div className="card-content">
            <h2>3RD NATIONAL COMMUNITY SYSTEMS STRENGHETHING KNOWLEDGE DISSEMINATION FORUM</h2>
            <p>Honored to have served as a member of the Planning Committee and Lead Rapporteur during the 𝟑𝐫𝐝 
            𝐍𝐚𝐭𝐢𝐨𝐧𝐚𝐥 𝐂𝐨𝐦𝐦𝐮𝐧𝐢𝐭𝐲 𝐒𝐲𝐬𝐭𝐞𝐦𝐬 𝐒𝐭𝐫𝐞𝐧𝐠𝐭𝐡𝐞𝐧𝐢𝐧𝐠 𝐊𝐧𝐨𝐰𝐥𝐞𝐝𝐠𝐞 𝐃𝐢𝐬𝐬𝐞𝐦𝐢𝐧𝐚𝐭𝐢𝐨𝐧 𝐅𝐨𝐫𝐮𝐦 held in Naivasha from 23rd–25th
             June 2026.</p>

            <div className="card-link">
              <Link to="/B">View More</Link>
            </div>
          </div> 
        </section>

        <section className="gallery-card">
          <div className="card-images">
            <img src={img9} alt="Gallery Image 9" />
            <img src={img10} alt="Gallery Image 10" />
            <img src={img11} alt="Gallery Image 11" />
            <img src={img12} alt="Gallery Image 12" />
          </div>
          <div className="card-content">
            <h2> 𝐖𝐎𝐑𝐋𝐃 𝐒𝐈𝐂𝐊𝐋𝐄 𝐂𝐄𝐋𝐋 𝐃𝐀𝐘 𝟐𝟎𝟐𝟔: 𝐂𝐋𝐎𝐒𝐈𝐍𝐆 𝐓𝐇𝐄 𝐒𝐔𝐑𝐕𝐈𝐕𝐀𝐋 𝐆𝐀𝐏 – 𝐄𝐐𝐔𝐈𝐓𝐘 𝐈𝐍 𝐒𝐈𝐂𝐊𝐋𝐄 𝐂𝐄𝐋𝐋 𝐃𝐈𝐒𝐄𝐀𝐒𝐄</h2>
            <p> On 19/06/2026, Kenya joined the global community in commemorating 𝐖𝐨𝐫𝐥𝐝 𝐒𝐢𝐜𝐤𝐥𝐞 𝐂𝐞𝐥𝐥 𝐃𝐚𝐲 𝟐𝟎𝟐𝟔 under
             the theme  𝐂𝐥𝐨𝐬𝐢𝐧𝐠 𝐭𝐡𝐞 𝐒𝐮𝐫𝐯𝐢𝐯𝐚𝐥 𝐆𝐚𝐩: 𝐄𝐪𝐮𝐢𝐭𝐲 𝐢𝐧 𝐒𝐢𝐜𝐤𝐥𝐞 𝐂𝐞𝐥𝐥 𝐃𝐢𝐬𝐞𝐚𝐬𝐞. The national celebration was hosted
              at Bunyala TVET, Busia County, bringing together government leaders, healthcare professionals, development 
              partners, caregivers, advocates, and individuals living with sickle cell disease to champion equitable 
              access to quality care and improved health outcomes. </p>

            <div className="card-link">
              <Link to="/C">View More</Link>
            </div> 
            </div>   
        </section>

        <section className="gallery-card">
          <div className="card-images">
            <img src={img13} alt="Gallery Image 13" />
            <img src={img14} alt="Gallery Image 14" />
            <img src={img15} alt="Gallery Image 15" />
            <img src={img16} alt="Gallery Image 16" />
          </div>

          <div className="card-content">
            <h2>HRG LEARNING AND DOCUMENTATION</h2>
          <p>𝐓𝐮𝐦𝐚𝐢𝐧𝐢 𝐒𝐢𝐜𝐤𝐥𝐞 𝐂𝐞𝐥𝐥 𝐎𝐫𝐠𝐚𝐧𝐢𝐳𝐚𝐭𝐢𝐨𝐧
             Proud to have represented people living with Sickle Cell Disease at this week’s 𝐇𝐑𝐆 𝐋𝐞𝐚𝐫𝐧𝐢𝐧𝐠 & 𝐃𝐨𝐜𝐮𝐦𝐞𝐧𝐭𝐚𝐭𝐢𝐨𝐧 workshop,
             sponsored by 𝐀𝐌𝐑𝐄𝐅 𝐇𝐞𝐚𝐥𝐭𝐡 𝐀𝐟𝐫𝐢𝐜𝐚 𝐚𝐧𝐝 𝐟𝐚𝐜𝐢𝐥𝐢𝐭𝐚𝐭𝐞𝐝 𝐛𝐲 𝐍𝐞𝐱𝐭 𝐆𝐞𝐧𝐞𝐫𝐚𝐭𝐢𝐨𝐧 𝐋𝐚𝐰𝐲𝐞𝐫𝐬.</p>

          <div className="card-link">
              <Link to="/D">View More</Link>
          </div>
          </div>
        </section>

        <section className="gallery-card">
          <div className="card-images">
            <img src={img17} alt="Gallery Image 17" />
            <img src={img18} alt="Gallery Image 18" />
            <img src={img19} alt="Gallery Image 19" />
            <img src={img20} alt="Gallery Image 20" />
          </div>

          <div className="card-content">
            <h2>VOLUNATRY SICKLE CELL GENOTYPE SCREENING, COUNSELING, EDUCATION AND AWARENESS PROGRAM</h2>
            <p>Yesterday, 8th May 2026, marked a significant milestone as the pilot 𝗩𝗼𝗹𝘂𝗻𝘁𝗮𝗿𝘆 𝗦𝗶𝗰𝗸𝗹𝗲 𝗖𝗲𝗹𝗹 𝗚𝗲𝗻𝗼𝘁𝘆𝗽𝗲 𝗦𝗰𝗿𝗲𝗲𝗻𝗶𝗻𝗴,
             𝗖𝗼𝘂𝗻𝘀𝗲𝗹𝗶𝗻𝗴, 𝗘𝗱𝘂𝗰𝗮𝘁𝗶𝗼𝗻 𝗮𝗻𝗱 𝗔𝘄𝗮𝗿𝗲𝗻𝗲𝘀𝘀 𝗣𝗿𝗼𝗴𝗿𝗮𝗺 for university students was successfully rolled out at Jaramogi 
             Oginga Odinga University of Science and Technology.(JOOUST)</p>

            <div className="card-link">
              <Link to="/E">View More</Link>
            </div>
           </div> 
        </section>

        <section className="gallery-card">
          <div className="card-images">
            <img src={img21} alt="Gallery Image 21" />
            <img src={img22} alt="Gallery Image 22" />
            <img src={img23} alt="Gallery Image 23" />
            <img src={img24} alt="Gallery Image 24" />
          </div>

          <div className="card-content">
            <h2>WORKSHOP ON KENYA'S MALARIA PROGRAMMING</h2>
            <p>Over the past two days, 𝐓𝐮𝐦𝐚𝐢𝐧𝐢 𝐒𝐢𝐜𝐤𝐥𝐞 𝐂𝐞𝐥𝐥 𝐎𝐫𝐠𝐚𝐧𝐢𝐳𝐚𝐭𝐢𝐨𝐧 had the privilege of participating in an intensive
             workshop on Kenya’s malaria programming, organized by 𝐘𝐨𝐮𝐭𝐡 𝐟𝐨𝐫 𝐀𝐜𝐭𝐢𝐨𝐧 𝐊𝐞𝐧𝐲𝐚 𝐅𝐨𝐫𝐮𝐦 (𝐘𝐎𝐅𝐀𝐊)  and funded by
              𝐀𝐦𝐫𝐞𝐟 𝐇𝐞𝐚𝐥𝐭𝐡 𝐀𝐟𝐫𝐢𝐜𝐚.</p>

            <div className="card-link">
              <Link to="/F">View More</Link>
            </div>
          </div>  
        </section>

        <section className="gallery-card">
          <div className="card-images">
            <img src={img25} alt="Gallery Image 25" />
            <img src={img26} alt="Gallery Image 26" />
            <img src={img27} alt="Gallery Image 27" />
            <img src={img28} alt="Gallery Image 28" />
          </div>

          <div className="card-content">
            <h2>DIGNITY, HEALTH AND EMPOWERMENT FOR GIRLS LIVING WITH SICKLE CELL</h2>
          <p>Today marked a powerful step toward dignity, health, and empowerment for girls living with sickle cell disease in Kisumu Central.
             In a collaborative effort, Tumaini Sickle cell Organization -TSCO  , Together for Better , 𝐄𝐪𝐮𝐚𝐭𝐨𝐫 𝐑𝐨𝐮𝐧𝐝 𝐓𝐚𝐛𝐥𝐞, and the Kenya Red Cross Society  came together to support over 50 girls by distributing free reusable sanitary pads, a sustainable solution designed with 100% organic materials, free from chemicals and plastics, and reusable for up to two years.Today marked a 
             powerful step toward dignity, health, and empowerment for girls living with sickle cell disease in Kisumu Central.</p>
       
      <div className="card-link">
        <Link to="/G">View More</Link>
      </div>
       </div>    
        </section>

        <section className="gallery-card">
          <div className="card-images">
            <img src={img29} alt="Gallery Image 29" />
            <img src={img30} alt="Gallery Image 30" />
            <img src={img31} alt="Gallery Image 31" />
            <img src={img32} alt="Gallery Image 32" />
          </div>

          <div className="card-content">
            <h2>IMPROVING ACCESS TO QUALITY HEALTH CARE FOR COMMUNITIES</h2>
            <p>𝐓𝐮𝐦𝐚𝐢𝐧𝐢 𝐒𝐢𝐜𝐤𝐥𝐞 𝐂𝐞𝐥𝐥 𝐎𝐫𝐠𝐚𝐧𝐢𝐳𝐚𝐭𝐢𝐨𝐧 was honored to join a multi-sectoral medical camp organized by the 
            𝐃𝐫. 𝐉𝐨𝐬𝐞𝐩𝐡 𝐀𝐥𝐮𝐨𝐜𝐡 𝐅𝐨𝐮𝐧𝐝𝐚𝐭𝐢𝐨𝐧 in partnership with 𝐊𝐞𝐧𝐲𝐚 𝐌𝐞𝐝𝐢𝐜𝐚𝐥 𝐀𝐬𝐬𝐨𝐜𝐢𝐚𝐭𝐢𝐨𝐧. 
            The camp brought together an incredible network of health facilities, media houses, NGOs in the health sector, financial institutions, and pharmaceutical partners — all united by one goal: 𝘪𝘮𝘱𝘳𝘰𝘷𝘪𝘯𝘨 𝘢𝘤𝘤𝘦𝘴𝘴 𝘵𝘰 𝘲𝘶𝘢𝘭𝘪𝘵𝘺 𝘩𝘦𝘢𝘭𝘵𝘩𝘤𝘢𝘳𝘦 𝘧𝘰𝘳 𝘤𝘰𝘮𝘮𝘶𝘯𝘪𝘵𝘪𝘦𝘴.</p>

            <div className="card-link">
              <Link to="/H">View More</Link>
            </div>
          </div>
        </section>

        <section className="gallery-card">
          <div className="card-images">
            <img src={img33} alt="Gallery Image 33" />
            <img src={img34} alt="Gallery Image 34" />
            <img src={img35} alt="Gallery Image 35" />
            <img src={img36} alt="Gallery Image 36" />
          </div>

          <div className="card-content">
            <h2>ENTREPRENEURIAL SKILL TRAINING</h2>
          <p>We are proud to share that on the 12th and 13th of last week, 𝐓𝐮𝐦𝐚𝐢𝐧𝐢 𝐒𝐢𝐜𝐤𝐥𝐞 𝐂𝐞𝐥𝐥 𝐎𝐫𝐠𝐚𝐧𝐢𝐳𝐚𝐭𝐢𝐨𝐧 was honored to be selected among 12 outstanding organizations whose social enterprise proposals qualified for the 𝐄𝐧𝐭𝐫𝐞𝐩𝐫𝐞𝐧𝐞𝐮𝐫𝐢𝐚𝐥 𝐒𝐤𝐢𝐥𝐥𝐬 𝐓𝐫𝐚𝐢𝐧𝐢𝐧𝐠 hosted by 𝐓𝐡𝐞 𝐆𝐢𝐯𝐢𝐧𝐠 𝐄𝐱𝐜𝐡𝐚𝐧𝐠𝐞 (𝐓𝐆𝐄) under the Kisumu Cohort.</p>
          <div className="card-link">
            <Link to="/I">View More</Link>
          </div>
          </div>
        </section>

        <section className="gallery-card">
          <div className="card-images">
            <img src={img37} alt="Gallery Image 37" />
            <img src={img38} alt="Gallery Image 38" />
            <img src={img39} alt="Gallery Image 39" />
            <img src={img40} alt="Gallery Image 40" />
          </div>
          <div className="card-content">
            <h2>SIGNING THE MEMORANDUM OF UNDERSTANDING(MoU)</h2>
            <p>Today marked a historic milestone in the fight against sickle cell disease as 𝐓𝐮𝐦𝐚𝐢𝐧𝐢 𝐒𝐢𝐜𝐤𝐥𝐞 𝐂𝐞𝐥𝐥 𝐎𝐫𝐠𝐚𝐧𝐢𝐳𝐚𝐭𝐢𝐨𝐧 (𝐓𝐒𝐂𝐎) and 𝐉𝐚𝐫𝐚𝐦𝐨𝐠𝐢 𝐎𝐠𝐢𝐧𝐠𝐚 𝐎𝐝𝐢𝐧𝐠𝐚 𝐔𝐧𝐢𝐯𝐞𝐫𝐬𝐢𝐭𝐲 𝐨𝐟 𝐒𝐜𝐢𝐞𝐧𝐜𝐞 𝐚𝐧𝐝 𝐓𝐞𝐜𝐡𝐧𝐨𝐥𝐨𝐠𝐲 (𝐉𝐎𝐎𝐔𝐒𝐓) officially signed a 𝐌𝐞𝐦𝐨𝐫𝐚𝐧𝐝𝐮𝐦 𝐨𝐟 𝐔𝐧𝐝𝐞𝐫𝐬𝐭𝐚𝐧𝐝𝐢𝐧𝐠 (𝐌𝐨𝐔) to collaborate on research and innovation in sickle cell disease.</p>
            <div className="card-link">
              <Link to="/J">View More</Link>
            </div>
          </div>
        </section>

        <section className="gallery-card">
          <div className="card-images">
            <img src={img41} alt="Gallery Image 41" />
            <img src={img42} alt="Gallery Image 42" />
            <img src={img43} alt="Gallery Image 43" />
            <img src={img44} alt="Gallery Image 44" />
          </div>
          <div className="card-content">
            <h2>BLOOD DONATION DRIVE</h2>
            <p>Today, Tumaini Sickle Cell Organization, in partnership with the Regional Blood Bank and Kenya Red Cross Society, hosted a successful blood donation drive at Great Lakes University
Students and staff actively participated in donating blood to save lives, while also benefiting from free SCD genotype screening.
</p>
    <div className="card-link">
              <Link to="/K">View More</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Events;