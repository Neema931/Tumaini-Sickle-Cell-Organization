import React from 'react';
import "../../components/gallery.css";

import img1 from "../../assets/A (1).jpg";
import img2 from "../../assets/A (2).jpg";
import img3 from "../../assets/A (3).jpg";
import img4 from "../../assets/A (4).jpg";
import img5 from "../../assets/A (5).jpg";
import img6 from "../../assets/A (6).jpg";
import img7 from "../../assets/A (7).jpg";
import img8 from "../../assets/A (8).jpg";
import img9 from "../../assets/A (9).jpg";

function A() {
    return (

        <section className="gallery-card single-gallery">
           <div className="gallery-card-header">
                <h2>THE KENYA SICKLE-CELL SYMPOSIUM</h2>
            </div>

            <div className="gallery-image">
                <img src={img1} alt="Gallery Image 1" />
                <img src={img2} alt="Gallery Image 2" />
                <img src={img3} alt="Gallery Image 3" />
                <img src={img4} alt="Gallery Image 4" />
                <img src={img5} alt="Gallery Image 5" />
                <img src={img6} alt="Gallery Image 6" />
                <img src={img7} alt="Gallery Image 7" />
                <img src={img8} alt="Gallery Image 8" />
                <img src={img9} alt="Gallery Image 9" />
            </div>

            <div className="card-content">
            <p>We joined MOH and Sickle Cell Federation of Kenya during the 𝐊𝐞𝐧𝐲𝐚 𝐒𝐢𝐜𝐤𝐥𝐞 𝐂𝐞𝐥𝐥 𝐒𝐲𝐦𝐩𝐨𝐬𝐢𝐮𝐦 held on 16 July 2026 at Gertrude’s Children’s Hospital, Muthaiga, Nairobi.<br />
               The symposium brought together policymakers, clinicians, researchers, healthcare workers, patient advocates, caregivers, and people living with sickle cell disease
                to discuss practical solutions for improving the lives of those affected by the condition.<br />
                The meeting was graced by the 𝐏𝐫𝐢𝐧𝐜𝐢𝐩𝐚𝐥 𝐒𝐞𝐜𝐫𝐞𝐭𝐚𝐫𝐲 𝐟𝐨𝐫 𝐌𝐞𝐝𝐢𝐜𝐚𝐥 𝐒𝐞𝐫𝐯𝐢𝐜𝐞𝐬, 𝐃𝐫. 𝐎𝐮𝐦𝐚 𝐎𝐥𝐮𝐠𝐚, whose keynote address reaffirmed the Government of Kenya’s commitment to strengthening sickle cell care. 
                He emphasized the need for:<br /><br />

            <ul>
              <li>  Early diagnosis through expanded newborn and infant screening.</li>
                <li>Equitable access to comprehensive, quality care across all counties.<br /></li>
                <li>Increased public awareness to eliminate stigma and encourage timely care-seeking.<br /></li>
                 <li>Strong partnerships between government, healthcare institutions, researchers, civil society, and patient organizations.</li>
                 <li>Continued investment in research, innovation, and sustainable financing for sickle cell services. </li>
            </ul>    
                    Throughout the symposium, experts highlighted several key priorities: <br />
            <ul>  
              <li>  Early diagnosis saves lives, making universal screening a critical investment.</li>              
              <li> Comprehensive care—including hydroxyurea therapy where indicated, vaccination, infection prevention, nutrition, psychosocial support, and routine follow-up—significantly improves survival and quality of life.</li>
               <li> Building the capacity of healthcare workers is essential to ensure timely diagnosis and evidence-based management across Kenya.</li>
              <li>  Local research and clinical trials are vital to generating African evidence that informs better treatment and policy decisions.</li>
               <li> The voices of people living with sickle cell disease and their caregivers must remain at the center of policy, service delivery, and advocacy efforts. </li> 
            </ul>
As a representative of 𝐓𝐮𝐦𝐚𝐢𝐧𝐢 𝐒𝐢𝐜𝐤𝐥𝐞 𝐂𝐞𝐥𝐥 𝐎𝐫𝐠𝐚𝐧𝐢𝐳𝐚𝐭𝐢𝐨𝐧 , we were encouraged by the shared commitment to closing the gaps in diagnosis, treatment, advocacy, and research. The discussions reinforced that no single institution can address sickle cell disease alone—it requires coordinated action from government, healthcare providers, researchers, development partners, and community organizations. <br />
The symposium renewed our resolve to continue advocating for:
<ul>
    <li>Early screening and diagnosis.</li>
    <li>Quality, affordable comprehensive care.</li>
    <li>Empowerment of patients and caregivers.</li>
    <li>Stronger community awareness.</li>
    <li>Evidence-informed policies that improve outcomes for every person living with sickle cell disease.</li>
</ul>
Together, we can build a future where every child and adult living with sickle cell disease has the opportunity to live a healthy, productive, and dignified life.
</p>
<p style = {{color: "blue"}}>
#SickleCellDisease #SickleCellKenya #HealthForAll #UniversalHealthCoverage #PatientAdvocacy #TumainiSickleCell #Partnerships #ComprehensiveCare #LeaveNoOneBehind
</p>
            </div>
            </section>

    );
}

export default A;