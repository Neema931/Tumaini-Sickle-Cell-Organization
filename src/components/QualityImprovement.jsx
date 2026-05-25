import { Link } from "react-router-dom";

function QualityImprovement() {
  return (
    <section id="quality" className="program-section">
      <Link to="/programs/quality"><h2>Quality Improvement Initiative</h2></Link>
      <p>
        The organization is in the forefront of improving the quality of health, life and services for individuals, families and communities affected by sickle cell disease and related conditions.
      </p>

      <p>
        We connect SCD warriors to health facilities for clinical care.
      </p>

      <p>
        We negotiate with pharmacies on reduction in cost of essential management medicines to support vulnerable families impacted by SCD.
      </p>
    </section>
  );
}

export default QualityImprovement;
