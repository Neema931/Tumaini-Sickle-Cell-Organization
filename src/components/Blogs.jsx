import { useEffect, useState } from "react";
import q1Cover from "../assets/newsletters/q1newsletter.png";
import q2Cover from "../assets/newsletters/q2newsletter.png";
import Cover from "../assets/newsletters/newsletter2025.png";
import thirdCover from "../assets/newsletters/newsletter3rdedition.png";
import pdfQ12026 from "../assets/newsletters/TUMAINI SICKLE CELL ORGANIZATION_QUARTER 1 NEWSLETTER.pdf";
import pdfQ22026 from "../assets/newsletters/TUMAINI SICKLE CELL ORGANIZATION Q2 2026 Newsletter.pdf";
import pdf2025 from "../assets/newsletters/TSCO 3rd Edition Newsletter 2025.pdf";
import pdfQ12025 from "../assets/newsletters/TSCO Quarterly Newsletter 2025.pdf";
import { getBlogContent, fetchBlogContent } from "../content/blogContent";

const fallbackCoverMap = {
  q1Cover: q1Cover,
  q2Cover: q2Cover,
  thirdCover: thirdCover,
  Cover: Cover,
};

const fallbackPdfMap = {
  pdfQ12026: pdfQ12026,
  pdfQ22026: pdfQ22026,
  pdf2025: pdf2025,
  pdfQ12025: pdfQ12025,
};

function Blogs() {
  const [newsletters, setNewsletters] = useState([]);

  useEffect(() => {
    const updateNewsletters = () => {
      fetchBlogContent().then((content) => setNewsletters(content.blogs || [])).catch(() => {
        setNewsletters(getBlogContent().blogs || []);
      });
    };

    updateNewsletters();
    window.addEventListener("blogContentUpdated", updateNewsletters);
    return () => window.removeEventListener("blogContentUpdated", updateNewsletters);
  }, []);

  const resolveCoverImage = (value) => {
    if (!value) return "";
    if (typeof value === "string" && value.startsWith("data:")) return value;
    return fallbackCoverMap[value] || value;
  };

  const resolvePdfUrl = (value) => {
    if (!value) return "";
    if (typeof value === "string" && value.startsWith("data:")) return value;
    return fallbackPdfMap[value] || value;
  };

  return (
    <div className="page">
      <h1>Newsletters</h1>
      <p>Click any card to download and read the newsletter PDF.</p>

      <div className="blog-newsletters">
        <div className="blog-newsletter-list">
          {newsletters.map((newsletter) => {
            const pdfUrl = resolvePdfUrl(newsletter.pdf_url);
            const coverImage = resolveCoverImage(newsletter.cover_image);

            return (
              <a
                key={newsletter.id}
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                download={Boolean(pdfUrl)}
                className="blog-newsletter-card"
              >
                {coverImage && <img src={coverImage} alt={newsletter.title} />}
                <div className="blog-newsletter-content">
                  <h3>{newsletter.title}</h3>
                  <p>{newsletter.description}</p>
                  <span>Download</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Blogs;