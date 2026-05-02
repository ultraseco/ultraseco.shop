# 🚀 Despliegue Rápido - Ultra Seco E-commerce (Arquitectura Autónoma)

## ✅ Estado Actual: LISTO PARA DEPLOYMENT

**Fecha de verificación:** 2026-05-02
**Ecosistema:** Standalone (Neon PostgreSQL + Netlify Functions)
**Dependencias Externas:** ❌ Shopify Eliminado | ✅ Neon Sincronizado

---

## 🎯 Opción Recomendada: Netlify (Funciones + Hosting)

### Paso 1: Configurar Base de Datos Neon
1. Ve a https://neon.tech y crea un proyecto.
2. Copia tu `DATABASE_URL` (Connection String).
3. Asegúrate de tener la tabla `productos` con los datos actuales.

### Paso 2: Preparar Proyecto
1. Asegúrate de que `netlify.toml` esté en la raíz de `/empresa/`.
2. Verifica que `netlify/functions/products.js` use `@neondatabase/serverless`.

### Paso 3: Deploy con Netlify CLI (Recomendado)
```bash
# 1. Instalar CLI
npm install -g netlify-cli

# 2. Login
netlify login

# 3. Vincular y configurar variables
netlify init
netlify env:set DATABASE_URL "tu_url_de_conexion_neon"

# 4. Desplegar
netlify deploy --prod
```

---

## 📋 Checklist Pre-Deployment

Antes de hacer deployment, verificar localmente:

```powershell
# Ejecutar script de verificación autónoma
powershell -ExecutionPolicy Bypass -File ".\verify-deployment.ps1"
```

**Resultado esperado:** `[SUCCESS] Ready for deployment!`

---

## 🔒 Configuraciones Críticas

### 1. Variables de Entorno
En el dashboard de Netlify (Site Settings -> Env Variables):
- `DATABASE_URL`: URL de conexión a Neon.

### 2. Sincronización de Precios
El archivo `js/price-sync.js` se encarga de:
1. Consultar `/api/products` (Netlify Function).
2. Actualizar precios en tiempo real en el DOM.
3. Usar el `FALLBACK` local si la base de datos no responde.

---

## 🧪 Testing Post-Deployment

Después de hacer deployment, verificar:

### Gestión de Precios
1. [ ] Los precios se cargan desde Neon (ver consola: "Prices synced from Neon DB").
2. [ ] Los menús desplegables muestran los precios correctos.
3. [ ] El fallback local funciona al desconectar internet.

### Carrito Autónomo
4. [ ] Agregar producto al carrito funciona (miCarritoUltraSeco).
5. [ ] El carrito persiste entre navegaciones.
6. [ ] La redirección a `carrito.html` es instantánea.

---

## 🐛 Troubleshooting Rápido

### Los precios no cargan
```
Solución: Verificar DATABASE_URL en Netlify.
Revisar logs de funciones en Netlify Dashboard.
Verificar que la tabla 'productos' existe en Neon.
```

### Error de Conexión (CORS)
```
Solución: El archivo netlify.toml ya maneja los redireccionamientos de /api/*.
Asegúrate de no usar URLs absolutas en price-sync.js.
```

---

## 🎯 URLs de Referencia

- **Netlify Dashboard:** https://app.netlify.com/
- **Neon Console:** https://console.neon.tech/
- **Ultra Seco Admin (Portal):** /portalinterno.html (para gestionar precios)

---

**¡Tu ecosistema autónomo está listo para el mundo! 🚀✨**
