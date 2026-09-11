import { Router } from "express";

const models = [
  {
    name: "Familia Claude",
    org: "Anthropic",
    summary:
      "Modelos de lenguaje orientados a razonamiento, uso de herramientas y trabajo agentico.",
    sourceUrl: "https://docs.claude.com"
  },
  {
    name: "Modelos multimodales de Google (familia Gemini/Astra)",
    org: "Google DeepMind",
    summary: "Proyectos de investigación y modelos multimodales orientados a asistencia en tiempo real.",
    sourceUrl: "https://deepmind.google"
  },
  {
    name: "Modelos GPT",
    org: "OpenAI",
    summary: "Familia de modelos de lenguaje de propósito general.",
    sourceUrl: "https://platform.openai.com/docs"
  }
];

export const modelsRouter = Router();

modelsRouter.get("/", (_req, res) => {
  res.json({ models, disclaimer: "Contenido informativo; verifica siempre la fuente oficial." });
});
