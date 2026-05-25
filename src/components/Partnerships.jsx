import { Link } from "react-router-dom";

function Partnerships() {
  return (
    <section id="partnerships" className="program-section">
      <Link to="/programs/partnerships"><h2>Partnerships</h2></Link>
      <p>
        We join with health care providers, researchers, and organizations to serve the many children living with or impacted by SCD and their caregivers.
      </p>

      <p>
        Our collaborative efforts with public and private health care providers, NGOs, support groups and other stakeholders have provided effective direction in positioning SCD as a recognized public health concern.
      </p>

      <p>
        Partnerships with hospitals, blood bank and Kenya Red Cross to conduct regular blood donation drives and create awareness have continuously made blood available for sickle cell patients in need of transfusions in both private and public hospitals within Kisumu county.
      </p>
    </section>
  );
}

export default Partnerships;
