import AwarenessEducation from "./AwarenessEducation";
import AdvocacyPolicy from "./AdvocacyPolicy";
import Partnerships from "./Partnerships";
import QualityImprovement from "./QualityImprovement";
import SupportGroups from "./SupportGroups";
import Sanitorium from "./Sanitorium";


import CTA from "./CTA";
import Footer from "./Footer";

function Programs() {
  return (
    <div className="programs">
      <AwarenessEducation />
      <AdvocacyPolicy />
      <Partnerships />
      <QualityImprovement />
      <SupportGroups />
      <Sanitorium />
    </div>
  );
}

export default Programs;