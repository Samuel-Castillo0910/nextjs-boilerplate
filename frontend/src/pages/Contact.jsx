import { useState } from "react";
import { Link } from "react-router-dom";

const initialState = { name: "", email: "", message: "", consent: false };

export default function Contact() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!form.consent) {
      setError("Debes aceptar el tratamiento de tus datos para enviar el mensaje.");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!response.ok) throw new Error("request-failed");
      setStatus("sent");
      setForm(initialState);
    } catch {
      setStatus("idle");
      setError("No pudimos enviar tu mensaje. Intenta de nuevo en unos minutos.");
    }
  }

  return (
    <main id="main-content" className="container" style={{ padding: "0 32px" }}>
      <section className="glass-panel" style={{ padding: "36px 32px", margin: "16px 0", maxWidth: "640px" }}>
        <h1>Contacto</h1>
        <p>
          Solo recopilamos los datos necesarios para responder tu mensaje: nombre, correo y el
          contenido de tu consulta. No los usamos con fines distintos sin tu autorización — revisa
          la <Link to="/legal/privacidad">política de privacidad</Link>.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: "18px" }}>
            <label className="field-label" htmlFor="name">Nombre</label>
            <input
              id="name"
              name="name"
              type="text"
              className="neu-input"
              autoComplete="name"
              required
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
            />
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label className="field-label" htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              className="neu-input"
              autoComplete="email"
              required
              value={form.email}
              onChange={(event) => update("email", event.target.value)}
            />
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label className="field-label" htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              name="message"
              className="neu-input"
              rows={5}
              required
              value={form.message}
              onChange={(event) => update("message", event.target.value)}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="consent" style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "0.85rem" }}>
              <input
                id="consent"
                name="consent"
                type="checkbox"
                checked={form.consent}
                onChange={(event) => update("consent", event.target.checked)}
                required
              />
              <span>
                Autorizo el tratamiento de mis datos personales únicamente para responder esta
                consulta, según la política de privacidad.
              </span>
            </label>
          </div>

          {error && <p role="alert" style={{ color: "#ff8a8a" }}>{error}</p>}
          {status === "sent" && <p role="status">Tu mensaje fue enviado. Te responderemos pronto.</p>}

          <button type="submit" className="neu-button primary" disabled={status === "sending"}>
            {status === "sending" ? "Enviando..." : "Enviar mensaje"}
          </button>
        </form>
      </section>
    </main>
  );
}
