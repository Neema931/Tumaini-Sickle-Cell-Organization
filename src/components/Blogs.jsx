import q1Newsletter from "../assets/newsletters/TUMAINI SICKLE CELL ORGANIZATION_QUARTER 1 NEWSLETTER.pdf";
import q2Newsletter from "../assets/newsletters/TUMAINI SICKLE CELL ORGANIZATION Q2 2026 Newsletter.pdf";
import newsletter2025 from "../assets/newsletters/TSCO Quarterly Newsletter 2025.pdf";
import newsletter3rdEdition from "../assets/newsletters/TSCO 3rd Edition Newsletter 2025.pdf";

import q1Placeholder from "../assets/newsletters/q1newsletter.png";
import q2Placeholder from "../assets/newsletters/q2newsletter.png";
import newsletter2025Placeholder from "../assets/newsletters/newsletter2025.png";
import newsletter3rdEditionPlaceholder from "../assets/newsletters/newsletter3rdedition.png";

const newsletters = [
  {
    title: "TSCO Quarter 1 Newsletter",
    href: q1Newsletter,
    image: q1Placeholder,
    description: "Read the first-quarter highlights and updates from TSCO.",
  },
  {
    title: "TSCO Q2 2026 Newsletter",
    href: q2Newsletter,
    image: q2Placeholder,
    description: "Explore the latest stories and community activities from Q2.",
  },
  {
    title: "TSCO Quarterly Newsletter 2025",
    href: newsletter2025,
    image: newsletter2025Placeholder,
    description: "A recap of major initiatives and events from 2025.",
  },
  {
    title: "TSCO 3rd Edition Newsletter 2025",
    href: newsletter3rdEdition,
    image: newsletter3rdEditionPlaceholder,
    description: "Discover the third edition of our annual newsletter highlights.",
  },
];

function Blogs() {
  return (
    <div className="page">
      <h1>Newsletters</h1>
      <p>Click any card to open the newsletter in a new tab and download it.</p>

      <div className="blog-newsletters">
        <div className="blog-newsletter-list">
          {newsletters.map((newsletter) => (
            <a
              key={newsletter.title}
              href={newsletter.href}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="blog-newsletter-card"
            >
              <img src={newsletter.image} alt={newsletter.title} />
              <div className="blog-newsletter-content">
                <h3>{newsletter.title}</h3>
                <p>{newsletter.description}</p>
                <span>Open newsletter</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blogs;