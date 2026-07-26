import q1Newsletter from "../assets/newsletters/TUMAINI SICKLE CELL ORGANIZATION_QUARTER 1 NEWSLETTER.pdf";
import q2Newsletter from "../assets/newsletters/TUMAINI SICKLE CELL ORGANIZATION Q2 2026 Newsletter.pdf";
import newsletter2025 from "../assets/newsletters/TSCO Quarterly Newsletter 2025.pdf";
import newsletter3rdEdition from "../assets/newsletters/TSCO 3rd Edition Newsletter 2025.pdf";

function Blogs() {
  return (
    <div className="page">
      <h1>Newsletters</h1>
      <p>Click a newsletter to open it in a new tab and download it.</p>

      <div className="blog-newsletters">
        <div className="blog-newsletter-list">
          <div className="blog-newsletter-item">
            <a href={q1Newsletter} target="_blank" rel="noopener noreferrer" download>
              TSCO Quarter 1 Newsletter
            </a>
          </div>
          <div className="blog-newsletter-item">
            <a href={q2Newsletter} target="_blank" rel="noopener noreferrer" download>
              TSCO Q2 2026 Newsletter
            </a>
          </div>
          <div className="blog-newsletter-item">
            <a href={newsletter2025} target="_blank" rel="noopener noreferrer" download>
              TSCO Quarterly Newsletter 2025
            </a>
          </div>
          <div className="blog-newsletter-item">
            <a href={newsletter3rdEdition} target="_blank" rel="noopener noreferrer" download>
              TSCO 3rd Edition Newsletter 2025
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blogs;