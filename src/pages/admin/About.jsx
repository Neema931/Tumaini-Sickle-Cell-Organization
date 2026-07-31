import { useEffect, useState } from "react";
import bloodImg from "../../assets/t1.jpg";
import loveImg from "../../assets/t3.jpg";
import directorImg from "../../assets/director.jpg";
import val from "../../assets/val.jpeg";
import george from "../../assets/george.jpg";
import emma from "../../assets/emma.jpg";
import brenda from "../../assets/brenda.jpg";
import ayugu from "../../assets/ayugu.jpg";
import alex from "../../assets/alex.jpg";
import {
  getAboutContent,
  saveAboutContent,
  getDefaultAboutContent,
} from "../../content/aboutContent";

const imageMap = {
  bloodImg,
  loveImg,
  directorImg,
  val,
  george,
  emma,
  brenda,
  ayugu,
  alex,
};

function About() {
  const [formState, setFormState] = useState(getAboutContent());
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleUpdate = () => setFormState(getAboutContent());
    window.addEventListener("aboutContentUpdated", handleUpdate);
    return () => window.removeEventListener("aboutContentUpdated", handleUpdate);
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

  const handleFileChange = (path, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      updateField(path, event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const getImagePreview = (imageValue) => {
    if (!imageValue) return null;
    if (typeof imageValue === "string") {
      if (imageValue.startsWith("data:")) {
        return imageValue;
      }
      return imageMap[imageValue] || null;
    }
    return null;
  };

  const handleSave = () => {
    saveAboutContent(formState);
    setMessage("About page content saved.");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleReset = () => {
    const defaults = getDefaultAboutContent();
    setFormState(defaults);
    saveAboutContent(defaults);
    setMessage("About page content reset to defaults.");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <section className="admin-page-card">
      <h1>Manage About Page</h1>
      <p>Edit the About page content below and save to reflect changes on the public page.</p>

      <div className="admin-form-group">
        <h2>Director section</h2>
        <div className="admin-card admin-card-small">
          <label>
            Role
            <input
              value={formState.director.role}
              onChange={(e) => updateField("director.role", e.target.value)}
            />
          </label>
          <label>
            Heading
            <input
              value={formState.director.heading}
              onChange={(e) => updateField("director.heading", e.target.value)}
            />
          </label>
          <label>
            Message
            <textarea
              value={formState.director.message}
              onChange={(e) => updateField("director.message", e.target.value)}
            />
          </label>
          <label>
            Director image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange("director.image", e.target.files?.[0])}
            />
          </label>
          {getImagePreview(formState.director.image) && (
            <img
              src={getImagePreview(formState.director.image)}
              alt="Director preview"
              className="admin-image-preview"
            />
          )}
          <label>
            Quote
            <textarea
              value={formState.director.quote}
              onChange={(e) => updateField("director.quote", e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="admin-form-group">
        <h2>About section</h2>
        <div className="admin-card admin-card-small">
          <label>
            Section heading
            <input
              value={formState.aboutSection.heading}
              onChange={(e) => updateField("aboutSection.heading", e.target.value)}
            />
          </label>
          <label>
            Paragraph 1
            <textarea
              value={formState.aboutSection.paragraphs[0]}
              onChange={(e) => updateField("aboutSection.paragraphs.0", e.target.value)}
            />
          </label>
          <label>
            Paragraph 2
            <textarea
              value={formState.aboutSection.paragraphs[1]}
              onChange={(e) => updateField("aboutSection.paragraphs.1", e.target.value)}
            />
          </label>
          <label>
            Gallery image 1 upload
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange("aboutSection.galleryImages.0", e.target.files?.[0])}
            />
          </label>
          {getImagePreview(formState.aboutSection.galleryImages[0]) && (
            <img
              src={getImagePreview(formState.aboutSection.galleryImages[0])}
              alt="Gallery image 1 preview"
              className="admin-image-preview"
            />
          )}
          <label>
            Gallery image 2 upload
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange("aboutSection.galleryImages.1", e.target.files?.[0])}
            />
          </label>
          {getImagePreview(formState.aboutSection.galleryImages[1]) && (
            <img
              src={getImagePreview(formState.aboutSection.galleryImages[1])}
              alt="Gallery image 2 preview"
              className="admin-image-preview"
            />
          )}
        </div>
      </div>

      <div className="admin-form-group">
        <h2>Vision & mission</h2>
        <div className="admin-card admin-card-small">
          <label>
            Vision heading
            <input
              value={formState.visionMission.visionHeading}
              onChange={(e) => updateField("visionMission.visionHeading", e.target.value)}
            />
          </label>
          <label>
            Vision text
            <textarea
              value={formState.visionMission.visionText}
              onChange={(e) => updateField("visionMission.visionText", e.target.value)}
            />
          </label>
          <label>
            Mission heading
            <input
              value={formState.visionMission.missionHeading}
              onChange={(e) => updateField("visionMission.missionHeading", e.target.value)}
            />
          </label>
          <label>
            Mission text
            <textarea
              value={formState.visionMission.missionText}
              onChange={(e) => updateField("visionMission.missionText", e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="admin-form-group">
        <h2>Core values</h2>
        {formState.coreValues.map((value, index) => (
          <div key={index} className="admin-card admin-card-small">
            <label>
              Value label
              <input
                value={value.label}
                onChange={(e) => updateField(`coreValues.${index}.label`, e.target.value)}
              />
            </label>
            <label>
              Value text
              <textarea
                value={value.text}
                onChange={(e) => updateField(`coreValues.${index}.text`, e.target.value)}
              />
            </label>
          </div>
        ))}
      </div>

      <div className="admin-form-group">
        <h2>Strategic pillars</h2>
        {formState.strategicPillars.map((pillar, index) => (
          <div key={index} className="admin-card admin-card-small">
            <label>
              Pillar text
              <textarea
                value={pillar}
                onChange={(e) => updateField(`strategicPillars.${index}`, e.target.value)}
              />
            </label>
          </div>
        ))}
      </div>

      <div className="admin-form-group">
        <h2>Partnerships</h2>
        <div className="admin-card admin-card-small">
          <label>
            Partnerships heading
            <input
              value={formState.partnerships.heading}
              onChange={(e) => updateField("partnerships.heading", e.target.value)}
            />
          </label>
          <label>
            Partnerships text
            <textarea
              value={formState.partnerships.text}
              onChange={(e) => updateField("partnerships.text", e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="admin-form-group">
        <h2>SDGs</h2>
        {formState.sdgs.map((sdg, index) => (
          <div key={index} className="admin-card admin-card-small">
            <label>
              SDG goal
              <input
                value={sdg.goal}
                onChange={(e) => updateField(`sdgs.${index}.goal`, e.target.value)}
              />
            </label>
            <label>
              SDG text
              <textarea
                value={sdg.text}
                onChange={(e) => updateField(`sdgs.${index}.text`, e.target.value)}
              />
            </label>
          </div>
        ))}
      </div>

      <div className="admin-form-group">
        <h2>Board members</h2>
        {formState.boardMembers.map((member, index) => (
          <div key={index} className="admin-card admin-card-small">
            <label>
              Name
              <input
                value={member.name}
                onChange={(e) => updateField(`boardMembers.${index}.name`, e.target.value)}
              />
            </label>
            <label>
              Upload image
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(`boardMembers.${index}.img`, e.target.files?.[0])}
              />
            </label>
            {getImagePreview(member.img) && (
              <img
                src={getImagePreview(member.img)}
                alt={`${member.name} preview`}
                className="admin-image-preview"
              />
            )}
            <label>
              Role
              <input
                value={member.role}
                onChange={(e) => updateField(`boardMembers.${index}.role`, e.target.value)}
              />
            </label>
          </div>
        ))}
      </div>

      <div className="admin-form-actions">
        <button type="button" className="primary-button" onClick={handleSave}>
          Save About Page
        </button>
        <button type="button" className="secondary-button" onClick={handleReset}>
          Reset Defaults
        </button>
      </div>

      {message && <div className="admin-message">{message}</div>}
    </section>
  );
}

export default About;
