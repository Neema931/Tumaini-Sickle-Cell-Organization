import "../components/admin/admin.css";
import Sidebar from "../components/admin/Sidebar";
import Navbar from "../components/admin/Navbar";

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Navbar />
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
