# 🔥 Configuración de Firebase Realtime Database para Ultra Seco

He generado el archivo de datos listo para importar. Sigue estos pasos para crear tu base de datos en tiempo real:

### 1. Preparar el archivo
El archivo **`empresa/firebase_import.json`** ya contiene toda la información de `portal_precios.csv` estructurada para Firebase.

### 2. Crear la Base de Datos en Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com/).
2. Selecciona tu proyecto (o crea uno nuevo).
3. En el menú lateral, ve a **Build > Realtime Database**.
4. Haz clic en **Create Database**.
5. Selecciona la ubicación de tu servidor (ej: United States) y haz clic en **Next**.
6. Inicia en **Test Mode** (Modo de prueba) para poder subir los datos inmediatamente, o configura las reglas de seguridad.
7. Haz clic en **Enable**.

### 3. Importar los Datos
1. Una vez dentro de la Realtime Database, verás una pantalla con una ruta (ej: `https://tu-proyecto.firebaseio.com/`).
2. Haz clic en los **tres puntos verticales** (⋮) en la esquina superior derecha del panel de datos.
3. Selecciona **Import JSON**.
4. Selecciona el archivo `empresa/firebase_import.json` de tu computadora.
5. Haz clic en **Import**.

### 4. Estructura Creada
Tu base de datos ahora tendrá esta estructura:
- `productos/`: Lista de todos los productos con sus precios (costo, detal, mayor, distribuidor).
- `configuracion/`: Tasa del euro y fecha de actualización.

### 5. ¿Qué pegar en "Configurar Firebase"?
En el portal, cuando hagas clic en **Configurar Firebase**, debes pegar el objeto de configuración que te entrega Google. 

**Dónde encontrarlo:**
1. Ve a **Project Settings** (el icono de engranaje ⚙️) en la consola de Firebase.
2. En la pestaña **General**, baja hasta la sección **"Your apps"**.
3. Si no tienes una, crea una "Web App" (clic en el icono `</>`).
4. Selecciona **"Config"** y copia **solo** el contenido de las llaves `{ ... }`.

**Debe verse así (ejemplo):**
```json
{
  "apiKey": "AIzaSy...",
  "authDomain": "tu-proyecto.firebaseapp.com",
  "databaseURL": "https://tu-proyecto.firebaseio.com",
  "projectId": "tu-proyecto",
  "storageBucket": "tu-proyecto.appspot.com",
  "messagingSenderId": "1234567",
  "appId": "1:123456:web:123abc"
}
```

### 🚀 Sincronización en Tiempo Real
Una vez pegues eso, el portal se conectará permanentemente. Si cambias un precio en la base de datos de Firebase, el portal lo mostrará **al instante** sin que tengas que refrescar la página.
