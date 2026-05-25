import { Link } from "react-router-dom";

function AdvocacyPolicy() {
  return (
    <section id="advocacy" className="program-section">
      <Link to="/programs/advocacy"><h2>Advocacy And Policy</h2></Link>
      <p>
        Our advocacy work coalesces around legislative initiatives aimed at including SCD in health budgetary allocations, and improvement of healthcare for SCD patients by providing special vaccines for the prevention of infections within public healthcare facilities.
      </p>

      <p>
        We work with Parliamentary, Senate and County Assembly champions to raise awareness for SCD and to have legislation introduced to remove discriminatory and exclusion clauses in the National Hospital Insurance Fund and private health insurance providers for complications arising as a result of SCD.
      </p>

      <p><strong>Promote public participation</strong> in events, rallies, walks and other advocacy activities to increase awareness.</p>

      <p>
        Together with the county's MOH department, we advocate for funding organizations to provide resources for SCD and sickle cell trait-related research aimed at finding affordable cures for the disease.
      </p>
    </section>
  );
}

export default AdvocacyPolicy;
