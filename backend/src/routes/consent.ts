import { Router } from "express";
import { z } from "zod";

const consentSchema = z.object({
  necessary: z.literal(true),
  analytics: z.boolean(),
  timestamp: z.number()
});

export const consentRouter = Router();

consentRouter.post("/", (req, res) => {
  const parsed = consentSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: "Datos de consentimiento inválidos" });
    return;
  }

  res.status(204).send();
});
