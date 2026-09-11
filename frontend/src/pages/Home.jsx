import { Link } from "react-router-dom";
import NeuralGlass from "../components/illustrations/NeuralGlass.jsx";
import ModelCard from "../components/ModelCard.jsx";
import { models, disclaimer } from "../data/models.js";

export default function Home() {
  return (
    <main id="main-content">
      <section className="glass-panel container" style={{ margin: "16px auto", padding: "48px 32px", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "32px", alignItems: "center" }}>
        <div>
          <h1>Entiende los modelos de IA más potentes, sin humo ni cifras infladas</h1>
          <p>
            Nexus IA reúne, en un solo lugar, descripciones claras y verificables de los modelos
            de lenguaje e IA multimodal más relevantes del momento: qué hacen, para qué sirven y
            dónde revisar los datos oficiales.
          </p>
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link to="/modelos" className="neu-button primary">Explorar modelos</Link>
            <Link to="/contacto" className="neu-button">Escríbenos</Link>
          </div>
        </div>
        <NeuralGlass />
      </section>

      <section className="container" style={{ padding: "0 32px", marginTop: "48px" }}>
        <h2>Modelos destacados</h2>
        <p>{disclaimer}</p>
        <div className="model-grid">
          {models.map((model) => (
            <ModelCard key={model.name} model={model} />
          ))}
        </div>
      </section>
    </main>
  );
}
