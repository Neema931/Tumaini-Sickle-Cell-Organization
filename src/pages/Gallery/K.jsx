import react from "react";
import "./TSCO.css";

import img1 from "../assets/K (1).jpg";
import img2 from "../assets/K (2).jpg";
import img3 from "../assets/K (3).jpg";
import img4 from "../assets/K (4).jpg";
import img5 from "../assets/K (5).jpg";
import img6 from "../assets/K (6).jpg";
import img7 from "../assets/K (7).jpg";
import img8 from "../assets/K (8).jpg";
import img9 from "../assets/K (9).jpg";
import img10 from "../assets/K (10).jpg";
import img11 from "../assets/K (11).jpg";
import img12 from "../assets/K (12).jpg";
import img13 from "../assets/K (13).jpg";

function K() {
    return (
        <section className="gallery-card">
            <img src={img1} alt="Gallery Image 1" />
            <img src={img2} alt="Gallery Image 2" />
            <img src={img3} alt="Gallery Image 3" />
            <img src={img4} alt="Gallery Image 4" />
            <img src={img5} alt="Gallery Image 5" />
            <img src={img6} alt="Gallery Image 6" />
            <img src={img7} alt="Gallery Image 7" />
            <img src={img8} alt="Gallery Image 8" />
            <img src={img9} alt="Gallery Image 9" />
            <img src={img10} alt="Gallery Image 10" />
            <img src={img11} alt="Gallery Image 11" />
            <img src={img12} alt="Gallery Image 12" />
            <img src={img13} alt="Gallery Image 13" />
       
       <p>Today, Tumaini Sickle Cell Organization, in partnership with the Regional Blood Bank and Kenya Red Cross Society, hosted a successful blood donation drive at Great Lakes University
Students and staff actively participated in donating blood to save lives, while also benefiting from free SCD genotype screening.
A huge thank you to everyone who volunteered and supported this life-saving initiative. 
#BloodDonation #SickleCellAwareness #GreatLakesUniversity #KenyaRedCross #SaveLives #CommunitySupport</p>
        </section>
    );
}

export default K;