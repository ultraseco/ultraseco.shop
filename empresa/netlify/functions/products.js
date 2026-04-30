const { neon } = require('@neondatabase/serverless');

exports.handler = async (event, context) => {
    try {
        // En Netlify, DATABASE_URL debe estar configurado en las variables de entorno de la interfaz (Site settings)
        const sql = neon(process.env.DATABASE_URL);
        
        const products = await sql`SELECT * FROM productos ORDER BY id ASC`;
        
        return {
            statusCode: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(products)
        };
    } catch (error) {
        return { 
            statusCode: 500, 
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: error.message, stack: error.stack }) 
        };
    }
};
