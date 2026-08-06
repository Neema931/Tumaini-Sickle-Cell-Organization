const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || "/api";
const ABOUT_CONTENT_KEY = "tscoAboutContent";

const defaultAboutContent = {
  director: {
    image: "directorImg",
    role: "Executive Director",
    heading: "Message from the Director",
    message:
      "Welcome to Tumaini Sickle Cell Organization (TSCO). Our mission is to bring hope to SCD warriors and their families by advancing awareness, education, treatment, and research, while expanding access to health, education, agriculture, and livelihoods through empowering, participatory initiatives.",
    quote:
      "Together we can create a future where every sickle cell warrior receives the care, dignity, and opportunity they deserve.",
  },
  aboutSection: {
    heading: "About Us",
    paragraphs: [
      "Tumaini Sickle Cell Organization (TSCO) is a Kenyan-led, community-centered non-profit organization established under the Public Benefits Organization (PBO) Act of 2013, dedicated to improving the survival, health, dignity, and socio-economic wellbeing of children and families affected by sickle cell disease across the Lake Endemic Region of Western Kenya.",
      "Guided by a rights-based, equity-driven approach, TSCO integrates chronic disease management, malaria prevention, child health, nutrition, and socio-economic empowerment to build resilient communities.",
    ],
    galleryImages: ["bloodImg", "loveImg"],
  },
  visionMission: {
    visionHeading: "Our Vision",
    visionText: "Promoting Children’s Health, Education, and Potential.",
    missionHeading: "Our Mission",
    missionText:
      "To bring hope to SCD warriors and their families by advancing awareness, education, treatment, and research, while expanding access to health, education, agriculture, and livelihoods through empowering, participatory initiatives.",
  },
  coreValues: [
    { label: "Responsiveness", text: "Timely, accessible services." },
    { label: "Empathy", text: "Understanding lived experiences." },
    { label: "Innovation", text: "Creative, evidence-based solutions." },
    { label: "Teamwork", text: "Collaboration and partnerships." },
    { label: "Transparency & Accountability", text: "Openness and responsibility." },
  ],
  strategicPillars: [
    "Community Outreach & Awareness: School sensitization, workshops, sporting events, peer mentorship, and creative platforms like WarriorSpeaks! and Teen Talent Festival.",
    "Advocacy & Policy Engagement: Legislative initiatives to secure SCD inclusion in health budgets and strengthen public healthcare delivery.",
    "Patient & Caregiver Support: Counseling, psychosocial support, medical camps, access to essential medication, nutrition education, referral networks, and caregiver training.",
    "Socio-Economic Empowerment: Vocational training and income-generating projects to strengthen household resilience.",
    "Research & Innovation: Evidence generation through partnerships with universities and health experts to improve SCD outcomes.",
    "Integrated Disease Prevention: Holistic care addressing malaria, HIV, TB, malnutrition, and mental health.",
  ],
  partnerships: {
    heading: "Partnerships",
    text: "TSCO collaborates with county governments, healthcare institutions, research bodies, and global agencies including PfiWHO, UNICEF, The Global Fund, CDC, Amref Health Africa, and Kenya Medical Research Institute. Through these alliances, we scale evidence-based interventions and strengthen health systems for underserved communities.",
  },
  sdgs: [
    { goal: "SDG 3 (Health & Wellbeing)", text: "Integrated healthcare and malaria prevention." },
    { goal: "SDG 1 (No Poverty)", text: "Economic empowerment for caregivers." },
    { goal: "SDG 4 (Quality Education)", text: "School-based awareness and child support." },
    { goal: "SDG 5 (Gender Equality)", text: "Empowering mothers and female caregivers." },
    { goal: "SDG 10 (Reduced Inequalities)", text: "Equitable healthcare advocacy." },
    { goal: "SDG 17 (Partnerships)", text: "Strategic collaborations for impact." },
  ],
  boardMembers: [
    { name: "George Ariya", img: "george", role: "Chairman" },
    { name: "Veronica Bitta", img: "directorImg", role: "Executive Director" },
    { name: "John Ayugu", img: "ayugu", role: "Treasurer" },
    { name: "Emma Otieno", img: "emma", role: "Pediatric Clinician" },
    { name: "Brenda Sinzore", img: "brenda", role: "Board Member" },
    { name: "Valerie Okello", img: "val", role: "Board Member" },
    { name: "Alex Liyayi", img: "alex", role: "Board Member" },
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

export function getAboutContent() {
  return defaultAboutContent;
}

export async function fetchAboutContent() {
  try {
    const response = await fetch(`${API_BASE_URL}/content/about`);
    if (!response.ok) {
      throw new Error("Failed to fetch about content");
    }
    const content = await response.json();
    return mergeContent(defaultAboutContent, content);
  } catch (error) {
    console.warn("Failed to fetch about content", error);
    return defaultAboutContent;
  }
}

export async function saveAboutContent(content) {
  try {
    const response = await fetch(`${API_BASE_URL}/content/about`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });
    if (!response.ok) {
      throw new Error("Failed to save about content");
    }
    const savedContent = await response.json();
    window.dispatchEvent(new Event("aboutContentUpdated"));
    return savedContent;
  } catch (error) {
    console.warn("Failed to save about content", error);
    throw error;
  }
}

export async function resetAboutContent() {
  try {
    const defaultContent = defaultAboutContent;
    await saveAboutContent(defaultContent);
    return defaultContent;
  } catch (error) {
    return defaultAboutContent;
  }
}

export function getDefaultAboutContent() {
  return defaultAboutContent;
}
