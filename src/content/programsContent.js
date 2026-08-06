const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || "/api";
const PROGRAMS_CONTENT_KEY = "tscoProgramsContent";

const defaultProgramsContent = {
  programs: [
    {
      id: 1,
      title: "Awareness and Education Programs",
      description:
        "Develop countrywide multi-level messaging and multi-media education and awareness strategy to inform the public about the burden of SCD.",
      images: [],
    },
    {
      id: 2,
      title: "Advocacy And Policy",
      description:
        "Our advocacy work coalesces around legislative initiatives aimed at including SCD in health budgetary allocations.",
      images: [],
    },
    {
      id: 3,
      title: "Partnerships",
      description:
        "We join with health care providers, researchers, and organizations to serve children living with or impacted by SCD.",
      images: [],
    },
  ],
};

function readStoredContent() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedValue = window.localStorage.getItem(PROGRAMS_CONTENT_KEY);
    if (!storedValue) {
      return null;
    }

    const parsedValue = JSON.parse(storedValue);
    return parsedValue && typeof parsedValue === "object" ? parsedValue : null;
  } catch (error) {
    console.warn("Failed to read programs content from storage", error);
    return null;
  }
}

function writeStoredContent(content) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(PROGRAMS_CONTENT_KEY, JSON.stringify(content));
  } catch (error) {
    console.warn("Failed to write programs content to storage", error);
  }
}

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

      if (Array.isArray(storedValue) && storedValue.length > defaultValue.length) {
        merged[key] = merged[key].concat(storedValue.slice(defaultValue.length));
      }
    } else if (typeof defaultValue === "object" && defaultValue !== null) {
      merged[key] = mergeContent(defaultValue, storedValue || {});
    } else if (storedValue !== undefined) {
      merged[key] = storedValue;
    }
  });

  return merged;
}

export function getProgramsContent() {
  return mergeContent(defaultProgramsContent, readStoredContent());
}

export async function fetchProgramsContent() {
  try {
    const response = await fetch(`${API_BASE_URL}/content/programs`);
    if (!response.ok) {
      throw new Error("Failed to fetch programs content");
    }
    const content = await response.json();
    const mergedContent = mergeContent(defaultProgramsContent, content);
    writeStoredContent(mergedContent);
    return mergedContent;
  } catch (error) {
    console.warn("Failed to fetch programs content", error);
    return getProgramsContent();
  }
}

export async function saveProgramsContent(content) {
  const payload = mergeContent(defaultProgramsContent, content || {});
  writeStoredContent(payload);

  try {
    const response = await fetch(`${API_BASE_URL}/content/programs`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error("Failed to save programs content");
    }
    const savedContent = await response.json();
    const mergedContent = mergeContent(defaultProgramsContent, savedContent || payload);
    writeStoredContent(mergedContent);
    window.dispatchEvent(new Event("programsContentUpdated"));
    return mergedContent;
  } catch (error) {
    console.warn("Failed to save programs content", error);
    window.dispatchEvent(new Event("programsContentUpdated"));
    return payload;
  }
}

export async function resetProgramsContent() {
  const defaultContent = defaultProgramsContent;
  writeStoredContent(defaultContent);
  try {
    await saveProgramsContent(defaultContent);
    return defaultContent;
  } catch (error) {
    return defaultContent;
  }
}

export function getDefaultProgramsContent() {
  return defaultProgramsContent;
}
