import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="glass-panel" style={{ margin: "16px", padding: "32px 28px", marginTop: "64px" }}>
      <div className="container" style={{ padding: 0, display: "grid", gap: "24px", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        <div>
          <h3 style={{ fontSize: "1rem" }}>Nexus IA S.A.S.</h3>
          <p style={{ fontSize: "0.88rem" }}>
            NIT: [reemplazar con NIT real]<br />
            Calle [dirección real], Medellín, Colombia<br />
            Tel: [teléfono real] · correo: contacto@[dominio-real].com
          </p>
        </div>

        <nav aria-label="Enlaces legales">
          <h3 style={{ fontSize: "1rem" }}>Legal</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "8px", fontSize: "0.88rem" }}>
            <li><Link to="/legal/privacidad">Política de privacidad</Link></li>
            <li><Link to="/legal/terminos">Términos y condiciones</Link></li>
            <li><Link to="/legal/reembolsos">Política de reembolsos</Link></li>
            <li><Link to="/legal/cookies">Política de cookies</Link></li>
          </ul>
        </nav>

        <div>
          <h3 style={{ fontSize: "1rem" }}>Sobre el contenido</h3>
          <p style={{ fontSize: "0.88rem" }}>
            La información sobre modelos de IA se ofrece con fines educativos y se actualiza
            de forma periódica. No sustituye la documentación oficial de cada proveedor.
          </p>
        </div>
      </div>

      <p style={{ fontSize: "0.78rem", marginTop: "24px", textAlign: "center" }}>
        © {new Date().getFullYear()} Nexus IA. Todos los derechos reservados.
      </p>
    </footer>
  );
}
