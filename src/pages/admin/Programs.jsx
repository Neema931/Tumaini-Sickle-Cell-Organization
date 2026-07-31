import { useEffect, useState } from "react";
import {
  getProgramsContent,
  saveProgramsContent,
  getDefaultProgramsContent,
  resetProgramsContent,
} from "../../content/programsContent";

function Programs() {
  const [formState, setFormState] = useState(() => getProgramsContent());
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleUpdate = () => setFormState(getProgramsContent());
    window.addEventListener("programsContentUpdated", handleUpdate);
    return () => window.removeEventListener("programsContentUpdated", handleUpdate);
  }, []);

  const updateProgram = (index, field, value) => {
    const next = {
      ...formState,
      programs: formState.programs.map((program, programIndex) =>
        programIndex === index
          ? {
              ...program,
              [field]: value,
            }
          : program
      ),
    };
    setFormState(next);
  };

  const updateDetail = (programIndex, detailIndex, value) => {
    const next = {
      ...formState,
      programs: formState.programs.map((program, index) =>
        index === programIndex
          ? {
              ...program,
              details: program.details.map((detail, detailPosition) =>
                detailPosition === detailIndex ? value : detail
              ),
            }
          : program
      ),
    };
    setFormState(next);
  };

  const handleSave = () => {
    saveProgramsContent(formState);
    setMessage("Programs content saved.");
    setTimeout(() => setMessage(""), 2500);
  };

  const handleReset = () => {
    const defaults = getDefaultProgramsContent();
    setFormState(defaults);
    resetProgramsContent();
    setMessage("Programs content reset to defaults.");
    setTimeout(() => setMessage(""), 2500);
  };

  return (
    <section className="admin-page-card">
      <h1>Manage Programs</h1>
      <p>Update the public program cards and their supporting details.</p>

      <div className="admin-form-group">
        {formState.programs.map((program, index) => (
          <div key={program.id ?? index} className="admin-card admin-card-small">
            <label>
              Title
              <input
                value={program.title}
                onChange={(e) => updateProgram(index, "title", e.target.value)}
              />
            </label>

            <label>
              Description
              <textarea
                rows="4"
                value={program.description}
                onChange={(e) => updateProgram(index, "description", e.target.value)}
              />
            </label>

            <div className="admin-form-group">
              <h3>Details</h3>
              {program.details.map((detail, detailIndex) => (
                <label key={`${program.id}-${detailIndex}`}>
                  Detail {detailIndex + 1}
                  <textarea
                    rows="2"
                    value={detail}
                    onChange={(e) => updateDetail(index, detailIndex, e.target.value)}
                  />
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="admin-form-actions">
        <button type="button" className="primary-button" onClick={handleSave}>
          Save Programs Content
        </button>
        <button type="button" className="secondary-button" onClick={handleReset}>
          Reset Defaults
        </button>
      </div>

      {message && <div className="admin-message">{message}</div>}
    </section>
  );
}

export default Programs;
