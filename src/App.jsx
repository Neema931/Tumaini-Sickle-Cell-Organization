import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Programs from "./components/Programs";
import AwarenessEducation from "./components/AwarenessEducation";
import AdvocacyPolicy from "./components/AdvocacyPolicy";
import Partnerships from "./components/Partnerships";
import QualityImprovement from "./components/QualityImprovement";
import SupportGroups from "./components/SupportGroups";
import Sanitorium from "./components/Sanitorium";
import Blogs from "./components/Blogs";
import Events from "./components/Events";
import Contact from "./components/Contact";
import Donate from "./pages/Donate";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/programs/awareness" element={<AwarenessEducation />} />
        <Route path="/programs/advocacy" element={<AdvocacyPolicy />} />
        <Route path="/programs/partnerships" element={<Partnerships />} />
        <Route path="/programs/quality" element={<QualityImprovement />} />
        <Route path="/programs/support" element={<SupportGroups />} />
        <Route path="/programs/sanitorium" element={<Sanitorium />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/donate" element={<Donate />} />
      </Routes>
    </>
  );
}

export default App;