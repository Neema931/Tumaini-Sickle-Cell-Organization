import { useEffect, useState, useRef } from "react";
import {
  getEventsContent,
  fetchEventsContent,
  saveEventsContent,
  getDefaultEventsContent,
  resetEventsContent,
} from "../../content/eventsContent";

function Events() {
  const [formState, setFormState] = useState(() => getEventsContent());
  const [message, setMessage] = useState("");
  const editorRefs = useRef({});

  useEffect(() => {
    fetchEventsContent().then(setFormState).catch(() => {});
  }, []);

  const persistFormState = (nextState) => {
    setFormState(nextState);
    saveEventsContent(nextState).catch(() => {});
  };

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
    persistFormState(next);
  };

  const applyEditorFormat = (index, command) => {
    const el = editorRefs.current[index];
    if (!el) return;
    el.focus();
    document.execCommand(command, false, null);
  };

  const uploadHeroImage = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const next = {
        ...formState,
        heroImage: event.target?.result || "",
      };
      persistFormState(next);
    };
    reader.readAsDataURL(file);
  };

  const uploadEventImage = (eventIndex, imageIndex, file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result || "";
      const next = {
        ...formState,
        events: formState.events.map((event, idx) => {
          if (idx !== eventIndex) {
            return event;
          }

          return {
            ...event,
            images: event.images.map((image, imgIdx) =>
              imgIdx === imageIndex ? imageUrl : image
            ),
          };
        }),
      };
      persistFormState(next);
    };
    reader.readAsDataURL(file);
  };

  const addEvent = () => {
    const next = {
      ...formState,
      events: [
        ...(formState.events || []),
        {
          id: Date.now(),
          title: "New Event",
          description: "",
          images: ["", "", "", ""],
        },
      ],
    };
    persistFormState(next);
  };

  const addImageSlot = (eventIndex) => {
    const next = {
      ...formState,
      events: formState.events.map((event, idx) =>
        idx === eventIndex
          ? {
              ...event,
              images: [...(event.images || []), ""],
            }
          : event
      ),
    };
    persistFormState(next);
  };

  const removeEventImage = (eventIndex, imageIndex) => {
    const next = {
      ...formState,
      events: formState.events.map((event, idx) =>
        idx === eventIndex
          ? {
              ...event,
              images: event.images.filter((_, imgIdx) => imgIdx !== imageIndex),
            }
          : event
      ),
    };
    persistFormState(next);
  };

  const removeEvent = (eventIndex) => {
    const next = {
      ...formState,
      events: formState.events.filter((_, idx) => idx !== eventIndex),
    };
    persistFormState(next);
  };

  const handleSave = async () => {
    try {
      await saveEventsContent(formState);
      window.dispatchEvent(new Event("eventsContentUpdated"));
      setMessage("Events content saved.");
    } catch (error) {
      setMessage("Failed to save events content. Try again.");
    }
    setTimeout(() => setMessage(""), 2500);
  };

  const handleReset = async () => {
    const defaults = getDefaultEventsContent();
    setFormState(defaults);
    try {
      await resetEventsContent();
      setMessage("Events content reset to defaults.");
    } catch (error) {
      setMessage("Failed to reset events content. Try again.");
    }
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
            onChange={(e) => {
              const next = { ...formState, heroTitle: e.target.value };
              persistFormState(next);
            }}
          />
        </label>

        <label>
          Upload hero image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => uploadHeroImage(e.target.files?.[0])}
          />
        </label>
      </div>

      <div className="admin-form-group">
        <div className="admin-card-row">
          <h2>Event cards</h2>
        </div>

        {formState.events.map((event, index) => (
          <div key={event.id ?? index} className="admin-card admin-card-small">
            <div className="admin-card-row">
              <h3>Event {index + 1}</h3>
              <button
                type="button"
                className="secondary-button admin-card-remove"
                onClick={() => removeEvent(index)}
              >
                Delete
              </button>
            </div>

            <label>
              Title
              <input
                value={event.title}
                onChange={(e) => updateEvent(index, "title", e.target.value)}
              />
            </label>

            <label>
              Description
              <div className="event-format-toolbar">
                <button type="button" onClick={() => applyEditorFormat(index, "bold")}>
                  <strong>B</strong>
                </button>
                <button type="button" onClick={() => applyEditorFormat(index, "italic")}>
                  <em>I</em>
                </button>
              </div>

              <div
                ref={(node) => (editorRefs.current[index] = node)}
                className="event-rich-editor"
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => updateEvent(index, "description", e.currentTarget.innerHTML)}
                dangerouslySetInnerHTML={{ __html: event.description || "" }}
              />
            </label>

            <div className="admin-form-group">
              <h3>Images</h3>
              {event.images.map((image, imageIndex) => (
                <div key={`${event.id}-${imageIndex}`} className="event-image-row">
                  <label>
                    Upload image {imageIndex + 1}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => uploadEventImage(index, imageIndex, e.target.files?.[0])}
                    />
                  </label>
                  <button
                    type="button"
                    className="secondary-button admin-image-delete"
                    onClick={() => removeEventImage(index, imageIndex)}
                  >
                    Delete image
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="secondary-button"
                onClick={() => addImageSlot(index)}
              >
                Add more images
              </button>
            </div>
          </div>
        ))}

        <button type="button" className="primary-button" onClick={addEvent}>
          Add new event
        </button>
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
