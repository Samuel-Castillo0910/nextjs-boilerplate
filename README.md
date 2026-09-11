# Nexus IA — sitio informativo sobre modelos de IA

Proyecto full-stack: frontend en React (Vite) con estilo glassmorphism + neumorphism,
y backend en Node.js/Express/TypeScript.

## Estructura

```
ai-showcase/
├── frontend/   React + Vite, páginas legales, formulario de contacto, consentimiento de cookies
├── backend/    Express + TypeScript, CORS estricto, rate limiting, validación con zod
├── DEPLOYMENT.md            Guía de despliegue en Google Cloud (Cloud Run + Cloud Storage/CDN)
└── COMPLIANCE-CHECKLIST.md  Estado de cada ítem legal/accesibilidad que pediste
```

## Correr en local

Backend:

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Frontend (en otra terminal):

```bash
cd frontend
npm install
npm run dev
```

El frontend corre en `http://localhost:5173` y hace proxy de `/api` hacia `http://localhost:8080`.

## Antes de publicar

Lee `COMPLIANCE-CHECKLIST.md`: varios campos de las páginas legales y del footer tienen
placeholders `[...]` que debes reemplazar con los datos reales de tu empresa, y las políticas
deben pasar por revisión legal antes de salir a producción.
