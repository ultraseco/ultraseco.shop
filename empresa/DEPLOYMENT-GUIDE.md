# 🚀 Guía de Deployment - Ultra Seco E-commerce

## 📋 Pre-Deployment Checklist

### 1. Archivos Principales Verificados ✅
- [x] `index.html` - Página principal con hero y ecosistema
- [x] `products.html` - Catálogo de productos (NO USAR - integrado en index)
- [x] `styles.css` - Estilos principales
- [x] `script.js` - Funcionalidad general
- [x] `catalog.js` - Sistema de catálogo de productos
- [x] `shopify-integration.js` - Integración del carrito con Shopify
- [x] `cart-integration.js` - Sistema de carrito local

### 2. Configuraciones Críticas

#### Shopify Store Configuration
```javascript
// En shopify-integration.js
const SHOPIFY_CONFIG = {
    domain: 'cx0msw-x8.myshopify.com',
    storefrontAccessToken: 'SU_TOKEN_AQUI'
};
```

**⚠️ IMPORTANTE:** Antes de subir a producción:
1. Verifica que el dominio de Shopify sea el correcto
2. El token de Storefront API debe estar configurado
3. El carrito debe apuntar al checkout correcto

### 3. Estructura de Archivos para Deploy

```
empresa/
├── index.html              ← Página principal (REQUERIDO)
├── styles.css              ← Estilos (REQUERIDO)
├── script.js               ← Funcionalidad general (REQUERIDO)
├── catalog.js              ← Catálogo de productos (REQUERIDO)
├── shopify-integration.js  ← Integración Shopify (REQUERIDO)
├── cart-integration.js     ← Carrito local (OPCIONAL - solo si no usas Shopify)
├── images/                 ← Imágenes de productos (REQUERIDO)
├── assets/                 ← Assets visuales (REQUERIDO)
├── videos/                 ← Videos demostrativos (OPCIONAL)
├── audio/                  ← Podcasts (OPCIONAL)
├── docs/                   ← Fichas técnicas PDF (REQUERIDO)
└── logo/                   ← Logos de la marca (REQUERIDO)
```

### 4. Páginas de Producto
Todas las páginas de producto individuales están funcionales:
- `aditivo.html`
- `cera.html`
- `champu.html`
- `eco.html`
- `escudo.html`
- `estuco.html`
- `exteriores.html`
- `fortificador.html`
- `interiores.html`
- `magnetron.html`
- `nano-aditivo.html`
- `pintura.html`
- `titan.html`

---

## 🔧 Pasos para Deployment

### Opción 1: Hosting Estático (Netlify/Vercel/GitHub Pages)

#### A. Netlify (Recomendado)
```bash
# 1. Instalar Netlify CLI
npm install -g netlify-cli

# 2. Desde la carpeta empresa/
cd "c:\Users\benha\OneDrive\Desktop\ultra seco ecosistema\empresa"

# 3. Deploy
netlify deploy --prod
```

**Configuración de Netlify:**
- Build command: (dejar vacío)
- Publish directory: `.` (carpeta actual)
- Domain: Configurar dominio personalizado después

#### B. Vercel
```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Deploy
vercel --prod
```

#### C. GitHub Pages
```bash
# 1. Crear repositorio en GitHub
# 2. Subir archivos
git init
git add .
git commit -m "Initial deployment"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/ultra-seco.git
git push -u origin main

# 3. Activar GitHub Pages en Settings → Pages
# Seleccionar branch 'main' y carpeta root
```

### Opción 2: Shopify Custom Storefront

Si quieres integrar completamente con Shopify:

1. **Theme Integration:**
   - Ir a Shopify Admin → Online Store → Themes
   - Subir como tema personalizado
   - Necesitarás adaptar a estructura Liquid de Shopify

2. **App Proxy (Recomendado para esta estructura):**
   - Mantener el sitio en hosting externo
   - Usar Shopify solo para checkout
   - Configurar redirección desde dominio principal

---

## ✅ Verificación Post-Deployment

### 1. Testing Funcional
- [ ] Página principal carga correctamente
- [ ] Todas las imágenes se ven
- [ ] Videos reproducen (si aplicable)
- [ ] Botones "Comprar Ahora" funcionan
- [ ] Carrito se abre y cierra
- [ ] Se pueden agregar productos al carrito
- [ ] Se pueden modificar cantidades
- [ ] Se pueden eliminar productos
- [ ] Botón "Finalizar Compra en Shopify" redirige correctamente
- [ ] localStorage persiste el carrito
- [ ] Responsive funciona en móvil
- [ ] Responsive funciona en tablet

### 2. Testing de Navegación
- [ ] Links internos funcionan
- [ ] Páginas de productos individuales cargan
- [ ] Botón "Explorar Ecosistema" funciona
- [ ] Botón "Diagnosticar con IA" funciona
- [ ] Footer links funcionan
- [ ] Instagram link funciona

### 3. SEO y Performance
- [ ] Meta tags configurados
- [ ] Open Graph tags para redes sociales
- [ ] Favicon configurado
- [ ] Imágenes optimizadas
- [ ] CSS minificado (opcional)
- [ ] JS minificado (opcional)

### 4. Analytics y Tracking
- [ ] Google Analytics configurado (si aplica)
- [ ] Meta Pixel configurado (si aplica)
- [ ] Shopify tracking configurado

---

## 🔒 Consideraciones de Seguridad

1. **HTTPS:** Asegúrate que el sitio use HTTPS
2. **API Tokens:** No expongas tokens privados en el código
3. **CORS:** Shopify debe permitir requests desde tu dominio
4. **CSP:** Configurar Content Security Policy si es necesario

---

## 🌐 Configuración de Dominio

### Dominio Personalizado
Si tienes un dominio (ej: `ultraseco.com`):

1. **En tu proveedor de dominio:**
   - Agregar registro A apuntando a IP de Netlify/Vercel
   - O registro CNAME apuntando a URL de deployment

2. **En Netlify/Vercel:**
   - Ir a Domain Settings
   - Add custom domain
   - Verificar DNS

3. **SSL/TLS:**
   - Netlify/Vercel proveen SSL automático
   - Esperar 24-48 hrs para propagación DNS

---

## 📱 Testing en Dispositivos Reales

Antes de lanzar oficialmente, probar en:
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] Desktop Chrome
- [ ] Desktop Safari
- [ ] Desktop Firefox
- [ ] Tablet iPad
- [ ] Tablet Android

---

## 🐛 Troubleshooting Común

### El carrito no funciona
- Verificar que `shopify-integration.js` se carga después del DOM
- Revisar consola del navegador para errores
- Verificar que el token de Shopify es válido

### Imágenes no cargan
- Verificar rutas relativas vs absolutas
- Asegurarse que carpeta `images/` está en deploy
- Verificar permisos de archivos

### Checkout de Shopify no abre
- Verificar configuración de `SHOPIFY_CONFIG`
- Revisar que el dominio permite redirects
- Verificar que los variant IDs son correctos

### Estilos se ven mal
- Verificar que `styles.css` se carga
- Revisar que no hay conflictos con CSS de Shopify
- Verificar media queries para responsive

---

## 📊 Métricas a Monitorear

Después del deployment, monitorear:
1. **Tráfico:** Usuarios, sesiones, bounce rate
2. **Conversión:** Add to cart rate, checkout rate
3. **Performance:** Page load time, Time to Interactive
4. **Errores:** JavaScript errors, 404s
5. **Dispositivos:** Mobile vs Desktop usage

---

## 🔄 Actualización y Mantenimiento

### Para actualizar el sitio:
```bash
# 1. Hacer cambios locales
# 2. Probar localmente
# 3. Deploy
netlify deploy --prod
# o
vercel --prod
```

### Backup recomendado:
- Hacer backup de `empresa/` completo cada mes
- Usar Git para control de versiones
- Mantener copia de configuraciones de Shopify

---

## 📞 Soporte Post-Deployment

Si algo falla:
1. Revisar consola del navegador (F12)
2. Revisar logs de Netlify/Vercel
3. Verificar status de Shopify API
4. Contactar soporte de hosting si es necesario

---

## ✨ Próximos Pasos Recomendados

Después del deployment inicial:
1. **Configurar analytics** para tracking
2. **Agregar chat en vivo** (Tidio, Intercom)
3. **Optimizar SEO** con meta descriptions
4. **Configurar email marketing** (Mailchimp)
5. **Agregar reviews de productos**
6. **Implementar cupones de descuento**
7. **Agregar calculadora de envío**

---

**Fecha de creación:** 2026-01-18
**Última actualización:** 2026-01-18
**Versión:** 1.0.0
