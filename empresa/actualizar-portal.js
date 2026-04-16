const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function actualizarPortal() {
  console.log('🔄 Iniciando actualización profunda del portal...');
  
  try {
    // Obtenemos los productos con todos los campos (incluyendo los nuevos)
    const productos = await prisma.producto.findMany({
      orderBy: { nombre: 'asc' }
    });

    // 1. Guardar archivo JSON externo (para compatibilidad con servidor)
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
    fs.writeFileSync(path.join(dataDir, 'products.json'), JSON.stringify(productos, null, 2));

    // 2. Inyectar Snapshot en portalinterno.html (para compatibilidad Offline/Direct File)
    const portalPath = path.join(__dirname, 'portalinterno.html');
    if (fs.existsSync(portalPath)) {
      let portalHtml = fs.readFileSync(portalPath, 'utf-8');
      
      // Buscamos los marcadores de snapshot y reemplazamos el contenido
      const snapshotString = `window.INITIAL_PRODUCTS = ${JSON.stringify(productos)};`;
      const regex = /\/\/ SNAPSHOT_START[\s\S]*?\/\/ SNAPSHOT_END/;
      
      if (regex.test(portalHtml)) {
        portalHtml = portalHtml.replace(regex, `// SNAPSHOT_START\n        ${snapshotString}\n        // SNAPSHOT_END`);
        fs.writeFileSync(portalPath, portalHtml);
        console.log('✨ Snapshot inyectado correctamente en portalinterno.html');
      } else {
        console.warn('⚠️ No se encontraron marcadores de Snapshot en portalinterno.html');
      }
    }

    console.log(`✅ ¡Éxito! Se han procesado ${productos.length} productos.`);
  } catch (error) {
    console.error('❌ Error al actualizar el portal:', error);
  } finally {
    await prisma.$disconnect();
  }
}

actualizarPortal();
