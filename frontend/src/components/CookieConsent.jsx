import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "nexus-ia-cookie-consent";

function getStoredConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    if (!getStoredConsent()) {
      setVisible(true);
    }
  }, []);

  function persist(consent) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    fetch("/api/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(consent)
    }).catch(() => {});
    setVisible(false);
  }

  function acceptAll() {
    persist({ necessary: true, analytics: true, timestamp: Date.now() });
  }

  function rejectNonEssential() {
    persist({ necessary: true, analytics: false, timestamp: Date.now() });
  }

  function saveChoices() {
    persist({ necessary: true, analytics, timestamp: Date.now() });
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      className="glass-panel"
      style={{
        position: "fixed",
        bottom: "16px",
        left: "16px",
        right: "16px",
        maxWidth: "620px",
        margin: "0 auto",
        padding: "22px 24px",
        zIndex: 1000
      }}
    >
      <h2 id="cookie-consent-title" style={{ fontSize: "1.05rem" }}>
        Uso de cookies
      </h2>
      <p style={{ fontSize: "0.88rem" }}>
        Usamos cookies necesarias para el funcionamiento del sitio y, solo con tu
        autorización, cookies de analítica para entender cómo se usa la página. Puedes
        leer los detalles en la{" "}
        <Link to="/legal/cookies">política de cookies</Link>.
      </p>

      {showDetails && (
        <div style={{ margin: "12px 0" }}>
          <label style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "0.85rem" }}>
            <input type="checkbox" checked disabled aria-label="Cookies necesarias, siempre activas" />
            Necesarias (siempre activas, requeridas para operar el sitio)
          </label>
          <label style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "0.85rem", marginTop: "8px" }}>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(event) => setAnalytics(event.target.checked)}
            />
            Analítica (nos ayuda a mejorar el sitio; opcional)
          </label>
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "16px" }}>
        <button className="neu-button primary" onClick={acceptAll}>
          Aceptar todas
        </button>
        <button className="neu-button" onClick={rejectNonEssential}>
          Rechazar no esenciales
        </button>
        {showDetails ? (
          <button className="neu-button" onClick={saveChoices}>
            Guardar preferencias
          </button>
        ) : (
          <button className="neu-button" onClick={() => setShowDetails(true)}>
            Personalizar
          </button>
        )}
      </div>
    </div>
  );
}
