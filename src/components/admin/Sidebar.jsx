import { NavLink } from "react-router-dom";
import { FaHome, FaMoneyBillWave, FaBlog, FaImage, FaEnvelope, FaCalendarAlt, FaHandsHelping, FaChartBar, FaUsers, FaCog, FaSignOutAlt } from "react-icons/fa";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: <FaHome /> },
  { to: "/admin/donations", label: "Donations", icon: <FaMoneyBillWave /> },
  { to: "/admin/blogs", label: "Blogs", icon: <FaBlog /> },
  { to: "/admin/gallery", label: "Gallery", icon: <FaImage /> },
];

function Sidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand">
        <h2>TSCO</h2>
        <p>Admin Portal</p>
      </div>

      <nav className="admin-sidebar-nav">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => `admin-nav-item${isActive ? " active" : ""}`}>
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}

        <NavLink to="/admin/login" className="admin-nav-item logout">
          <span><FaSignOutAlt /></span>
          <span>Logout</span>
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
