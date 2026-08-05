const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
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
  return defaultContactContent;
}

export async function fetchContactContent() {
  try {
    const response = await fetch(`${API_BASE_URL}/content/contact`);
    if (!response.ok) {
      throw new Error("Failed to fetch contact content");
    }
    const content = await response.json();
    return mergeContent(defaultContactContent, content);
  } catch (error) {
    console.warn("Failed to fetch contact content", error);
    return defaultContactContent;
  }
}

export async function saveContactContent(content) {
  try {
    const response = await fetch(`${API_BASE_URL}/content/contact`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });
    if (!response.ok) {
      throw new Error("Failed to save contact content");
    }
    const savedContent = await response.json();
    window.dispatchEvent(new Event("contactContentUpdated"));
    return savedContent;
  } catch (error) {
    console.warn("Failed to save contact content", error);
    throw error;
  }
}

export async function resetContactContent() {
  try {
    const defaultContent = defaultContactContent;
    await saveContactContent(defaultContent);
    return defaultContent;
  } catch (error) {
    return defaultContactContent;
  }
}

export function getDefaultContactContent() {
  return defaultContactContent;
}
