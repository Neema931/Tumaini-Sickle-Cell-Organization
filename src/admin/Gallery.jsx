import { useState } from "react";

function Gallery() {

  const [image, setImage] = useState(null);


  const handleFileChange = (e) => {

    setImage(e.target.files[0]);

  };


  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(image);

    alert("Image uploaded successfully!");

  };


  return (

    <div className="admin-page">

      <div className="admin-section-card">

        <div className="admin-section-heading">

          <div>
            <h3>Gallery Manager</h3>
            <span>
              Upload images for the TSCO gallery.
            </span>
          </div>

        </div>


        <div className="admin-form-card">

          <form onSubmit={handleSubmit}>


            <label>
              Select Image
            </label>


            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />


            <button className="primary-btn">
              Upload Image
            </button>


          </form>

        </div>


      </div>

    </div>

  );

}


export default Gallery;