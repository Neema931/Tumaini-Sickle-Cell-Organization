import { useEffect, useState } from "react";
import { getGalleryContent, fetchGalleryContent } from "../content/galleryContent";
import "./TSCO.css";

const galleryImageModules = import.meta.glob("../assets/**/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

function Gallery() {
  const [galleryContent, setGalleryContent] = useState(getGalleryContent());

  useEffect(() => {
    const updateGalleryContent = () => {
      fetchGalleryContent().then(setGalleryContent).catch(() => {
        setGalleryContent(getGalleryContent());
      });
    };

    updateGalleryContent();
    window.addEventListener("galleryContentUpdated", updateGalleryContent);
    return () => window.removeEventListener("galleryContentUpdated", updateGalleryContent);
  }, []);

  const builtInGalleryImages = Object.entries(galleryImageModules)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([, source]) => source)
    .filter(Boolean);

  const hiddenGalleryImages = Array.isArray(galleryContent.hidden) ? galleryContent.hidden : [];
  const extraGalleryImages = Array.isArray(galleryContent.extras) ? galleryContent.extras : [];

  const galleryImages = builtInGalleryImages
    .concat(extraGalleryImages)
    .filter((image) => !hiddenGalleryImages.includes(image));

  return (
    <main className="gallery-page">
      <div className="gallery-header">
        <h1>Our Gallery</h1>
      </div>

      <div className="gallery-grid">
        {galleryImages.map((image, index) => (
          <div key={`${image}-${index}`} className="gallery-item">
            <img src={image} alt={`Gallery asset ${index + 1}`} />
          </div>
        ))}
      </div>
    </main>
  );
}

export default Gallery;
