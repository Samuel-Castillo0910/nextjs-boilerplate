export default function Cookies() {
  return (
    <main id="main-content" className="container" style={{ padding: "0 32px" }}>
      <section className="glass-panel" style={{ padding: "36px 32px", margin: "16px 0", maxWidth: "760px" }}>
        <h1>Política de cookies</h1>
        <p style={{ fontSize: "0.85rem" }}>Última actualización: [fecha real de publicación]</p>

        <h2>1. ¿Qué cookies usamos?</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.15)", padding: "8px" }}>Cookie</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.15)", padding: "8px" }}>Tipo</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.15)", padding: "8px" }}>Finalidad</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.15)", padding: "8px" }}>Duración</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "8px" }}>nexus-ia-cookie-consent</td>
              <td style={{ padding: "8px" }}>Necesaria</td>
              <td style={{ padding: "8px" }}>Recordar tu elección de cookies</td>
              <td style={{ padding: "8px" }}>12 meses</td>
            </tr>
            <tr>
              <td style={{ padding: "8px" }}>[nombre real de cookie de analítica, si se añade]</td>
              <td style={{ padding: "8px" }}>Analítica (opcional)</td>
              <td style={{ padding: "8px" }}>[detallar herramienta real, ej. proveedor de analítica]</td>
              <td style={{ padding: "8px" }}>[duración real]</td>
            </tr>
          </tbody>
        </table>

        <h2>2. Cómo gestionar tus preferencias</h2>
        <p>
          Puedes cambiar tu elección en cualquier momento borrando los datos del sitio en tu
          navegador, lo que volverá a mostrar el banner de consentimiento.
        </p>

        <h2>3. Cookies de terceros</h2>
        <p>
          Antes de integrar cualquier script de terceros (mapas, video, redes sociales, chat),
          verifica qué cookies instala y añádelo a esta tabla con su finalidad real.
        </p>
      </section>
    </main>
  );
}
