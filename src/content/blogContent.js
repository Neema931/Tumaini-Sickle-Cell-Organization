const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || "/api";
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
  return defaultBlogContent;
}

export async function fetchBlogContent() {
  try {
    const response = await fetch(`${API_BASE_URL}/content/blog`);
    if (!response.ok) {
      throw new Error(`Failed to fetch blog content: ${response.status}`);
    }
    const content = await response.json();
    console.log("Fetched blog content from server:", content);
    
    // Return the stored content as-is, don't merge with defaults
    // This ensures saved changes are preserved
    if (content && content.blogs && Array.isArray(content.blogs)) {
      return content;
    }
    
    // If server returns empty or invalid, return defaults
    return defaultBlogContent;
  } catch (error) {
    console.error("Failed to fetch blog content:", error);
    return defaultBlogContent;
  }
}

export async function saveBlogContent(content) {
  try {
    console.log("Sending blog content to server:", content);
    const response = await fetch(`${API_BASE_URL}/content/blog`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to save blog content: ${response.status} - ${errorText}`);
    }
    const savedContent = await response.json();
    console.log("Blog content saved successfully:", savedContent);
    window.dispatchEvent(new Event("blogContentUpdated"));
    return savedContent;
  } catch (error) {
    console.error("Error saving blog content:", error);
    throw error;
  }
}

export async function resetBlogContent() {
  try {
    const defaultContent = defaultBlogContent;
    await saveBlogContent(defaultContent);
    return defaultContent;
  } catch (error) {
    return defaultBlogContent;
  }
}

export function getDefaultBlogContent() {
  return defaultBlogContent;
}
