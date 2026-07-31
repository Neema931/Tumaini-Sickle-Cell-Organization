import { useEffect, useState } from "react";
import {
  getBlogContent,
  saveBlogContent,
  getDefaultBlogContent,
} from "../../content/blogContent";

function Blogs() {
  const [formState, setFormState] = useState(getBlogContent());
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleUpdate = () => setFormState(getBlogContent());
    window.addEventListener("blogContentUpdated", handleUpdate);
    return () => window.removeEventListener("blogContentUpdated", handleUpdate);
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
        ...current.blogs,
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
      blogs: current.blogs.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSave = () => {
    saveBlogContent(formState);
    setMessage("Blog content saved.");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleReset = () => {
    const defaults = getDefaultBlogContent();
    setFormState(defaults);
    saveBlogContent(defaults);
    setMessage("Blog content reset to defaults.");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <section className="admin-page-card">
      <h1>Manage Blog / Newsletter Page</h1>
      <p>Edit newsletter items, images, and download links from the admin panel.</p>

      <div className="admin-form-group">
        <div className="admin-form-group-header">
          <h2>Newsletter posts</h2>
          <button type="button" className="secondary-button" onClick={addPost}>
            Add post
          </button>
        </div>
        {formState.blogs.map((blog, index) => (
          <div key={blog.id} className="admin-card admin-card-small">
            <div className="admin-card-row">
              <h3>Post {index + 1}</h3>
              <button
                type="button"
                className="secondary-button admin-card-remove"
                onClick={() => removePost(index)}
              >
                Remove
              </button>
            </div>

            <label>
              Title
              <input
                value={blog.title}
                onChange={(e) => updateField(`blogs.${index}.title`, e.target.value)}
              />
            </label>
            <label>
              Description
              <textarea
                value={blog.description}
                onChange={(e) => updateField(`blogs.${index}.description`, e.target.value)}
              />
            </label>
            <label>
              Cover image upload
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(`blogs.${index}.cover_image`, e.target.files?.[0])}
              />
            </label>
            <label>
              PDF file upload or URL
              <input
                type="text"
                value={blog.pdf_url}
                onChange={(e) => updateField(`blogs.${index}.pdf_url`, e.target.value)}
                placeholder="Paste PDF URL or choose file"
              />
            </label>
            <label>
              Upload PDF
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => handleFileChange(`blogs.${index}.pdf_url`, e.target.files?.[0])}
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
        ))}
      </div>

      <div className="admin-form-actions">
        <button type="button" className="primary-button" onClick={handleSave}>
          Save Blog Content
        </button>
        <button type="button" className="secondary-button" onClick={handleReset}>
          Reset Defaults
        </button>
      </div>

      {message && <div className="admin-message">{message}</div>}
    </section>
  );
}

export default Blogs;
