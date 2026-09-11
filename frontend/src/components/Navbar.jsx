import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/modelos", label: "Modelos" },
  { to: "/contacto", label: "Contacto" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="glass-panel" style={{ margin: "16px", padding: "14px 20px" }}>
      <nav className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 0 }} aria-label="Navegación principal">
        <NavLink to="/" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.15rem" }}>
          Nexus IA
        </NavLink>

        <button
          className="neu-button nav-toggle"
          id="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? "Cerrar menú" : "Abrir menú"}
        </button>

        <ul
          id="primary-menu"
          className={`primary-menu ${open ? "is-open" : ""}`}
        >
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                style={({ isActive }) => ({
                  fontWeight: 600,
                  color: isActive ? "var(--accent-a)" : "var(--text-primary)"
                })}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
