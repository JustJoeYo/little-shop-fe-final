import { NavLink } from "react-router-dom";
import { FaStore, FaBoxOpen } from "react-icons/fa";
import "../../styles/Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>Little Shop</h1>
        <div className="sidebar-subtitle">Admin Portal</div>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/"
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        >
          <FaStore className="nav-icon" />
          <span>Merchants</span>
        </NavLink>

        <NavLink
          to="/items"
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        >
          <FaBoxOpen className="nav-icon" />
          <span>Items</span>
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
