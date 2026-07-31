import { useEffect, useState } from "react";
import {
  getEventsContent,
  saveEventsContent,
  getDefaultEventsContent,
  resetEventsContent,
} from "../../content/eventsContent";

function Events() {
  const [formState, setFormState] = useState(() => getEventsContent());
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleUpdate = () => setFormState(getEventsContent());
    window.addEventListener("eventsContentUpdated", handleUpdate);
    return () => window.removeEventListener("eventsContentUpdated", handleUpdate);
  }, []);

  const updateEvent = (index, field, value) => {
    const next = {
      ...formState,
      events: formState.events.map((event, eventIndex) =>
        eventIndex === index
          ? {
              ...event,
              [field]: value,
            }
          : event
      ),
    };
    setFormState(next);
  };

  const updateEventImage = (index, imageIndex, value) => {
    const next = {
      ...formState,
      events: formState.events.map((event, eventIdx) => {
        if (eventIdx !== index) {
          return event;
        }

        return {
          ...event,
          images: event.images.map((image, imagePosition) =>
            imagePosition === imageIndex ? value : image
          ),
        };
      }),
    };
    setFormState(next);
  };

  const handleSave = () => {
    saveEventsContent(formState);
    setMessage("Events content saved.");
    setTimeout(() => setMessage(""), 2500);
  };

  const handleReset = () => {
    const defaults = getDefaultEventsContent();
    setFormState(defaults);
    resetEventsContent();
    setMessage("Events content reset to defaults.");
    setTimeout(() => setMessage(""), 2500);
  };

  return (
    <section className="admin-page-card">
      <h1>Manage Events</h1>
      <p>Update the hero title, featured image, and event card content below.</p>

      <div className="admin-form-group">
        <label>
          Hero title
          <input
            value={formState.heroTitle}
            onChange={(e) => setFormState({ ...formState, heroTitle: e.target.value })}
          />
        </label>
      </div>

      <div className="admin-form-group">
        <h2>Event cards</h2>
        {formState.events.map((event, index) => (
          <div key={event.id ?? index} className="admin-card admin-card-small">
            <label>
              Title
              <input
                value={event.title}
                onChange={(e) => updateEvent(index, "title", e.target.value)}
              />
            </label>

            <label>
              Description
              <textarea
                rows="4"
                value={event.description}
                onChange={(e) => updateEvent(index, "description", e.target.value)}
              />
            </label>

            <div className="admin-form-group">
              <h3>Images</h3>
              {event.images.map((image, imageIndex) => (
                <label key={`${event.id}-${imageIndex}`}>
                  Image {imageIndex + 1}
                  <input
                    value={image}
                    onChange={(e) => updateEventImage(index, imageIndex, e.target.value)}
                  />
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="admin-form-actions">
        <button type="button" className="primary-button" onClick={handleSave}>
          Save Events Content
        </button>
        <button type="button" className="secondary-button" onClick={handleReset}>
          Reset Defaults
        </button>
      </div>

      {message && <div className="admin-message">{message}</div>}
    </section>
  );
}

export default Events;
