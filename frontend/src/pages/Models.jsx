import ChipGlass from "../components/illustrations/ChipGlass.jsx";
import ModelCard from "../components/ModelCard.jsx";
import { models, disclaimer } from "../data/models.js";

export default function Models() {
  return (
    <main id="main-content" className="container" style={{ padding: "0 32px" }}>
      <section className="glass-panel" style={{ padding: "36px 32px", margin: "16px 0", display: "grid", gridTemplateColumns: "0.4fr 1fr", gap: "24px", alignItems: "center" }}>
        <div style={{ maxWidth: "140px" }}>
          <ChipGlass />
        </div>
        <div>
          <h1>Catálogo de modelos</h1>
          <p>{disclaimer}</p>
        </div>
      </section>

      <div className="model-grid" style={{ marginBottom: "64px" }}>
        {models.map((model) => (
          <ModelCard key={model.name} model={model} />
        ))}
      </div>
    </main>
  );
}
