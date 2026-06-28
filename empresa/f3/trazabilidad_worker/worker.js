const HOST = "ep-little-sound-acmvj9id-pooler.sa-east-1.aws.neon.tech";
const PASS = "npg_fdsCKZE0T2oI"; // API Auth de Neon
const CONN_STR = `postgresql://neondb_owner:${PASS}@${HOST}/neondb?sslmode=require&channel_binding=require`;

export default {
  async fetch(request, env) {
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });

    const url = new URL(request.url);
    const idQr = url.searchParams.get('id_qr');

    if (!idQr) {
      return new Response(JSON.stringify({ error: 'Falta el parámetro id_qr en la URL' }), { 
          status: 400, headers: { ...cors, 'Content-Type': 'application/json' } 
      });
    }

    if (request.method === 'GET') {
      try {
        const sql = `
          SELECT 
            e.id_qr, 
            c.nombre_empresa, 
            e.capacidad_libras, 
            e.fecha_ultima_carga, 
            e.fecha_vencimiento, 
            e.estatus
          FROM extintores e
          LEFT JOIN clientes c ON e.cliente_id = c.id
          WHERE e.id_qr = $1;
        `;
        const res = await fetch(`https://${HOST}/sql`, {
          method: 'POST',
          headers: {
            'Neon-Connection-String': CONN_STR,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query: sql, params: [idQr] })
        });
        
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || "Error conectando a BD");
        
        if (!result.rows || result.rows.length === 0) {
          return new Response(JSON.stringify({ error: 'Extintor no encontrado en la base de datos' }), { 
              status: 404, headers: { ...cors, 'Content-Type': 'application/json' } 
          });
        }
        
        return new Response(JSON.stringify(result.rows[0]), { 
            status: 200, headers: { ...cors, 'Content-Type': 'application/json' } 
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { 
            status: 500, headers: { ...cors, 'Content-Type': 'application/json' } 
        });
      }
    }

    if (request.method === 'POST') {
      try {
        const sql = `UPDATE extintores SET estatus = 'Recarga_Autorizada' WHERE id_qr = $1;`;
        const res = await fetch(`https://${HOST}/sql`, {
          method: 'POST',
          headers: {
            'Neon-Connection-String': CONN_STR,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query: sql, params: [idQr] })
        });
        
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || "Error actualizando BD");
        
        return new Response(JSON.stringify({ success: true, message: 'Recarga autorizada exitosamente' }), { 
            status: 200, headers: { ...cors, 'Content-Type': 'application/json' } 
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { 
            status: 500, headers: { ...cors, 'Content-Type': 'application/json' } 
        });
      }
    }

    return new Response('Método no permitido', { status: 405, headers: cors });
  }
};
