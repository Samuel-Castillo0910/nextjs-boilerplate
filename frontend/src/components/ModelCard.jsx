export default function ModelCard({ model }) {
  return (
    <article className="neu-surface" style={{ padding: "24px" }}>
      <span className="badge">{model.org}</span>
      <h3 style={{ fontSize: "1.15rem" }}>{model.name}</h3>
      <p style={{ fontSize: "0.9rem" }}>{model.summary}</p>
      <ul style={{ paddingLeft: "18px", margin: 0, fontSize: "0.85rem", color: "var(--text-muted)" }}>
        {model.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {model.sourceUrl && (
        <p style={{ fontSize: "0.78rem", marginTop: "12px" }}>
          <a href={model.sourceUrl} target="_blank" rel="noopener noreferrer">
            Ver documentación oficial
          </a>
        </p>
      )}
    </article>
  );
}
