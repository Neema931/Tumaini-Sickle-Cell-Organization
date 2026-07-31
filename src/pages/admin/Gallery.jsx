import { useEffect, useState } from "react";
import {
  getGalleryContent,
  saveGalleryContent,
  getDefaultGalleryContent,
} from "../../content/galleryContent";

const galleryImages = Object.values(
  import.meta.glob("../../assets/*.{jpg,jpeg,png}", {
    eager: true,
    import: "default",
  })
);

function Gallery() {
  const [formState, setFormState] = useState(() => {
    const persisted = getGalleryContent();
    return {
      ...persisted,
      images: Array.isArray(persisted.images) ? persisted.images : [...galleryImages],
    };
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleUpdate = () => setFormState(getGalleryContent());
    window.addEventListener("galleryContentUpdated", handleUpdate);
    return () => window.removeEventListener("galleryContentUpdated", handleUpdate);
  }, []);

  const updateField = (path, value) => {
    const next = { ...formState, [path]: value };
    setFormState(next);
  };

  const handleFileChange = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      updateField("image", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (src) => {
    const next = {
      ...formState,
      images: (formState.images?.length ? formState.images : [...galleryImages]).filter((image) => image !== src),
    };
    setFormState(next);
  };

  const handleSave = () => {
    saveGalleryContent(formState);
    setMessage("Gallery content saved.");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleReset = () => {
    const defaults = getDefaultGalleryContent();
    setFormState({
      ...defaults,
      images: [...galleryImages],
    });
    saveGalleryContent(defaults);
    setMessage("Gallery content reset to defaults.");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <section className="admin-page-card">
      <h1>Manage Gallery</h1>
      <p>Upload a gallery feature image and control its display size.</p>

      <div className="admin-form-group">
        <div className="admin-card admin-card-small">
          <label>
            Alt text
            <input
              value={formState.alt}
              onChange={(e) => updateField("alt", e.target.value)}
            />
          </label>

          <label>
            Size
            <select
              value={formState.size}
              onChange={(e) => updateField("size", e.target.value)}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </label>

          <label>
            Gallery image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e.target.files?.[0])}
            />
          </label>

          {formState.image && (
            <div className="admin-upload-preview">
              <img src={formState.image} alt="Gallery preview" />
            </div>
          )}
        </div>
      </div>

      <div className="admin-form-group">
        <h2>Gallery asset preview</h2>
        <div className="admin-card admin-card-small gallery-admin-grid">
          {galleryImages.map((src, index) => {
            const isRemoved = Array.isArray(formState.images) && !formState.images.includes(src);

            return (
              <div key={`${src}-${index}`} className="gallery-admin-thumb-card">
                <img
                  src={src}
                  alt={`Gallery asset ${index + 1}`}
                  className="gallery-admin-thumb"
                />
                <button
                  type="button"
                  className="secondary-button gallery-admin-delete"
                  onClick={() => removeImage(src)}
                  disabled={!isRemoved ? false : true}
                >
                  {isRemoved ? "Removed" : "Delete"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="admin-form-actions">
        <button type="button" className="primary-button" onClick={handleSave}>
          Save Gallery Content
        </button>
        <button type="button" className="secondary-button" onClick={handleReset}>
          Reset Defaults
        </button>
      </div>

      {message && <div className="admin-message">{message}</div>}
    </section>
  );
}

export default Gallery;
