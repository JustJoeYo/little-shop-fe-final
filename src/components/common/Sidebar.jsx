import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside>
      <header>
        <h1>Little Shop</h1>
        <h2>admin portal</h2>
      </header>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active-nav" : "")}
        >
          Merchants
        </NavLink>
        <NavLink
          to="/items"
          className={({ isActive }) => (isActive ? "active-nav" : "")}
        >
          Items
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
