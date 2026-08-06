const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || "/api";
const EVENTS_CONTENT_KEY = "tscoEventsContent";

const defaultEventsContent = {
  heroTitle: "Upcoming Events",
  heroImage: "",
  events: [
    {
      id: 1,
      title: "THE KENYA SICKLE CELL SYMPOSIUM",
      description:
        "We joined MOH and Sickle Cell Federation of Kenya during the Kenya Sickle Cell Symposium held on 16 July 2026 at Gertrude’s Children’s Hospital, Muthaiga, Nairobi.",
      images: [
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      id: 2,
      title: "3RD NATIONAL COMMUNITY SYSTEMS STRENGTHETHING KNOWLEDGE DISSEMINATION FORUM",
      description:
        "Honored to have served as a member of the Planning Committee and Lead Rapporteur during the 3rd National Community Systems Strengthening Knowledge Dissemination Forum held in Naivasha from 23rd–25th June 2026.",
      images: [
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80",
      ],
    },
    {
      id: 3,
      title: "WORLD SICKLE CELL DAY 2026",
      description:
        "Kenya joined the global community in commemorating World Sickle Cell Day 2026 under the theme Closing the Survival Gap: Equity in Sickle Cell Disease.",
      images: [
        "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
      ],
    },
  ],
};

function readStoredContent() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedValue = window.localStorage.getItem(EVENTS_CONTENT_KEY);
    if (!storedValue) {
      return null;
    }

    const parsedValue = JSON.parse(storedValue);
    return parsedValue && typeof parsedValue === "object" ? parsedValue : null;
  } catch (error) {
    console.warn("Failed to read events content from storage", error);
    return null;
  }
}

function writeStoredContent(content) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(EVENTS_CONTENT_KEY, JSON.stringify(content));
  } catch (error) {
    console.warn("Failed to write events content to storage", error);
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
      if (Array.isArray(storedValue)) {
        const isObjectArray = defaultValue.some(
          (item) => typeof item === "object" && item !== null
        );

        if (isObjectArray) {
          const mergedArray = defaultValue.map((item, index) => {
            if (storedValue[index] !== undefined) {
              if (typeof item === "object" && item !== null) {
                return mergeContent(item, storedValue[index]);
              }
              return storedValue[index];
            }
            return item;
          });

          merged[key] = Array.isArray(storedValue) && storedValue.length > defaultValue.length
            ? mergedArray.concat(storedValue.slice(defaultValue.length))
            : mergedArray;
        } else {
          merged[key] = storedValue;
        }
      } else {
        merged[key] = defaultValue;
      }
    } else if (typeof defaultValue === "object" && defaultValue !== null) {
      merged[key] = mergeContent(defaultValue, storedValue || {});
    } else if (storedValue !== undefined) {
      merged[key] = storedValue;
    }
  });

  return merged;
}

export function getEventsContent() {
  return mergeContent(defaultEventsContent, readStoredContent());
}

export async function fetchEventsContent() {
  try {
    const response = await fetch(`${API_BASE_URL}/content/events`);
    if (!response.ok) {
      throw new Error("Failed to fetch events content");
    }
    const content = await response.json();
    const mergedContent = mergeContent(defaultEventsContent, content);
    writeStoredContent(mergedContent);
    return mergedContent;
  } catch (error) {
    console.warn("Failed to fetch events content", error);
    return getEventsContent();
  }
}

function sanitizeHtml(html) {
  if (!html || typeof html !== "string") return "";
  const allowed = new Set(["B", "STRONG", "I", "EM", "BR", "P", "UL", "OL", "LI"]);
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_ELEMENT, null, false);
    let node = walker.nextNode();
    while (node) {
      const name = node.nodeName;
      const next = walker.nextNode();
      if (!allowed.has(name)) {
        const parent = node.parentNode;
        while (node.firstChild) parent.insertBefore(node.firstChild, node);
        parent.removeChild(node);
      } else {
        for (let i = node.attributes.length - 1; i >= 0; i--) {
          node.removeAttribute(node.attributes[i].name);
        }
      }
      node = next;
    }
    return doc.body.innerHTML;
  } catch (e) {
    return "";
  }
}

export async function saveEventsContent(content) {
  const copy = JSON.parse(JSON.stringify(content || {}));
  if (Array.isArray(copy.events)) {
    copy.events = copy.events.map((ev) => ({
      ...ev,
      description: sanitizeHtml(ev.description || ""),
    }));
  }

  const payload = mergeContent(defaultEventsContent, copy);
  writeStoredContent(payload);

  try {
    const response = await fetch(`${API_BASE_URL}/content/events`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error("Failed to save events content");
    }
    const savedContent = await response.json();
    const mergedContent = mergeContent(defaultEventsContent, savedContent || payload);
    writeStoredContent(mergedContent);
    window.dispatchEvent(new Event("eventsContentUpdated"));
    return mergedContent;
  } catch (e) {
    console.warn("Failed to save events content", e);
    window.dispatchEvent(new Event("eventsContentUpdated"));
    return payload;
  }
}

export async function resetEventsContent() {
  const defaultContent = defaultEventsContent;
  writeStoredContent(defaultContent);
  try {
    await saveEventsContent(defaultContent);
    return defaultContent;
  } catch (error) {
    return defaultContent;
  }
}

export function getDefaultEventsContent() {
  return defaultEventsContent;
}
