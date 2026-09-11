import "dotenv/config";
import express from "express";
import { corsMiddleware, helmetMiddleware, apiRateLimit } from "./middleware/security.js";
import { contactRouter } from "./routes/contact.js";
import { modelsRouter } from "./routes/models.js";
import { consentRouter } from "./routes/consent.js";

const app = express();
const port = Number(process.env.PORT ?? 8080);

app.disable("x-powered-by");
app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(express.json({ limit: "16kb" }));
app.use("/api", apiRateLimit);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/contact", contactRouter);
app.use("/api/models", modelsRouter);
app.use("/api/consent", consentRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(port, () => {
  console.log(`API escuchando en el puerto ${port}`);
});
