const http = require('http');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const PORT = 3000;

const server = http.createServer(async (req, res) => {
    // Manejo de CORS (para desarrollo local)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // --- API: Obtener Productos ---
    if (req.url === '/api/products' && req.method === 'GET') {
        try {
            const products = await prisma.producto.findMany({ orderBy: { id: 'asc' } });
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(products));
        } catch (error) {
            res.writeHead(500);
            res.end(error.message);
        }
        return;
    }

    // --- API: Guardar Precios ---
    if (req.url === '/api/save-prices' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', async () => {
            try {
                const updatedProducts = JSON.parse(body);
                console.log(`🚀 Recibida actualización para ${updatedProducts.length} productos.`);

                // Actualizar en la base de datos (Neon) usando Prisma de forma paralela
                const updates = updatedProducts.map(p => 
                    prisma.producto.update({
                        where: { id: p.id },
                        data: {
                            costo: p.costo,
                            precio: p.precio,
                            precio_mayor: p.precio_mayor,
                            precio_dist: p.precio_dist,
                            fecha_act: new Date()
                        }
                    })
                );

                await Promise.all(updates);
                console.log('✅ Base de datos actualizada exitosamente.');

                // Regenerar el snapshot JSON para el ecosistema
                const allProducts = await prisma.producto.findMany({
                    orderBy: { id: 'asc' }
                });

                const dataDir = path.join(__dirname, 'data');
                if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
                
                fs.writeFileSync(
                    path.join(dataDir, 'products.json'), 
                    JSON.stringify(allProducts, null, 2)
                );
                console.log('📁 Snapshot products.json actualizado.');

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: 'Sincronización completa' }));
            } catch (error) {
                console.error('❌ Error en la sincronización:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: error.message }));
            }
        });
        return;
    }

    // --- Servidor de Archivos Estáticos ---
    let filePath = '.' + req.url;
    if (filePath === './') filePath = './portalinterno.html';

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code == 'ENOENT') {
                res.writeHead(404);
                res.end('Archivo no encontrado');
            } else {
                res.writeHead(500);
                res.end('Error interno: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`
    ================================================
    🚀 SERVIDOR DE SINCRONIZACIÓN ULTRA SECO
    ================================================
    Portal: http://localhost:${PORT}/portalinterno.html
    Base de Datos: Neon (PostgreSQL)
    ================================================
    Presiona Ctrl+C para detener.
    `);
});
