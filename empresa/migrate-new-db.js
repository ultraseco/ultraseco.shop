const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const sourceProducts = [
    { id: 'solucion-interior', name: 'Ultra Seco Solución Interior', options: [
        { label: '1 Litro', price: 13.99 },
        { label: '1 Litro (Atomizador)', price: 14.99 },
        { label: 'Galón (3.785L)', price: 38.00 },
        { label: 'Cuñete (18L)', price: 170.00 }
    ], category: 'Construcción' },
    { id: 'solucion-exterior', name: 'Ultra Seco Solución Exterior', options: [
        { label: '1 Litro', price: 16.99 },
        { label: '1 Litro (Atomizador)', price: 17.99 },
        { label: 'Galón (3.785L)', price: 48.00 },
        { label: 'Cuñete (18L)', price: 217.50 }
    ], category: 'Construcción' },
    { id: 'fortificador', name: 'Fortificador de Superficies', options: [
        { label: '1 Litro', price: 19.00 },
        { label: 'Galón', price: 52.00 },
        { label: 'Cuñete', price: 254.50 }
    ], category: 'Construcción' },
    { id: 'pintura-hidrofobica', name: 'Pintura Súper Hidrofóbica', options: [
        { label: 'Galón', price: 34.00 }
    ], category: 'Construcción' },
    { id: 'escudo-ceramico', name: 'Escudo Cerámico', options: [
        { label: '1 Litro', price: 45.00 }
    ], category: 'Hogar' },
    { id: 'estuco', name: 'Estuco Súper Hidrofóbico', options: [
        { label: '1/4 Galón', price: 6.40 },
        { label: 'Galón', price: 19.00 }
    ], category: 'Construcción' },
    { id: 'nano-aditivo', name: 'Nano Aditivo para Concreto', options: [
        { label: '600gr', price: 15.00 }
    ], category: 'Construcción' },
    { id: 'cera-protectora', name: 'Cera Nano Protectora', options: [
        { label: '500ml', price: 15.00 }
    ], category: 'Hogar' },
    { id: 'champu', name: 'Champú Nano-Concentrado', options: [
        { label: '1 Litro', price: 12.00 },
        { label: 'Galón', price: 35.00 }
    ], category: 'Vehicular' },
    { id: 'eco-capturador', name: 'Eco Capturador (Minería)', options: [
        { label: '1 Litro', price: 85.00 },
        { label: 'Galón', price: 320.00 },
        { label: 'Cuñete', price: 1500.00 }
    ], category: 'Industria' },
    { id: 'ultra-f3', name: 'Ultra F3 (Anti-Fuego)', options: [
        { label: 'Cuñete (18L)', price: 450.00 },
        { label: 'Tambor (200L)', price: 4800.00 }
    ], category: 'Industria' },
    { id: 'aditivo-asfaltico', name: 'Aditivo Asfáltico', options: [
        { label: 'Tambor (200L)', price: 3500.00 },
        { label: 'Granel (1000L)', price: 16000.00 }
    ], category: 'Industria' },
    { id: 'magnetron', name: 'Eco Capturador Magnetron', options: [
        { label: '1 Litro', price: 95.00 },
        { label: 'Galón', price: 345.00 },
        { label: 'Cuñete', price: 1650.00 }
    ], category: 'Industria' }
];

async function main() {
    console.log('👷 Creando tabla Producto en la nueva DB...');
    await prisma.$executeRawUnsafe(`CREATE TABLE IF NOT EXISTS "Producto" (
        id SERIAL PRIMARY KEY,
        nombre TEXT NOT NULL,
        presentacion TEXT NOT NULL,
        precio DECIMAL(10,2) NOT NULL,
        costo DECIMAL(10,2),
        precio_mayor DECIMAL(10,2),
        precio_dist DECIMAL(10,2),
        stock INTEGER DEFAULT 0,
        categoria TEXT,
        fecha_act TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );`);
    await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "nombre_presentacion" ON "Producto"(nombre, presentacion);`);
    console.log('✅ Tabla lista.');

    console.log('🚀 Migrando datos...');
    for (const prod of sourceProducts) {
        for (const opt of prod.options) {
            await prisma.producto.upsert({
                where: {
                    nombre_presentacion: {
                        nombre: prod.name,
                        presentacion: opt.label
                    }
                },
                update: {
                    precio: opt.price,
                    categoria: prod.category
                },
                create: {
                    nombre: prod.name,
                    presentacion: opt.label,
                    precio: opt.price,
                    categoria: prod.category,
                    stock: 100
                }
            });
        }
    }
    console.log('✅ Migración a la nueva base de datos completada.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
