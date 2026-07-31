const CONTACT_CONTENT_KEY = "tscoContactContent";

const defaultContactContent = {
  heading: "Get in Touch",
  intro: "Have questions or want to learn more about our organization? Reach out to us!",
  email: "info@tumainisicklecell.org",
  phone: "+254715873713",
  location: "Opposite Jaramogi Oginga Odinga Teaching and Referral Hospital, Red Cross Compound",
  image: "",
  formTitle: "Send us a Message",
  additionalLinks: [],
  socialLinks: {
    facebook: "https://www.facebook.com/TumainiSickleCellOrganization",
    linkedin: "https://www.linkedin.com/company/tumainisicklecellorganization",
    instagram: "https://www.instagram.com/tumainisicklecellorganization?igsh=NXEweHZvOXNiY3Jp&utm_source=qr",
  },
  socialLabels: {
    facebook: "Tumaini Sickle Cell Organization",
    linkedin: "Tumaini Sickle Cell Organization",
    instagram: "tumainisicklecellorganization",
  },
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

export function getContactContent() {
  try {
    const stored = localStorage.getItem(CONTACT_CONTENT_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return mergeContent(defaultContactContent, parsed);
    }
  } catch (error) {
    console.warn("Failed to parse contact content", error);
  }
  return defaultContactContent;
}

export function saveContactContent(content) {
  localStorage.setItem(CONTACT_CONTENT_KEY, JSON.stringify(content));
  window.dispatchEvent(new Event("contactContentUpdated"));
}

export function resetContactContent() {
  localStorage.removeItem(CONTACT_CONTENT_KEY);
  window.dispatchEvent(new Event("contactContentUpdated"));
  return defaultContactContent;
}

export function getDefaultContactContent() {
  return defaultContactContent;
}
