const BLOG_CONTENT_KEY = "tscoBlogContent";

const defaultBlogContent = {
  blogs: [
    {
      id: 1,
      title: "Quarter 1 Newsletter 2026",
      description: "Read the latest TSCO updates from the first quarter of 2026.",
      cover_image: "q1Cover",
      pdf_url: "pdfQ12026",
    },
    {
      id: 2,
      title: "Quarter 2 Newsletter 2026",
      description: "Stay informed with events, updates, and community news.",
      cover_image: "q2Cover",
      pdf_url: "pdfQ22026",
    },
    {
      id: 3,
      title: "3rd Edition Newsletter 2025",
      description: "A special edition newsletter covering TSCO milestones.",
      cover_image: "thirdCover",
      pdf_url: "pdf2025",
    },
    {
      id: 4,
      title: "Quarter 1 Newsletter 2025",
      description: "Archive newsletter with updates from early 2025.",
      cover_image: "Cover",
      pdf_url: "pdfQ12025",
    },
  ],
};

function mergeContent(defaults, stored) {
  if (!stored || typeof stored !== "object") {
    return defaults;
  }

  const merged = Array.isArray(defaults) ? [...defaults] : { ...defaults };

  Object.keys(defaults).forEach((key) => {
    const defaultValue = defaults[key];
    const storedValue = stored[key];

    if (Array.isArray(defaultValue)) {
      merged[key] = defaultValue.map((item, index) => {
        if (storedValue?.[index] !== undefined) {
          if (typeof item === "object" && item !== null) {
            return mergeContent(item, storedValue[index]);
          }
          return storedValue[index];
        }
        return item;
      });
    } else if (typeof defaultValue === "object" && defaultValue !== null) {
      merged[key] = mergeContent(defaultValue, storedValue || {});
    } else if (storedValue !== undefined) {
      merged[key] = storedValue;
    }
  });

  return merged;
}

export function getBlogContent() {
  try {
    const stored = localStorage.getItem(BLOG_CONTENT_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return mergeContent(defaultBlogContent, parsed);
    }
  } catch (error) {
    console.warn("Failed to parse blog content", error);
  }
  return defaultBlogContent;
}

export function saveBlogContent(content) {
  localStorage.setItem(BLOG_CONTENT_KEY, JSON.stringify(content));
  window.dispatchEvent(new Event("blogContentUpdated"));
}

export function resetBlogContent() {
  localStorage.removeItem(BLOG_CONTENT_KEY);
  window.dispatchEvent(new Event("blogContentUpdated"));
  return defaultBlogContent;
}

export function getDefaultBlogContent() {
  return defaultBlogContent;
}
