import { useEffect, useState } from "react";

function Blogs() {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNewsletters = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/blogs`);
        const data = await response.json();
        setNewsletters(data);
      } catch (error) {
        console.error("Failed to load newsletters", error);
      } finally {
        setLoading(false);
      }
    };

    loadNewsletters();
  }, []);

  return (
    <div className="page">
      <h1>Newsletters</h1>
      <p>Click any card to open the newsletter in a new tab and download it.</p>

      {loading ? (
        <p>Loading newsletters...</p>
      ) : newsletters.length === 0 ? (
        <p>No newsletters have been published yet.</p>
      ) : (
        <div className="blog-newsletters">
          <div className="blog-newsletter-list">
            {newsletters.map((newsletter) => (
              <a
                key={newsletter.id}
                href={newsletter.pdf_url || newsletter.cover_image || "#"}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="blog-newsletter-card"
              >
                <img src={newsletter.cover_image || ""} alt={newsletter.title} />
                <div className="blog-newsletter-content">
                  <h3>{newsletter.title}</h3>
                  <p>{newsletter.description}</p>
                  <span>Open newsletter</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Blogs;