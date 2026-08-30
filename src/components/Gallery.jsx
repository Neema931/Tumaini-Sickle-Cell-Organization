import { useEffect, useState } from "react";
import { getGalleryContent, fetchGalleryContent } from "../content/galleryContent";
import "./TSCO.css";

const galleryImageModules = import.meta.glob("../assets/**/*.{jpg,jpeg,png,webp}", {
  eager: false,
  import: "default",
});

function LazyImage({ src, alt }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageSrc(src);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "50px" }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, src]);

  return (
    <img
      ref={setRef}
      src={imageSrc || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect fill='%23e0e0e0' width='400' height='400'/%3E%3C/svg%3E"}
      alt={alt}
    />
  );
}

function Gallery() {
  const [galleryContent, setGalleryContent] = useState(getGalleryContent());
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadGallery = async () => {
      try {
        // Load image modules dynamically
        const modules = await Promise.all(
          Object.entries(galleryImageModules).map(async ([, mod]) => {
            const resolved = await mod();
            return resolved.default || resolved;
          })
        );

        if (!mounted) return;

        const builtInGalleryImages = modules.filter(Boolean).sort();
        const galleryContent = await fetchGalleryContent().catch(() => getGalleryContent());
        
        const hiddenGalleryImages = Array.isArray(galleryContent.hidden) ? galleryContent.hidden : [];
        const extraGalleryImages = Array.isArray(galleryContent.extras) ? galleryContent.extras : [];

        const filtered = builtInGalleryImages
          .concat(extraGalleryImages)
          .filter((image) => !hiddenGalleryImages.includes(image));

        setGalleryImages(filtered);
        setGalleryContent(galleryContent);
        setLoading(false);
      } catch (e) {
        console.error("Gallery load error:", e);
        setLoading(false);
      }
    };

    loadGallery();

    const handleUpdate = () => {
      loadGallery();
    };

    window.addEventListener("galleryContentUpdated", handleUpdate);
    return () => {
      mounted = false;
      window.removeEventListener("galleryContentUpdated", handleUpdate);
    };
  }, []);

  if (loading) {
    return (
      <main className="gallery-page">
        <div className="gallery-header">
          <h1>Our Gallery</h1>
        </div>
        <div className="gallery-loading">Loading gallery...</div>
      </main>
    );
  }

  return (
    <main className="gallery-page">
      <div className="gallery-header">
        <h1>Our Gallery</h1>
      </div>

      <div className="gallery-grid">
        {galleryImages.map((image, index) => (
          <div key={`${image}-${index}`} className="gallery-item">
            <LazyImage src={image} alt={`Gallery asset ${index + 1}`} />
          </div>
        ))}
      </div>
    </main>
  );
}

export default Gallery;
