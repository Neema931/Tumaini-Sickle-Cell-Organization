const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
const PROGRAMS_CONTENT_KEY = "tscoProgramsContent";

const defaultProgramsContent = {
  programs: [
    {
      id: 1,
      title: "Awareness and Education Programs",
      description:
        "Develop countrywide multi-level messaging and multi-media education and awareness strategy to inform the public about the burden of SCD.",
      details: [
        "We raise awareness on the impact of SCD on health, education, social and economic well-being.",
        "We hold educational workshops, focus group discussions, panel discussions, advocacy lectures, and webinars.",
      ],
    },
    {
      id: 2,
      title: "Advocacy And Policy",
      description:
        "Our advocacy work coalesces around legislative initiatives aimed at including SCD in health budgetary allocations.",
      details: [
        "We work with Parliamentary, Senate, and County Assembly champions to raise awareness for SCD.",
        "Together with the county MOH department, we advocate for funding organizations to provide resources for SCD research.",
      ],
    },
    {
      id: 3,
      title: "Partnerships",
      description:
        "We join with health care providers, researchers, and organizations to serve children living with or impacted by SCD.",
      details: [
        "Collaborative efforts with public and private healthcare providers, NGOs, and support groups provide direction in positioning SCD as a recognized public health concern.",
        "Partnerships with hospitals and blood banks help create sustainable donation drives.",
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

export function getProgramsContent() {
  return defaultProgramsContent;
}

export async function fetchProgramsContent() {
  try {
    const response = await fetch(`${API_BASE_URL}/content/programs`);
    if (!response.ok) {
      throw new Error("Failed to fetch programs content");
    }
    const content = await response.json();
    return mergeContent(defaultProgramsContent, content);
  } catch (error) {
    console.warn("Failed to fetch programs content", error);
    return defaultProgramsContent;
  }
}

export async function saveProgramsContent(content) {
  try {
    const response = await fetch(`${API_BASE_URL}/content/programs`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });
    if (!response.ok) {
      throw new Error("Failed to save programs content");
    }
    const savedContent = await response.json();
    window.dispatchEvent(new Event("programsContentUpdated"));
    return savedContent;
  } catch (error) {
    console.warn("Failed to save programs content", error);
    throw error;
  }
}

export async function resetProgramsContent() {
  try {
    const defaultContent = defaultProgramsContent;
    await saveProgramsContent(defaultContent);
    return defaultContent;
  } catch (error) {
    return defaultProgramsContent;
  }
}

export function getDefaultProgramsContent() {
  return defaultProgramsContent;
}
