const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function actualizarPortal() {
  console.log('🔄 Iniciando actualización del portal...');
  
  try {
    // La lógica que proporcionaste adaptada para alimentar el portal
    const productos = await prisma.producto.findMany({
      orderBy: { nombre: 'asc' }
    });

    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    const outputPath = path.join(dataDir, 'products.json');
    fs.writeFileSync(outputPath, JSON.stringify(productos, null, 2));

    console.log(`✅ ¡Éxito! Se han exportado ${productos.length} productos a data/products.json`);
    console.log('🌐 Ya puedes abrir portalinterno.html para visualizar los cambios.');
  } catch (error) {
    console.error('❌ Error al actualizar el portal:', error);
  } finally {
    await prisma.$disconnect();
  }
}

actualizarPortal();
