import { useEffect, useState } from "react";
import {
  getProgramsContent,
  fetchProgramsContent,
  saveProgramsContent,
  getDefaultProgramsContent,
  resetProgramsContent,
} from "../../content/programsContent";

function Programs() {
  const [formState, setFormState] = useState(() => getProgramsContent());
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProgramsContent().then(setFormState).catch(() => {});
  }, []);

  const updateProgram = (index, field, value) => {
    setFormState((current) => ({
      ...current,
      programs: current.programs.map((program, programIndex) =>
        programIndex === index ? { ...program, [field]: value } : program
      ),
    }));
  };

  const addProgram = () => {
    setFormState((current) => ({
      ...current,
      programs: [
        ...(current.programs || []),
        {
          id: Date.now(),
          title: "New Program",
          description: "",
          images: [],
        },
      ],
    }));
  };

  const removeProgram = (indexToRemove) => {
    setFormState((current) => ({
      ...current,
      programs: (current.programs || []).filter((_, index) => index !== indexToRemove),
    }));
  };

  const uploadProgramImage = (programIndex, file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result || "";
      setFormState((current) => ({
        ...current,
        programs: current.programs.map((program, index) =>
          index === programIndex
            ? {
                ...program,
                images: [...(program.images || []), imageUrl],
              }
            : program
        ),
      }));
    };
    reader.readAsDataURL(file);
  };

  const addAnotherImage = (programIndex) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = event.target?.files?.[0];
      if (file) {
        uploadProgramImage(programIndex, file);
      }
    };
    input.click();
  };

  const removeProgramImage = (programIndex, imageIndex) => {
    setFormState((current) => ({
      ...current,
      programs: current.programs.map((program, index) =>
        index === programIndex
          ? {
              ...program,
              images: (program.images || []).filter((_, position) => position !== imageIndex),
            }
          : program
      ),
    }));
  };

  const handleSave = async () => {
    try {
      await saveProgramsContent(formState);
      setMessage("Programs content saved.");
    } catch (error) {
      setMessage("Failed to save programs content. Try again.");
    }
    setTimeout(() => setMessage(""), 2500);
  };

  const handleReset = async () => {
    const defaults = getDefaultProgramsContent();
    setFormState(defaults);
    try {
      await resetProgramsContent();
      setMessage("Programs content reset to defaults.");
    } catch (error) {
      setMessage("Failed to reset programs content. Try again.");
    }
    setTimeout(() => setMessage(""), 2500);
  };

  return (
    <section className="admin-page-card">
      <h1>Manage Programs</h1>
      <p>Update the public program cards with title, description, and images.</p>

      <div className="admin-form-group">
        {formState.programs.map((program, index) => (
          <div key={program.id ?? index} className="admin-card admin-card-small">
            <div className="admin-card-row">
              <h3>Program {index + 1}</h3>
              <button
                type="button"
                className="secondary-button admin-card-remove"
                onClick={() => removeProgram(index)}
              >
                Delete program
              </button>
            </div>

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
              <h3>Images</h3>
              {(program.images || []).length ? (
                <div className="admin-grid-list">
                  {(program.images || []).map((image, imageIndex) => (
                    <div key={`${program.id}-image-${imageIndex}`} className="admin-card admin-card-small">
                      <div className="admin-card-row">
                        <button
                          type="button"
                          className="secondary-button admin-card-remove"
                          onClick={() => removeProgramImage(index, imageIndex)}
                        >
                          Delete image
                        </button>
                      </div>
                      <img src={image} alt={`${program.title} ${imageIndex + 1}`} className="admin-image-preview" />
                    </div>
                  ))}
                </div>
              ) : (
                <p>No images added yet.</p>
              )}

              <div className="admin-card-row">
                <label style={{ flex: 1 }}>
                  Upload image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => uploadProgramImage(index, e.target.files?.[0])}
                  />
                </label>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => addAnotherImage(index)}
                >
                  Add another image
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-form-actions">
        <button type="button" className="primary-button" onClick={addProgram}>
          Add another program
        </button>
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
