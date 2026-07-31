import { useEffect, useState } from "react";
import { getProgramsContent } from "../content/programsContent";

function Programs() {
  const [programsContent, setProgramsContent] = useState(getProgramsContent());

  useEffect(() => {
    const updateProgramsContent = () => setProgramsContent(getProgramsContent());
    window.addEventListener("programsContentUpdated", updateProgramsContent);
    return () => window.removeEventListener("programsContentUpdated", updateProgramsContent);
  }, []);

  return (
    <div className="programs">
      {(programsContent.programs || []).map((program, index) => (
        <section key={program.id ?? `${program.title}-${index}`} id={program.title.toLowerCase().replace(/\s+/g, "-")} className="program-section">
          <h1 className="programs-title">{program.title}</h1>
          <p>{program.description}</p>
          {(program.details || []).map((detail, detailIndex) => (
            <p key={`${program.id}-${detailIndex}`}>{detail}</p>
          ))}
        </section>
      ))}
    </div>
  );
}

export default Programs;