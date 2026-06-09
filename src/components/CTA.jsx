import { Link } from "react-router-dom";
import "./TSCO.css";

function CTA() {
  return (
    <section className="cta-section">

      <div className="cta-content">

        <h2>Make a Difference Today</h2>

        <p>
          Your support helps us provide care, awareness, and hope
          to individuals living with sickle cell disease.
        </p>


        <div className="cta-buttons">

          <Link to="/donate">
            <button className="cta-secondary">
              Donate Now
            </button>
          </Link>

          <Link to="/contact">
            <button className="cta-secondary">
              Contact Us
            </button>
          </Link>

        </div>

      </div>

    </section>
  );
}

export default CTA;
