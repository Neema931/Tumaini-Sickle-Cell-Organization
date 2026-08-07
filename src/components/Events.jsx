import { useEffect, useState } from "react";
import "./TSCO.css";
import { getEventsContent, fetchEventsContent } from "../content/eventsContent";

function Events() {
  const [eventsContent, setEventsContent] = useState(getEventsContent());
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const updateEventsContent = async () => {
      setUpdating(true);
      try {
        const content = await fetchEventsContent();
        setEventsContent(content);
      } catch (error) {
        setEventsContent(getEventsContent());
      } finally {
        setUpdating(false);
      }
    };

    updateEventsContent();
    window.addEventListener("eventsContentUpdated", updateEventsContent);
    return () => window.removeEventListener("eventsContentUpdated", updateEventsContent);
  }, []);

  const heroImage = eventsContent?.heroImage || "";

  return (
    <div className="gallery-page events-page">
      <div className="gallery-grid events-grid">
        <section className="upcoming-events">
          <div className="image-card">
            <div className="upcoming-events-header">
              <h2>{eventsContent.heroTitle || "Upcoming Events"}</h2>
            </div>
            <div className="upcoming-events-content">
              <img src={heroImage} alt="Upcoming event highlight" />
            </div>
          </div>
        </section>

        <h2>PAST EVENTS</h2>

        {Array.isArray(eventsContent.events) && eventsContent.events.length > 0 ? (
          eventsContent.events.map((event, index) => (
            <section key={event.id ?? `${event.title}-${index}`} className="gallery-card">
              <div className="card-images">
                {(event.images || []).map((image, imageIndex) => (
                  <img key={`${event.title}-${imageIndex}`} src={image} alt={`${event.title} ${imageIndex + 1}`} />
                ))}
              </div>

              <div className="card-content">
                <h2>{event.title}</h2>
                <div
                  className="event-description"
                  dangerouslySetInnerHTML={{ __html: event.description || "" }}
                />
              </div>
            </section>
          ))
        ) : (
          <p>No event items are currently available.</p>
        )}
      </div>      {updating && (
        <div className="events-updating-banner">Updating events…</div>
      )}    </div>
  );
}

export default Events;