<<<<<<< HEAD
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
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> a3e00bd829cca0b94671a43c4ce3a2eca8842f12
