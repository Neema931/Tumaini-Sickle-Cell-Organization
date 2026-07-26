import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import PublicBlogs from "./components/Blogs";
import PublicEvents from "./components/Events";
import Contact from "./components/Contact";
import Donate from "./pages/Donate";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import AdminLayout from "./layouts/AdminLayout";
import Login from "./admin/Login";
import Dashboard from "./admin/Dashboard";
import Donations from "./admin/Donations";
import AdminGallery from "./admin/Gallery.jsx";
import Newsletters from "./admin/Newsletters.jsx";
import AdminEvents from "./admin/Events.jsx";
import Volunteers from "./admin/Volunteers.jsx";
import Reports from "./admin/Reports.jsx";
import Settings from "./admin/Settings.jsx";
import Users from "./admin/Users.jsx";
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
import "./admin/admin.css";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/*" element={<AdminLayout><Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="donations" element={<Donations />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="newsletters" element={<Newsletters />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="volunteers" element={<Volunteers />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="users" element={<Users />} />
        </Routes></AdminLayout>} />

        <Route path="/" element={<><Navbar /><Home /><CTA /><Footer /></>} />
        <Route path="/about" element={<><Navbar /><About /><CTA /><Footer /></>} />
        <Route path="/gallery" element={<><Navbar /><Gallery /><CTA /><Footer /></>} />
        <Route path="/programs" element={<><Navbar /><Programs /><CTA /><Footer /></>} />
        <Route path="/programs/awareness" element={<><Navbar /><AwarenessEducation /><CTA /><Footer /></>} />
        <Route path="/programs/advocacy" element={<><Navbar /><AdvocacyPolicy /><CTA /><Footer /></>} />
        <Route path="/programs/partnerships" element={<><Navbar /><Partnerships /><CTA /><Footer /></>} />
        <Route path="/programs/quality" element={<><Navbar /><QualityImprovement /><CTA /><Footer /></>} />
        <Route path="/programs/support" element={<><Navbar /><SupportGroups /><CTA /><Footer /></>} />
        <Route path="/programs/sanitorium" element={<><Navbar /><Sanitorium /><CTA /><Footer /></>} />
        <Route path="/blogs" element={<><Navbar /><PublicBlogs /><CTA /><Footer /></>} />
        <Route path="/events" element={<><Navbar /><PublicEvents /><CTA /><Footer /></>} />
        <Route path="/contact" element={<><Navbar /><Contact /><CTA /><Footer /></>} />
        <Route path="/donate" element={<><Navbar /><Donate /><CTA /><Footer /></>} />
        <Route path="/A" element={<><Navbar /><A /><CTA /><Footer /></>} />
        <Route path="/B" element={<><Navbar /><B /><CTA /><Footer /></>} />
        <Route path="/C" element={<><Navbar /><C /><CTA /><Footer /></>} />
        <Route path="/D" element={<><Navbar /><D /><CTA /><Footer /></>} />
        <Route path="/E" element={<><Navbar /><E /><CTA /><Footer /></>} />
        <Route path="/F" element={<><Navbar /><F /><CTA /><Footer /></>} />
        <Route path="/G" element={<><Navbar /><G /><CTA /><Footer /></>} />
        <Route path="/H" element={<><Navbar /><H /><CTA /><Footer /></>} />
        <Route path="/I" element={<><Navbar /><I /><CTA /><Footer /></>} />
        <Route path="/J" element={<><Navbar /><J /><CTA /><Footer /></>} />
        <Route path="/K" element={<><Navbar /><K /><CTA /><Footer /></>} />
      </Routes>

    </>
  );
}

export default App;