import React from 'react';
import "./TSCO.css";
import img1 from "../assets/G1.jpg";
import img2 from "../assets/G2.jpg";
import img3 from "../assets/G3.jpg";
import img4 from "../assets/G4.jpg";
import img5 from "../assets/G5.jpg";
import img6 from "../assets/G6.jpg";
import img7 from "../assets/G7.jpg";
import img8 from "../assets/G8.jpg";
import img9 from "../assets/G9.jpg";
import img10 from "../assets/G10 (1).jpg";
import img11 from "../assets/G10 (2).jpg";
import img12 from "../assets/G10 (3).jpg";
import img13 from "../assets/G10 (4).jpg";
import img14 from "../assets/G12 (1).jpg";
import img15 from "../assets/G12 (2).jpg";
import img16 from "../assets/G12 (3).jpg";
import img17 from "../assets/G12 (4).jpg";
import img18 from "../assets/G12 (5).jpg";
import img19 from "../assets/G12 (6).jpg";
import img20 from "../assets/G12 (7).jpg";
import img21 from "../assets/G12 (8).jpg";
import img22 from "../assets/G12 (9).jpg";
import img23 from "../assets/G12 (10).jpg";
import img24 from "../assets/G12 (11).jpg";
import img25 from "../assets/G12 (12).jpg";
import img26 from "../assets/G12 (13).jpg";
import img27 from "../assets/G12 (14).jpg";
import img28 from "../assets/G12 (15).jpg";
import img29 from "../assets/G12 (16).jpg";
import img30 from "../assets/G12 (17).jpg";
import img31 from "../assets/G12 (18).jpg";
import img32 from "../assets/G12 (19).jpg";
import img33 from "../assets/G12 (20).jpg";
import img34 from "../assets/G12 (21).jpg";
import img35 from "../assets/G12 (22).jpg";
import img36 from "../assets/G12 (23).jpg";
import img37 from "../assets/G12 (24).jpg";
import img38 from "../assets/G12 (25).jpg";
import img39 from "../assets/G12 (26).jpg";
import img40 from "../assets/G12 (27).jpg";
import img41 from "../assets/G12 (28).jpg";
import img42 from "../assets/G12 (29).jpg";
import img43 from "../assets/G12 (30).jpg";
import img44 from "../assets/G13 (1).jpg";
import img45 from "../assets/G13 (2).jpg";
import img46 from "../assets/G13 (3).jpg";
import img47 from "../assets/G13 (4).jpg";
import img48 from "../assets/G13 (5).jpg";
import img49 from "../assets/G13 (6).jpg";
import img50 from "../assets/G13 (7).jpg";
import img51 from "../assets/G13 (8).jpg";
import img52 from "../assets/G13 (9).jpg";


function Gallery() {
  const images = [
    img1, img2, img3, img4, img5, img6, img7, img8, img9,
    img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20,
    img21, img22, img23, img24, img25, img26, img27, img28, img29, img30,
    img31, img32, img33, img34, img35, img36, img37, img38, img39, img40,
    img41, img42, img43, img44, img45, img46, img47, img48, img49, img50,
    img51, img52,
  ];

  return (
    <div className="gallery-page page">
      <div className="container">
        <header className="gallery-header">
          <h1>Gallery</h1>
        </header>

        <div className="gallery-grid">
          {images.map((src, index) => (
            <div className="gallery-card" key={index}>
              <img src={src} alt={`Gallery Image ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;