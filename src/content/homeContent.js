const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const defaultHomeContent = {
  heroSlides: [
    {
      image: "hero1",
      tag: "Community Health & Support",
      title: "Bringing Hope to Sickle Cell Warriors",
      subtitle:
        "Comprehensive care, advocacy, and life-changing support for families living with sickle cell disease.",
      buttonText: "Donate Now",
      buttonLink: "/donate",
    },
    {
      image: "hero2",
      tag: "Care, Awareness, Action",
      title: "Together We Can Save Lives",
      subtitle:
        "Join our mission to improve health outcomes, educate communities, and support every patient.",
      buttonText: "",
      buttonLink: "",
    },
    {
      image: "hero3",
      tag: "Strength Through Community",
      title: "Support that Changes Lives",
      subtitle:
        "Our programs give patients and families the resources they need to thrive.",
      buttonText: "Learn More",
      buttonLink: "/about",
    },
    {
      image: "hero1",
      tag: "Awareness and Action",
      title: "Educating the Next Generation",
      subtitle:
        "We bring knowledge and care to communities affected by sickle cell disease.",
      buttonText: "",
      buttonLink: "",
    },
    {
      image: "hero2",
      tag: "Hope in Every Step",
      title: "Join Our Movement",
      subtitle:
        "Together we can create healthier futures for people living with sickle cell disease.",
      buttonText: "Donate Now",
      buttonLink: "/donate",
    },
  ],
  aboutCards: [
    {
      image: "noela",
      title: "Who we are",
      text: "Tumaini Sickle Cell Organization is an NGO based in western kenya.....",
      linkText: "Learn More →",
      linkUrl: "/about",
    },
    {
      image: "hero3",
      title: "What We Do",
      text: "We are a dedicated initiative that aims to make a significant impact in the lives of individuals affected by sickle cell disease.",
      linkText: "Learn More →",
      linkUrl: "/about",
    },
  ],
  programs: {
    title: "Our Programs",
    description:
      "Discover our impactful programs designed to support those affected by sickle cell disease.",
    items: [
      "Healthcare Support →",
      "Educational Workshops →",
      "Community Outreach →",
      "Advocacy →",
      "Research Initiatives →",
    ],
    linkText: "Programs →",
    linkUrl: "/programs",
  },
  stats: [
    { value: "500+", label: "Individuals Supported" },
    { value: "20+", label: "Community Events" },
    { value: "10+", label: "Educational Workshops" },
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

export function getHomeContent() {
  return defaultHomeContent;
}

export async function fetchHomeContent() {
  try {
    const response = await fetch(`${API_BASE_URL}/content/home`);
    if (!response.ok) {
      throw new Error("Failed to fetch home content");
    }
    const content = await response.json();
    return mergeContent(defaultHomeContent, content);
  } catch (error) {
    console.warn("Failed to fetch home content", error);
    return defaultHomeContent;
  }
}

export async function saveHomeContent(content) {
  try {
    const response = await fetch(`${API_BASE_URL}/content/home`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });
    if (!response.ok) {
      throw new Error("Failed to save home content");
    }
    const savedContent = await response.json();
    window.dispatchEvent(new Event("homeContentUpdated"));
    return savedContent;
  } catch (error) {
    console.warn("Failed to save home content", error);
    throw error;
  }
}

export async function resetHomeContent() {
  try {
    const resetContent = defaultHomeContent;
    await saveHomeContent(resetContent);
    return resetContent;
  } catch (error) {
    return defaultHomeContent;
  }
}

export function getDefaultHomeContent() {
  return defaultHomeContent;
}
