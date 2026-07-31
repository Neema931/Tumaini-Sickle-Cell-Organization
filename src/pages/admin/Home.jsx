import { useEffect, useState } from "react";
import { getHomeContent, saveHomeContent, getDefaultHomeContent } from "../../content/homeContent";
import hero1 from "../../assets/aaa.jpg";
import hero2 from "../../assets/h5.jpg";
import hero3 from "../../assets/hero3.jpg";
import noela from "../../assets/t2.jpg";

const imageMap = {
  hero1,
  hero2,
  hero3,
  noela,
};

function Home() {
  const [formState, setFormState] = useState(getHomeContent());
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleUpdate = () => setFormState(getHomeContent());
    window.addEventListener("homeContentUpdated", handleUpdate);
    return () => window.removeEventListener("homeContentUpdated", handleUpdate);
  }, []);

  const updateField = (path, value) => {
    const next = JSON.parse(JSON.stringify(formState));
    const keys = path.split(".");
    let current = next;
    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        current[key] = value;
      } else {
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
    if (typeof imageValue === "string" && imageValue.startsWith("data:")) {
      return imageValue;
    }
    return imageMap[imageValue] || null;
  };

  const addHeroSlide = () => {
    setFormState((current) => ({
      ...current,
      heroSlides: [
        ...current.heroSlides,
        {
          image: "hero1",
          tag: "New slide",
          title: "New slide title",
          subtitle: "New slide subtitle",
          buttonText: "",
          buttonLink: "",
        },
      ],
    }));
  };

  const removeHeroSlide = (indexToRemove) => {
    setFormState((current) => ({
      ...current,
      heroSlides: current.heroSlides.filter((_, index) => index !== indexToRemove),
    }));
  };

  const addAboutCard = () => {
    setFormState((current) => ({
      ...current,
      aboutCards: [
        ...current.aboutCards,
        {
          image: "noela",
          title: "New card",
          text: "New card description",
          linkText: "Learn More →",
          linkUrl: "/about",
        },
      ],
    }));
  };

  const removeAboutCard = (indexToRemove) => {
    setFormState((current) => ({
      ...current,
      aboutCards: current.aboutCards.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSave = () => {
    saveHomeContent(formState);
    setMessage("Home page content saved.");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleReset = () => {
    const defaults = getDefaultHomeContent();
    setFormState(defaults);
    saveHomeContent(defaults);
    setMessage("Home page content reset to defaults.");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <section className="admin-page-card">
      <h1>Manage Home Page</h1>
      <p>Edit the home page content below and save to update the public site.</p>

      <div className="admin-form-group">
        <div className="admin-form-group-header">
          <h2>Hero slides</h2>
          <button type="button" className="secondary-button" onClick={addHeroSlide}>
            Add hero slide
          </button>
        </div>
        {formState.heroSlides?.map((slide, index) => (
          <div key={index} className="admin-card admin-card-small">
            <div className="admin-card-row">
              <h3>Slide {index + 1}</h3>
              <button
                type="button"
                className="secondary-button admin-card-remove"
                onClick={() => removeHeroSlide(index)}
              >
                Remove
              </button>
            </div>
            <label>
              Background image
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(`heroSlides.${index}.image`, e.target.files?.[0])}
              />
            </label>
            {getImagePreview(slide.image) && (
              <img
                src={getImagePreview(slide.image)}
                alt={`Slide ${index + 1} preview`}
                className="admin-image-preview"
              />
            )}
            <label>
              Tag
              <input
                value={slide.tag}
                onChange={(e) => updateField(`heroSlides.${index}.tag`, e.target.value)}
              />
            </label>
            <label>
              Title
              <input
                value={slide.title}
                onChange={(e) => updateField(`heroSlides.${index}.title`, e.target.value)}
              />
            </label>
            <label>
              Subtitle
              <textarea
                value={slide.subtitle}
                onChange={(e) => updateField(`heroSlides.${index}.subtitle`, e.target.value)}
              />
            </label>
            <label>
              Button text
              <input
                value={slide.buttonText}
                onChange={(e) => updateField(`heroSlides.${index}.buttonText`, e.target.value)}
              />
            </label>
            <label>
              Button URL
              <input
                value={slide.buttonLink}
                onChange={(e) => updateField(`heroSlides.${index}.buttonLink`, e.target.value)}
              />
            </label>
          </div>
        ))}
      </div>

      <div className="admin-form-group">
        <div className="admin-form-group-header">
          <h2>About cards</h2>
          <button type="button" className="secondary-button" onClick={addAboutCard}>
            Add about card
          </button>
        </div>
        {formState.aboutCards?.map((card, index) => (
          <div key={index} className="admin-card admin-card-small">
            <div className="admin-card-row">
              <h3>About card {index + 1}</h3>
              <button
                type="button"
                className="secondary-button admin-card-remove"
                onClick={() => removeAboutCard(index)}
              >
                Remove
              </button>
            </div>
            <label>
              Image upload
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(`aboutCards.${index}.image`, e.target.files?.[0])}
              />
            </label>
            {getImagePreview(card.image) && (
              <img
                src={getImagePreview(card.image)}
                alt={`About card ${index + 1} preview`}
                className="admin-image-preview"
              />
            )}
            <label>
              Title
              <input
                value={card.title}
                onChange={(e) => updateField(`aboutCards.${index}.title`, e.target.value)}
              />
            </label>
            <label>
              Text
              <textarea
                value={card.text}
                onChange={(e) => updateField(`aboutCards.${index}.text`, e.target.value)}
              />
            </label>
            <label>
              Link text
              <input
                value={card.linkText}
                onChange={(e) => updateField(`aboutCards.${index}.linkText`, e.target.value)}
              />
            </label>
            <label>
              Link URL
              <input
                value={card.linkUrl}
                onChange={(e) => updateField(`aboutCards.${index}.linkUrl`, e.target.value)}
              />
            </label>
          </div>
        ))}
      </div>

      <div className="admin-form-group">
        <h2>Programs section</h2>
        <div className="admin-card admin-card-small">
          <label>
            Title
            <input
              value={formState.programs?.title}
              onChange={(e) => updateField("programs.title", e.target.value)}
            />
          </label>
          <label>
            Description
            <textarea
              value={formState.programs?.description}
              onChange={(e) => updateField("programs.description", e.target.value)}
            />
          </label>
          <label>
            Button text
            <input
              value={formState.programs?.linkText}
              onChange={(e) => updateField("programs.linkText", e.target.value)}
            />
          </label>
          <label>
            Button URL
            <input
              value={formState.programs?.linkUrl}
              onChange={(e) => updateField("programs.linkUrl", e.target.value)}
            />
          </label>
        </div>
        <div className="admin-card admin-card-small">
          <h3>Program items</h3>
          {formState.programs?.items?.map((item, index) => (
            <label key={index}>
              Item {index + 1}
              <input
                value={item}
                onChange={(e) => updateField(`programs.items.${index}`, e.target.value)}
              />
            </label>
          ))}
        </div>
      </div>

      <div className="admin-form-group">
        <h2>Statistics</h2>
        {formState.stats?.map((stat, index) => (
          <div key={index} className="admin-card admin-card-small">
            <label>
              Value
              <input
                value={stat.value}
                onChange={(e) => updateField(`stats.${index}.value`, e.target.value)}
              />
            </label>
            <label>
              Label
              <input
                value={stat.label}
                onChange={(e) => updateField(`stats.${index}.label`, e.target.value)}
              />
            </label>
          </div>
        ))}
      </div>

      <div className="admin-form-actions">
        <button type="button" onClick={handleSave} className="primary-button">
          Save changes
        </button>
        <button type="button" onClick={handleReset} className="secondary-button">
          Reset defaults
        </button>
      </div>

      {message && <p className="admin-message">{message}</p>}
    </section>
  );
}

export default Home;
