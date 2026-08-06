import { useEffect, useState } from "react";
import {
  getGalleryContent,
  saveGalleryContent,
  getDefaultGalleryContent,
  resetGalleryContent,
} from "../../content/galleryContent";

const galleryImageModules = import.meta.glob("../../assets/**/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

function GalleryAdmin() {
  const [formState, setFormState] = useState(getGalleryContent());
  const [message, setMessage] = useState("");
  const builtInGalleryImages = Object.entries(galleryImageModules)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([, source]) => source)
    .filter(Boolean);

  useEffect(() => {
    const handleUpdate = () => setFormState(getGalleryContent());
    window.addEventListener("galleryContentUpdated", handleUpdate);
    return () => window.removeEventListener("galleryContentUpdated", handleUpdate);
  }, []);

  const persistGalleryState = async (updater) => {
    const nextState = typeof updater === "function" ? updater(formState) : updater;
    setFormState(nextState);
    try {
      const saved = await saveGalleryContent(nextState);
      setFormState(saved || nextState);
    } catch (error) {
      console.warn("Failed to persist gallery state", error);
    }
    return nextState;
  };

  const addGalleryImage = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const newImage = event.target?.result;
      persistGalleryState((current) => ({
        ...current,
        extras: [...(current.extras || []), newImage],
      }));
    };
    reader.readAsDataURL(file);
  };

  const deleteBuiltInGalleryImage = (imageToRemove) => {
    persistGalleryState((current) => ({
      ...current,
      hidden: [...(current.hidden || []), imageToRemove],
    }));
  };

  const deleteGalleryImage = (indexToRemove) => {
    persistGalleryState((current) => {
      const nextExtras = (current.extras || []).filter((_, index) => index !== indexToRemove);
      return {
        ...current,
        extras: nextExtras,
      };
    });
  };

  const handleSave = async () => {
    try {
      await saveGalleryContent(formState);
      setMessage("Gallery images saved.");
    } catch (error) {
      setMessage("Failed to save gallery content. Try again.");
    }
    setTimeout(() => setMessage(""), 2500);
  };

  const handleReset = async () => {
    const defaults = getDefaultGalleryContent();
    setFormState(defaults);
    try {
      await resetGalleryContent();
      setMessage("Gallery reset to defaults.");
    } catch (error) {
      setMessage("Failed to reset gallery content. Try again.");
    }
    setTimeout(() => setMessage(""), 2500);
  };

  const visibleBuiltInGalleryImages = builtInGalleryImages.filter(
    (image) => !(formState.hidden || []).includes(image)
  );

  return (
    <section className="admin-page-card">
      <h1>Manage Gallery</h1>

      <div className="admin-form-group">
        <label>
          Add image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => addGalleryImage(e.target.files?.[0])}
          />
        </label>
      </div>

      <div className="admin-form-group">
        <h2>Gallery images</h2>
        <div className="admin-grid-list">
          {visibleBuiltInGalleryImages.map((image, index) => (
            <div key={`${image}-${index}`} className="admin-card admin-card-small">
              <div className="admin-card-row">
                <button
                  type="button"
                  className="secondary-button admin-card-remove"
                  onClick={() => deleteBuiltInGalleryImage(image)}
                >
                  Delete
                </button>
              </div>
              <img src={image} alt={`Gallery asset ${index + 1}`} className="admin-image-preview" />
            </div>
          ))}
        </div>
      </div>

      <div className="admin-form-group">
        <h2>Admin-added gallery images</h2>
        {formState.extras?.length ? (
          <div className="admin-grid-list">
            {formState.extras.map((image, index) => (
              <div key={`${image}-${index}`} className="admin-card admin-card-small">
                <div className="admin-card-row">
                  <h3>Upload {index + 1}</h3>
                  <button
                    type="button"
                    className="secondary-button admin-card-remove"
                    onClick={() => deleteGalleryImage(index)}
                  >
                    Delete
                  </button>
                </div>
                <img src={image} alt={`Gallery upload ${index + 1}`} className="admin-image-preview" />
              </div>
            ))}
          </div>
        ) : (
          <p>No additional gallery images added yet.</p>
        )}
      </div>

      <div className="admin-form-actions">
        <button type="button" onClick={handleSave} className="primary-button">
          Save gallery
        </button>
        <button type="button" onClick={handleReset} className="secondary-button">
          Reset gallery
        </button>
      </div>

      {message && <p className="admin-message">{message}</p>}
    </section>
  );
}

export default GalleryAdmin;
