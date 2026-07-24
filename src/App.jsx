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
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import A from "./pages/Gallery/A";
import B from "./pages/Gallery/B";
import C from "./pages/Gallery/C";
import D from "./pages/Gallery/D";
import E from "./pages/Gallery/E";
import F from "./pages/Gallery/F";
import G from "./pages/Gallery/G";
import H from "./pages/Gallery/H";
import I from "./pages/Gallery/I";
import J from "./pages/Gallery/J";
import K from "./pages/Gallery/K";

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
        <Route path="/A" element={<A />} />
        <Route path="/B" element={<B />} />
        <Route path="/C" element={<C />} />
        <Route path="/D" element={<D />} />
        <Route path="/E" element={<E />} />
        <Route path="/F" element={<F />} />
        <Route path="/G" element={<G />} />
        <Route path="/H" element={<H />} />
        <Route path="/I" element={<I />} />
        <Route path="/J" element={<J />} />
        <Route path="/K" element={<K />} />
      </Routes>

      <CTA />
      <Footer />

    </>
  );
}

export default App;