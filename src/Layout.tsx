import { NavLink, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">🏞️ Trailhead</div>
        <nav className="side-nav">
          <NavLink to="/trails" className={({ isActive }) => (isActive ? "active" : "")}>
            🗺️ Trails
          </NavLink>
          <NavLink to="/hikes" className={({ isActive }) => (isActive ? "active" : "")}>
            🥾 Hikes
          </NavLink>
        </nav>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
