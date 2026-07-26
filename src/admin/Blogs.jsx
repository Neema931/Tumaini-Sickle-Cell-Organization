import { useState } from "react";
import "../admin/admin.css";

function Blogs() {
  const [newsletter, setNewsletter] = useState({
    title: "",
    description: "",
    cover: null,
    pdf: null,
    status: "Draft"
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewsletter({
      ...newsletter,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setNewsletter({
      ...newsletter,
      [name]: files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMessage("");

    const formData = new FormData();
    formData.append("title", newsletter.title);
    formData.append("description", newsletter.description);
    formData.append("status", newsletter.status);

    if (newsletter.cover) {
      formData.append("cover", newsletter.cover);
    }

    if (newsletter.pdf) {
      formData.append("pdf", newsletter.pdf);
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/admin/api/blogs", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.message || "Unable to save newsletter");
      }

      setStatusMessage(result.message || "Newsletter saved successfully");
      setNewsletter({ title: "", description: "", cover: null, pdf: null, status: "Draft" });
    } catch (error) {
      setStatusMessage(error.message || "Unable to save newsletter");
    } finally {
      setIsSaving(false);
    }
  };


  return (

    <div className="admin-page">

      <div className="admin-section-heading">

        <div>
          <h2>Newsletter Management</h2>
          <p>
            Upload and manage TSCO newsletters.
          </p>
        </div>

      </div>


      <div className="admin-form-card">

        <form onSubmit={handleSubmit}>


          <label>
            Newsletter Title
          </label>

          <input
            type="text"
            name="title"
            placeholder="e.g. July 2026 Newsletter"
            value={newsletter.title}
            onChange={handleChange}
          />



          <label>
            Description
          </label>

          <textarea
            name="description"
            placeholder="Short description about the newsletter"
            value={newsletter.description}
            onChange={handleChange}
          />



          <label>
            Cover Image
          </label>

          <input
            type="file"
            name="cover"
            accept="image/*"
            onChange={handleFileChange}
          />



          <label>
            Newsletter PDF
          </label>

          <input
            type="file"
            name="pdf"
            accept="application/pdf"
            onChange={handleFileChange}
          />



          <label>
            Status
          </label>

          <select
            name="status"
            value={newsletter.status}
            onChange={handleChange}
          >

            <option>
              Draft
            </option>

            <option>
              Published
            </option>

          </select>



          {statusMessage ? <p className="admin-status-message">{statusMessage}</p> : null}

          <button className="primary-btn" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Newsletter"}
          </button>


        </form>


      </div>


    </div>

  );

}


export default Blogs;