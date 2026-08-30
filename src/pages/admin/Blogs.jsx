import { useEffect, useState } from "react";
import {
  getBlogContent,
  saveBlogContent,
  getDefaultBlogContent,
  fetchBlogContent,
} from "../../content/blogContent";

function Blogs() {
  const initialContent = getBlogContent();
  const [formState, setFormState] = useState({
    blogs: initialContent.blogs || [],
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const handleUpdate = async () => {
      try {
        console.log("Loading blog content from server...");
        const c = await fetchBlogContent();
        if (mounted) {
          console.log("Blog content loaded, updating form state:", c);
          setFormState({
            blogs: c.blogs || [],
          });
        }
      } catch (e) {
        console.error("Error loading blog content:", e);
        if (mounted) {
          const fallback = initialContent;
          console.log("Using fallback content:", fallback);
          setFormState({
            blogs: fallback.blogs || [],
          });
        }
      }
    };

    // Load immediately on mount
    handleUpdate();
    
    // Also listen for updates from other admin windows
    window.addEventListener("blogContentUpdated", handleUpdate);
    return () => {
      mounted = false;
      window.removeEventListener("blogContentUpdated", handleUpdate);
    };
  }, []);

  const updateField = (path, value) => {
    const next = JSON.parse(JSON.stringify(formState));
    const keys = path.split(".");
    let current = next;

    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        current[key] = value;
      } else {
        if (!current[key]) current[key] = {};
        current = current[key];
      }
    });

    setFormState(next);
  };

  const handleFileChange = (path, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      updateField(path, event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const addPost = () => {
    setFormState((current) => ({
      ...current,
      blogs: [
        ...(current.blogs || []),
        {
          id: Date.now(),
          title: "New Newsletter",
          description: "Add a description for this item.",
          cover_image: "",
          pdf_url: "",
        },
      ],
    }));
  };

  const removePost = (indexToRemove) => {
    setFormState((current) => ({
      ...current,
      blogs: (current.blogs || []).filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSave = async () => {
    if (!formState.blogs || formState.blogs.length === 0) {
      setMessage("No blogs to save. Add at least one blog post.");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    setIsLoading(true);
    try {
      console.log("Saving blog content:", formState);
      await saveBlogContent(formState);
      setMessage("Blog content saved successfully!");
      console.log("Blog content saved, now refreshing...");
      
      // Wait a bit for backend to persist, then refresh
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      try {
        const updated = await fetchBlogContent();
        console.log("Fetched updated blog content:", updated);
        setFormState({
          blogs: updated.blogs || formState.blogs, // Fallback to current if fetch fails
        });
      } catch (error) {
        console.error("Error refreshing blog content after save:", error);
        // Keep current state if refresh fails
      }
      
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error saving blog content:", error);
      setMessage(`Error saving: ${error.message}`);
      setTimeout(() => setMessage(""), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async () => {
    const defaults = getDefaultBlogContent();
    setFormState({
      blogs: defaults.blogs || [],
    });
    
    setIsLoading(true);
    try {
      console.log("Resetting to defaults:", defaults);
      await saveBlogContent(defaults);
      setMessage("Blog content reset to defaults successfully!");
      console.log("Blog content reset, now refreshing...");
      
      // Wait a bit for backend to persist, then refresh
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      try {
        const updated = await fetchBlogContent();
        console.log("Fetched updated blog content after reset:", updated);
        setFormState({
          blogs: updated.blogs || defaults.blogs,
        });
      } catch (error) {
        console.error("Error refreshing blog content after reset:", error);
        // Keep current state if refresh fails
      }
      
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error resetting blog content:", error);
      setMessage(`Error resetting: ${error.message}`);
      setTimeout(() => setMessage(""), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="admin-page-card">
      <h1>Manage Blog / Newsletter Page</h1>
      <p>Edit newsletter items, images, and download links from the admin panel.</p>

      <div className="admin-form-group">
        <div className="admin-form-group-header">
          <h2>Newsletter posts</h2>
          <button 
            type="button" 
            className="secondary-button" 
            onClick={addPost}
            disabled={isLoading}
          >
            Add post
          </button>
        </div>
        {formState.blogs && formState.blogs.length > 0 ? (
          formState.blogs.map((blog, index) => (
            <div key={blog.id} className="admin-card admin-card-small">
              <div className="admin-card-row">
                <h3>Post {index + 1}</h3>
                <button
                  type="button"
                  className="secondary-button admin-card-remove"
                  onClick={() => removePost(index)}
                  disabled={isLoading}
                >
                  Remove
                </button>
              </div>

              <label>
                Title
                <input
                  value={blog.title || ""}
                  onChange={(e) => updateField(`blogs.${index}.title`, e.target.value)}
                  disabled={isLoading}
                />
              </label>
              <label>
                Description
                <textarea
                  value={blog.description || ""}
                  onChange={(e) => updateField(`blogs.${index}.description`, e.target.value)}
                  disabled={isLoading}
                />
              </label>
              <label>
                Cover image upload
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(`blogs.${index}.cover_image`, e.target.files?.[0])}
                  disabled={isLoading}
                />
              </label>
              <label>
                PDF file upload or URL
                <input
                  type="text"
                  value={blog.pdf_url || ""}
                  onChange={(e) => updateField(`blogs.${index}.pdf_url`, e.target.value)}
                  placeholder="Paste PDF URL or choose file"
                  disabled={isLoading}
                />
              </label>
              <label>
                Upload PDF
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => handleFileChange(`blogs.${index}.pdf_url`, e.target.files?.[0])}
                  disabled={isLoading}
                />
              </label>
              {blog.cover_image && typeof blog.cover_image === "string" && blog.cover_image.startsWith("data:") && (
                <img
                  src={blog.cover_image}
                  alt={`Cover preview ${index + 1}`}
                  className="admin-image-preview"
                />
              )}
            </div>
          ))
        ) : (
          <p style={{ color: "#666", padding: "1rem" }}>No blog posts yet. Click "Add post" to create one.</p>
        )}
      </div>

      <div className="admin-form-actions">
        <button 
          type="button" 
          className="primary-button" 
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Blog Content"}
        </button>
        <button 
          type="button" 
          className="secondary-button" 
          onClick={handleReset}
          disabled={isLoading}
        >
          {isLoading ? "Resetting..." : "Reset Defaults"}
        </button>
      </div>

      {message && <div className="admin-message">{message}</div>}
    </section>
  );
}

export default Blogs;
