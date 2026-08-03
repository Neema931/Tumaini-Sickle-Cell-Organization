import { NavLink } from "react-router-dom";


const navItems = [
  { to: "/admin/home", label: "Home" },
  { to: "/admin/about", label: "About" },
  { to: "/admin/blogs", label: "Blogs" },
  { to: "/admin/contact", label: "Contact" },
  { to: "/admin/programs", label: "Programs" },
  { to: "/admin/events", label: "Events" },
  { to: "/admin/gallery", label: "Gallery" },
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
           <span>{item.label}</span>
          </NavLink>
        ))}

        <NavLink to="/admin/logout" className="admin-nav-item logout">
          <span>Logout</span>
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
