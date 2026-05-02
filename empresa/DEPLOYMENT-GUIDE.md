# 🚀 Guía de Deployment - Ultra Seco E-commerce (Arquitectura Autónoma)

## 📋 Pre-Deployment Checklist

### 1. Archivos Principales Verificados ✅
- [x] `index.html` - Página principal con hero y ecosistema
- [x] `styles.css` - Estilos principales
- [x] `script.js` - Funcionalidad general y IA Advisor
- [x] `catalog.js` - Sistema de catálogo de productos autónomo
- [x] `js/price-sync.js` - Motor de sincronización de precios Neon
- [x] `netlify/functions/products.js` - API Serverless para precios

### 2. Configuraciones Críticas

#### Neon PostgreSQL Database
1. **Conexión:** Obtener la cadena de conexión (`DATABASE_URL`) desde el panel de Neon.
2. **Esquema:** Asegurarse de que la tabla `productos` contenga las columnas: `nombre`, `presentacion`, `precio`, `categoria`, `sku`.

#### Netlify Functions (API)
La comunicación entre el frontend y la base de datos se realiza a través de funciones serverless:
- Endpoint: `/.netlify/functions/products`
- Mapeo en `netlify.toml`: `/api/products`

### 3. Estructura de Archivos para Deploy

```
empresa/
├── index.html              ← Página principal (REQUERIDO)
├── styles.css              ← Estilos (REQUERIDO)
├── script.js               ← Funcionalidad general (REQUERIDO)
├── catalog.js              ← Catálogo de productos (REQUERIDO)
├── js/
│   └── price-sync.js       ← Motor de Sincronización (REQUERIDO)
├── netlify/
│   ├── functions/
│   │   └── products.js     ← API de Base de Datos (REQUERIDO)
│   └── ...
├── netlify.toml            ← Configuración de Redirecciones (REQUERIDO)
├── images/                 ← Imágenes de productos (REQUERIDO)
├── assets/                 ← Assets visuales (REQUERIDO)
├── docs/                   ← Fichas técnicas PDF (REQUERIDO)
└── logo/                   ← Logos de la marca (REQUERIDO)
```

---

## 🔧 Pasos para Deployment

### Opción Recomendada: Netlify

#### 1. Preparación del Entorno
Instalar las dependencias de las funciones si no están presentes:
```bash
npm install @neondatabase/serverless
```

#### 2. Configuración en Netlify CLI
```bash
# Instalar CLI
npm install -g netlify-cli

# Login y Despliegue
netlify login
netlify init
netlify env:set DATABASE_URL "postgres://user:pass@host/db"
netlify deploy --prod
```

---

## ✅ Verificación Post-Deployment

### 1. Sincronización de Datos (Neon)
- [ ] Abrir consola del navegador (F12).
- [ ] Verificar mensaje: `[Price Sync] Prices synced from Neon DB`.
- [ ] Validar que los precios en los desplegables coincidan con la base de datos.

### 2. Carrito Autónomo
- [ ] Se pueden agregar productos al carrito.
- [ ] El carrito persiste entre navegaciones (localStorage: `miCarritoUltraSeco`).
- [ ] La redirección a `carrito.html` para el checkout manual funciona.

---

## 🔒 Consideraciones de Seguridad y Performance

1. **Variables de Entorno:** Nunca incluyas el `DATABASE_URL` directamente en los archivos `.js` del frontend. Usa siempre el dashboard de Netlify o el CLI.
2. **CORS:** El `netlify.toml` asegura que las llamadas a `/api/*` sean locales, evitando problemas de CORS.
3. **Performance:** El motor `price-sync.js` está diseñado para cargar de forma asíncrona y no bloquear el renderizado del sitio.

---

## 🌐 Configuración de Dominio

### HTTPS y SSL
Netlify provee certificados SSL automáticos de Let's Encrypt una vez que el dominio es configurado.

---

## 🐛 Troubleshooting Común

### Precios no se actualizan
- Verificar que el `data-sync-product` en el HTML coincida exactamente con el nombre en la base de datos Neon.
- Revisar logs de Netlify Functions para errores de conexión a la DB.

### Error de Base de Datos
- Asegurarse de que el usuario de Neon tenga permisos de lectura sobre la tabla `productos`.

---

## 📊 Mantenimiento
Para actualizar precios masivamente, utiliza el **Portal Interno** (`portalinterno.html`) conectado a la misma base de datos Neon.

---

**Fecha de actualización:** 2026-05-02
**Versión:** 2.0.0 (Autónoma)
