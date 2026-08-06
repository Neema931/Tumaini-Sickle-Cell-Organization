import { useEffect, useState } from "react";
import { getProgramsContent, fetchProgramsContent } from "../content/programsContent";

function Programs() {
  const [programsContent, setProgramsContent] = useState(getProgramsContent());

  useEffect(() => {
    const updateProgramsContent = () => {
      fetchProgramsContent().then(setProgramsContent).catch(() => {
        setProgramsContent(getProgramsContent());
      });
    };

    updateProgramsContent();
    window.addEventListener("programsContentUpdated", updateProgramsContent);
    return () => window.removeEventListener("programsContentUpdated", updateProgramsContent);
  }, []);

  return (
    <div className="programs">
      {(programsContent.programs || []).map((program, index) => (
        <section key={program.id ?? `${program.title}-${index}`} id={program.title.toLowerCase().replace(/\s+/g, "-")} className="program-section">
          <h1 className="programs-title">{program.title}</h1>
          <p>{program.description}</p>
          {(program.images || []).length > 0 && (
            <div className="program-image-row">
              {(program.images || []).map((image, imageIndex) => (
                <img
                  key={`${program.id}-${imageIndex}`}
                  src={image}
                  alt={`${program.title} ${imageIndex + 1}`}
                  className="program-image"
                />
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

export default Programs;