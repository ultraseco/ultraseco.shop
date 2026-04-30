const { neon } = require('@neondatabase/serverless');

exports.handler = async (event, context) => {
    // Handle CORS preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }
    
    try {
        const sql = neon(process.env.DATABASE_URL);
        const updatedProducts = JSON.parse(event.body);
        
        // Ejecutamos las actualizaciones una por una (Neon serverless driver no soporta Promise.all de transacciones en la misma conexión sin cuidado, pero consultas simples await sí)
        for (const p of updatedProducts) {
            await sql`
                UPDATE productos 
                SET costo = ${p.costo}, 
                    precio = ${p.precio}, 
                    precio_mayor = ${p.precio_mayor}, 
                    precio_dist = ${p.precio_dist}, 
                    fecha_act = NOW()
                WHERE id = ${p.id}
            `;
        }

        return {
            statusCode: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ success: true, message: 'Sincronización completa en Netlify' })
        };
    } catch (error) {
        return { 
            statusCode: 500, 
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' 
            },
            body: JSON.stringify({ success: false, error: error.message }) 
        };
    }
};
