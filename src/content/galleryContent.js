const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || "/api";
const GALLERY_CONTENT_KEY = "tscoGalleryContent";

const defaultGalleryContent = {
  extras: [],
  hidden: [],
};

function readStoredContent() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedValue = window.localStorage.getItem(GALLERY_CONTENT_KEY);
    if (!storedValue) {
      return null;
    }

    const parsedValue = JSON.parse(storedValue);
    return parsedValue && typeof parsedValue === "object" ? parsedValue : null;
  } catch (error) {
    console.warn("Failed to read gallery content from storage", error);
    return null;
  }
}

function writeStoredContent(content) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(GALLERY_CONTENT_KEY, JSON.stringify(content));
  } catch (error) {
    console.warn("Failed to write gallery content to storage", error);
  }
}

function mergeContent(defaults, stored) {
  if (!stored || typeof stored !== "object") {
    return defaults;
  }

  return {
    ...defaults,
    ...stored,
    extras: Array.isArray(stored.extras) ? stored.extras : defaults.extras,
    hidden: Array.isArray(stored.hidden) ? stored.hidden : defaults.hidden,
  };
}

export function getGalleryContent() {
  return mergeContent(defaultGalleryContent, readStoredContent());
}

export async function fetchGalleryContent() {
  try {
    const response = await fetch(`${API_BASE_URL}/content/gallery`);
    if (!response.ok) {
      throw new Error("Failed to fetch gallery content");
    }
    const content = await response.json();
    const mergedContent = mergeContent(defaultGalleryContent, content);
    writeStoredContent(mergedContent);
    return mergedContent;
  } catch (error) {
    console.warn("Failed to fetch gallery content", error);
    return getGalleryContent();
  }
}

export async function saveGalleryContent(content) {
  const payload = mergeContent(defaultGalleryContent, content || {});
  writeStoredContent(payload);

  try {
    const response = await fetch(`${API_BASE_URL}/content/gallery`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error("Failed to save gallery content");
    }
    const savedContent = await response.json();
    const mergedContent = mergeContent(defaultGalleryContent, savedContent || payload);
    writeStoredContent(mergedContent);
    window.dispatchEvent(new Event("galleryContentUpdated"));
    return mergedContent;
  } catch (error) {
    console.warn("Failed to save gallery content", error);
    window.dispatchEvent(new Event("galleryContentUpdated"));
    return payload;
  }
}

export async function resetGalleryContent() {
  const defaultContent = defaultGalleryContent;
  writeStoredContent(defaultContent);
  try {
    await saveGalleryContent(defaultContent);
    return defaultContent;
  } catch (error) {
    return defaultContent;
  }
}

export function getDefaultGalleryContent() {
  return defaultGalleryContent;
}
