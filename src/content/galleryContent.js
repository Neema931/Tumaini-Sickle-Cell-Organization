const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
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
  return defaultGalleryContent;
}

export async function fetchGalleryContent() {
  try {
    const response = await fetch(`${API_BASE_URL}/content/gallery`);
    if (!response.ok) {
      throw new Error("Failed to fetch gallery content");
    }
    const content = await response.json();
    return mergeContent(defaultGalleryContent, content);
  } catch (error) {
    console.warn("Failed to fetch gallery content", error);
    return defaultGalleryContent;
  }
}

export async function saveGalleryContent(content) {
  try {
    const response = await fetch(`${API_BASE_URL}/content/gallery`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });
    if (!response.ok) {
      throw new Error("Failed to save gallery content");
    }
    const savedContent = await response.json();
    window.dispatchEvent(new Event("galleryContentUpdated"));
    return savedContent;
  } catch (error) {
    console.warn("Failed to save gallery content", error);
    throw error;
  }
}

export async function resetGalleryContent() {
  try {
    const defaultContent = defaultGalleryContent;
    await saveGalleryContent(defaultContent);
    return defaultContent;
  } catch (error) {
    return defaultGalleryContent;
  }
}

export function getDefaultGalleryContent() {
  return defaultGalleryContent;
}
