# Despliegue en Google Cloud — arquitectura y guía paso a paso

## 1. Arquitectura

```
                    ┌─────────────────────────┐
   Usuario  ───────▶│  Cloud CDN + Load        │
                    │  Balancer (HTTPS, cert   │
                    │  gestionado por Google)  │
                    └────────────┬─────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                                ▼
     ┌─────────────────────┐          ┌───────────────────────┐
     │ Cloud Storage bucket │          │  Cloud Run: backend    │
     │ (frontend estático,  │          │  (Express + TS, solo   │
     │  build de Vite)      │          │  responde /api/*)      │
     └─────────────────────┘          └───────────┬────────────┘
                                                    │
                                        ┌───────────┴────────────┐
                                        │  Secret Manager         │
                                        │  (claves de terceros,   │
                                        │   ALLOWED_ORIGINS, etc) │
                                        └──────────────────────────┘
```

- **Frontend**: build estático (`npm run build`) servido desde un bucket de Cloud Storage detrás de Cloud CDN + External HTTPS Load Balancer. Es más barato y rápido en el edge que correr Nginx en Cloud Run para archivos estáticos.
- **Backend**: Cloud Run, contenedor construido con el `Dockerfile` multi-etapa de `backend/`. Cloud Run escala a cero, así que no pagas por tráfico inactivo.
- **Secretos**: nunca en variables de entorno planas ni en el repo. Se inyectan en Cloud Run desde Secret Manager con `--set-secrets`.
- **CORS**: el backend solo acepta el dominio real del frontend, definido en el secreto `ALLOWED_ORIGINS` (ver `backend/src/middleware/security.ts`).

## 2. Variables de entorno y secretos

| Nombre | Dónde vive | Tipo |
|---|---|---|
| `ALLOWED_ORIGINS` | Secret Manager | Secreto (aunque no sea "sensible", así evitas redeploys para cambiarlo) |
| `PORT` | Variable de entorno normal en Cloud Run | No sensible |
| `EMAIL_PROVIDER_API_KEY` (cuando conectes el envío real de correo) | Secret Manager | Secreto |

Nunca pongas estos valores en el `Dockerfile`, en `package.json` ni en el repositorio. El `.env` solo se usa en desarrollo local y está en `.gitignore`.

## 3. Prerrequisitos

```bash
gcloud auth login
gcloud config set project TU_PROJECT_ID
export PROJECT_ID=$(gcloud config get-value project)
export REGION=us-central1
```

## 4. Habilitar APIs necesarias

```bash
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  secretmanager.googleapis.com \
  iam.googleapis.com \
  compute.googleapis.com \
  storage.googleapis.com
```

## 5. Artifact Registry para las imágenes

```bash
gcloud artifacts repositories create ai-showcase-repo \
  --repository-format=docker \
  --location=$REGION \
  --description="Imágenes de frontend y backend"
```

## 6. Cuentas de servicio con privilegio mínimo

Crea una cuenta de servicio **dedicada por servicio**, no uses la cuenta por defecto de Compute Engine.

```bash
gcloud iam service-accounts create ai-showcase-backend-sa \
  --display-name="AI Showcase backend runtime"

gcloud iam service-accounts create ai-showcase-deployer-sa \
  --display-name="AI Showcase CI/CD deployer"
```

Permisos mínimos para que el backend **en tiempo de ejecución** pueda leer solo los secretos que necesita (no todos):

```bash
gcloud secrets add-iam-policy-binding ALLOWED_ORIGINS \
  --member="serviceAccount:ai-showcase-backend-sa@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

Permisos para que la cuenta de **despliegue** (usada por Cloud Build o por ti localmente) pueda construir y desplegar, sin darle permisos de administrador de proyecto:

```bash
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:ai-showcase-deployer-sa@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/run.developer"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:ai-showcase-deployer-sa@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/artifactregistry.writer"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:ai-showcase-deployer-sa@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"
```

`roles/iam.serviceAccountUser` es necesario solo para que el deployer pueda "actuar como" `ai-showcase-backend-sa` al desplegar el servicio de Cloud Run — es el mínimo requerido, no uses `roles/owner` ni `roles/editor` en ningún punto de este flujo.

## 7. Crear los secretos

```bash
printf "https://tu-dominio-real.com,https://www.tu-dominio-real.com" | \
  gcloud secrets create ALLOWED_ORIGINS --data-file=-

# Cuando conectes un proveedor de correo real:
printf "TU_API_KEY_REAL" | gcloud secrets create EMAIL_PROVIDER_API_KEY --data-file=-
```

## 8. Build y push de la imagen del backend

```bash
cd backend
gcloud builds submit \
  --tag $REGION-docker.pkg.dev/$PROJECT_ID/ai-showcase-repo/backend:latest
cd ..
```

## 9. Deploy del backend en Cloud Run

```bash
gcloud run deploy ai-showcase-backend \
  --image=$REGION-docker.pkg.dev/$PROJECT_ID/ai-showcase-repo/backend:latest \
  --region=$REGION \
  --platform=managed \
  --service-account=ai-showcase-backend-sa@${PROJECT_ID}.iam.gserviceaccount.com \
  --no-allow-unauthenticated=false \
  --allow-unauthenticated \
  --set-env-vars=PORT=8080 \
  --set-secrets=ALLOWED_ORIGINS=ALLOWED_ORIGINS:latest \
  --min-instances=0 \
  --max-instances=4 \
  --cpu=1 \
  --memory=256Mi
```

`--allow-unauthenticated` es correcto aquí porque es una API pública detrás de CORS y rate limiting; si en el futuro agregas endpoints administrativos, sepáralos en otro servicio Cloud Run que sí requiera autenticación (`--no-allow-unauthenticated` + Identity-Aware Proxy).

## 10. Build del frontend y subida a Cloud Storage

```bash
cd frontend
npm ci
VITE_API_BASE_URL=https://api.tu-dominio-real.com npm run build

gcloud storage buckets create gs://ai-showcase-frontend-$PROJECT_ID \
  --location=$REGION \
  --uniform-bucket-level-access

gcloud storage rsync dist gs://ai-showcase-frontend-$PROJECT_ID --recursive --delete-unmatched-destination-objects

gcloud storage buckets add-iam-policy-binding gs://ai-showcase-frontend-$PROJECT_ID \
  --member=allUsers --role=roles/storage.objectViewer
cd ..
```

## 11. Load Balancer + Cloud CDN + HTTPS para el frontend

```bash
gcloud compute backend-buckets create ai-showcase-frontend-backend \
  --gcs-bucket-name=ai-showcase-frontend-$PROJECT_ID \
  --enable-cdn

gcloud compute url-maps create ai-showcase-lb \
  --default-backend-bucket=ai-showcase-frontend-backend

gcloud compute ssl-certificates create ai-showcase-cert \
  --domains=tu-dominio-real.com,www.tu-dominio-real.com \
  --global

gcloud compute target-https-proxies create ai-showcase-https-proxy \
  --url-map=ai-showcase-lb \
  --ssl-certificates=ai-showcase-cert

gcloud compute addresses create ai-showcase-ip --global

gcloud compute forwarding-rules create ai-showcase-https-rule \
  --address=ai-showcase-ip \
  --global \
  --target-https-proxy=ai-showcase-https-proxy \
  --ports=443
```

Apunta el DNS del dominio real (registro A) a la IP que devuelve:

```bash
gcloud compute addresses describe ai-showcase-ip --global --format="value(address)"
```

## 12. Dominio propio para el backend (opcional pero recomendado)

```bash
gcloud run domain-mappings create \
  --service=ai-showcase-backend \
  --domain=api.tu-dominio-real.com \
  --region=$REGION
```

## 13. Checklist de seguridad antes de ir a producción

- [ ] Ningún secreto en el repositorio (`git log -p | grep -i secret` como última verificación)
- [ ] `ALLOWED_ORIGINS` apunta solo al dominio real, nunca a `*`
- [ ] Cuentas de servicio con roles mínimos (verificar con `gcloud projects get-iam-policy $PROJECT_ID`)
- [ ] `--min-instances=0` revisado: si necesitas evitar cold starts, súbelo a 1 y evalúa el costo
- [ ] Content-Security-Policy de `nginx.conf` actualizado con el dominio real de la API
- [ ] Logs de Cloud Run revisados en Cloud Logging por si hay intentos de acceso no autorizados
- [ ] Facturación con alertas de presupuesto configuradas (`gcloud billing budgets create`)
