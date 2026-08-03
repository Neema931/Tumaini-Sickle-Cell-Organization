const GALLERY_CONTENT_KEY = "tscoGalleryContent";

const defaultGalleryContent = {
  extras: [],
  hidden: [],
};

function mergeContent(defaults, stored) {
  if (!stored || typeof stored !== "object") {
    return defaults;
  }

  return {
    extras: Array.isArray(stored.extras) ? stored.extras : defaults.extras,
    hidden: Array.isArray(stored.hidden) ? stored.hidden : defaults.hidden,
  };
}

export function getGalleryContent() {
  try {
    const stored = localStorage.getItem(GALLERY_CONTENT_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return mergeContent(defaultGalleryContent, parsed);
    }
  } catch (error) {
    console.warn("Failed to parse gallery content", error);
  }

  return defaultGalleryContent;
}

export function saveGalleryContent(content) {
  localStorage.setItem(GALLERY_CONTENT_KEY, JSON.stringify(content));
  window.dispatchEvent(new Event("galleryContentUpdated"));
}

export function resetGalleryContent() {
  localStorage.removeItem(GALLERY_CONTENT_KEY);
  window.dispatchEvent(new Event("galleryContentUpdated"));
  return defaultGalleryContent;
}

export function getDefaultGalleryContent() {
  return defaultGalleryContent;
}
