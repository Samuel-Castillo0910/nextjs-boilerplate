import { Router } from "express";
import { z } from "zod";
import { contactRateLimit } from "../middleware/security.js";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(180),
  message: z.string().trim().min(1).max(2000),
  consent: z.literal(true)
});

export const contactRouter = Router();

contactRouter.post("/", contactRateLimit, (req, res) => {
  const parsed = contactSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: "Datos inválidos", details: parsed.error.flatten() });
    return;
  }

  const { name, email, message } = parsed.data;

  res.status(202).json({
    status: "received",
    message: `Gracias ${name}, recibimos tu mensaje y responderemos a ${email} pronto.`
  });
});
