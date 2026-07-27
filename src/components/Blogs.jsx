import q1Cover from "../assets/newsletters/q1newsletter.png";
import q2Cover from "../assets/newsletters/q2newsletter.png";
import Cover from "../assets/newsletters/newsletter2025.png";
import thirdCover from "../assets/newsletters/newsletter3rdedition.png";
import pdfQ12026 from "../assets/newsletters/TUMAINI SICKLE CELL ORGANIZATION_QUARTER 1 NEWSLETTER.pdf";
import pdfQ22026 from "../assets/newsletters/TUMAINI SICKLE CELL ORGANIZATION Q2 2026 Newsletter.pdf";
import pdf2025 from "../assets/newsletters/TSCO 3rd Edition Newsletter 2025.pdf";
import pdfQ12025 from "../assets/newsletters/TSCO Quarterly Newsletter 2025.pdf";

function Blogs() {
  const newsletters = [
    {
      id: 1,
      title: "Quarter 1 Newsletter 2026",
      description: "Read the latest TSCO updates from the first quarter of 2026.",
      cover_image: q1Cover,
      pdf_url: pdfQ12026,
    },
    {
      id: 2,
      title: "Quarter 2 Newsletter 2026",
      description: "Stay informed with events, updates, and community news.",
      cover_image: q2Cover,
      pdf_url: pdfQ22026,
    },
    {
      id: 3,
      title: "3rd Edition Newsletter 2025",
      description: "A special edition newsletter covering TSCO milestones.",
      cover_image: thirdCover,
      pdf_url: pdf2025,
    },
    {
      id: 4,
      title: "Quarter 1 Newsletter 2025",
      description: "Archive newsletter with updates from early 2025.",
      cover_image: Cover,
      pdf_url: pdfQ12025,
    },
  ];

  return (
    <div className="page">
      <h1>Newsletters</h1>
      <p>Click any card to download and read the newsletter PDF.</p>

      <div className="blog-newsletters">
        <div className="blog-newsletter-list">
          {newsletters.map((newsletter) => (
            <a
              key={newsletter.id}
              href={newsletter.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="blog-newsletter-card"
            >
              <img src={newsletter.cover_image} alt={newsletter.title} />
              <div className="blog-newsletter-content">
                <h3>{newsletter.title}</h3>
                <p>{newsletter.description}</p>
                <span>Download</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blogs;