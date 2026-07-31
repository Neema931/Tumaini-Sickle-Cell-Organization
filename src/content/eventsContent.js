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

export function getEventsContent() {
  try {
    const stored = localStorage.getItem(EVENTS_CONTENT_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return mergeContent(defaultEventsContent, parsed);
    }
  } catch (error) {
    console.warn("Failed to parse events content", error);
  }

  return defaultEventsContent;
}

export function saveEventsContent(content) {
  localStorage.setItem(EVENTS_CONTENT_KEY, JSON.stringify(content));
  window.dispatchEvent(new Event("eventsContentUpdated"));
}

export function resetEventsContent() {
  localStorage.removeItem(EVENTS_CONTENT_KEY);
  window.dispatchEvent(new Event("eventsContentUpdated"));
  return defaultEventsContent;
}

export function getDefaultEventsContent() {
  return defaultEventsContent;
}
