import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Programs from "./components/Programs";
import AwarenessEducation from "./components/AwarenessEducation";
import AdvocacyPolicy from "./components/AdvocacyPolicy";
import Partnerships from "./components/Partnerships";
import QualityImprovement from "./components/QualityImprovement";
import SupportGroups from "./components/SupportGroups";
import Sanitorium from "./components/Sanitorium";
import PublicBlogs from "./components/Blogs";
import PublicEvents from "./components/Events";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Donate from "./pages/Donate";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import AdminLayout from "./layouts/AdminLayout";
import AdminHome from "./pages/admin/Home";
import AdminAbout from "./pages/admin/About";
import AdminBlogs from "./pages/admin/Blogs";
import AdminContact from "./pages/admin/Contact";
import AdminPrograms from "./pages/admin/Programs";
import AdminEvents from "./pages/admin/Events";
import AdminGallery from "./pages/admin/Gallery";
import AdminLogin from "./pages/admin/Login";
import AdminLogout from "./pages/admin/Logout";
import ProtectedRoute from "./auth/ProtectedRoute";



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
        <Route path="/" element={<><Navbar /><Home /><CTA /><Footer /></>} />
        <Route path="/about" element={<><Navbar /><About /><CTA /><Footer /></>} />
        <Route path="/programs" element={<><Navbar /><Programs /><CTA /><Footer /></>} />
        <Route path="/programs/awareness" element={<><Navbar /><AwarenessEducation /><CTA /><Footer /></>} />
        <Route path="/programs/advocacy" element={<><Navbar /><AdvocacyPolicy /><CTA /><Footer /></>} />
        <Route path="/programs/partnerships" element={<><Navbar /><Partnerships /><CTA /><Footer /></>} />
        <Route path="/programs/quality" element={<><Navbar /><QualityImprovement /><CTA /><Footer /></>} />
        <Route path="/programs/support" element={<><Navbar /><SupportGroups /><CTA /><Footer /></>} />
        <Route path="/programs/sanitorium" element={<><Navbar /><Sanitorium /><CTA /><Footer /></>} />
        <Route path="/blogs" element={<><Navbar /><PublicBlogs /><CTA /><Footer /></>} />
        <Route path="/events" element={<><Navbar /><PublicEvents /><CTA /><Footer /></>} />
        <Route path="/gallery" element={<><Navbar /><Gallery /><CTA /><Footer /></>} />
        <Route path="/contact" element={<><Navbar /><Contact /><CTA /><Footer /></>} />
        <Route path="/donate" element={<><Navbar /><Donate /><CTA /><Footer /></>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/logout" element={<AdminLogout />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout><AdminHome /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/home" element={
          <ProtectedRoute>
            <AdminLayout><AdminHome /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/about" element={
          <ProtectedRoute>
            <AdminLayout><AdminAbout /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/blogs" element={
          <ProtectedRoute>
            <AdminLayout><AdminBlogs /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/contact" element={
          <ProtectedRoute>
            <AdminLayout><AdminContact /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/programs" element={
          <ProtectedRoute>
            <AdminLayout><AdminPrograms /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/events" element={
          <ProtectedRoute>
            <AdminLayout><AdminEvents /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/gallery" element={
          <ProtectedRoute>
            <AdminLayout><AdminGallery /></AdminLayout>
          </ProtectedRoute>
        } />
        
      </Routes>

    </>
  );
}

export default App;