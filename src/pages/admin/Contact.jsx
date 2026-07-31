import { useEffect, useState } from "react";
import {
  getContactContent,
  saveContactContent,
  getDefaultContactContent,
} from "../../content/contactContent";

function Contact() {
  const [formState, setFormState] = useState(getContactContent());
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleUpdate = () => setFormState(getContactContent());
    window.addEventListener("contactContentUpdated", handleUpdate);
    return () => window.removeEventListener("contactContentUpdated", handleUpdate);
  }, []);

  const updateField = (path, value) => {
    const next = JSON.parse(JSON.stringify(formState));
    const keys = path.split(".");
    let current = next;

    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        current[key] = value;
      } else {
        if (!current[key]) current[key] = {};
        current = current[key];
      }
    });

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

  const addAdditionalLink = () => {
    const next = JSON.parse(JSON.stringify(formState));
    next.additionalLinks = next.additionalLinks || [];
    next.additionalLinks.push({ label: "New Social Link", url: "" });
    setFormState(next);
  };

  const updateAdditionalLink = (index, field, value) => {
    const next = JSON.parse(JSON.stringify(formState));
    next.additionalLinks = next.additionalLinks || [];
    next.additionalLinks[index][field] = value;
    setFormState(next);
  };

  const removeAdditionalLink = (index) => {
    const next = JSON.parse(JSON.stringify(formState));
    next.additionalLinks = next.additionalLinks || [];
    next.additionalLinks.splice(index, 1);
    setFormState(next);
  };

  const handleSave = () => {
    saveContactContent(formState);
    setMessage("Contact page content saved.");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleReset = () => {
    const defaults = getDefaultContactContent();
    setFormState(defaults);
    saveContactContent(defaults);
    setMessage("Contact page content reset to defaults.");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <section className="admin-page-card">
      <h1>Manage Contact Page</h1>
      <p>Update your contact details, message intro, and social links here.</p>

      <div className="admin-form-group">
        <div className="admin-card admin-card-small">
          <label>
            Heading
            <input
              value={formState.heading}
              onChange={(e) => updateField("heading", e.target.value)}
            />
          </label>
          <label>
            Intro text
            <textarea
              value={formState.intro}
              onChange={(e) => updateField("intro", e.target.value)}
            />
          </label>
          <label>
            Email
            <input
              value={formState.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </label>
          <label>
            Phone
            <input
              value={formState.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
          </label>
          <label>
            Location
            <textarea
              value={formState.location}
              onChange={(e) => updateField("location", e.target.value)}
            />
          </label>
          <label>
            Contact image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e.target.files?.[0])}
            />
          </label>
          {formState.image && (
            <div className="admin-upload-preview">
              <img src={formState.image} alt="Contact preview" />
            </div>
          )}
          <label>
            Form title
            <input
              value={formState.formTitle}
              onChange={(e) => updateField("formTitle", e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="admin-form-group">
        <h2>Social media links</h2>
        <div className="admin-card admin-card-small">
          <label>
            Facebook link
            <input
              value={formState.socialLinks.facebook}
              onChange={(e) => updateField("socialLinks.facebook", e.target.value)}
            />
          </label>
          <label>
            LinkedIn link
            <input
              value={formState.socialLinks.linkedin}
              onChange={(e) => updateField("socialLinks.linkedin", e.target.value)}
            />
          </label>
          <label>
            Instagram link
            <input
              value={formState.socialLinks.instagram}
              onChange={(e) => updateField("socialLinks.instagram", e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="admin-form-group">
        <h2>Additional social links</h2>
        <div className="admin-card admin-card-small">
          {(formState.additionalLinks || []).map((link, index) => (
            <div key={`${link.label}-${index}`} className="admin-form-inline-group">
              <label>
                Label
                <input
                  value={link.label}
                  onChange={(e) => updateAdditionalLink(index, "label", e.target.value)}
                />
              </label>
              <label>
                URL
                <input
                  value={link.url}
                  onChange={(e) => updateAdditionalLink(index, "url", e.target.value)}
                />
              </label>
              <button type="button" className="secondary-button" onClick={() => removeAdditionalLink(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" className="primary-button" onClick={addAdditionalLink}>
            Add another social link
          </button>
        </div>
      </div>

      <div className="admin-form-actions">
        <button type="button" className="primary-button" onClick={handleSave}>
          Save Contact Content
        </button>
        <button type="button" className="secondary-button" onClick={handleReset}>
          Reset Defaults
        </button>
      </div>

      {message && <div className="admin-message">{message}</div>}
    </section>
  );
}

export default Contact;
