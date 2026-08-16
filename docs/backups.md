# Backups de Firestore

La app no tiene backend propio; los backups se configuran a nivel de infraestructura de
Google Cloud (mismo proyecto que ya usa Firebase), no en este repositorio. Este documento
describe cómo configurarlos para que sean reproducibles si se pierde la configuración.

## Opción recomendada: Backups programados nativos de Firestore (sin código)

Firestore incluye una función administrada de backups programados, configurable
directamente desde la consola (Firebase Console o Google Cloud Console → Firestore →
pestaña "Backups"). No requiere Cloud Functions, Cloud Scheduler, ni cuentas de servicio
propias — Google se encarga de ejecutarlo y mantenerlo.

Pasos:
1. Firebase Console → proyecto → Firestore Database → pestaña **Backups**.
2. "Create backup schedule" (o "Programar backup").
3. Elegir frecuencia (diaria y/o semanal) y periodo de retención — la consola muestra las
   opciones disponibles para el plan del proyecto.
4. Guardar. Los backups quedan visibles en esa misma pestaña, con posibilidad de restaurar
   a una nueva base de datos desde ahí.

Esta es la opción preferida por simplicidad y menor mantenimiento. Las secciones de abajo
(Cloud Scheduler + Cloud Function, y export manual) quedan documentadas como alternativa
por si el proyecto no tuviera disponible esta función administrada, o se necesitara más
control granular (ej. exportar a un bucket propio para retención más larga que la que
ofrece la función nativa).

## Alternativa: exportación automática diaria (Cloud Scheduler + Cloud Function)

Serverless, sin servidor propio que mantener.

1. Crear un bucket dedicado a backups, con lifecycle policy para no acumular costo indefinido:

   ```
   gsutil mb -l <REGION> gs://expenseapp-backups
   gsutil lifecycle set lifecycle.json gs://expenseapp-backups
   ```

   `lifecycle.json`:
   ```json
   {
     "rule": [
       { "action": { "type": "Delete" }, "condition": { "age": 60 } }
     ]
   }
   ```

2. Dar el rol `roles/datastore.importExportAdmin` a la cuenta de servicio que ejecutará la
   función:

   ```
   gcloud projects add-iam-policy-binding <PROJECT_ID> \
     --member="serviceAccount:<SERVICE_ACCOUNT_EMAIL>" \
     --role="roles/datastore.importExportAdmin"
   ```

3. Cloud Function (Node, 2nd gen) que dispara la exportación:

   ```js
   const { GoogleAuth } = require('google-auth-library');
   const { google } = require('googleapis');

   exports.exportFirestore = async (req, res) => {
     const auth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/datastore'] });
     const client = await auth.getClient();
     const projectId = await auth.getProjectId();
     const firestore = google.firestore({ version: 'v1', auth: client });

     const bucket = `gs://expenseapp-backups/${new Date().toISOString().slice(0, 10)}`;
     await firestore.projects.databases.exportDocuments({
       name: `projects/${projectId}/databases/(default)`,
       requestBody: { outputUriPrefix: bucket },
     });
     res.status(200).send('Export started');
   };
   ```

4. Cloud Scheduler: job diario (ej. 3am) que hace un `POST` autenticado (OIDC) al endpoint
   de la función.

## Backup manual puntual (antes de un cambio grande / migración)

No requiere nada de lo anterior, solo el rol de IAM del paso 2:

```
gcloud firestore export gs://expenseapp-backups/manual/$(date +%Y%m%d) --project=<PROJECT_ID>
```

## Restaurar desde un backup

```
gcloud firestore import gs://expenseapp-backups/<CARPETA_DEL_BACKUP> --project=<PROJECT_ID>
```

Nota: un `import` no hace merge selectivo — restaura la base completa al estado del backup.
Si solo se necesita recuperar documentos puntuales, hay que importar a un proyecto/base
temporal y copiar los documentos específicos desde ahí.

## Estado actual

Pendiente de configurar en la consola de Google Cloud (bucket, IAM, Cloud Function,
Cloud Scheduler). Nada de esto se automatiza desde este repositorio.
