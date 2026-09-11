# Checklist de cumplimiento — estado actual

| Ítem | Estado | Detalle |
|---|---|---|
| Alt text en imágenes | Hecho | Todos los SVG usan `role="img"` + `<title>` referenciado por `aria-labelledby`. |
| Política de reembolsos | Plantilla lista | `frontend/src/pages/legal/Refund.jsx`. Rellena los datos reales; si no vendes nada, dilo explícitamente. |
| Política de privacidad | Plantilla lista | `frontend/src/pages/legal/Privacy.jsx`, alineada a Habeas Data (Ley 1581/2012 Colombia). Debe revisarla un abogado. |
| Accesibilidad | Base cubierta | Skip link, foco visible, formularios con `label` asociado, contraste AA en la paleta, `prefers-reduced-motion` respetado. Falta una auditoría con lector de pantalla real y axe-core antes de publicar. |
| Reseñas falsas | No incluidas | El sitio no tiene sección de reseñas. Si agregas testimonios, deben ser reales y verificables, nunca generados. |
| Términos y condiciones | Plantilla lista | `frontend/src/pages/legal/Terms.jsx`. Revisar con abogado, definir jurisdicción real. |
| Embeds de terceros | Pendiente de revisión | El proyecto no incluye embeds de terceros todavía. Si agregas mapas, video o chat, documenta sus cookies en `Cookies.jsx` y su origen en el CSP de `nginx.conf`. |
| Copyright de imágenes | Resuelto por diseño | Se usan solo ilustraciones vectoriales propias (SVG generado en el código), no fotos de stock ni assets de terceros. |
| Política de cookies | Plantilla lista | `frontend/src/pages/legal/Cookies.jsx`, con tabla real de las cookies que efectivamente usa el sitio hasta ahora. |
| Tracking | Minimizado | No hay analítica instalada por defecto. El banner de cookies solo activa analítica si el usuario la acepta explícitamente (opt-in real, no pre-marcado). |
| Consentimiento de formularios | Hecho | El formulario de contacto exige un checkbox de consentimiento explícito (no premarcado) antes de habilitar el envío. |
| Leyes locales | Requiere abogado | Este código no reemplaza asesoría legal. Como mínimo revisa Ley 1581/2012 (Colombia) y, si hay usuarios en la UE, el RGPD. |
| Etiquetas de botones claras | Hecho | Botones con texto explícito ("Aceptar todas", "Enviar mensaje", etc.), sin iconos ambiguos sin texto. |
| Banner de consentimiento de cookies | Hecho | `CookieConsent.jsx`: opciones "Aceptar todas" / "Rechazar no esenciales" / "Personalizar", sin casillas premarcadas para analítica. |
| Datos reales del negocio | Pendiente | `Footer.jsx` y las páginas legales tienen placeholders `[reemplazar...]`. Debes completarlos con NIT, dirección y contacto reales antes de publicar. |
| Solo datos necesarios | Hecho | El formulario de contacto solo pide nombre, correo y mensaje; el registro de consentimiento no guarda IP ni identificadores. |
| Formularios accesibles por teclado | Hecho | Todos los campos usan `<label htmlFor>`, no hay trampas de foco, y los controles son elementos nativos (`input`, `button`, `textarea`). |
| Reclamos sin sustento | Mitigado | Las fichas de modelos evitan cifras de benchmarks o comparativas de rendimiento sin fuente; incluyen aviso de que la info puede quedar desactualizada y enlazan a la documentación oficial. |

## Lo que tú debes completar antes de publicar
1. Reemplazar todos los placeholders `[...]` con datos reales (NIT, dirección, correo, teléfono).
2. Hacer que un abogado revise Privacidad, Términos, Reembolsos y Cookies para tu jurisdicción real.
3. Si agregas analítica o cualquier script de terceros, documentarlo en la tabla de cookies y en el CSP.
4. Ejecutar una auditoría de accesibilidad automatizada (axe DevTools / Lighthouse) y manual con lector de pantalla.
5. Conectar el endpoint `/api/contact` a un proveedor real de correo (ver `DEPLOYMENT.md`, sección Secret Manager).
