const GALLERY_CONTENT_KEY = "tscoGalleryContent";

const defaultGalleryContent = {
  image: "",
  alt: "TSCO Gallery featured image",
  size: "medium",
  images: [],
};

export function getGalleryContent() {
  try {
    const stored = localStorage.getItem(GALLERY_CONTENT_KEY);
    if (!stored) {
      return { ...defaultGalleryContent };
    }

    const parsed = JSON.parse(stored);
    return {
      ...defaultGalleryContent,
      ...parsed,
    };
  } catch (error) {
    console.warn("Failed to parse gallery content", error);
    return { ...defaultGalleryContent };
  }
}

export function saveGalleryContent(content) {
  localStorage.setItem(GALLERY_CONTENT_KEY, JSON.stringify(content));
  window.dispatchEvent(new Event("galleryContentUpdated"));
}

export function resetGalleryContent() {
  localStorage.removeItem(GALLERY_CONTENT_KEY);
  window.dispatchEvent(new Event("galleryContentUpdated"));
  return { ...defaultGalleryContent };
}

export function getDefaultGalleryContent() {
  return { ...defaultGalleryContent };
}
