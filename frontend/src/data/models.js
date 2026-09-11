export const models = [
  {
    name: "Familia Claude",
    org: "Anthropic",
    summary:
      "Modelos de lenguaje orientados a razonamiento, uso de herramientas y trabajo agentico, con distintos niveles de capacidad y costo dentro de la misma familia.",
    notes: [
      "Disponible vía API, Claude.ai y editores/herramientas de terceros",
      "Ofrece niveles diferenciados de velocidad y profundidad de razonamiento",
      "Las capacidades exactas varían por versión: verifica siempre la ficha oficial del modelo"
    ],
    sourceUrl: "https://docs.claude.com"
  },
  {
    name: "Modelos multimodales de Google (familia Gemini/Astra)",
    org: "Google DeepMind",
    summary:
      "Proyectos de investigación y modelos multimodales de Google orientados a asistencia en tiempo real con texto, voz e imagen.",
    notes: [
      "Astra es una iniciativa de investigación; su disponibilidad y nombre comercial pueden cambiar",
      "Los modelos Gemini de producción son la vía habitual de acceso público",
      "Consulta siempre la fuente oficial para el estado actual del proyecto"
    ],
    sourceUrl: "https://deepmind.google"
  },
  {
    name: "Modelos GPT",
    org: "OpenAI",
    summary:
      "Familia de modelos de lenguaje de propósito general con soporte para texto, imagen y, en algunas versiones, audio.",
    notes: [
      "Accesibles vía API y ChatGPT",
      "El rendimiento en tareas específicas depende de la versión y configuración"
    ],
    sourceUrl: "https://platform.openai.com/docs"
  }
];

export const disclaimer =
  "Esta página resume información pública sobre modelos de IA con fines educativos. No representa a ninguno de los proveedores mencionados, no garantiza exactitud en tiempo real y no sustituye la documentación oficial de cada compañía. Última revisión de contenido: consulta la fecha en cada ficha oficial enlazada.";
