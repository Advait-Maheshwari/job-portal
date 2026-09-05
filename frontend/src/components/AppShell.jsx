import { useEffect, useState } from "react";
import { config } from "../config";

const navigation = [
  ["dashboard", "Dashboard", "DB"],
  ["home", "Home", "HM"],
  ["records", "Records", "RC"],
  ["form", "New " + config.entity, "NW"]
];

export default function AppShell({ page, user, onLogout, children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pageName = navigation.find(([path]) => path === page)?.[1] || "Dashboard";

  useEffect(() => {
    setMenuOpen(false);
    document.getElementById("main-content")?.focus();
  }, [page]);

  return (
    <div className="app-shell" style={{ "--primary": config.colors.primary, "--primary-dark": config.colors.primaryDark, "--sidebar": config.colors.sidebar }}>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <button className={menuOpen ? "sidebar-backdrop show" : "sidebar-backdrop"} type="button" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />
      <aside className={menuOpen ? "sidebar open" : "sidebar"} aria-label="Main navigation">
        <a className="sidebar-brand" href="#/dashboard"><span className="brand-mark" aria-hidden="true">{config.brand.slice(0, 2).toUpperCase()}</span><span>{config.brand}<small>{config.title}</small></span></a>
        <nav className="sidebar-nav">
          <p className="sidebar-label">Workspace</p>
          {navigation.map(([path, label, short]) => <a key={path} className={page === path ? "active" : ""} href={"#/" + path} aria-current={page === path ? "page" : undefined}><span className="nav-short" aria-hidden="true">{short}</span>{label}</a>)}
        </nav>
        <div className="sidebar-user"><span className="user-avatar" aria-hidden="true">{user.fullName.charAt(0).toUpperCase()}</span><div><strong>{user.fullName}</strong><small>{user.email}</small></div><button type="button" onClick={onLogout}>Log out</button></div>
      </aside>
      <div className="main-column">
        <header className="topbar"><button className="menu-button" type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>Menu</button><div><p className="eyebrow">{config.brand} workspace</p><h1>{pageName}</h1></div><span className="session-state"><span aria-hidden="true" /> Secure session</span></header>
        <main id="main-content" className="page-content" tabIndex="-1">{children}</main>
      </div>
    </div>
  );
}
