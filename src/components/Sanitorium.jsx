import { Link } from "react-router-dom";

function Sanitorium() {
  return (
    <section id="sanitorium" className="program-section">
      <Link to="/programs/sanitorium"><h2>Establishment of SCD Sanitorium to Coordinate Public Health Research Efforts</h2></Link>
      <ul>
        <li>Develop a sanitorium to coordinate public health research efforts.</li>
        <li>Establish a panel of experts in SCD management and treatment.</li>
        <li>Facilitate periodic stakeholder meetings and symposia to share progress on management updates.</li>
        <li>Identify research priorities and gaps to promote public health research initiatives that improve health outcomes for individuals with SCD.</li>
      </ul>
    </section>
  );
}

export default Sanitorium;
